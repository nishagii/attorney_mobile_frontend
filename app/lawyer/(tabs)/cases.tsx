import Header from "@/app/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface CaseItem {
  id: string;
  title: string;
  caseOwner: string;
  caseType: string;
  nextHearing: string;
  associates: string[];
  status: "Active" | "Closed" | "Pending";
  amount: string;
}

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePaymentsPress = () => {
    router.push("/lawyer/(screens)/payments");
  };

  const handleMeetingsPress = () => {
    router.push("/lawyer/(tabs)/calendar");
  };

  // Sample case data - in real app, this would come from API
  const casesData: CaseItem[] = [
    {
      id: "1",
      title: "The Estate of Eleanor Vance",
      caseOwner: "John Doe",
      caseType: "Probate",
      nextHearing: "2024-03-15",
      associates: ["Jane Smith"],
      status: "Active",
      amount: "$5,000 (Paid)",
    },
    {
      id: "2",
      title: "The Matter of the Guardianship of Finnigan O'Malley",
      caseOwner: "Sarah Lee",
      caseType: "Guardianship",
      nextHearing: "2024-04-22",
      associates: ["David Chen"],
      status: "Active",
      amount: "$3,500 (Due)",
    },
    {
      id: "3",
      title: "The Case of the Disputed Will of Arthur Pendgragon",
      caseOwner: "Michael Brown",
      caseType: "Estate",
      nextHearing: "2024-05-10",
      associates: ["Emily White"],
      status: "Pending",
      amount: "$7,200 (Paid)",
    },
  ];

  const filteredCases = casesData.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCaseCard = (caseItem: CaseItem) => (
    <View
      key={caseItem.id}
      className="bg-white rounded-xl p-5 mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <Text className="text-lg font-semibold text-gray-600 mb-4">
        {caseItem.title}
      </Text>

      <View className="space-y-3 mb-5">
        <View>
          <Text className="text-sm text-gray-500 mb-1">Case Owner:</Text>
          <Text className="text-sm font-medium text-gray-900">
            {caseItem.caseOwner}
          </Text>
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-1">Case Type:</Text>
          <Text className="text-sm font-medium text-gray-900">
            {caseItem.caseType}
          </Text>
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-1">Next Hearing:</Text>
          <Text className="text-sm font-medium text-gray-900">
            {caseItem.nextHearing}
          </Text>
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-1">Junior Associated:</Text>
          <Text className="text-sm font-medium text-gray-900">
            {caseItem.associates.join(", ")}
          </Text>
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-1">Fee:</Text>
          <Text className="text-sm font-medium text-gray-900">
            {caseItem.amount}
          </Text>
        </View>
      </View>

      <View className="flex-row space-x-3">
        <TouchableOpacity
          className="flex-1 bg-black rounded-lg py-3"
          onPress={() => {
            // Handle close case action
            console.log("Close case:", caseItem.id);
          }}
        >
          <Text className="text-center text-white font-medium">Close Case</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-gray-50 rounded-lg py-3"
          onPress={() => {
            // Navigate to case details
            router.push(`/case/${caseItem.id}`);
          }}
        >
          <Text className="text-center text-gray-900 font-medium">
            View Details →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <Header
        title="Case Profiles"
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

      {/* Search Bar */}
      <View className="px-5 py-4 bg-gray-50">
        <View
          className="flex-row items-center rounded-lg px-4 py-3"
          style={{
            backgroundColor: "rgba(255, 136, 0, 0.1)", // #ff8800 with 10% opacity
          }}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
            style={{ marginRight: 12 }}
          />
          <TextInput
            placeholder="Search cases..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base"
            placeholderTextColor="#999"
            style={{
              fontSize: 16,
              color: "#333",
              borderWidth: 0,
              outline: "none",
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={{ marginLeft: 8 }}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Cases List */}
      <ScrollView
        className="flex-1 px-5 py-2"
        showsVerticalScrollIndicator={false}
      >
        {searchQuery.length > 0 && (
          <View className="mb-3">
            <Text className="text-sm text-gray-600">
              {filteredCases.length} case{filteredCases.length !== 1 ? "s" : ""}{" "}
              found
              {searchQuery ? ` for "${searchQuery}"` : ""}
            </Text>
          </View>
        )}

        {filteredCases.length > 0 ? (
          filteredCases.map(renderCaseCard)
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="folder-outline" size={48} color="#ccc" />
            <Text className="text-gray-500 text-center mt-4">
              {searchQuery
                ? "No cases found matching your search"
                : "No cases available"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Cases;
