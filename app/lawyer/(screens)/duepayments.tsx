import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { fonts } from "@/constants/fonts";

interface Client {
  initials: string;
  name: string;
  color: string;
}

interface Payment {
  id: number;
  client: Client;
  caseNumber: string;
  court: string;
  dueDate: string;
  amount: number;
  status: string;
}

const DuePayments = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Enhanced sample payment due data with court and case number
  const [duePayments, setDuePayments] = useState<Payment[]>([
    {
      id: 1,
      client: {
        initials: "AD",
        name: "Anura De Mel",
        color: "#22C55E"
      },
      caseNumber: "CIV-2025-0142",
      court: "Colombo District Court",
      dueDate: "2025-07-01",
      amount: 2500.00,
      status: "Outstanding"
    },
    {
      id: 2,
      client: {
        initials: "SF",
        name: "S. Fernando",
        color: "#3B82F6"
      },
      caseNumber: "CIV-2025-0189",
      court: "High Court of Kandy",
      dueDate: "2025-08-12",
      amount: 3500.00,
      status: "Overdue"
    },
    {
      id: 3,
      client: {
        initials: "KJ",
        name: "Kamal J.",
        color: "#6366F1"
      },
      caseNumber: "CRIM-2025-0076",
      court: "Colombo Magistrate's Court",
      dueDate: "2025-07-21",
      amount: 2180.00,
      status: "Outstanding"
    },
    {
      id: 4,
      client: {
        initials: "RP",
        name: "Ruwan Perera",
        color: "#A855F7"
      },
      caseNumber: "FAM-2025-0058",
      court: "Family Court of Gampaha",
      dueDate: "2025-08-01",
      amount: 1150.00,
      status: "Overdue"
    }
  ]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Handle payment action
  const handlePaymentAction = (id: number, action: string) => {
    if (action === 'mark-paid') {
      // Update payment status to Paid
      setDuePayments(prevPayments => 
        prevPayments.map(payment => 
          payment.id === id ? { ...payment, status: 'Paid' } : payment
        )
      );
    } else if (action === 'edit') {
      // Find the payment to edit
      const paymentToEdit = duePayments.find(p => p.id === id);
      if (paymentToEdit) {
        setSelectedPayment(paymentToEdit);
        setShowEditModal(true);
      }
    }
  };

  // Filter payments based on active tab and search
  const getFilteredPayments = () => {
    let paymentsToFilter = duePayments;
    
    // Filter by tab
    if (activeTab === "overdue") {
      paymentsToFilter = duePayments.filter(payment => payment.status === "Overdue");
    }
    
    // Apply search filter
    if (searchTerm) {
      paymentsToFilter = paymentsToFilter.filter(payment => 
        payment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.court.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return paymentsToFilter;
  };

  // Calculate overdue amount
  const getOverdueAmount = () => {
    return duePayments
      .filter(p => p.status === 'Overdue')
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Outstanding':
        return { badgeBg: '#F3F4F6', textColor: '#374151' };
      case 'Overdue':
        return { badgeBg: '#FEE2E2', textColor: '#DC2626' };
      case 'Paid':
        return { badgeBg: '#D1FAE5', textColor: '#059669' };
      case 'Partial':
        return { badgeBg: '#FEF3C7', textColor: '#D97706' };
      default:
        return { badgeBg: '#F3F4F6', textColor: '#374151' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#323D68" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Due Payments</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => handleTabChange('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All Payments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overdue' && styles.activeTab]}
            onPress={() => handleTabChange('overdue')}
          >
            <Text style={[styles.tabText, activeTab === 'overdue' && styles.activeTabText]}>
              Overdue
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by client name, case number, or court..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Overdue Summary */}
        {activeTab === 'overdue' && (
          <View style={styles.overdueSummary}>
            <View style={styles.overdueSummaryContent}>
              <View>
                <Text style={styles.overdueSummaryTitle}>Total Overdue Amount</Text>
                <Text style={styles.overdueSummarySubtitle}>Payments that are past their due date</Text>
              </View>
              <View style={styles.overdueSummaryRight}>
                <Text style={styles.overdueAmount}>
                  ${formatCurrency(getOverdueAmount())}
                </Text>
                <TouchableOpacity 
                  style={styles.remindersButton}
                  onPress={() => setShowRemindersModal(true)}
                >
                  <Text style={styles.remindersButtonText}>Send Reminders</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Payments List */}
        <View style={styles.paymentsList}>
          {getFilteredPayments().map((payment) => (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <View style={styles.clientInfo}>
                  <View style={[styles.avatar, { backgroundColor: payment.client.color + '20' }]}>
                    <Text style={[styles.avatarText, { color: payment.client.color }]}>
                      {payment.client.initials}
                    </Text>
                  </View>
                  <View style={styles.clientDetails}>
                    <Text style={styles.clientName}>{payment.client.name}</Text>
                    <Text style={styles.caseNumber}>{payment.caseNumber}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusStyles(payment.status).badgeBg }]}>
                  <Text style={[styles.statusText, { color: getStatusStyles(payment.status).textColor }]}>
                    {payment.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.paymentDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Court:</Text>
                  <Text style={styles.detailValue}>{payment.court}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Due Date:</Text>
                  <Text style={styles.detailValue}>{formatDate(payment.dueDate)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amount:</Text>
                  <Text style={styles.amountValue}>${formatCurrency(payment.amount)}</Text>
                </View>
              </View>

              {payment.status !== 'Paid' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.markPaidButton}
                    onPress={() => handlePaymentAction(payment.id, 'mark-paid')}
                  >
                    <Text style={styles.markPaidButtonText}>Mark Paid</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handlePaymentAction(payment.id, 'edit')}
                  >
                    <Ionicons name="pencil" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#323D68',
    fontFamily: fonts.semiBold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 24,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF8800',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: fonts.medium,
  },
  activeTabText: {
    color: '#FF8800',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontFamily: fonts.regular,
  },
  overdueSummary: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  overdueSummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overdueSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#991B1B',
    fontFamily: fonts.semiBold,
  },
  overdueSummarySubtitle: {
    fontSize: 14,
    color: '#DC2626',
    fontFamily: fonts.regular,
  },
  overdueSummaryRight: {
    alignItems: 'flex-end',
  },
  overdueAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#991B1B',
    fontFamily: fonts.semiBold,
    marginBottom: 8,
  },
  remindersButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  remindersButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  paymentsList: {
    marginBottom: 32,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.semiBold,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323D68',
    fontFamily: fonts.semiBold,
  },
  caseNumber: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: fonts.regular,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  paymentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: fonts.regular,
  },
  detailValue: {
    fontSize: 14,
    color: '#374151',
    fontFamily: fonts.medium,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#323D68',
    fontFamily: fonts.semiBold,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  markPaidButton: {
    backgroundColor: '#FF8800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  markPaidButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  editButton: {
    padding: 8,
  },
});

export default DuePayments;