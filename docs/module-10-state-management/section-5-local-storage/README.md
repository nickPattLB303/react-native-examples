typescript# Section 5: Local Storage

## Overview

Local storage is essential for persisting data in React Native applications. This section covers various storage options available in React Native, including AsyncStorage, SecureStore, FileSystem, and SQLite. You'll learn how to store and retrieve data locally, handle sensitive information securely, and implement offline capabilities in your medication tracking application.

## Learning Objectives

By the end of this section, you will be able to:

- Understand different storage options in React Native
- Implement data persistence with AsyncStorage
- Store sensitive information securely with SecureStore
- Manage files with FileSystem
- Create and query local databases with SQLite
- Choose the appropriate storage solution for different use cases
- Implement offline capabilities in React Native applications
- Use TypeScript with local storage for type safety

## Introduction to Local Storage

Local storage allows React Native applications to persist data on the device, enabling offline functionality, improved performance, and a better user experience. Different storage options are available, each with its own strengths and use cases.

### Storage Options in React Native

1. **AsyncStorage**: Simple key-value storage system
2. **SecureStore**: Secure storage for sensitive information
3. **FileSystem**: File system access for storing and retrieving files
4. **SQLite**: Relational database for structured data storage

### Choosing the Right Storage Option

The choice of storage option depends on several factors:

- **Data type**: Simple key-value pairs, structured data, or files
- **Security requirements**: Sensitive information vs. non-sensitive data
- **Performance needs**: Read/write speed and query capabilities
- **Data size**: Small preferences vs. large datasets
- **Offline requirements**: Simple caching vs. complex offline functionality

## AsyncStorage

AsyncStorage is a simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It's ideal for storing non-sensitive data like user preferences, app state, and cached data.

### Installation

AsyncStorage was moved to a separate package in React Native 0.59:

```bash
npm install @react-native-async-storage/async-storage
# or
yarn add @react-native-async-storage/async-storage
```

### Basic Usage

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing data
const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Retrieving data
const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Removing data
const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully');
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
```

### Working with Multiple Items

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing multiple items
const storeMultipleData = async () => {
  try {
    const pairs = [
      ['@user_name', 'John Doe'],
      ['@user_age', '30'],
      ['@user_email', 'john@example.com'],
    ];
    
    await AsyncStorage.multiSet(pairs);
    console.log('All data stored successfully');
  } catch (error) {
    console.error('Error storing multiple data:', error);
  }
};

// Retrieving multiple items
const getMultipleData = async () => {
  try {
    const keys = ['@user_name', '@user_age', '@user_email'];
    const values = await AsyncStorage.multiGet(keys);
    
    // values is an array of key-value pairs
    // [['@user_name', 'John Doe'], ['@user_age', '30'], ...]
    
    return values.map(([key, value]) => ({
      key,
      value: value || '',
    }));
  } catch (error) {
    console.error('Error retrieving multiple data:', error);
    return [];
  }
};

// Removing multiple items
const removeMultipleData = async () => {
  try {
    const keys = ['@user_name', '@user_age', '@user_email'];
    await AsyncStorage.multiRemove(keys);
    console.log('All data removed successfully');
  } catch (error) {
    console.error('Error removing multiple data:', error);
  }
};
```

### Implementing a Custom Hook for AsyncStorage

Create a custom hook for easier usage of AsyncStorage:

```tsx
// hooks/useAsyncStorage.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load from AsyncStorage
  useEffect(() => {
    const getStoredValue = async () => {
      try {
        setLoading(true);
        const item = await AsyncStorage.getItem(key);
        const value = item ? JSON.parse(item) : initialValue;
        setStoredValue(value);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setLoading(false);
      }
    };

    getStoredValue();
  }, [key, initialValue]);

  // Update AsyncStorage
  const setValue = async (value: T) => {
    try {
      setLoading(true);
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  };

  // Remove from AsyncStorage
  const removeValue = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  };

  return { storedValue, setValue, removeValue, loading, error };
}
```

### Using the Custom Hook

