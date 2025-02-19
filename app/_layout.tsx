import { Stack } from 'expo-router';
import { MD3LightTheme as DefaultTheme, PaperProvider, useTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#005abb",
    primaryOpacity1: "rgba(0, 90, 187, 0.1)",
    red: "#fd0103",
    red1: "#fc8888",
    red2: "#fc7474",
    red3: "rgb(252, 179, 179)",
    surfaceVariant: "#d7effb",
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: "#f2f6fc",
      level2: "#ebf2fa",
      level3: "#e3edf8",
      level4: "#e0ebf7",
      level5: "#dbe8f6",
    }
  },
  spacing: {
    m_05: 5,
    m_1: 10,
    m_2: 20,
    p_05: 5,
    p_1: 10,
    p_2: 20,
  }
};
export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
        <Stack.Screen name="registerPatient" options={{ title: 'Add Patient' }} />
        <Stack.Screen name="patientListing" options={{ title: 'Patient Listing' }} />
      </Stack>
    </PaperProvider>
  );
}