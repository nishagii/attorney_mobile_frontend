import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import SimpleHeader from "@/app/components/SimpleHeader";

// Define types for meeting requests
interface MeetingRequest {
  id: string;
  title: string;
  requestedBy: string;
  preferredDuration: number;
  notes: string;
  date: string;
  time: string;
  location?: string;
}

export default function Meetings() {
  console.log("Meetings screen rendered!");
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([
    {
      id: "1",
      title: "Billing Inquiry",
      requestedBy: "Kamal J.",
      preferredDuration: 30,
      notes: "Clarification on recent invoice.",
      date: "2025-06-28",
      time: "11:00",
      location: "",
    },
    {
      id: "2",
      title: "Follow-up on Case #123",
      requestedBy: "Kamal J.",
      preferredDuration: 60,
      notes: "Discuss progress and next steps for the ongoing case.",
      date: "2025-07-01",
      time: "10:00",
      location: "",
    },
  ]);

  // State to track meeting location inputs
  const [meetingLocations, setMeetingLocations] = useState<
    Record<string, string>
  >({});

  const handleLocationChange = (id: string, value: string) => {
    setMeetingLocations({
      ...meetingLocations,
      [id]: value,
    });
  };

  const handleAccept = (id: string) => {
    const location = meetingLocations[id];
    if (!location) {
      Alert.alert("Required", "Please enter a meeting link or location");
      return;
    }

    // In a real app, you would send this to your backend
    Alert.alert("Success", "Meeting request accepted");

    // Update the local state to remove the accepted request
    setMeetingRequests((prev) => prev.filter((meeting) => meeting.id !== id));
  };

  const handleDecline = (id: string) => {
    Alert.alert(
      "Decline Meeting",
      "Are you sure you want to decline this meeting request?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Decline",
          style: "destructive",
          onPress: () => {
            // In a real app, you would send this to your backend
            setMeetingRequests((prev) =>
              prev.filter((meeting) => meeting.id !== id)
            );
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    // Format is already YYYY-MM-DD in our data
    return dateString;
  };

  // Use router to enable back navigation
  const handleBackPress = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SimpleHeader title="Client Meeting Requests" />
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-800 mb-6 px-2">
          Incoming Client Requests
        </Text>
        {meetingRequests.length === 0 ? (
          <View className="bg-white rounded-lg shadow-sm p-6 mb-4 items-center justify-center">
            <Text className="text-gray-500 text-center text-lg">
              No pending meeting requests
            </Text>
          </View>
        ) : (
          meetingRequests.map((meeting) => (
            <View
              key={meeting.id}
              className="bg-white rounded-lg shadow-sm p-5 mb-4 border border-gray-100"
            >
              <View className="flex-row justify-between items-start">
                <Text className="text-lg font-semibold text-gray-800">
                  {meeting.title}
                </Text>
                <Text className="text-xs text-gray-500">
                  {formatDate(meeting.date)} at {meeting.time}
                </Text>
              </View>

              <View className="my-3">
                <Text className="text-gray-700 mb-1">
                  Requested by: {meeting.requestedBy}
                </Text>
                <Text className="text-gray-700 mb-1">
                  Preferred Duration: {meeting.preferredDuration} minutes
                </Text>
                <Text className="text-gray-700 mb-3">
                  Notes: {meeting.notes}
                </Text>
              </View>

              <TextInput
                placeholder="Meeting Link or Location"
                className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200 mb-3"
                value={meetingLocations[meeting.id] || ""}
                onChangeText={(text) => handleLocationChange(meeting.id, text)}
              />

              <View className="flex-row justify-end mt-2">
                <TouchableOpacity
                  className="bg-black py-2 px-5 rounded-lg mr-3"
                  onPress={() => handleAccept(meeting.id)}
                >
                  <Text className="text-white font-medium">Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="py-2 px-5 rounded-lg border border-gray-300"
                  onPress={() => handleDecline(meeting.id)}
                >
                  <Text className="text-gray-800 font-medium">Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        <View className="h-16" /> {/* Bottom padding */}
      </ScrollView>
    </View>
  );
}
