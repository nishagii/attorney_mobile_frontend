import { Stack } from "expo-router";
import "./globals.css";

// this page is for groups

export default function RootLayout() {
  return (
    <Stack>
      {/* Auth screens */}
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
        }}
      />

      {/* Main app tabs */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Other screens */}
      <Stack.Screen
        name="movie/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="case/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
