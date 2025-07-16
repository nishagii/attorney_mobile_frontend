import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Animated } from "react-native";

//this layout is for the client tabs

// Enhanced Tab Icon Component with beautiful animations and effects
const TabIcon = ({ IconComponent, iconName, focused, color, size }: {
  IconComponent: any;
  iconName: string;
  focused: boolean;
  color: string;
  size: number;
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const opacityValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.1,
          useNativeDriver: true,
          tension: 100,
          friction: 7,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 7,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <Animated.View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: focused ? "#FF8800" : "transparent",
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
        shadowColor: focused ? "#FF8800" : "transparent",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: focused ? 0.3 : 0,
        shadowRadius: 8,
        elevation: focused ? 8 : 0,
      }}
    >
      <IconComponent
        name={iconName}
        size={size}
        color={focused ? "#ffffff" : color}
      />
    </Animated.View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF8800",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          height: Platform.OS === "ios" ? 90 : 80,
          paddingBottom: Platform.OS === "ios" ? 25 : 12,
          paddingTop: 12,
          paddingHorizontal: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 15,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="clientdashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarAccessibilityLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={MaterialIcons}
              iconName="dashboard"
              focused={focused}
              color={color}
              size={size || 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clientcalendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarAccessibilityLabel: "Calendar and appointments",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="calendar"
              focused={focused}
              color={color}
              size={size || 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clientcases"
        options={{
          title: "My Cases",
          headerShown: false,
          tabBarAccessibilityLabel: "My legal cases",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="briefcase"
              focused={focused}
              color={color}
              size={size || 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clientsearch"
        options={{
          title: "Find Lawyers",
          headerShown: false,
          tabBarAccessibilityLabel: "Search for lawyers",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="search"
              focused={focused}
              color={color}
              size={size || 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clientprofile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarAccessibilityLabel: "User profile and settings",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              IconComponent={Ionicons}
              iconName="person"
              focused={focused}
              color={color}
              size={size || 24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout