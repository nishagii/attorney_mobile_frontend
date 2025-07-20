import { fonts } from "@/constants/fonts";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/Header";
import NotificationPanel from "../(screens)/notifications";
import SimpleHeader from "@/app/components/SimpleHeader";

export default function DaySummary() {
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Responsive design calculations
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  const isSmallScreen = screenWidth < 375;
  const isMediumScreen = screenWidth >= 375 && screenWidth < 414;
  const isLargeScreen = screenWidth >= 414;
  
  const cardPadding = isSmallScreen ? 16 : isMediumScreen ? 20 : 24;
  const horizontalPadding = isSmallScreen ? 20 : isMediumScreen ? 24 : 32;

  const handleNotificationPress = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleMarkAllRead = () => {
    // Implement mark all as read logic here
    setShowNotifications(false);
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric", 
    month: "long",
    day: "numeric",
  });

  const daySummaryData = {
    clientsReached: { count: 5, total: 486 },
    ongoingCases: { count: 5 },
    closedCases: { count: 5, remaining: 6 },
    income: { today: "656SS", month: "6789SS" }
  };

  const clientsReached = [
    "Galle Kamal - 0713424333",
    "Galle Kamal - 0784433661", 
    "Galle Kamal - 0784433545"
  ];

  const newCases = [
    "Galle Kamal - 0713424333",
    "Galle Kamal - 0784433661",
    "Galle Kamal - 0784433545"
  ];

  const closedCases = [
    "Galle Kamal - 0713424333",
    "Galle Kamal - 0784433661",
    "Galle Kamal - 0784433545"
  ];

  const unreadMessages = [
    {
      id: 1,
      location: "Galle",
      client: "Kumara",
      description: "I want to request a meeting with you to discuss my case"
    },
    {
      id: 2,
      location: "Galle", 
      client: "Kumara",
      description: "how the progress of my case is going?"
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <SimpleHeader title="Days Summary" />

      {/* Main Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* Hero Section */}
        <View
          style={{
            paddingHorizontal: horizontalPadding,
            paddingTop: isSmallScreen ? 40 : 32,
            paddingBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
              backgroundColor: "#E1F1FF",
              paddingHorizontal: 16,
              borderRadius: 20,
              alignSelf: "flex-start",
            }}
          >
            <Ionicons
              name="today"
              size={16}
              color="#5E788F"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontSize: isSmallScreen ? 11 : 12,
                fontFamily: fonts.medium,
                paddingVertical: 4,
                color: "#5E788F",
              }}
            >
              {formattedDate}
            </Text>
          </View>

          <Text
            style={{
              fontSize: isSmallScreen ? 24 : 28,
              fontFamily: fonts.bold,
              color: "#000000",
              marginBottom: 8,
              textAlign: "left",
            }}
          >
            Hello Thusitha, Welcome
          </Text>

          <Text
            style={{
              fontSize: isSmallScreen ? 14 : 16,
              fontFamily: fonts.regular,
              color: "#6b7280",
              textAlign: "left",
              lineHeight: isSmallScreen ? 20 : 24,
            }}
          >
            Here's your daily overview and performance summary
          </Text>
        </View>

        {/* Day Summary Cards */}
        <View
          style={{ paddingHorizontal: horizontalPadding, marginBottom: 32 }}
        >
          <Text
            style={{
              fontSize: isSmallScreen ? 18 : 20,
              fontFamily: fonts.bold,
              color: "#000000",
              marginBottom: 20,
            }}
          >
            Day Summary
          </Text>

          {/* Summary Stats Grid */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            {/* Clients Reached */}
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 12 : 16,
                padding: cardPadding,
                width: "48%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons
                  name="people"
                  size={20}
                  color="#FF8800"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    fontSize: isSmallScreen ? 12 : 14,
                    color: "#6B7280",
                    fontFamily: fonts.medium,
                  }}
                >
                  Clients reached
                </Text>
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 28 : 32,
                  fontFamily: fonts.bold,
                  color: "#000000",
                  marginBottom: 4,
                }}
              >
                {daySummaryData.clientsReached.count
                  .toString()
                  .padStart(2, "0")}
              </Text>
              <Text
                style={{
                  fontSize: isSmallScreen ? 11 : 12,
                  color: "#6B7280",
                  fontFamily: fonts.regular,
                }}
              >
                Total Clients - {daySummaryData.clientsReached.total}
              </Text>
            </View>

            {/* Ongoing Cases */}
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 12 : 16,
                padding: cardPadding,
                width: "48%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons
                  name="briefcase"
                  size={20}
                  color="#10B981"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    fontSize: isSmallScreen ? 12 : 14,
                    color: "#6B7280",
                    fontFamily: fonts.medium,
                  }}
                >
                  Ongoing cases
                </Text>
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 28 : 32,
                  fontFamily: fonts.bold,
                  color: "#000000",
                  marginBottom: 4,
                }}
              >
                {daySummaryData.ongoingCases.count.toString().padStart(2, "0")}
              </Text>
            </View>

            {/* Closed Cases */}
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 12 : 16,
                padding: cardPadding,
                width: "48%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#3B82F6"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    fontSize: isSmallScreen ? 12 : 14,
                    color: "#6B7280",
                    fontFamily: fonts.medium,
                  }}
                >
                  Closed cases
                </Text>
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 28 : 32,
                  fontFamily: fonts.bold,
                  color: "#000000",
                  marginBottom: 4,
                }}
              >
                {daySummaryData.closedCases.count.toString().padStart(2, "0")}
              </Text>
              <Text
                style={{
                  fontSize: isSmallScreen ? 11 : 12,
                  color: "#6B7280",
                  fontFamily: fonts.regular,
                }}
              >
                Remaining - {daySummaryData.closedCases.remaining}
              </Text>
            </View>

            {/* Income */}
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 12 : 16,
                padding: cardPadding,
                width: "48%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons
                  name="cash"
                  size={20}
                  color="#F59E0B"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    fontSize: isSmallScreen ? 12 : 14,
                    color: "#6B7280",
                    fontFamily: fonts.medium,
                  }}
                >
                  Income
                </Text>
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 28 : 32,
                  fontFamily: fonts.bold,
                  color: "#10B981",
                  marginBottom: 4,
                }}
              >
                {daySummaryData.income.today}
              </Text>
              <Text
                style={{
                  fontSize: isSmallScreen ? 11 : 12,
                  color: "#6B7280",
                  fontFamily: fonts.regular,
                }}
              >
                Total for month - {daySummaryData.income.month}
              </Text>
            </View>
          </View>
        </View>

        {/* Clients Reached Section */}
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
            Clients reached
          </Text>
          {clientsReached.map((client, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 8 : 12,
                padding: cardPadding,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
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
                    color: "#000000",
                    fontFamily: fonts.medium,
                    flex: 1,
                  }}
                >
                  {client}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* New Cases Section */}
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
            New Cases
          </Text>
          {newCases.map((caseItem, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 8 : 12,
                padding: cardPadding,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="document-text"
                  size={24}
                  color="#10B981"
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={{
                    fontSize: isSmallScreen ? 13 : 14,
                    color: "#000000",
                    fontFamily: fonts.medium,
                    flex: 1,
                  }}
                >
                  {caseItem}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Closed Cases Section */}
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
            Closed Cases
          </Text>
          {closedCases.map((caseItem, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 8 : 12,
                padding: cardPadding,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#3B82F6"
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={{
                    fontSize: isSmallScreen ? 13 : 14,
                    color: "#000000",
                    fontFamily: fonts.medium,
                    flex: 1,
                  }}
                >
                  {caseItem}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Unread Messages Section */}
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
            Unread Messages
          </Text>

          {unreadMessages.map((message) => (
            <View
              key={message.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: isSmallScreen ? 8 : 12,
                padding: cardPadding,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderLeftWidth: 4,
                borderLeftColor: "#FF8800",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="location" size={16} color="#6B7280" />
                  <Text
                    style={{
                      fontSize: isSmallScreen ? 12 : 13,
                      color: "#6B7280",
                      fontFamily: fonts.medium,
                      marginLeft: 4,
                    }}
                  >
                    {message.location}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: isSmallScreen ? 13 : 14,
                    color: "#000000",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  {message.client}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 13 : 14,
                  color: "#374151",
                  fontFamily: fonts.regular,
                  lineHeight: 20,
                }}
              >
                {message.description}
              </Text>
            </View>
          ))}

          {/* View All Messages Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#000000",
              borderRadius: isSmallScreen ? 8 : 12,
              paddingVertical: isSmallScreen ? 12 : 16,
              paddingHorizontal: isSmallScreen ? 20 : 24,
              alignItems: "center",
              marginTop: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => router.push("/lawyer/(screens)/all-messages")}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: isSmallScreen ? 14 : 16,
                fontFamily: fonts.semiBold,
              }}
            >
              View All Messages
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Custom Bottom Navigation */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          paddingHorizontal: horizontalPadding,
          paddingVertical: 12,
          paddingBottom: 24,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/dashboard")}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <MaterialIcons name="dashboard" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/calendar")}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <Ionicons name="calendar" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/cases")}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <Ionicons name="briefcase" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/search")}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <Ionicons name="search" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/profile")}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <Ionicons name="person" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
