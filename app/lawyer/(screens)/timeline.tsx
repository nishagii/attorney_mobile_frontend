import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons} from "@expo/vector-icons";
import { fonts } from "@/constants/fonts";
import Header from "@/app/components/Header";
import SimpleHeader from "@/app/components/SimpleHeader";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "completed" | "pending" | "upcoming";
}

export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [notes, setNotes] = useState("");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const years = ["2023", "2024", "2025", "2026"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Mock timeline data - this would come from your API
  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      date: "July 15, 2025",
      title: "Initial Client Consultation",
      description: "First meeting with client to discuss case details",
      status: "completed"
    },
    {
      id: "2", 
      date: "July 20, 2025",
      title: "Document Review",
      description: "Review and analyze case documents",
      status: "pending"
    },
    {
      id: "3",
      date: "July 25, 2025",
      title: "Court Filing",
      description: "Submit initial court documents",
      status: "upcoming"
    }
  ];

  const handleSubmit = () => {
    // Filter events based on selected month and year
    console.log("Filtering timeline for:", selectedMonth, selectedYear);
  };

  const handleSaveNotes = () => {
    Alert.alert("Success", "Notes saved successfully!");
  };

  const handleMenuPress = () => {
    // Handle menu action
    console.log("Menu pressed");
  };

  const handleNotificationPress = () => {
    // Handle notification action
    console.log("Notification pressed");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#22C55E";
      case "pending": 
        return "#F59E0B";
      case "upcoming":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "upcoming":
        return "calendar";
      default:
        return "calendar";
    }
  };

  const hasEventsForSelectedPeriod = timelineEvents.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: "#111827" }}>
      {/* Header */}
      <SimpleHeader title="My Timeline" />

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#f9fafb",
          paddingTop: 30,
          paddingHorizontal: 20,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Time Line Section */}
         <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.regular,
                color: "#6b7280",
                marginBottom:10
              }}
            >
            Select the Year and Month to view the full timeline
          </Text>

          {/* Year Selector */}
          <Text
            style={{
              fontSize: 16,
              color: "#111827",
              marginBottom: 8,
              fontFamily: fonts.medium,
            }}
          >
            Year:
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#E5E7EB",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => setShowYearDropdown(!showYearDropdown)}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#111827",
                fontFamily: fonts.regular,
              }}
            >
              {selectedYear}
            </Text>
            <Ionicons 
              name={showYearDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>

          {/* Year Dropdown */}
          {showYearDropdown && (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                marginBottom: 16,
                elevation: 4,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E5E7EB",
                  }}
                  onPress={() => {
                    setSelectedYear(year);
                    setShowYearDropdown(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectedYear === year ? "#FF8800" : "#111827",
                      fontFamily: fonts.regular,
                    }}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Month Selector */}
          <Text
            style={{
              fontSize: 16,
              color: "#111827",
              marginBottom: 8,
              fontFamily: fonts.medium,
            }}
          >
            Month:
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#E5E7EB",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => setShowMonthDropdown(!showMonthDropdown)}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#111827",
                fontFamily: fonts.regular,
              }}
            >
              {selectedMonth}
            </Text>
            <Ionicons 
              name={showMonthDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>

          {/* Month Dropdown */}
          {showMonthDropdown && (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                marginBottom: 16,
                elevation: 4,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                maxHeight: 200,
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={{
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E5E7EB",
                    }}
                    onPress={() => {
                      setSelectedMonth(month);
                      setShowMonthDropdown(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: selectedMonth === month ? "#FF8800" : "#111827",
                        fontFamily: fonts.regular,
                      }}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#111827",
              borderRadius: 8,
              padding: 16,
              alignItems: "center",
              marginBottom: 32,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: fonts.semiBold,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>

          {/* Case Progress Timeline */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#111827",
              marginBottom: 16,
              fontFamily: fonts.semiBold,
            }}
          >
            Case Progress Timeline
          </Text>

          {/* Timeline Events or No Cases Message */}
          {hasEventsForSelectedPeriod ? (
            <View style={{ marginBottom: 32 }}>
              {timelineEvents.map((event, index) => (
                <View
                  key={event.id}
                  style={{
                    flexDirection: "row",
                    marginBottom: 24,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Timeline Line and Dot */}
                  <View style={{ alignItems: "center", marginRight: 16 }}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: getStatusColor(event.status),
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      <Ionicons
                        name={getStatusIcon(event.status) as any}
                        size={20}
                        color="white"
                      />
                    </View>
                    {index < timelineEvents.length - 1 && (
                      <View
                        style={{
                          width: 2,
                          height: 60,
                          backgroundColor: "#E5E7EB",
                        }}
                      />
                    )}
                  </View>

                  {/* Event Content */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#6B7280",
                        marginBottom: 4,
                        fontFamily: fonts.regular,
                      }}
                    >
                      {event.date}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#111827",
                        marginBottom: 4,
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      {event.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#6B7280",
                        fontFamily: fonts.regular,
                      }}
                    >
                      {event.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                paddingVertical: 48,
                marginBottom: 32,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "#E5E7EB",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Ionicons name="calendar-outline" size={32} color="#6B7280" />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: 8,
                  fontFamily: fonts.semiBold,
                }}
              >
                No cases recorded for {selectedMonth} {selectedYear}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "center",
                  fontFamily: fonts.regular,
                }}
              >
                Try selecting a different month or year.
              </Text>
            </View>
          )}

          {/* Notes Section */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#111827",
              marginBottom: 16,
              fontFamily: fonts.semiBold,
            }}
          >
            Notes
          </Text>

          <TextInput
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 16,
              minHeight: 120,
              textAlignVertical: "top",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              fontSize: 16,
              fontFamily: fonts.regular,
              marginBottom: 16,
            }}
            multiline
            placeholder="Add case notes here..."
            placeholderTextColor="#6B7280"
            value={notes}
            onChangeText={setNotes}
          />

          {/* Save Notes Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#111827",
              borderRadius: 8,
              padding: 16,
              alignItems: "center",
              marginBottom: 32,
            }}
            onPress={handleSaveNotes}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: fonts.semiBold,
              }}
            >
              Save Notes
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
