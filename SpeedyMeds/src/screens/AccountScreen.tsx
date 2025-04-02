import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @description Screen component for displaying user account information and settings.
 * Currently a placeholder.
 * @returns {React.ReactElement} The rendered Account screen.
 */
const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
});

export default AccountScreen;
