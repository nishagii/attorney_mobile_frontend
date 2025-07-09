import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { fonts } from "@/constants/fonts";
import Header from "@/app/components/Header";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState("2025-06-21");
  const [currentMonth, setCurrentMonth] = useState("2025-06");

  const handlePaymentsPress = () => {
    router.push("/lawyer/(screens)/payments");
  };

  const handleMeetingsPress = () => {
    router.push("/lawyer/(tabs)/calendar");
  };

  // Sample time slots data for different dates
  const getTimeSlotsForDate = (date: string) => {
    const sampleData: {
      [key: string]: {
        time: string;
        status: "available" | "booked";
        details?: string;
      }[];
    } = {
      "2025-06-21": [
        {
          time: "11:00 AM - 12:00 PM",
          status: "booked",
          details: "Badulla District Court (10:00 AM - 11:00 AM)",
        },
        { time: "2:00 PM - 3:00 PM", status: "available" },
        { time: "4:00 PM - 5:00 PM", status: "available" },
      ],
      "2025-06-25": [
        { time: "9:00 AM - 10:00 AM", status: "available" },
        { time: "11:00 AM - 12:00 PM", status: "available" },
        {
          time: "2:00 PM - 3:00 PM",
          status: "booked",
          details: "Client Meeting - John Doe",
        },
        { time: "4:00 PM - 5:00 PM", status: "available" },
      ],
      "2025-06-28": [
        { time: "10:00 AM - 11:00 AM", status: "available" },
        { time: "1:00 PM - 2:00 PM", status: "available" },
        {
          time: "3:00 PM - 4:00 PM",
          status: "booked",
          details: "Supreme Court Hearing",
        },
      ],
    };

    return (
      sampleData[date] || [
        { time: "9:00 AM - 10:00 AM", status: "available" },
        { time: "11:00 AM - 12:00 PM", status: "available" },
        { time: "2:00 PM - 3:00 PM", status: "available" },
        { time: "4:00 PM - 5:00 PM", status: "available" },
      ]
    );
  };

  const timeSlots = getTimeSlotsForDate(selectedDate);

  // Format the selected date for display
  const formatSelectedDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
    const year = d.getFullYear();
    return `${day}${suffix} of ${dayName}, ${year}`;
  };

  // Marked dates for the calendar - update based on available slots
  const getMarkedDates = () => {
    const dates: { [key: string]: any } = {};

    // Mark the selected date
    dates[selectedDate] = { selected: true, selectedColor: "#FFA500" };

    // Mark dates with time slots
    ["2025-06-25", "2025-06-28"].forEach((date) => {
      if (date !== selectedDate) {
        dates[date] = { marked: true, dotColor: "#FFA500" };
      }
    });

    return dates;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <Header
        title="Case Calendar"
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

      <ScrollView style={{ flex: 1 }}>
        {/* Selected Date Section */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 16,
            padding: 24,
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
            {formatSelectedDate(selectedDate)}
          </Text>

          {/* Add Hearing Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#111827",
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "500",
                fontFamily: fonts.medium,
              }}
            >
              + Add Hearing
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Section */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            marginTop: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            overflow: "hidden",
          }}
        >
          <Calendar
            current={currentMonth}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            onMonthChange={(month) => {
              setCurrentMonth(month.dateString.substring(0, 7));
            }}
            markedDates={getMarkedDates()}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#6b7280",
              selectedDayBackgroundColor: "#FF8800",
              selectedDayTextColor: "#ffffff",
              dayTextColor: "#111827",
              textDisabledColor: "#d1d5db",
              dotColor: "#FF8800",
              selectedDotColor: "#ffffff",
              arrowColor: "#6b7280",
              disabledArrowColor: "#d1d5db",
              monthTextColor: "#111827",
              indicatorColor: "#FF8800",
              textDayFontFamily: fonts.medium,
              textMonthFontFamily: fonts.semiBold,
              textDayHeaderFontFamily: fonts.medium,
              textDayFontWeight: "500",
              textMonthFontWeight: "600",
              textDayHeaderFontWeight: "500",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            style={{
              paddingBottom: 16,
            }}
          />
        </View>

        {/* Time Slots Section */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            marginTop: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#f3f4f6",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                fontFamily: fonts.semiBold,
              }}
            >
              Time Slots for {formatSelectedDate(selectedDate).split(" of ")[0]}
            </Text>
          </View>

          {/* Time Slots List */}
          <View style={{ padding: 20 }}>
            {timeSlots.map((slot, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  borderBottomWidth: index < timeSlots.length - 1 ? 1 : 0,
                  borderBottomColor: "#f3f4f6",
                }}
              >
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor:
                      slot.status === "available" ? "#10b981" : "#ef4444",
                    marginRight: 16,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#111827",
                      marginBottom: 4,
                      fontFamily: fonts.medium,
                    }}
                  >
                    {slot.time}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        slot.status === "available" ? "#10b981" : "#ef4444",
                      fontFamily: fonts.regular,
                    }}
                  >
                    {slot.status === "available" ? "Available" : slot.details}
                  </Text>
                </View>
                {slot.status === "available" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#111827",
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 14,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      Book
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* Empty state when no slots */}
            {timeSlots.length === 0 && (
              <View style={{ alignItems: "center", paddingVertical: 32 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#6b7280",
                    textAlign: "center",
                    fontFamily: fonts.regular,
                  }}
                >
                  No time slots available for this date
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
