import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Payments() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-4 border-b border-gray-200">
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-xl font-semibold">Payments</Text>
          <Text className="text-gray-500 text-sm">Today is {today}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-2xl font-bold">Hello Thusitha,</Text>
          <Text className="text-gray-500">Welcome</Text>
        </View>

        {/* Day Summary */}
        <View className="px-5 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Day Summary</Text>
            <View className="flex-row">
              <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg mr-2">
                <Text className="text-gray-600">📄 Print</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                <Text className="text-gray-600">↗️ Share</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-gray-500 mb-4">Today id - {today.replace(/\//g, '/')}</Text>

          {/* Stats Grid */}
          <View className="flex-row flex-wrap -mx-1">
            <View className="w-1/2 px-1 mb-2">
              <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Text className="text-gray-500 text-sm">Clients reached</Text>
                <Text className="text-4xl font-bold mt-2">05</Text>
                <Text className="text-gray-400 text-xs mt-1">Total Clients - 456</Text>
              </View>
            </View>

            <View className="w-1/2 px-1 mb-2">
              <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Text className="text-gray-500 text-sm">On going cases</Text>
                <Text className="text-4xl font-bold mt-2">05</Text>
              </View>
            </View>

            <View className="w-1/2 px-1 mb-2">
              <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Text className="text-gray-500 text-sm">Closed cases</Text>
                <Text className="text-4xl font-bold mt-2">05</Text>
                <Text className="text-gray-400 text-xs mt-1">Remaining - 6</Text>
              </View>
            </View>

            <View className="w-1/2 px-1 mb-2">
              <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Text className="text-gray-500 text-sm">Income</Text>
                <Text className="text-4xl font-bold mt-2">65655</Text>
                <Text className="text-gray-400 text-xs mt-1">Total for month - 678966</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Clients reached */}
        <View className="px-5 mt-6">
          <Text className="text-xl font-bold mb-3">Clients reached</Text>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Kamal - 0713424333</Text>
            <Text className="text-gray-500 text-sm">Galle</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Kamal - 0784433661</Text>
            <Text className="text-gray-500 text-sm">Galle</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Kamal - 0784433545</Text>
          </View>
        </View>

        {/* New Cases */}
        <View className="px-5 mt-6">
          <Text className="text-xl font-bold mb-3">New Cases</Text>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Galle</Text>
            <Text className="text-gray-500 text-sm">Kamal - 0713424333</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Galle</Text>
            <Text className="text-gray-500 text-sm">Kamal - 0784433661</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Galle</Text>
            <Text className="text-gray-500 text-sm">Kamal - 0784433545</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Galle</Text>
            <Text className="text-gray-500 text-sm">Kamal - 0713424333</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Galle</Text>
            <Text className="text-gray-500 text-sm">Kamal - 0784433661</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold">Galle</Text>
            <Text className="text-gray-500 text-sm">Kamal - 0784433545</Text>
          </View>
        </View>

        {/* Unread Messages */}
        <View className="px-5 mt-6 mb-8">
          <Text className="text-xl font-bold mb-3">Unread Message</Text>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Location: <Text className="font-semibold text-black">Galle</Text></Text>
              <Text className="text-gray-500">Client: <Text className="font-semibold text-black">Kumara</Text></Text>
            </View>
            <Text className="text-gray-500">Description:</Text>
            <Text className="text-gray-600">hjdsjajk jdhrafkj ksfdafjk jkasdfsfd fsdajkfdsak</Text>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Location: <Text className="font-semibold text-black">Galle</Text></Text>
              <Text className="text-gray-500">Client: <Text className="font-semibold text-black">Kumara</Text></Text>
            </View>
            <Text className="text-gray-500">Description:</Text>
            <Text className="text-gray-600">hjdsjajk jdhrafkj ksfdafjk jkasdfsfd fsdajkfdsak</Text>
          </View>

          <TouchableOpacity className="bg-gray-900 rounded-xl p-4 items-center">
            <Text className="text-white font-semibold">View All Messages</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
