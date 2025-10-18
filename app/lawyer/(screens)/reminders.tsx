import Header from "@/app/components/Header";
import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button1 from "../../components/UI/Button1";
import Button2 from "../../components/UI/Button2";

type PaymentStatus = "Overdue" | "Due Soon" | "Pending";

interface Payment {
  id: string;
  clientName: string;
  amount: number;
  caseNumber: string;
  court: string;
  dueDate: string;
  status: PaymentStatus;
}

interface SendRemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPayments?: Payment[];
  allPayments?: Payment[];
}

const SendRemindersModal: React.FC<SendRemindersModalProps> = ({
  isOpen,
  onClose,
  selectedPayments = [],
  allPayments = [],
}) => {
  const [reminderMessage, setReminderMessage] = useState(
    "This is a friendly reminder that you have an outstanding payment due. Please arrange payment at your earliest convenience."
  );
  const [sendingReminders, setSendingReminders] = useState(false);

  const paymentsToRemind = useMemo(() => {
    if (selectedPayments.length > 0) return selectedPayments;
    return (allPayments || []).filter((p) => p.status === "Overdue");
  }, [selectedPayments, allPayments]);

  const handleSendReminders = () => {
    setSendingReminders(true);
    setTimeout(() => {
      setSendingReminders(false);
      onClose();
      Alert.alert("Reminders sent", `Reminders sent to ${paymentsToRemind.length} client(s)`);
    }, 1500);
  };

  return (
    <Modal transparent visible={isOpen} animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 420,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#e5e7eb",
              paddingHorizontal: 20,
              paddingVertical: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "600", color: "#111827", fontFamily: fonts.semiBold }}
            >
              Send Payment Reminders
            </Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close">
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ color: "#4b5563", marginBottom: 8 }}>
                Sending reminders to {paymentsToRemind.length} client(s):
              </Text>
              <View
                style={{
                  backgroundColor: "#f9fafb",
                  padding: 12,
                  borderRadius: 8,
                  maxHeight: 140,
                }}
              >
                <ScrollView>
                  {paymentsToRemind.map((payment) => (
                    <View
                      key={payment.id}
                      style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}
                    >
                      <Text style={{ fontSize: 14, color: "#111827" }}>{payment.clientName}</Text>
                      <Text style={{ fontSize: 14, color: "#6b7280" }}>#{payment.caseNumber}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 6 }}>
                Reminder Message
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                value={reminderMessage}
                onChangeText={setReminderMessage}
                style={{
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 8,
                  padding: 10,
                  minHeight: 100,
                  textAlignVertical: "top",
                }}
                placeholder="Write a message..."
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button2 text="Cancel" onPress={onClose} disabled={sendingReminders} />
              <View style={{ width: 12 }} />
              <Button1
                text={sendingReminders ? "Sending..." : "Send Reminders"}
                onPress={handleSendReminders}
                disabled={sendingReminders || paymentsToRemind.length === 0}
                isLoading={sendingReminders}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function RemindersScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample payments (aligned with payments.tsx)
  const payments: Payment[] = [
    {
      id: "1",
      clientName: "H.M.S.J Dewasiritha",
      amount: 850,
      caseNumber: "103464",
      court: "High Court",
      dueDate: "March 15, 2023",
      status: "Overdue",
    },
    {
      id: "2",
      clientName: "Sahan Perera",
      amount: 650,
      caseNumber: "103465",
      court: "Magistrate Court",
      dueDate: "March 30, 2023",
      status: "Due Soon",
    },
    {
      id: "3",
      clientName: "Kamala Silva",
      amount: 750,
      caseNumber: "103465",
      court: "District Court",
      dueDate: "March 10, 2023",
      status: "Overdue",
    },
  ];

  const overdue = payments.filter((p) => p.status === "Overdue");

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header
        title="Reminders"
        showMenu={true}
        showNotification={true}
        onMenuPress={() => {}}
        onNotificationPress={() => {}}
        onPaymentsPress={() => router.push("/lawyer/(screens)/payments")}
        onMeetingsPress={() => router.push("/lawyer/(tabs)/calendar")}
        onCasedetails={() => router.push("/lawyer/(tabs)/cases")}
        onAccountUsers={() => router.push("/lawyer/(tabs)/profile")}
        backgroundColor="#111827"
        textColor="#fff"
        iconColor="#fff"
        borderColor="#111827"
        showNotificationBadge={false}
        router={router}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: "#111827",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 16, marginBottom: 6 }}>
            Overdue Payments
          </Text>
          <Text
            style={{ color: "#ffffff", fontSize: 28, fontWeight: "700", fontFamily: fonts.semiBold }}
          >
            {overdue.length}
          </Text>
          <Text style={{ color: "#ffffff", opacity: 0.8, marginTop: 6 }}>
            Select send to notify these clients
          </Text>
          <View style={{ height: 12 }} />
          <Button1 text="Send Reminders" onPress={() => setIsModalOpen(true)} />
        </View>

        <Text style={{ fontSize: 18, fontWeight: "600", color: "#111827", marginBottom: 8 }}>
          Clients to notify
        </Text>
        {overdue.map((p) => (
          <View
            key={p.id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>{p.clientName}</Text>
              <Text style={{ color: "#6b7280" }}>Case #{p.caseNumber} • {p.court}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#fee2e2",
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 16,
              }}
            >
              <Text style={{ color: "#b91c1c", fontSize: 12 }}>Overdue</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <SendRemindersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPayments={[]}
        allPayments={payments}
      />
    </View>
  );
}