```tsx
// components/UserPreferences.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const defaultPreferences: UserPreferences = {
  darkMode: false,
  notifications: true,
  fontSize: 'medium',
};

export default function UserPreferencesScreen() {
  const { 
    storedValue: preferences, 
    setValue: setPreferences, 
    loading 
  } = useAsyncStorage<UserPreferences>('@user_preferences', defaultPreferences);

  if (loading) {
    return <Text>Loading preferences...</Text>;
  }

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences({ ...preferences, [key]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.preference}>
        <Text>Dark Mode</Text>
        <Switch
          value={preferences.darkMode}
          onValueChange={(value) => updatePreference('darkMode', value)}
        />
      </View>
      
      <View style={styles.preference}>
        <Text>Notifications</Text>
        <Switch
          value={preferences.notifications}
          onValueChange={(value) => updatePreference('notifications', value)}
        />
      </View>
      
      <View style={styles.preference}>
        <Text>Font Size</Text>
        <View style={styles.buttonGroup}>
          {(['small', 'medium', 'large'] as const).map((size) => (
            <Text
              key={size}
              style={[
                styles.fontSizeButton,
                preferences.fontSize === size && styles.selectedFontSize,
              ]}
              onPress={() => updatePreference('fontSize', size)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  fontSizeButton: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  selectedFontSize: {
    backgroundColor: '#007AFF',
    color: 'white',
  },
});
```

## SecureStore

SecureStore is an Expo API that provides a way to encrypt and securely store key-value pairs locally on the device. It's ideal for storing sensitive information like authentication tokens, passwords, and personal data.

### Installation

```bash
npx expo install expo-secure-store
```

### Basic Usage

```tsx
import * as SecureStore from 'expo-secure-store';

// Storing data
const saveSecureValue = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log('Secure data stored successfully');
  } catch (error) {
    console.error('Error storing secure data:', error);
  }
};

// Retrieving data
const getSecureValue = async (key: string) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    console.error('Error retrieving secure data:', error);
    return null;
  }
};

// Removing data
const deleteSecureValue = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log('Secure data removed successfully');
  } catch (error) {
    console.error('Error removing secure data:', error);
  }
};
```

### Implementing a Custom Hook for SecureStore

Create a custom hook for easier usage of SecureStore:

```tsx
// hooks/useSecureStore.ts
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export function useSecureStore(key: string, initialValue: string = '') {
  const [storedValue, setStoredValue] = useState<string>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load from SecureStore
  useEffect(() => {
    const getStoredValue = async () => {
      try {
        setLoading(true);
        const item = await SecureStore.getItemAsync(key);
        setStoredValue(item !== null ? item : initialValue);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setLoading(false);
      }
    };

    getStoredValue();
  }, [key, initialValue]);

  // Update SecureStore
  const setValue = async (value: string) => {
    try {
      setLoading(true);
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await SecureStore.setItemAsync(key, valueToStore);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  };

  // Remove from SecureStore
  const removeValue = async () => {
    try {
      setLoading(true);
      await SecureStore.deleteItemAsync(key);
      setStoredValue(initialValue);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  };

  return { storedValue, setValue, removeValue, loading, error };
}
```

### Using the Custom Hook

```tsx
// components/AuthToken.tsx
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSecureStore } from '../hooks/useSecureStore';

export default function AuthTokenScreen() {
  const { 
    storedValue: token, 
    setValue: setToken, 
    removeValue: removeToken, 
    loading 
  } = useSecureStore('auth_token');

  const login = async () => {
    // Simulate API call to get token
    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    setToken(newToken);
  };

  const logout = async () => {
    removeToken();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {token ? (
        <>
          <Text>You are logged in!</Text>
          <Text>Token: {token.substring(0, 10)}...</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <>
          <Text>You are not logged in.</Text>
          <Button title="Login" onPress={login} />
        </>
      )}
    </View>
  );
}
```

## FileSystem

FileSystem provides a way to access the device's file system, allowing you to read, write, and manage files. It's ideal for storing larger data like images, documents, and other binary files.

### Installation

```bash
npx expo install expo-file-system
```

### Basic Usage

```tsx
import * as FileSystem from 'expo-file-system';

// Writing to a file
const writeToFile = async (fileName: string, content: string) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.writeAsStringAsync(fileUri, content);
    console.log('File written successfully');
    return fileUri;
  } catch (error) {
    console.error('Error writing file:', error);
    return null;
  }
};

// Reading from a file
const readFromFile = async (fileName: string) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const content = await FileSystem.readAsStringAsync(fileUri);
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

// Checking if a file exists
const fileExists = async (fileName: string) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.exists;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};

// Deleting a file
const deleteFile = async (fileName: string) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.deleteAsync(fileUri);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
```

### Working with Directories

