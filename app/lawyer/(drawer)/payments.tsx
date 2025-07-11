import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Payments() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-4 bg-gray-50">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Due Payments</Text>
        <View className="flex-row">
          <TouchableOpacity className="mr-3">
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-800">Hello Nishagi Jewantha, Welcome</Text>
          <Text className="text-gray-500 mt-1">Today is 07/08/2025</Text>
        </View>

        {/* Due Payments Header */}
        <View className="px-5 mb-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-black">Due Payments</Text>
            <View className="flex-row">
              <TouchableOpacity className="bg-white border border-gray-300 px-4 py-2 rounded-lg mr-2">
                <Text className="text-gray-700">Export</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border border-gray-300 px-4 py-2 rounded-lg">
                <Text className="text-gray-700">Print</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Cards */}
          {/* Anura De Mel */}
          <View className="bg-gray-200 rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-xl font-bold text-black">Anura De Mel</Text>
                <Text className="text-gray-600">Due: 07/31/2025</Text>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold text-black">$2,500.00</Text>
                <View className="bg-green-200 px-3 py-1 rounded-full mt-2">
                  <Text className="text-green-700 text-sm font-medium">Outstanding</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="bg-black rounded-lg py-3 px-6 self-end">
              <Text className="text-white font-semibold">Mark Paid</Text>
            </TouchableOpacity>
          </View>

          {/* S. Fernando */}
          <View className="bg-gray-200 rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-xl font-bold text-black">S. Fernando</Text>
                <Text className="text-gray-600">Due: 08/12/2025</Text>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold text-black">$3,500.00</Text>
                <View className="bg-red-200 px-3 py-1 rounded-full mt-2">
                  <Text className="text-red-700 text-sm font-medium">Overdue</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="bg-black rounded-lg py-3 px-6 self-end">
              <Text className="text-white font-semibold">Mark Paid</Text>
            </TouchableOpacity>
          </View>

          {/* Kamal J. */}
          <View className="bg-gray-200 rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-xl font-bold text-black">Kamal J.</Text>
                <Text className="text-gray-600">Due: 07/21/2025</Text>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold text-black">$2,180.00</Text>
                <View className="bg-green-200 px-3 py-1 rounded-full mt-2">
                  <Text className="text-green-700 text-sm font-medium">Outstanding</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="bg-black rounded-lg py-3 px-6 self-end">
              <Text className="text-white font-semibold">Mark Paid</Text>
            </TouchableOpacity>
          </View>

          {/* Ruwan Perera */}
          <View className="bg-gray-200 rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-xl font-bold text-black">Ruwan Perera</Text>
                <Text className="text-gray-600">Due: 08/01/2025</Text>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold text-black">$1,150.00</Text>
                <View className="bg-red-200 px-3 py-1 rounded-full mt-2">
                  <Text className="text-red-700 text-sm font-medium">Overdue</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="bg-black rounded-lg py-3 px-6 self-end">
              <Text className="text-white font-semibold">Mark Paid</Text>
            </TouchableOpacity>
          </View>

          {/* Total Due Payments */}
          <View className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold text-black">Total Due Payments</Text>
              <Text className="text-3xl font-bold text-black">$9,330.00</Text>
            </View>
          </View>
        </View>

        {/* Create New Payment Button */}
        <View className="px-5 mb-8">
          <TouchableOpacity className="bg-black rounded-xl py-4 items-center">
            <Text className="text-white text-lg font-semibold">Create New Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
