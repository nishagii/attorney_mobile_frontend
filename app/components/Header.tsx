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

interface Notification {
  id: string;
  type: 'message' | 'hearing' | 'payment' | 'document';
  title: string;
  time: string;
  isRead?: boolean;
}

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  showMenu?: boolean;
  showNotification?: boolean;
  onPaymentsPress?: () => void;
  onMeetingsPress?: () => void;
  onCasedetails?: () => void;
  onAccountUsers?: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
  showNotificationBadge?: boolean;
  notifications?: Notification[];
}

export default function Header({
  title,
  onMenuPress,
  onNotificationPress,
  showMenu = false,
  showNotification = true,
  onPaymentsPress,
  onMeetingsPress,
  onCasedetails,
  onAccountUsers,
  backgroundColor = "#ffffff",
  textColor = "#111827",
  iconColor = "#111827",
  borderColor = "#e5e7eb",
  showNotificationBadge = false,
  notifications = [],
}: HeaderProps) {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const notificationDropdownAnim = useRef(new Animated.Value(0)).current;
  const notificationOpacityAnim = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    if (isNotificationDropdownOpen) {
      setNotificationModalVisible(true);
      Animated.parallel([
        Animated.timing(notificationDropdownAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(notificationOpacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(notificationDropdownAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(notificationOpacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setNotificationModalVisible(false);
      });
    }
  }, [isNotificationDropdownOpen, notificationDropdownAnim, notificationOpacityAnim]);

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

  const handleNotificationPress = () => {
    setIsNotificationDropdownOpen(true);
    if (onNotificationPress) {
      onNotificationPress();
    }
  };

  const handleCloseNotificationDropdown = () => {
    setIsNotificationDropdownOpen(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return 'mail-outline';
      case 'hearing':
        return 'calendar-outline';
      case 'payment':
        return 'card-outline';
      case 'document':
        return 'document-outline';
      default:
        return 'notifications-outline';
    }
  };

  const formatDate = () => {
    const today = new Date();
    return `Today is ${today.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    })}`;
  };

  // Sample notifications data if none provided
  const sampleNotifications: Notification[] = [
    {
      id: '1',
      type: 'message',
      title: 'New message from John Doe',
      time: '10 minutes ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'hearing',
      title: 'Upcoming hearing for Case #4323',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment received from Alice Johnson',
      time: '3 hours ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'document',
      title: 'Document uploaded for review',
      time: 'Yesterday',
      isRead: true,
    },
  ];

  const displayNotifications = notifications.length > 0 ? notifications : sampleNotifications;

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
        {showMenu ? (
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
            onPress={handleNotificationPress}
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
      {modalVisible && (
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
                  <Ionicons name="file-tray-outline" size={24} color="#111827" />
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
  // Notification dropdown styles
  dropdownBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  dropdownContainer: {
    position: "absolute",
    top: 80, // Adjust based on header height
    right: 20,
    zIndex: 1000,
  },
  notificationDropdown: {
    width: 350,
    maxHeight: 500,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  notificationHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  notificationHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: fonts.medium,
  },
  notificationHeaderBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: fonts.semiBold,
  },
  markAllReadButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  markAllReadText: {
    fontSize: 12,
    color: "#3B82F6",
    fontFamily: fonts.medium,
  },
  notificationsList: {
    maxHeight: 400,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "transparent",
  },
  unreadNotification: {
    backgroundColor: "#f8fafc",
    borderColor: "#e0f2fe",
  },
  notificationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: 1,
    right: 1,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
  },
  notificationContent: {
    flex: 1,
    paddingTop: 1,
  },
  notificationText: {
    fontSize: 14,
    color: "#374151",
    fontFamily: fonts.medium,
    lineHeight: 18,
    marginBottom: 2,
  },
  unreadText: {
    color: "#111827",
    fontWeight: "600",
  },
  notificationTime: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: fonts.regular,
  },
});
