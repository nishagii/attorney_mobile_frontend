import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "@/constants/fonts";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState("2025-06-21");
  const [currentMonth, setCurrentMonth] = useState("2025-06");

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
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4 pt-6">
        {/* Header with selected date */}
        <Text
          className="text-2xl text-gray-800 mb-6"
          style={{ fontFamily: fonts.semiBold }}
        >
          {formatSelectedDate(selectedDate)}
        </Text>

        {/* Add Hearing Button */}
        <TouchableOpacity className="bg-black rounded-xl py-4 mb-6">
          <Text
            className="text-white text-center text-lg"
            style={{ fontFamily: fonts.medium }}
          >
            + Add Hearing
          </Text>
        </TouchableOpacity>

        {/* Calendar */}
        <View className="mb-8">
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
              textSectionTitleColor: "#666666",
              selectedDayBackgroundColor: "#FFA500",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#FFA500",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#FFA500",
              selectedDotColor: "#ffffff",
              arrowColor: "#666666",
              disabledArrowColor: "#d9e1e8",
              monthTextColor: "#2d4150",
              indicatorColor: "#FFA500",
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
              borderRadius: 12,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          />
        </View>

        {/* Dynamic Time Slots Section */}
        <View className="mb-6">
          <Text
            className="text-xl text-gray-800 mb-4"
            style={{ fontFamily: fonts.semiBold }}
          >
            Time Slots for {formatSelectedDate(selectedDate).split(" of ")[0]}
          </Text>

          {/* Time Slots */}
          <View className="space-y-4">
            {timeSlots.map((slot, index) => (
              <View key={index} className="flex-row items-center mb-4">
                <View
                  className={`w-3 h-3 rounded-full mr-4 ${
                    slot.status === "available" ? "bg-green-400" : "bg-red-400"
                  }`}
                ></View>
                <View className="flex-1">
                  <Text
                    className="text-lg text-gray-800"
                    style={{ fontFamily: fonts.semiBold }}
                  >
                    {slot.time}
                  </Text>
                  <Text
                    className={`text-sm ${
                      slot.status === "available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                    style={{ fontFamily: fonts.regular }}
                  >
                    {slot.status === "available" ? "Available" : slot.details}
                  </Text>
                </View>
                {slot.status === "available" && (
                  <TouchableOpacity className="bg-blue-500 rounded-lg px-4 py-2">
                    <Text
                      className="text-white text-sm"
                      style={{ fontFamily: fonts.medium }}
                    >
                      Book
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {/* Empty state when no slots */}
          {timeSlots.length === 0 && (
            <View className="bg-white rounded-lg p-6 items-center">
              <Text
                className="text-gray-500 text-center"
                style={{ fontFamily: fonts.regular }}
              >
                No time slots available for this date
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
