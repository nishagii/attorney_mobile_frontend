import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual registration logic
      // await authService.register(firstName, lastName, email, phone, password);

      // Navigate to login or directly to the app
      router.replace("/auth/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Implement Google Sign-Up logic here
      // await authService.googleSignUp();
      // router.replace('/(tabs)');
    } catch (error) {
      console.error("Google sign-up failed:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <StatusBar style="dark" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="items-center mt-16">
            <Image
              source={require("../../assets/images/black_logo.png")}
              className="h-16 w-64 mt-20 mb-8"
              resizeMode="contain"
            />
          </View>

          <View className="px-8 pt-2 pb-10">
            <Text className="text-xl font-semibold mb-4">
              Sign up to your account
            </Text>

            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <TextInput
                  className="bg-gray-100 rounded-lg p-4 text-base"
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>
              <View className="flex-1">
                <TextInput
                  className="bg-gray-100 rounded-lg p-4 text-base"
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View className="mb-4">
              <TextInput
                className="bg-gray-100 rounded-lg p-4 text-base"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <TextInput
                className="bg-gray-100 rounded-lg p-4 text-base"
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View className="mb-4">
              <TextInput
                className="bg-gray-100 rounded-lg p-4 text-base"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <TextInput
                className="bg-gray-100 rounded-lg p-4 text-base"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              className="bg-black rounded-lg py-4 items-center"
              onPress={handleSignup}
              disabled={loading}
            >
              <Text className="text-white font-semibold text-lg">
                {loading ? "Creating Account..." : "Sign up"}
              </Text>
            </TouchableOpacity>

            <View className="items-center my-6">
              <Text className="text-gray-600 text-base">Or sign up with</Text>
            </View>

            <TouchableOpacity
              className="items-center justify-center"
              onPress={handleGoogleSignUp}
            >
              <Image
                source={require("../../assets/icons/google_logo.png")}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-700 text-base">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text className="text-indigo-500 font-semibold text-base">
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
