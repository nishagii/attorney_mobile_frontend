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
import Header from "@/app/components/Header";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Closed":
        return "text-gray-600";
      case "Pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const renderCaseCard = (caseItem: CaseItem) => (
    <View
      key={caseItem.id}
      className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100"
    >
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        {caseItem.title}
      </Text>

      <View className="flex-row justify-between mb-3">
        <View className="flex-1 mr-4">
          <Text className="text-sm text-gray-500 mb-1">Case Owner</Text>
          <Text className="text-sm font-medium text-gray-800">
            {caseItem.caseOwner}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-500 mb-1">Case Type</Text>
          <Text className="text-sm font-medium text-gray-800">
            {caseItem.caseType}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-3">
        <View className="flex-1 mr-4">
          <Text className="text-sm text-gray-500 mb-1">Next Hearing</Text>
          <Text className="text-sm font-medium text-gray-800">
            {caseItem.nextHearing}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-500 mb-1">Associates</Text>
          <Text className="text-sm font-medium text-gray-800">
            {caseItem.associates.join(", ")}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-4">
          <Text className="text-sm text-gray-500 mb-1">Status</Text>
          <Text
            className={`text-sm font-medium ${getStatusColor(caseItem.status)}`}
          >
            {caseItem.status}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-500 mb-1">Amount</Text>
          <Text className="text-sm font-medium text-gray-800">
            {caseItem.amount}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity
          className="flex-1 bg-gray-100 rounded-lg py-2 px-4 mr-2"
          onPress={() => {
            // Handle close case action
            console.log("Close case:", caseItem.id);
          }}
        >
          <Text className="text-center text-gray-700 font-medium">
            Close Case
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-black rounded-lg py-2 px-4 ml-2"
          onPress={() => {
            // Navigate to case details
            router.push(`/case/${caseItem.id}`);
          }}
        >
          <Text className="text-center text-white font-medium">
            View Details
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
      />

      {/* Search Bar */}
      <View className="px-5 py-4 bg-white">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
          <Ionicons
            name="search-outline"
            size={20}
            color="#666"
            className="mr-3"
          />
          <TextInput
            placeholder="Search cases..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {/* Cases List */}
      <ScrollView
        className="flex-1 px-5 py-2"
        showsVerticalScrollIndicator={false}
      >
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
