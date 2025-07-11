import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "@/constants/fonts";
import Header from "@/app/components/Header";

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

  const totalIncome = paidCustomers.reduce((sum, customer) => sum + (customer.amount || 0), 0);

  const handleBackPress = () => {
    router.back();
  };

  const handleMenuPress = () => {
    console.log("Menu pressed");
  };

  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  const handlePaymentsPress = () => {
    router.push("/lawyer/(tabs)/payments" as any);
  };

  const handleMeetingsPress = () => {
    router.push("/lawyer/(tabs)/calendar" as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111827" }}>
      {/* Header */}
      <Header
        title=""
        showMenu={true}
        showNotification={true}
        showNotificationBadge={true}
        onMenuPress={handleMenuPress}
        onNotificationPress={handleNotificationPress}
        onPaymentsPress={handlePaymentsPress}
        onMeetingsPress={handleMeetingsPress}
        backgroundColor="#111827"
        textColor="#ffffff"
        iconColor="#ffffff"
        borderColor="#111827"
      />
      
      {/* Back Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 20,
          top: 60,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 20,
          padding: 8,
          zIndex: 10,
        }}
        onPress={handleBackPress}
      >
        <Ionicons name="arrow-back" size={20} color="#ffffff" />
      </TouchableOpacity>

      {/* Main Content with Layered Background */}
      <View style={{ flex: 1, backgroundColor: "#111827" }}>
        {/* Welcome Message Section */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 4,
              fontFamily: fonts.semiBold,
            }}
          >
            Hello Thusitha, Welcome!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#FF8800",
              marginBottom: 12,
              fontWeight: "500",
              fontFamily: fonts.medium,
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* White Rounded Overlay Container with Gradient */}
        <LinearGradient
          colors={["#fff3e0", "#f9fafb", "#f9fafb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.1 }}
          style={{
            flex: 1,
            marginTop: 40,
            borderTopLeftRadius: 100,
            paddingTop: 40,
          }}
        >
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {/* Spacer for better layout */}
            <View style={{ height: 20 }} />

            {/* Incomes Section */}
            <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#111827",
              marginBottom: 20,
              fontFamily: fonts.semiBold,
            }}
          >
            Incomes
          </Text>

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
              }}
            >
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue: string) => setSelectedYear(itemValue)}
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
              }}
            >
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue: string) => setSelectedMonth(itemValue)}
                style={{ height: 50 }}
              >
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month) => (
                  <Picker.Item key={month} label={month} value={month} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#111827",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
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
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 16,
                fontFamily: fonts.semiBold,
              }}
            >
              Daily Income for {selectedMonth} {selectedYear.slice(2)}
            </Text>

            <LineChart
              data={chartData}
              width={width - 80}
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

          {/* Paid Customers Section */}
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 16,
                fontFamily: fonts.semiBold,
              }}
            >
              Paid Customers
            </Text>

            {paidCustomers.map((customer) => (
              <View
                key={customer.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#F3F4F6",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#374151",
                    fontFamily: fonts.regular,
                  }}
                >
                  {customer.date} - {customer.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#059669",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  ${customer.amount}
                </Text>
              </View>
            ))}
          </View>

          {/* Unpaid Customers Section */}
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 16,
                fontFamily: fonts.semiBold,
              }}
            >
              Unpaid Customers
            </Text>

            {unpaidCustomers.map((customer, index) => (
              <View
                key={customer.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: index < unpaidCustomers.length - 1 ? 1 : 0,
                  borderBottomColor: "#F3F4F6",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: index === 2 ? "#EF4444" : "#374151", // Highlight one in red like the image
                    fontFamily: fonts.regular,
                  }}
                >
                  {customer.date} - {customer.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Total Income Section */}
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 40,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
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
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#111827",
                  fontFamily: fonts.semiBold,
                }}
              >
                Total Income for {selectedMonth} {selectedYear.slice(2)}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#111827",
                  fontFamily: fonts.bold,
                }}
              >
                ${totalIncome.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
}
