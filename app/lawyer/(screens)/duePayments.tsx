import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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

export default function DuePayments() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

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
      {/* Header with back button */}
      <View className="flex-row items-center px-4 pt-14 pb-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="pr-4">
          <Ionicons name="arrow-back" size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold flex-1 text-center pr-8">
          Due Payments
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Summary Card - Updated with gradient background and more prominent styling */}
        <View className="mx-4 my-4">
          <LinearGradient
            colors={["#4B5563", "#1F2937"]} // These are tailwind's gray-600 and gray-900
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-3xl p-6"
          >
            <Text className="text-white text-lg text-center mb-2">
              Total Outstanding
            </Text>
            <Text className="text-white text-5xl font-bold text-center">
              ${totalOutstanding}
            </Text>
            <Text className="text-white text-center mt-4 opacity-80">
              {overdueCount} payments overdue • {dueSoonCount} due soon
            </Text>
          </LinearGradient>
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
        <View className="px-4">
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
                  <Text className="text-gray-500">Due: {payment.dueDate}</Text>

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
      </ScrollView>
    </View>
  );
}
