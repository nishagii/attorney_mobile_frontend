import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual authentication logic
      // await authService.login(email, password);

      // Navigate to the main app
      router.replace("/lawyer/(tabs)/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Implement Google Sign-In logic here
      // await authService.googleSignIn();
      // router.replace('/(app)/');
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#fff3e0", "#ffffff", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <StatusBar style="dark" />

        <View className="items-center mt-16">
          <Image
            source={require("../../assets/images/black_logo.png")}
            className="h-16 w-64 mt-20 mb-8"
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 px-8 justify-center -mt-20">
          <Text className="text-xl font-semibold mb-4">
            Login to your account
          </Text>

          <View className="mb-5">
            <TextInput
              className="bg-gray-100 rounded-lg p-4 text-base"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-6">
            <TextInput
              className="bg-gray-100 rounded-lg p-4 text-base"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            className="bg-black rounded-lg py-4 items-center"
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-lg">
              {loading ? "Signing in..." : "Sign in"}
            </Text>
          </TouchableOpacity>

          <View className="items-center my-6">
            <Text className="text-gray-600 text-base">Or sign in with</Text>
          </View>

          <TouchableOpacity
            className="items-center justify-center"
            onPress={handleGoogleSignIn}
          >
            <Image
              source={require("../../assets/icons/google_logo.png")}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-700 text-base">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text className="text-indigo-500 font-semibold text-base">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
