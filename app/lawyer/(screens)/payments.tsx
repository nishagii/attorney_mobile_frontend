import Header from "@/app/components/Header";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";

type PaymentStatus = "Overdue" | "Due Soon" | "Pending";
type FilterType = "All" | "Overdue" | "This Week";

interface Payment {
  id: string;
  clientName: string;
  amount: number;
  caseNumber: string;
  court: string;
  dueDate: string;
  status: PaymentStatus;
}

// Custom Tab Icon Component
const TabIcon = ({ IconComponent, iconName, focused, onPress }: {
  IconComponent: any;
  iconName: string;
  focused: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: focused ? "#FF8800" : "transparent",
        transform: [{ scale: focused ? 1.1 : 1 }],
      }}
    >
      <IconComponent
        name={iconName}
        size={24}
        color={focused ? "#ffffff" : "#6b7280"}
      />
    </TouchableOpacity>
  );
};

// Custom Bottom Tab Bar Component
const CustomBottomTabs = ({ currentRoute }: { currentRoute: string }) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderTopColor: "#f3f4f6",
        height: Platform.OS === "ios" ? 90 : 80,
        paddingBottom: Platform.OS === "ios" ? 25 : 12,
        paddingTop: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <TabIcon
        IconComponent={MaterialIcons}
        iconName="dashboard"
        focused={currentRoute === "dashboard"}
        onPress={() => router.push("/lawyer/(tabs)/dashboard")}
      />
      <TabIcon
        IconComponent={Ionicons}
        iconName="calendar"
        focused={currentRoute === "calendar"}
        onPress={() => router.push("/lawyer/(tabs)/calendar")}
      />
      <TabIcon
        IconComponent={Ionicons}
        iconName="briefcase"
        focused={currentRoute === "cases"}
        onPress={() => router.push("/lawyer/(tabs)/cases")}
      />
      <TabIcon
        IconComponent={Ionicons}
        iconName="search"
        focused={currentRoute === "search"}
        onPress={() => router.push("/lawyer/(tabs)/search")}
      />
      <TabIcon
        IconComponent={Ionicons}
        iconName="person"
        focused={currentRoute === "profile"}
        onPress={() => router.push("/lawyer/(tabs)/profile")}
      />
    </View>
  );
};

export default function Payments() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  
  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handlePaymentsPress = () => {
    router.push("/lawyer/(screens)/payments");
  };

  const handleMeetingsPress = () => {
    router.push("/lawyer/(tabs)/calendar");
  };

  // Sample data for payments
  const payments: Payment[] = [
    {
      id: "1",
      clientName: "H.M.S.J Dewasiritha",
      amount: 850,
      caseNumber: "103464",
      court: "High Court",
      dueDate: "March 15, 2023",
      status: "Overdue",
    },
    {
      id: "2",
      clientName: "Sahan Perera",
      amount: 650,
      caseNumber: "103465",
      court: "Magistrate Court",
      dueDate: "March 30, 2023",
      status: "Due Soon",
    },
    {
      id: "3",
      clientName: "Kamala Silva",
      amount: 750,
      caseNumber: "103465",
      court: "District Court",
      dueDate: "March 10, 2023",
      status: "Overdue",
    },
    {
      id: "4",
      clientName: "Nimal Bandara",
      amount: 250,
      caseNumber: "203247",
      court: "Commercial Court",
      dueDate: "April 5, 2023",
      status: "Pending",
    },
  ];

  // Filter payments based on active filter
  const filteredPayments = payments.filter((payment) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Overdue") return payment.status === "Overdue";
    if (activeFilter === "This Week") {
      // This is a simplified check - in a real app, you'd compare actual dates
      return payment.status === "Due Soon";
    }
    return true;
  });

  // Calculate totals
  const totalOutstanding = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const overdueCount = payments.filter((p) => p.status === "Overdue").length;
  const dueSoonCount = payments.filter((p) => p.status === "Due Soon").length;

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header
        title="Payments"
        showMenu={true}
        showNotification={true}
        onMenuPress={() => {
          // Handle menu press
          console.log("Menu pressed");
        }}
        onNotificationPress={() => {
          // Handle notification press
          console.log("Notification pressed");
        }}
        onPaymentsPress={handlePaymentsPress}
        onMeetingsPress={handleMeetingsPress}
      />

      {/* Date Display */}
      <View className="px-5 py-3 bg-white border-b border-gray-100">
        <Text className="text-gray-500 text-sm text-center">Today is {today}</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Summary Card - Due Payments Overview */}
        <View className="mx-4 my-4">
          <View className="rounded-3xl p-6 bg-gray-600">
            <Text className="text-white text-lg text-center mb-2">
              Total Outstanding
            </Text>
            <Text className="text-white text-5xl font-bold text-center">
              ${totalOutstanding}
            </Text>
            <Text className="text-white text-center mt-4 opacity-80">
              {overdueCount} payments overdue • {dueSoonCount} due soon
            </Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <View className="mx-4 mb-4">
          <View className="bg-gray-100 rounded-full flex-row p-1">
            <TouchableOpacity
              onPress={() => setActiveFilter("All")}
              className={`flex-1 py-3 px-4 rounded-full ${
                activeFilter === "All" ? "bg-white" : ""
              }`}
            >
              <Text
                className={`text-center ${
                  activeFilter === "All"
                    ? "text-blue-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter("Overdue")}
              className={`flex-1 py-3 px-4 rounded-full ${
                activeFilter === "Overdue" ? "bg-white" : ""
              }`}
            >
              <Text
                className={`text-center ${
                  activeFilter === "Overdue"
                    ? "text-blue-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                Overdue
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter("This Week")}
              className={`flex-1 py-3 px-4 rounded-full ${
                activeFilter === "This Week" ? "bg-white" : ""
              }`}
            >
              <Text
                className={`text-center ${
                  activeFilter === "This Week"
                    ? "text-blue-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                This Week
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment List */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold mb-4">Due Payments</Text>
          {filteredPayments.map((payment) => (
            <View
              key={payment.id}
              className="mb-4 bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              {/* Colored bar based on payment status */}
              <View
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  payment.status === "Overdue"
                    ? "bg-red-500"
                    : payment.status === "Due Soon"
                    ? "bg-orange-400"
                    : "bg-blue-500"
                }`}
              />

              <View className="pl-4 pr-4 pt-4 pb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-xl font-bold">
                    {payment.clientName}
                  </Text>
                  <Text className="text-xl font-bold">${payment.amount}</Text>
                </View>

                <Text className="text-gray-500 mb-2">
                  Case #{payment.caseNumber} - {payment.court}
                </Text>

                <View className="flex-row justify-between items-center mt-3">
                  <Text className="text-gray-500">
                    Due: {payment.dueDate}
                  </Text>

                  <View
                    className={`px-4 py-1 rounded-full ${
                      payment.status === "Overdue"
                        ? "bg-red-100"
                        : payment.status === "Due Soon"
                        ? "bg-orange-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        payment.status === "Overdue"
                          ? "text-red-600"
                          : payment.status === "Due Soon"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    >
                      {payment.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Additional Payment Overview - Day Summary */}
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

      {/* Custom Bottom Tabs - Always show on every screen */}
      <CustomBottomTabs currentRoute="payments" />
    </View>
  );
}
