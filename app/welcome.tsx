import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function WelcomeScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    // Fade in and slightly zoom animation
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // After 3 seconds, navigate to the login screen
    const timer = setTimeout(() => {
      // Fade out before navigating
      opacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.in(Easing.ease),
      });
      scale.value = withTiming(1.05, {
        duration: 500,
        easing: Easing.in(Easing.ease),
      });

      // Wait for animation to complete before navigating
      setTimeout(() => {
        router.replace("/lawyer/(tabs)/dashboard");
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <StatusBar style="dark" />

      <Animated.View
        className="items-center justify-center"
        style={animatedStyle}
      >
        {/* Large logo */}
        <Image
          source={require("../assets/images/black_logo.png")}
          className="h-32 w-80"
          resizeMode="contain"
        />

        {/* App tagline */}
        <Text className="text-lg text-gray-700 font-medium mt-2">
          Legal expertise at your fingertips
        </Text>
      </Animated.View>
    </View>
  );
}
