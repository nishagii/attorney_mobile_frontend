import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

//this layout is for the tabs

// Custom Tab Icon Component with beautiful touch effects
const TabIcon = ({ IconComponent, iconName, focused, color, size }: {
  IconComponent: any;
  iconName: string;
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: focused ? "#FF8800" : "transparent",
        transform: [{ scale: focused ? 1.1 : 1 }],
      }}
    >
      <IconComponent
        name={iconName}
        size={size}
        color={focused ? "#ffffff" : color}
      />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6b7280",
        tabBarInactiveTintColor: "#6b7280",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          height: Platform.OS === "ios" ? 90 : 80,
          paddingBottom: Platform.OS === "ios" ? 25 : 12,
          paddingTop: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={MaterialIcons}
              iconName="dashboard"
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="calendar"
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cases"
        options={{
          title: "Cases",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="briefcase"
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="search"
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="person"
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
