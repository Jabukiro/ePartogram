import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.flexContainer}
    >
      <Link href="/login">
        Login
      </Link>
      <Link href="/register">
        Register
      </Link>
      <Link href="/registerPatient">
        Add Patient
      </Link>
      <Link href="/patientListing">
        Active Patients
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: '#007DFF',
    top: 0,
    height: 50,
    width: "100%",
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});