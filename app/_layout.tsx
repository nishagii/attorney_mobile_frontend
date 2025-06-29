import { Stack } from "expo-router";
import "./globals.css";

// this page is for groups

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="lawyer/(tabs)" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="lawyer/(screens)" />
      <Stack.Screen name="case/[id]" />
    </Stack>
  );
}
