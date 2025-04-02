import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @description Screen component for displaying and managing user prescriptions.
 * Currently a placeholder.
 * @returns {React.ReactElement} The rendered Prescriptions screen.
 */
const PrescriptionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescriptions Screen</Text>
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

export default PrescriptionsScreen;