```tsx
import * as FileSystem from 'expo-file-system';

// Creating a directory
const createDirectory = async (dirName: string) => {
  try {
    const dirUri = `${FileSystem.documentDirectory}${dirName}`;
    const dirInfo = await FileSystem.getInfoAsync(dirUri);
    
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      console.log('Directory created successfully');
    }
    
    return dirUri;
  } catch (error) {
    console.error('Error creating directory:', error);
    return null;
  }
};

// Reading directory contents
const readDirectory = async (dirName: string) => {
  try {
    const dirUri = `${FileSystem.documentDirectory}${dirName}`;
    const files = await FileSystem.readDirectoryAsync(dirUri);
    return files;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
};
```

### Downloading Files

```tsx
import * as FileSystem from 'expo-file-system';

const downloadFile = async (url: string, fileName: string) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      fileUri,
      {},
      (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log(`Download progress: ${progress * 100}%`);
      }
    );
    
    const { uri } = await downloadResumable.downloadAsync();
    console.log('File downloaded to:', uri);
    return uri;
  } catch (error) {
    console.error('Error downloading file:', error);
    return null;
  }
};
```

### Implementing a Custom Hook for FileSystem

Create a custom hook for managing files:

```tsx
// hooks/useFileSystem.ts
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export function useFileSystem(fileName: string) {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string>(`${FileSystem.documentDirectory}${fileName}`);
  const [exists, setExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Check if file exists on mount
  useEffect(() => {
    const checkFile = async () => {
      try {
        setLoading(true);
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        setExists(fileInfo.exists);
        
        if (fileInfo.exists) {
          const content = await FileSystem.readAsStringAsync(fileUri);
          setFileContent(content);
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setLoading(false);
      }
    };

    checkFile();
  }, [fileUri]);

  // Write content to file
  const writeFile = async (content: string) => {
    try {
      setLoading(true);
      await FileSystem.writeAsStringAsync(fileUri, content);
      setFileContent(content);
      setExists(true);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  };

  // Delete file
  const deleteFile = async () => {
    try {
      setLoading(true);
      if (exists) {
        await FileSystem.deleteAsync(fileUri);
        setExists(false);
        setFileContent(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  };

  return { fileContent, fileUri, exists, writeFile, deleteFile, loading, error };
}
```

### Using the Custom Hook

```tsx
// components/NoteEditor.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useFileSystem } from '../hooks/useFileSystem';

export default function NoteEditor() {
  const [note, setNote] = useState('');
  const { 
    fileContent, 
    exists, 
    writeFile, 
    deleteFile, 
    loading, 
    error 
  } = useFileSystem('notes.txt');

  // Load note from file
  useEffect(() => {
    if (fileContent) {
      setNote(fileContent);
    }
  }, [fileContent]);

  const saveNote = async () => {
    await writeFile(note);
  };

  const clearNote = async () => {
    setNote('');
    await deleteFile();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        value={note}
        onChangeText={setNote}
        placeholder="Write your note here..."
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveNote} />
        <Button title="Clear" onPress={clearNote} color="red" />
      </View>
      {exists && (
        <Text style={styles.savedText}>Note saved!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  savedText: {
    color: 'green',
    textAlign: 'center',
  },
});
```

## SQLite

SQLite is a self-contained, serverless, zero-configuration, transactional SQL database engine. It's ideal for storing structured data that requires complex queries, relationships, and transactions.

### Installation

```bash
npx expo install expo-sqlite
```

### Basic Usage

```tsx
import * as SQLite from 'expo-sqlite';

// Open or create a database
const db = SQLite.openDatabase('medications.db');

// Create a table
const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS medications (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dosage TEXT, frequency TEXT, instructions TEXT);'
    );
  }, error => {
    console.error('Error creating table:', error);
  }, () => {
    console.log('Table created successfully');
  });
};

// Insert data
const addMedication = (name: string, dosage: string, frequency: string, instructions: string) => {
  return new Promise<number>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO medications (name, dosage, frequency, instructions) VALUES (?, ?, ?, ?);',
        [name, dosage, frequency, instructions],
        (_, result) => {
          resolve(result.insertId || 0);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Query data
const getMedications = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM medications;',
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Update data
const updateMedication = (id: number, name: string, dosage: string, frequency: string, instructions: string) => {
  return new Promise<number>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE medications SET name = ?, dosage = ?, frequency = ?, instructions = ? WHERE id = ?;',
        [name, dosage, frequency, instructions, id],
        (_, result) => {
          resolve(result.rowsAffected);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Delete data
const deleteMedication = (id: number) => {
  return new Promise<number>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM medications WHERE id = ?;',
        [id],
        (_, result) => {
          resolve(result.rowsAffected);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
```

### Implementing a Database Service

Create a service for managing the database:

