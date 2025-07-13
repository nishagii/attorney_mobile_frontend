import Header from "@/app/components/Header";
import { router } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const search = () => {
  const handlePaymentsPress = () => {
    router.push("/lawyer/(screens)/payments");
  };

  const handleMeetingsPress = () => {
    router.push("/lawyer/(tabs)/calendar");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <Header
        title="Search"
        showMenu={true}
        showNotification={true}
        onPaymentsPress={handlePaymentsPress}
        onMeetingsPress={handleMeetingsPress}
        backgroundColor="#ffffff"
        textColor="#111827"
        iconColor="#111827"
        borderColor="#e5e7eb"
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Search functionality coming soon...</Text>
      </View>
    </SafeAreaView>
  );
};

export default search;
