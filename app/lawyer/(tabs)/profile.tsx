import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 p-4 bg-white">
      <View className="items-center mt-12 mb-8">
        <Text className="text-3xl font-bold">Profile</Text>
      </View>

      {/* Profile information can go here */}
      <View className="px-4 py-6">
        <Text className="text-lg font-medium mb-2">John Doe</Text>
        <Text className="text-gray-500">john.doe@example.com</Text>
        <Text className="text-gray-500 mt-1">Attorney at Law</Text>
      </View>

      {/* Placeholder for more profile content */}
      <View className="border-t border-gray-200 my-4" />

      {/* Simple logout button at the bottom */}
      <View className="mt-auto mb-6">
        <TouchableOpacity
          onPress={() => router.replace("/auth/login")}
          className="bg-red-500 rounded-lg py-4 items-center mx-4"
        >
          <Text className="text-white font-semibold text-base">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