```tsx
// services/DatabaseService.ts
import * as SQLite from 'expo-sqlite';
import { Medication } from '../types';

class DatabaseService {
  private db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase('medications.db');
    this.init();
  }

  private init() {
    this.db.transaction(tx => {
      // Create medications table
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS medications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          dosage TEXT NOT NULL,
          frequency TEXT NOT NULL,
          instructions TEXT,
          created_at INTEGER,
          updated_at INTEGER
        );
      `);

      // Create prescriptions table
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS prescriptions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          medication_id INTEGER,
          doctor TEXT,
          date INTEGER,
          refills INTEGER,
          FOREIGN KEY (medication_id) REFERENCES medications (id)
        );
      `);
    });
  }

  // Medications CRUD operations
  async getMedications(): Promise<Medication[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM medications ORDER BY name;',
          [],
          (_, result) => {
            resolve(result.rows._array);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async getMedicationById(id: number): Promise<Medication | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM medications WHERE id = ?;',
          [id],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows.item(0));
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async addMedication(medication: Omit<Medication, 'id'>): Promise<number> {
    const now = Date.now();
    
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO medications (name, dosage, frequency, instructions, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?);`,
          [
            medication.name,
            medication.dosage,
            medication.frequency,
            medication.instructions || '',
            now,
            now,
          ],
          (_, result) => {
            resolve(result.insertId || 0);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async updateMedication(medication: Medication): Promise<number> {
    const now = Date.now();
    
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE medications 
           SET name = ?, dosage = ?, frequency = ?, instructions = ?, updated_at = ? 
           WHERE id = ?;`,
          [
            medication.name,
            medication.dosage,
            medication.frequency,
            medication.instructions || '',
            now,
            medication.id,
          ],
          (_, result) => {
            resolve(result.rowsAffected);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async deleteMedication(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM medications WHERE id = ?;',
          [id],
          (_, result) => {
            resolve(result.rowsAffected);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  // Add more methods for prescriptions and other tables...
}

// Create and export a singleton instance
export const databaseService = new DatabaseService();
```

### Implementing a Custom Hook for SQLite

Create a custom hook for managing medications:

```tsx
// hooks/useMedicationsDatabase.ts
import { useState, useEffect, useCallback } from 'react';
import { databaseService } from '../services/DatabaseService';
import { Medication } from '../types';

export function useMedicationsDatabase() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch all medications
  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await databaseService.getMedications();
      setMedications(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  // Load medications on mount
  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  // Add a medication
  const addMedication = async (medication: Omit<Medication, 'id'>) => {
    try {
      setLoading(true);
      const id = await databaseService.addMedication(medication);
      
      if (id) {
        const newMedication = { ...medication, id };
        setMedications(prev => [...prev, newMedication]);
      }
      
      return id;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      return 0;
    } finally {
      setLoading(false);
    }
  };

  // Update a medication
  const updateMedication = async (medication: Medication) => {
    try {
      setLoading(true);
      const rowsAffected = await databaseService.updateMedication(medication);
      
      if (rowsAffected > 0) {
        setMedications(prev => 
          prev.map(med => med.id === medication.id ? medication : med)
        );
      }
      
      return rowsAffected;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      return 0;
    } finally {
      setLoading(false);
    }
  };

  // Delete a medication
  const deleteMedication = async (id: number) => {
    try {
      setLoading(true);
      const rowsAffected = await databaseService.deleteMedication(id);
      
      if (rowsAffected > 0) {
        setMedications(prev => prev.filter(med => med.id !== id));
      }
      
      return rowsAffected;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      return 0;
    } finally {
      setLoading(false);
    }
  };

  return {
    medications,
    loading,
    error,
    fetchMedications,
    addMedication,
    updateMedication,
    deleteMedication,
  };
}
```

### Using the Custom Hook

```tsx
// screens/MedicationsScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useMedicationsDatabase } from '../hooks/useMedicationsDatabase';
import MedicationItem from '../components/MedicationItem';
import AddMedicationModal from '../components/AddMedicationModal';

export default function MedicationsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { 
    medications, 
    loading, 
    error, 
    addMedication, 
    updateMedication, 
    deleteMedication 
  } = useMedicationsDatabase();

  const handleAddMedication = async (medication) => {
    await addMedication(medication);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        renderItem={({ item }) => (
          <MedicationItem
            medication={item}
            onUpdate={updateMedication}
            onDelete={() => deleteMedication(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No medications found</Text>
        }
      />
      
      <Button
        title="Add Medication"
        onPress={() => setModalVisible(true)}
      />
      
      <AddMedicationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddMedication}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#666',
  },
});
```

## Combining Storage Solutions

In real-world applications, you'll often need to combine multiple storage solutions to meet different requirements.

### Example: Comprehensive Storage Strategy

```tsx
// services/StorageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { databaseService } from './DatabaseService';

class StorageService {
  // User preferences (AsyncStorage)
  async saveUserPreferences(preferences: any) {
    try {
      await AsyncStorage.setItem('@user_preferences', JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      return false;
    }
  }

  async getUserPreferences() {
    try {
      const data = await AsyncStorage.getItem('@user_preferences');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null;
    }
  }

  // Authentication (SecureStore)
  async saveAuthToken(token: string) {
    try {
      await SecureStore.setItemAsync('auth_token', token);
      return true;
    } catch (error) {
      console.error('Error saving auth token:', error);
      return false;
    }
  }

  async getAuthToken() {
    try {
      return await SecureStore.getItemAsync('auth_token');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  async removeAuthToken() {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      return true;
    } catch (error) {
      console.error('Error removing auth token:', error);
      return false;
    }
  }

  // Medication images (FileSystem)
  async saveMedicationImage(medicationId: number, imageUri: string) {
    try {
      // Create directory if it doesn't exist
      const dirUri = `${FileSystem.documentDirectory}medication_images/`;
      const dirInfo = await FileSystem.getInfoAsync(dirUri);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      }
      
      // Copy image to app directory
      const fileName = `medication_${medicationId}.jpg`;
      const newUri = `${dirUri}${fileName}`;
      
      await FileSystem.copyAsync({
        from: imageUri,
        to: newUri,
      });
      
      // Update medication record in database
      await databaseService.updateMedicationImage(medicationId, newUri);
      
      return newUri;
    } catch (error) {
      console.error('Error saving medication image:', error);
      return null;
    }
  }

  async getMedicationImage(medicationId: number) {
    try {
      const fileName = `medication_${medicationId}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}medication_images/${fileName}`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      
      return fileInfo.exists ? fileUri : null;
    } catch (error) {
      console.error('Error getting medication image:', error);
      return null;
    }
  }

  // Medication data (SQLite via DatabaseService)
  async getMedications() {
    return databaseService.getMedications();
  }

  async getMedicationById(id: number) {
    return databaseService.getMedicationById(id);
  }

  async addMedication(medication: any) {
    return databaseService.addMedication(medication);
  }

  async updateMedication(medication: any) {
    return databaseService.updateMedication(medication);
  }

  async deleteMedication(id: number) {
    return databaseService.deleteMedication(id);
  }
}

// Create and export a singleton instance
export const storageService = new StorageService();
```

## Offline Capabilities

Implementing offline capabilities in your React Native application:

### Offline-First Approach

```tsx
// services/SyncService.ts
import NetInfo from '@react-native-community/netinfo';
import { databaseService } from './DatabaseService';
import { apiService } from './ApiService';

class SyncService {
  private isOnline: boolean = false;
  private pendingSync: boolean = false;
  private syncQueue: any[] = [];

  constructor() {
    // Initialize network listener
    NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected && state.isInternetReachable;
      
      // If we're coming back online and have pending syncs
      if (wasOffline && this.isOnline && this.pendingSync) {
        this.syncData();
      }
    });
    
    // Load sync queue from storage
    this.loadSyncQueue();
  }

  private async loadSyncQueue() {
    // Load pending sync operations from AsyncStorage
    // ...
  }

  private async saveSyncQueue() {
    // Save pending sync operations to AsyncStorage
    // ...
  }

  async addToSyncQueue(operation: string, data: any) {
    this.syncQueue.push({
      operation,
      data,
      timestamp: Date.now(),
    });
    
    await this.saveSyncQueue();
    
    // Try to sync immediately if online
    if (this.isOnline) {
      this.syncData();
    } else {
      this.pendingSync = true;
    }
  }

  async syncData() {
    if (this.syncQueue.length === 0) {
      this.pendingSync = false;
      return;
    }
    
    try {
      // Process each item in the queue
      const queue = [...this.syncQueue];
      this.syncQueue = [];
      
      for (const item of queue) {
        try {
          switch (item.operation) {
            case 'ADD_MEDICATION':
              await apiService.addMedication(item.data);
              break;
            case 'UPDATE_MEDICATION':
              await apiService.updateMedication(item.data);
              break;
            case 'DELETE_MEDICATION':
              await apiService.deleteMedication(item.data.id);
              break;
            // Handle other operations...
          }
        } catch (error) {
          // If this specific operation fails, add it back to the queue
          this.syncQueue.push(item);
        }
      }
      
      // Save the updated queue
      await this.saveSyncQueue();
      
      // If we still have items in the queue, we have pending syncs
      this.pendingSync = this.syncQueue.length > 0;
    } catch (error) {
      console.error('Error syncing data:', error);
      this.pendingSync = true;
    }
  }

  // Methods for different operations
  async addMedication(medication: any) {
    // Save to local database first
    const id = await databaseService.addMedication(medication);
    
    // Add to sync queue
    await this.addToSyncQueue('ADD_MEDICATION', { ...medication, id });
    
    return id;
  }

  async updateMedication(medication: any) {
    // Update local database first
    const result = await databaseService.updateMedication(medication);
    
    // Add to sync queue
    await this.addToSyncQueue('UPDATE_MEDICATION', medication);
    
    return result;
  }

  async deleteMedication(id: number) {
    // Delete from local database first
    const result = await databaseService.deleteMedication(id);
    
    // Add to sync queue
    await this.addToSyncQueue('DELETE_MEDICATION', { id });
    
    return result;
  }
}

// Create and export a singleton instance
export const syncService = new SyncService();
```

### Using the Sync Service

```tsx
// hooks/useMedications.ts
import { useState, useEffect, useCallback } from 'react';
import { syncService } from '../services/SyncService';
import { Medication } from '../types';

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch medications from local database
  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await syncService.getMedications();
      setMedications(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  // Load medications on mount
  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  // Add a medication
  const addMedication = async (medication: Omit<Medication, 'id'>) => {
    try {
      setLoading(true);
      const id = await syncService.addMedication(medication);
      
      if (id) {
        const newMedication = { ...medication, id };
        setMedications(prev => [...prev, newMedication]);
      }
      
      return id;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      return 0;
    } finally {
      setLoading(false);
    }
  };

  // Update a medication
  const updateMedication = async (medication: Medication) => {
    try {
      setLoading(true);
      const rowsAffected = await syncService.updateMedication(medication);
      
      if (rowsAffected > 0) {
        setMedications(prev => 
          prev.map(med => med.id === medication.id ? medication : med)
        );
      }
      
      return rowsAffected;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      return 0;
    } finally {
      setLoading(false);
    }
  };

  // Delete a medication
  const deleteMedication = async (id: number) => {
    try {
      setLoading(true);
      const rowsAffected = await syncService.deleteMedication(id);
      
      if (rowsAffected > 0) {
        setMedications(prev => prev.filter(med => med.id !== id));
      }
      
      return rowsAffected;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      return 0;
    } finally {
      setLoading(false);
    }
  };

  return {
    medications,
    loading,
    error,
    fetchMedications,
    addMedication,
    updateMedication,
    deleteMedication,
  };
}
```

## Best Practices

1. **Choose the right storage option**: Select the appropriate storage solution based on your data requirements
2. **Handle errors gracefully**: Implement proper error handling for all storage operations
3. **Use TypeScript**: Define clear types for your data structures
4. **Create abstractions**: Use services and hooks to abstract storage implementation details
5. **Implement offline-first**: Design your app to work offline first, then sync when online
6. **Secure sensitive data**: Use SecureStore for sensitive information
7. **Optimize performance**: Be mindful of performance implications, especially for large datasets
8. **Implement data migration**: Plan for schema changes and data migrations
9. **Test thoroughly**: Test your storage implementation across different devices and scenarios
10. **Document your storage strategy**: Document your storage decisions and implementation details

## Exercise: Implementing Local Storage

Implement local storage in a medication tracking application:

1. Use AsyncStorage for user preferences
2. Use SecureStore for authentication tokens
3. Use FileSystem for storing medication images
4. Use SQLite for storing medication and prescription data
5. Implement offline capabilities with synchronization
6. Add TypeScript types for all storage operations
7. Create custom hooks for accessing stored data

## Next Steps

In the next module, we'll explore performance and debugging in React Native applications, focusing on how to optimize your app's performance and effectively debug issues.

## Additional Resources

- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [SecureStore Documentation](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [FileSystem Documentation](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- [SQLite Documentation](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Offline First Web Apps](https://offlinefirst.org/)
- [React Native Network Info](https://github.com/react-native-netinfo/react-native-netinfo)
- [Data Persistence in React Native](https://reactnative.dev/docs/next/data-persistence)
