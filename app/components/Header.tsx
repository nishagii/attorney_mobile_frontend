import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "@/constants/fonts";

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  showMenu?: boolean;
  showNotification?: boolean;
}

export default function Header({
  title,
  onMenuPress,
  onNotificationPress,
  showMenu = false,
  showNotification = true,
}: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
      }}
    >
      {showMenu ? (
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={24} color="#111827" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#111827",
          fontFamily: fonts.semiBold,
        }}
      >
        {title}
      </Text>

      {showNotification ? (
        <TouchableOpacity onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}
