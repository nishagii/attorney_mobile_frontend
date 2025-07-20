import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { fonts } from "@/constants/fonts";

interface SimpleHeaderProps {
  title: string;
  onBackPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  showBackButton?: boolean;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  title,
  onBackPress,
  backgroundColor = "#181827",
  textColor = "#ffffff",
  iconColor = "#ffffff",
  borderColor = "#e5e7eb",
  showBorder = true,
  rightElement,
  leftElement,
  showBackButton = true,
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: backgroundColor,
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: borderColor,
      }}
    >
      {/* Left Section */}
      {leftElement ? (
        leftElement
      ) : showBackButton ? (
        <TouchableOpacity onPress={handleBackPress} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24, marginRight: 16 }} />
      )}

      {/* Title */}
      <Text
        style={{
          fontSize: 20,
          fontFamily: fonts.bold,
          color: textColor,
          flex: 1,
        }}
      >
        {title}
      </Text>

      {/* Right Section */}
      {rightElement || <View style={{ width: 24 }} />}
    </View>
  );
};

export default SimpleHeader;
