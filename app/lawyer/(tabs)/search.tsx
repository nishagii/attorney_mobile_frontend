import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { fonts } from "@/constants/fonts";
import Header from "../../components/Header";

interface DropdownFilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

interface FilterOptionProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <View style={styles.filterOption}>
      <Text style={styles.filterOptionLabel}>{label}</Text>
      <View style={styles.filterOptionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterOptionButton,
              value === option && styles.filterOptionButtonActive,
            ]}
            onPress={() => onChange(option)}
          >
            <Text
              style={[
                styles.filterOptionButtonText,
                value === option && styles.filterOptionButtonTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ position: "relative", marginRight: 8 }}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 6,
          minWidth: 100,
          height: 32,
        }}
      >
        <Text style={{ fontSize: 12, flex: 1, color: "#6b7280" }}>
          {value || label}
        </Text>
        <Ionicons name="chevron-down" size={14} color="#9ca3af" />
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            position: "absolute",
            top: 34,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 8,
            zIndex: 1000,
          }}
        >
          {options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                onChange(option);
                setIsOpen(false);
              }}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderBottomWidth: idx < options.length - 1 ? 1 : 0,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Text style={{ fontSize: 13, color: "#374151" }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const casesData = [
  {
    id: 1,
    name: "The Estate of Eleanor Vance",
    type: "Probate",
    caseNumber: "2023-PR-00123",
    court: "Superior Court",
    nextHearingDate: "2024-03-16",
    status: "Open",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    name: "The Matter of the Guardianship of Finnigan O'Malley",
    type: "Guardianship",
    caseNumber: "2023-GU-04156",
    court: "Family Court",
    nextHearingDate: "2024-04-22",
    status: "Open",
    paymentStatus: "Pending",
  },
  {
    id: 3,
    name: "The Case of the Divorced Will of Arthur Pendragn",
    type: "Estate Litigation",
    caseNumber: "2023-EL-00789",
    court: "Probate Court",
    nextHearingDate: "2024-05-10",
    status: "Open",
    paymentStatus: "Paid",
  },
  {
    id: 4,
    name: "The Guardianship of Isabella Rose",
    type: "Guardianship",
    caseNumber: "2023-GU-01011",
    court: "Family Court",
    nextHearingDate: "2024-06-01",
    status: "Closed",
    paymentStatus: "Paid",
  },
  {
    id: 5,
    name: "The Estate of Samuel Bennett",
    type: "Probate",
    caseNumber: "2023-PR-01514",
    court: "Superior Court",
    nextHearingDate: "2024-07-18",
    status: "Open",
    paymentStatus: "Pending",
  },
];

const Search = () => {
  const [activeTab, setActiveTab] = useState("Table");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    caseType: "",
    upcomingHearings: "",
    closedCases: "",
    paymentDue: "",
  });
  const [filters, setFilters] = useState({
    caseType: "",
    upcomingHearings: "",
    closedCases: "",
    paymentDue: "",
  });

  const handleOpenFilter = () => {
    setTempFilters(filters);
    setShowFilterModal(true);
  };

  const handleSaveFilters = () => {
    setFilters(tempFilters);
    setShowFilterModal(false);
  };

  const handleCancelFilters = () => {
    setShowFilterModal(false);
  };

  const handleNotificationPress = () => {
    // Handle notification press
    console.log("Notification pressed");
  };

  const handleMenuPress = () => {
    // Handle menu press
    console.log("Menu pressed");
  };

  const handlePaymentsPress = () => {
    // Navigate to payments
    console.log("Navigate to payments");
  };

  const handleMeetingsPress = () => {
    // Navigate to meetings
    console.log("Navigate to meetings");
  };

  const handleCaseDetailsPress = () => {
    // Navigate to case details
    console.log("Navigate to case details");
  };

  const handleAccountUsersPress = () => {
    // Navigate to account users
    console.log("Navigate to account users");
  };

  const getStatusBadge = (status: string) => {
    if (status === "Open") {
      return { backgroundColor: "#dcfce7", color: "#166534" };
    } else if (status === "Closed") {
      return { backgroundColor: "#f3f4f6", color: "#374151" };
    }
    return { backgroundColor: "#dbeafe", color: "#1e40af" };
  };

  const getPaymentStatusBadge = (status: string) => {
    if (status === "Paid") {
      return { backgroundColor: "#dcfce7", color: "#166534" };
    } else if (status === "Pending") {
      return { backgroundColor: "#fef3c7", color: "#92400e" };
    }
    return { backgroundColor: "#fecaca", color: "#991b1b" };
  };

  // Filtering logic
  const filteredCases = casesData.filter((caseItem) => {
    const matchesSearch =
      caseItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCaseType =
      !filters.caseType ||
      filters.caseType === "All Types" ||
      caseItem.type === filters.caseType;

    const matchesUpcomingHearings =
      !filters.upcomingHearings || filters.upcomingHearings === "All Hearings";

    const matchesClosedCases =
      !filters.closedCases ||
      filters.closedCases === "All Cases" ||
      (filters.closedCases === "Open Only" && caseItem.status === "Open") ||
      (filters.closedCases === "Closed Only" && caseItem.status === "Closed");

    const matchesPaymentDue =
      !filters.paymentDue ||
      filters.paymentDue === "All Payments" ||
      caseItem.paymentStatus === filters.paymentDue;

    return (
      matchesSearch &&
      matchesCaseType &&
      matchesUpcomingHearings &&
      matchesClosedCases &&
      matchesPaymentDue
    );
  });

  const renderTableView = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.tableContainer, { minWidth: 640 }]}>
        {/* Table Header */}
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeader, { width: 200 }]}>CASE NAME</Text>
          <Text style={[styles.tableHeader, { width: 120 }]}>CASE TYPE</Text>
          <Text style={[styles.tableHeader, { width: 120 }]}>CASE NUMBER</Text>
          <Text style={[styles.tableHeader, { width: 120 }]}>COURT</Text>
          <Text style={[styles.tableHeader, { width: 80 }]}>STATUS</Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={filteredCases}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tableRow}>
              <View style={{ width: 200 }}>
                <Text style={styles.tableCell} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
              <View style={{ width: 120 }}>
                <Text style={styles.tableCell}>{item.type}</Text>
              </View>
              <View style={{ width: 120 }}>
                <Text style={styles.tableCell}>{item.caseNumber}</Text>
              </View>
              <View style={{ width: 120 }}>
                <Text style={styles.tableCell}>{item.court}</Text>
              </View>
              <View style={{ width: 80 }}>
                <View style={[styles.badge, getStatusBadge(item.status)]}>
                  <Text
                    style={[
                      styles.badgeText,
                      { color: getStatusBadge(item.status).color },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );

  const renderCardView = () => (
    <FlatList
      data={filteredCases}
      keyExtractor={(item) => item.id.toString()}
      numColumns={1}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Type: </Text>
            <Text style={styles.cardValue}>{item.type}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Case #: </Text>
            <Text style={styles.cardValue}>{item.caseNumber}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Court: </Text>
            <Text style={styles.cardValue}>{item.court}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Next Hearing: </Text>
            <Text style={styles.cardValue}>{item.nextHearingDate}</Text>
          </View>
          <View style={styles.cardBadges}>
            <View style={[styles.badge, getStatusBadge(item.status)]}>
              <Text
                style={[
                  styles.badgeText,
                  { color: getStatusBadge(item.status).color },
                ]}
              >
                {item.status}
              </Text>
            </View>
            <View
              style={[styles.badge, getPaymentStatusBadge(item.paymentStatus)]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: getPaymentStatusBadge(item.paymentStatus).color },
                ]}
              >
                {item.paymentStatus}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      <Header
        title="Case Search"
        showMenu={true}
        showNotification={true}
        showNotificationBadge={true}
        onNotificationPress={handleNotificationPress}
        onMenuPress={handleMenuPress}
        onPaymentsPress={handlePaymentsPress}
        onMeetingsPress={handleMeetingsPress}
        onCasedetails={handleCaseDetailsPress}
        onAccountUsers={handleAccountUsersPress}
        backgroundColor="#111827"
        textColor="#ffffff"
        iconColor="#ffffff"
        borderColor="#374151"
      />

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search cases"
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#6b7280"
            />
          </View>
        </View>

        {/* Tabs and Filter */}
        <View style={styles.tabsAndFilterContainer}>
          <View style={styles.tabs}>
            {["Table", "Cards"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab,
                  activeTab === tab ? styles.activeTab : styles.inactiveTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab
                      ? styles.activeTabText
                      : styles.inactiveTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleOpenFilter}
          >
            <Ionicons name="filter" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Filter Modal */}
        <Modal
          visible={showFilterModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filters</Text>
                <TouchableOpacity onPress={handleCancelFilters}>
                  <Ionicons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <FilterOption
                  label="Case Type"
                  options={[
                    "All Types",
                    "Probate",
                    "Guardianship",
                    "Estate Litigation",
                  ]}
                  value={tempFilters.caseType}
                  onChange={(value) =>
                    setTempFilters({ ...tempFilters, caseType: value })
                  }
                />

                <FilterOption
                  label="Upcoming Hearings"
                  options={[
                    "All Hearings",
                    "This Week",
                    "This Month",
                    "Next Month",
                  ]}
                  value={tempFilters.upcomingHearings}
                  onChange={(value) =>
                    setTempFilters({ ...tempFilters, upcomingHearings: value })
                  }
                />

                <FilterOption
                  label="Closed Cases"
                  options={["All Cases", "Open Only", "Closed Only"]}
                  value={tempFilters.closedCases}
                  onChange={(value) =>
                    setTempFilters({ ...tempFilters, closedCases: value })
                  }
                />

                <FilterOption
                  label="Payment Due"
                  options={["All Payments", "Paid", "Pending", "Overdue"]}
                  value={tempFilters.paymentDue}
                  onChange={(value) =>
                    setTempFilters({ ...tempFilters, paymentDue: value })
                  }
                />
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelFilters}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveFilters}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Content */}
        <View style={styles.tableContent}>
          {activeTab === "Table" ? renderTableView() : renderCardView()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#374151",
    fontFamily: fonts?.regular,
  },
  addButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: fonts?.medium,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsAndFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: fonts?.medium,
  },
  activeTabText: {
    color: "#111827",
  },
  inactiveTabText: {
    color: "#6b7280",
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterChip: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterChipText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: fonts?.medium,
  },
  tableContent: {
    flex: 1,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    fontFamily: fonts?.semiBold,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    backgroundColor: "#fff",
  },
  tableCell: {
    fontSize: 14,
    color: "#374151",
    fontFamily: fonts?.regular,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: fonts?.medium,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    fontFamily: fonts?.semiBold,
  },
  cardRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: fonts?.regular,
  },
  cardValue: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    fontFamily: fonts?.regular,
  },
  cardBadges: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  // Filter Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    fontFamily: fonts?.semiBold,
  },
  modalContent: {
    padding: 20,
    maxHeight: 400,
  },
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fonts?.medium,
  },
  saveButton: {
    flex: 1,
    padding: 14,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fonts?.medium,
  },
  // Filter Option Styles
  filterOption: {
    marginBottom: 24,
  },
  filterOptionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    fontFamily: fonts?.semiBold,
  },
  filterOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOptionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filterOptionButtonActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  filterOptionButtonText: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: fonts?.medium,
  },
  filterOptionButtonTextActive: {
    color: "#fff",
  },
});

export default Search;
