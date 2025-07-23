import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "@/constants/fonts";
import SimpleHeader from "@/app/components/SimpleHeader";

const { width } = Dimensions.get("window");

interface Customer {
  id: string;
  date: string;
  name: string;
  amount?: number;
}

export default function Incomes() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("July");

  // Sample data for the chart
  const chartData = {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    datasets: [
      {
        data: [85, 15, 25, 35, 20, 15, 10, 15, 25, 45, 85, 95],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  // Sample customer data
  const paidCustomers: Customer[] = [
    { id: "1", date: "2025-05-01", name: "MR Kumara", amount: 150 },
    { id: "2", date: "2025-05-02", name: "MR Kumara", amount: 200 },
    { id: "3", date: "2025-05-03", name: "Mr Edirimuni", amount: 300 },
    { id: "4", date: "2025-05-04", name: "MR Kumara", amount: 175 },
    { id: "5", date: "2025-05-05", name: "Mr Lathmuni", amount: 250 },
    { id: "6", date: "2025-05-06", name: "MR Kumara", amount: 180 },
  ];

  const unpaidCustomers: Customer[] = [
    { id: "7", date: "2025-05-01", name: "MR Kumara" },
    { id: "8", date: "2025-05-02", name: "MR Kumara" },
    { id: "9", date: "2025-05-03", name: "Mr Edirimuni" },
    { id: "10", date: "2025-05-04", name: "Mr Kumagg" },
    { id: "11", date: "2025-05-05", name: "Mr Kumara" },
    { id: "12", date: "2025-05-06", name: "Mr Lathmuni" },
  ];

  const totalIncome = paidCustomers.reduce(
    (sum, customer) => sum + (customer.amount || 0),
    0
  );

  const handleBackPress = () => {
    router.back();
  };

  // Responsive design calculations (like day summary)
  const screenWidth = Dimensions.get("window").width;
  const isSmallScreen = screenWidth < 375;
  const isMediumScreen = screenWidth >= 375 && screenWidth < 414;

  const cardPadding = isSmallScreen ? 16 : isMediumScreen ? 20 : 24;
  const horizontalPadding = isSmallScreen ? 20 : isMediumScreen ? 24 : 32;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <SimpleHeader title="Incomes" />

      {/* Main Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* Hero Section */}
        {/* Incomes Section */}
        <View
          style={{ paddingHorizontal: horizontalPadding, marginBottom: 32 }}
        >
         

          {/* Year and Month Selection */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 8,
                marginRight: 12,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                flex: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue: string) =>
                  setSelectedYear(itemValue)
                }
                style={{ height: 50 }}
              >
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
              </Picker>
            </View>

            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 8,
                marginRight: 12,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                flex: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue: string) =>
                  setSelectedMonth(itemValue)
                }
                style={{ height: 50 }}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <Picker.Item key={month} label={month} value={month} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#000000",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: 16,
                  fontFamily: fonts.semiBold,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chart Section */}
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: isSmallScreen ? 12 : 16,
              padding: cardPadding,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: isSmallScreen ? 16 : 18,
                fontFamily: fonts.bold,
                color: "#000000",
                marginBottom: 16,
              }}
            >
              Daily Income for {selectedMonth} {selectedYear}
            </Text>

            <LineChart
              data={chartData}
              width={width - horizontalPadding * 2 - cardPadding * 2}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#3B82F6",
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          </View>
        </View>

        {/* Paid Customers Section */}
        <View
          style={{ paddingHorizontal: horizontalPadding, marginBottom: 32 }}
        >
          <Text
            style={{
              fontSize: isSmallScreen ? 16 : 18,
              fontFamily: fonts.bold,
              color: "#000000",
              marginBottom: 16,
            }}
          >
            Paid Customers
          </Text>

          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: isSmallScreen ? 12 : 16,
              padding: cardPadding,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {paidCustomers.map((customer, index) => (
              <View
                key={customer.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: index < paidCustomers.length - 1 ? 1 : 0,
                  borderBottomColor: "#F3F4F6",
                }}
              >
                <Text
                  style={{
                    fontSize: isSmallScreen ? 13 : 14,
                    color: "#374151",
                    fontFamily: fonts.regular,
                  }}
                >
                  {customer.date} - {customer.name}
                </Text>
                <Text
                  style={{
                    fontSize: isSmallScreen ? 13 : 14,
                    fontFamily: fonts.semiBold,
                    color: "#059669",
                  }}
                >
                  ${customer.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Unpaid Customers Section */}
        <View
          style={{ paddingHorizontal: horizontalPadding, marginBottom: 32 }}
        >
          <Text
            style={{
              fontSize: isSmallScreen ? 16 : 18,
              fontFamily: fonts.bold,
              color: "#000000",
              marginBottom: 16,
            }}
          >
            Unpaid Customers
          </Text>

          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: isSmallScreen ? 12 : 16,
              padding: cardPadding,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {unpaidCustomers.map((customer, index) => (
              <View
                key={customer.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: index < unpaidCustomers.length - 1 ? 1 : 0,
                  borderBottomColor: "#F3F4F6",
                }}
              >
                <Ionicons
                  name="person-circle"
                  size={24}
                  color="#6B7280"
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={{
                    fontSize: isSmallScreen ? 13 : 14,
                    color: index === 2 ? "#EF4444" : "#374151",
                    fontFamily: fonts.regular,
                    flex: 1,
                  }}
                >
                  {customer.date} - {customer.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Total Income Section */}
        <View
          style={{ paddingHorizontal: horizontalPadding, marginBottom: 40 }}
        >
          <Text
            style={{
              fontSize: isSmallScreen ? 16 : 18,
              fontFamily: fonts.bold,
              color: "#000000",
              marginBottom: 16,
            }}
          >
            Total Income Summary
          </Text>

          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: isSmallScreen ? 12 : 16,
              padding: cardPadding,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: isSmallScreen ? 16 : 18,
                  fontFamily: fonts.semiBold,
                  color: "#000000",
                }}
              >
                Total Income for {selectedMonth} {selectedYear.slice(2)}
              </Text>
              <Text
                style={{
                  fontSize: isSmallScreen ? 20 : 24,
                  fontFamily: fonts.bold,
                  color: "#10B981",
                }}
              >
                ${totalIncome.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
