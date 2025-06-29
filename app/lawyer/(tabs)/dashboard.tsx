import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Dashboard() {
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
          <Text className="text-xl font-semibold">Dashboard</Text>
          <Text className="text-gray-500 text-sm">Today is: {today}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-2xl font-bold">Hello Thusitha, Welcome</Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row flex-wrap px-4">
          <View className="w-1/2 p-1">
            <TouchableOpacity
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              onPress={() => router.push("/lawyer/(screens)/duePayments")}
            >
              <View className="bg-blue-500 w-10 h-10 rounded-lg items-center justify-center mb-3">
                <Ionicons name="cash-outline" size={20} color="white" />
              </View>
              <Text className="text-gray-500">Due Payments</Text>
              <Text className="text-2xl font-bold mt-1">$2,500</Text>
            </TouchableOpacity>
          </View>

          <View className="w-1/2 p-1">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <View className="bg-green-500 w-10 h-10 rounded-lg items-center justify-center mb-3">
                <Ionicons name="time-outline" size={20} color="white" />
              </View>
              <Text className="text-gray-500">Timeline</Text>
              <Text className="text-2xl font-bold mt-1">12 Items</Text>
            </View>
          </View>

          <View className="w-1/2 p-1">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <View className="bg-purple-500 w-10 h-10 rounded-lg items-center justify-center mb-3">
                <Ionicons name="trending-up-outline" size={20} color="white" />
              </View>
              <Text className="text-gray-500">Incomes</Text>
              <Text className="text-2xl font-bold mt-1">$8,750</Text>
            </View>
          </View>

          <View className="w-1/2 p-1">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <View className="bg-red-500 w-10 h-10 rounded-lg items-center justify-center mb-3">
                <Ionicons name="calendar-outline" size={20} color="white" />
              </View>
              <Text className="text-gray-500">Day Summary</Text>
              <Text className="text-2xl font-bold mt-1">5 Activities</Text>
            </View>
          </View>
        </View>

        {/* Hearings Section */}
        <View className="px-5 mt-6">
          <Text className="text-xl font-bold mb-3">
            Hearings to attend today
          </Text>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">
                  Case # 103464 - H.M.S.J Dewasiritha
                </Text>
                <Text className="text-gray-500 text-sm">High Court</Text>
              </View>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-600 text-xs font-medium">
                  In-progress
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">
                  Case # 103465 - Sahan Perera
                </Text>
                <Text className="text-gray-500 text-sm">Magistrate Court</Text>
              </View>
              <View className="bg-purple-100 px-3 py-1 rounded-full">
                <Text className="text-purple-600 text-xs font-medium">
                  Upfront
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">
                  Case # 103465 - Kamala Silva
                </Text>
                <Text className="text-gray-500 text-sm">District Court</Text>
              </View>
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <Text className="text-orange-600 text-xs font-medium">
                  Delayed
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Monthly Income */}
        <View className="px-5 mt-6">
          <Text className="text-xl font-bold mb-3">Monthly Income</Text>
          <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 items-center">
            <Text className="text-3xl font-bold">$7,500</Text>
          </View>
        </View>

        {/* Meeting Requests */}
        <View className="px-5 mt-6">
          <Text className="text-xl font-bold mb-3">Meeting Requests</Text>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">H.M.N.L Dewasiritha</Text>
                <Text className="text-gray-500 text-sm">
                  2023-08-10 · Sunday
                </Text>
              </View>
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <Text className="text-orange-600 text-xs font-medium">
                  Pending
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">Nimal Bandara</Text>
                <Text className="text-gray-500 text-sm">
                  2023-08-12 · Tuesday | Case # 203247
                </Text>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-600 text-xs font-medium">
                  Confirmed
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl mb-3 p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">Priya Fernando</Text>
                <Text className="text-gray-500 text-sm">
                  2023-08-16 · Wednesday
                </Text>
              </View>
              <View className="bg-red-100 px-3 py-1 rounded-full">
                <Text className="text-red-600 text-xs font-medium">
                  Rescheduled
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Analytics */}
        <View className="px-5 mt-6 mb-8">
          <Text className="text-xl font-bold mb-3">Overall Analytics</Text>
          <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 items-center">
            <Text className="text-gray-400">Overall Analytics Chart</Text>
            {/* You can add a chart component here */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
