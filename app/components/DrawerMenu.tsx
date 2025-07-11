import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { fonts } from "@/constants/fonts";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const slideAnim = React.useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    {
      id: "payments",
      title: "Payments",
      icon: "card-outline",
      route: "/lawyer/(drawer)/payments",
    },
    {
      id: "meetings",
      title: "Meetings",
      icon: "people-outline",
      route: "/lawyer/(drawer)/meetings",
    },
    {
      id: "case-details",
      title: "Case Details",
      icon: "document-text-outline",
      route: "/lawyer/(drawer)/case-details",
    },
    {
      id: "account-users",
      title: "Account Users",
      icon: "person-add-outline",
      route: "/lawyer/(drawer)/account-users",
    },
  ];

  const handleMenuItemPress = (route: string) => {
    onClose();
    router.push(route as any);
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      
      {/* Backdrop */}
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Drawer Content */}
        <Animated.View
          style={{
            width: SCREEN_WIDTH * 0.8,
            height: "100%",
            backgroundColor: "#ffffff",
            transform: [{ translateX: slideAnim }],
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
          onStartShouldSetResponder={() => true}
        >
          {/* Header */}
          <View
            style={{
              backgroundColor: "#111827",
              paddingTop: 50,
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "bold",
                  fontFamily: fonts.semiBold,
                }}
              >
                Menu
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Menu Items */}
          <View style={{ flex: 1, paddingTop: 20 }}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f3f4f6",
                }}
                onPress={() => handleMenuItemPress(item.route)}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: "#f3f4f6",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color="#6b7280"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#374151",
                    fontFamily: fonts.medium,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View
            style={{
              padding: 20,
              borderTopWidth: 1,
              borderTopColor: "#f3f4f6",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#9ca3af",
                textAlign: "center",
                fontFamily: fonts.regular,
              }}
            >
              Attorney App v1.0
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}
