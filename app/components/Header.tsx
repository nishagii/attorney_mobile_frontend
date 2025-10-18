import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "@/constants/fonts";

const { width } = Dimensions.get("window");

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  showMenu?: boolean;
  showNotification?: boolean;
  showBack?: boolean;
  onBackPress?: () => void;
  onPaymentsPress?: () => void;
  onMeetingsPress?: () => void;
  onCasedetails?: () => void;
  onAccountUsers?: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
  showNotificationBadge?: boolean;
}

export default function Header({
  title,
  onMenuPress,
  onNotificationPress,
  showMenu = false,
  showNotification = true,
  showBack = false,
  onBackPress,
  onPaymentsPress,
  onMeetingsPress,
  onCasedetails,
  onAccountUsers,
  backgroundColor = "#ffffff",
  textColor = "#111827",
  iconColor = "#111827",
  borderColor = "#e5e7eb",
  showNotificationBadge = false,
}: HeaderProps) {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSliderOpen) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(blurAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width * 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(blurAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [isSliderOpen, slideAnim, blurAnim]);

  const handleMenuPress = () => {
    setIsSliderOpen(true);
    if (onMenuPress) {
      onMenuPress();
    }
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  const handlePaymentsPress = () => {
    setIsSliderOpen(false);
    if (onPaymentsPress) {
      onPaymentsPress();
    }
  };

  const handleMeetingsPress = () => {
    setIsSliderOpen(false);
    if (onMeetingsPress) {
      onMeetingsPress();
    }
  };

  const handleCasedetails = () => {
    setIsSliderOpen(false);
    if (onCasedetails) {
      onCasedetails();
    }
  };
  const handleAccountUsers = () => {
    setIsSliderOpen(false);
    if (onAccountUsers) {
      onAccountUsers();
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: backgroundColor,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        }}
      >
        {showBack ? (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="arrow-back-outline" size={24} color={iconColor} />
          </TouchableOpacity>
        ) : showMenu ? (
          <TouchableOpacity onPress={handleMenuPress}>
            <Ionicons name="menu-outline" size={24} color={iconColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: textColor,
            fontFamily: fonts.semiBold,
          }}
        >
          {title}
        </Text>

        {showNotification ? (
          <TouchableOpacity
            onPress={onNotificationPress}
            style={{ position: "relative" }}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={iconColor}
            />
            {showNotificationBadge && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#FF8800",
                }}
              />
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>

      {/* Slider Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseSlider}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.blurBackground,
              {
                opacity: blurAnim,
              },
            ]}
          >
            <BlurView
              intensity={100}
              tint="light"
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.gradientOverlay} />
          </Animated.View>

          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.sliderContainer,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderTitle}>Menu</Text>
                <TouchableOpacity onPress={handleCloseSlider}>
                  <Ionicons name="close-outline" size={24} color="#111827" />
                </TouchableOpacity>
              </View>

              <View style={styles.menuItems}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handlePaymentsPress}
                >
                  <Ionicons name="card-outline" size={24} color="#111827" />
                  <Text style={styles.menuText}>Payments</Text>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleMeetingsPress}
                >
                  <Ionicons name="calendar-outline" size={24} color="#111827" />
                  <Text style={styles.menuText}>Meetings</Text>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleCasedetails}
                >
                  <Ionicons
                    name="file-tray-outline"
                    size={24}
                    color="#111827"
                  />
                  <Text style={styles.menuText}>Case Details</Text>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleAccountUsers}
                >
                  <Ionicons name="people-outline" size={24} color="#111827" />
                  <Text style={styles.menuText}>Account Users</Text>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </Animated.View>
            <TouchableOpacity
              style={styles.backdrop}
              onPress={handleCloseSlider}
              activeOpacity={1}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    zIndex: 2,
  },
  backdrop: {
    flex: 1,
  },
  sliderContainer: {
    width: width * 0.8,
    maxWidth: 300,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backdropFilter: "blur(40px)",
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.3)",
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229, 231, 235, 0.6)",
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: fonts.semiBold,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "rgba(249, 250, 251, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 16,
    flex: 1,
    fontFamily: fonts.medium,
  },
});
