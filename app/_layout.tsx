import { Stack } from "expo-router";
import './globals.css';

// this page is for groups

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
