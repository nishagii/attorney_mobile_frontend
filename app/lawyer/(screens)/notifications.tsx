import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "@/constants/fonts";

const notifications = [
  {
    id: "1",
    title: "New message from John Doe",
    time: "10 minutes ago",
    icon: "mail-outline",
    unread: true,
  },
  {
    id: "2",
    title: "Upcoming hearing for Case #4323",
    time: "1 hour ago",
    icon: "calendar-outline",
    unread: true,
  },
  {
    id: "3",
    title: "Payment received from Alice Johnson",
    time: "3 hours ago",
    icon: "card-outline",
    unread: false,
  },
  {
    id: "4",
    title: "Document uploaded for review",
    time: "Yesterday",
    icon: "document-outline",
    unread: false,
  },
];

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
}

export default function NotificationPanel({
  visible,
  onClose,
  onMarkAllRead,
}: NotificationPanelProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>
              Today is {new Date().toLocaleDateString("en-US")}
            </Text>
            <Text style={styles.title}>Notifications</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onMarkAllRead} style={styles.markAllBtn}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.notificationItem,
                item.unread && styles.unreadItem,
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color="#5E788F"
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 60,
    right: 20,
    left: 20,
    zIndex: 100,
    alignItems: "flex-end",
  },
  panel: {
    width: 340,
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: "#5E788F",
    fontFamily: fonts.medium,
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: fonts.semiBold,
  },
  closeBtn: {
    padding: 4,
    marginLeft: 8,
  },
  markAllBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  markAllText: {
    fontSize: 13,
    color: "#5E788F",
    fontFamily: fonts.medium,
    textDecorationLine: "underline",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  unreadItem: {
    backgroundColor: "#e3e8f7",
  },
  notificationTitle: {
    fontSize: 15,
    color: "#111827",
    fontFamily: fonts.medium,
  },
  notificationTime: {
    fontSize: 12,
    color: "#5E788F",
    fontFamily: fonts.regular,
    marginTop: 2,
  },
});
