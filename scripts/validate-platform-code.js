/**
 * @fileoverview Script to validate platform-specific code implementation
 * @author React Native Training Course
 * @created 2023-02-27
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

// Patterns to look for in platform-specific code
const PLATFORM_PATTERNS = {
  standard: /Platform\.OS\s*===\s*['"](\w+)['"]/g,
  ifPlatform: /if\s*\(\s*Platform\.OS\s*===\s*['"](\w+)['"]\s*\)/g,
  ternary: /Platform\.OS\s*===\s*['"](\w+)['"]\s*\?/g,
  select: /Platform\.select\s*\(\s*\{/g,
  selectContent: /Platform\.select\s*\(\s*\{([^}]+)\}\s*\)/g,
  extension: /\.[^.]+\.(ios|android)\.(js|jsx|ts|tsx)$/
};

// File extensions to scan
const FILE_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];

// Find all React Native files
function findReactNativeFiles() {
  const files = [];
  
  // Find all JS/JSX/TS/TSX files that aren't in node_modules
  FILE_EXTENSIONS.forEach(ext => {
    const pattern = `**/*.${ext}`;
    const matches = glob.sync(pattern, {
      ignore: ['node_modules/**', 'dist/**', 'build/**']
    });
    files.push(...matches);
  });
  
  // Filter to only include React Native files
  return files.filter(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      return content.includes('react-native') || 
             content.includes('React Native') ||
             content.includes('Platform.OS') ||
             file.includes('.ios.') || 
             file.includes('.android.');
    } catch (error) {
      console.error(`Error reading file ${file}: ${error.message}`);
      return false;
    }
  });
}

// Check if a file has platform-specific code
function hasPlatformSpecificCode(content) {
  return PLATFORM_PATTERNS.standard.test(content) ||
         PLATFORM_PATTERNS.ifPlatform.test(content) ||
         PLATFORM_PATTERNS.ternary.test(content) ||
         PLATFORM_PATTERNS.select.test(content);
}

// Check if the file is platform-specific by extension
function hasPlatformSpecificExtension(file) {
  return PLATFORM_PATTERNS.extension.test(file);
}

// Check if platform-specific code has explanatory comments
function hasPlatformSpecificComments(content) {
  // Reset regex lastIndex
  PLATFORM_PATTERNS.standard.lastIndex = 0;
  PLATFORM_PATTERNS.ifPlatform.lastIndex = 0;
  PLATFORM_PATTERNS.ternary.lastIndex = 0;
  PLATFORM_PATTERNS.selectContent.lastIndex = 0;
  
  let match;
  
  // Check for comments near Platform.OS === 'platform'
  while ((match = PLATFORM_PATTERNS.standard.exec(content)) !== null) {
    const platform = match[1];
    const contextStart = Math.max(0, match.index - 100);
    const contextEnd = Math.min(content.length, match.index + 100);
    const context = content.substring(contextStart, contextEnd);
    
    // Look for comments containing the platform name
    if (!context.includes(`// ${platform}`) && 
        !context.includes(`/* ${platform}`) && 
        !context.includes(`* ${platform}`)) {
      return false;
    }
  }
  
  // Check for comments near if (Platform.OS === 'platform')
  while ((match = PLATFORM_PATTERNS.ifPlatform.exec(content)) !== null) {
    const platform = match[1];
    const contextStart = Math.max(0, match.index - 100);
    const contextEnd = Math.min(content.length, match.index + 100);
    const context = content.substring(contextStart, contextEnd);
    
    // Look for comments containing the platform name
    if (!context.includes(`// ${platform}`) && 
        !context.includes(`/* ${platform}`) && 
        !context.includes(`* ${platform}`)) {
      return false;
    }
  }
  
  // Check for comments near Platform.select({ ... })
  while ((match = PLATFORM_PATTERNS.selectContent.exec(content)) !== null) {
    const selectContent = match[1];
    
    // Make sure each platform key has a comment
    if (selectContent.includes('ios') && 
        !selectContent.includes('// iOS') && 
        !selectContent.includes('/* iOS') &&
        !selectContent.includes('* iOS')) {
      return false;
    }
    
    if (selectContent.includes('android') && 
        !selectContent.includes('// Android') && 
        !selectContent.includes('/* Android') &&
        !selectContent.includes('* Android')) {
      return false;
    }
  }
  
  return true;
}

// Validate platform-specific code
function validatePlatformCode() {
  const files = findReactNativeFiles();
  let errorCount = 0;
  
  console.log(chalk.blue(`Found ${files.length} React Native files to validate`));
  
  // Check each file
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const hasPlatformCode = hasPlatformSpecificCode(content);
      const hasPlatformExtension = hasPlatformSpecificExtension(file);
      
      // If the file has platform-specific code, make sure it has comments
      if (hasPlatformCode) {
        if (!hasPlatformSpecificComments(content)) {
          console.error(chalk.red(`[ERROR] ${file}: Platform-specific code without explanatory comments`));
          errorCount++;
        }
      }
      
      // If the file has platform-specific extension, make sure it has a non-platform-specific version
      if (hasPlatformExtension) {
        const baseName = file.replace(/\.(ios|android)\.(js|jsx|ts|tsx)$/, '');
        const extension = path.extname(file).replace(/\.ios|\.android/, '');
        const otherPlatform = file.includes('.ios.') ? 'android' : 'ios';
        const otherPlatformFile = `${baseName}.${otherPlatform}${extension}`;
        const baseFile = `${baseName}${extension}`;
        
        // Check if either the other platform file or the base file exists
        if (!fs.existsSync(otherPlatformFile) && !fs.existsSync(baseFile)) {
          console.error(chalk.red(`[ERROR] ${file}: Platform-specific file without counterpart`));
          errorCount++;
        }
      }
      
    } catch (error) {
      console.error(chalk.red(`[ERROR] Could not read file ${file}: ${error.message}`));
      errorCount++;
    }
  });
  
  if (errorCount === 0) {
    console.log(chalk.green('✓ All platform-specific code is properly documented'));
    return true;
  } else {
    console.error(chalk.red(`✗ Found ${errorCount} platform-specific code issues`));
    return false;
  }
}

// Run the validation if executed directly
if (require.main === module) {
  const success = validatePlatformCode();
  process.exit(success ? 0 : 1);
}

module.exports = validatePlatformCode; 