import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { fonts } from "@/constants/fonts";

const CaseDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState("");

  const paymentStatusOptions = [
    { label: "Paid", value: "Paid", color: "#10b981" },
    { label: "Partially payed", value: "Partially payed", color: "#ff8800" },
    { label: "Not payed", value: "Not payed", color: "#ef4444" },
  ];

  // Sample case data - in real app, this would come from API based on ID
  const getCaseData = (caseId: string) => {
    const casesData: { [key: string]: any } = {
      "1": {
        caseNumber: "#4323",
        title: "The Estate of Eleanor Vance",
        caseOwner: "John Doe",
        caseType: "Probate",
        status: "Open",
        nextHearing: "2024-03-15",
        associates: ["Jane Smith"],
        amount: "$5,000 (Paid)",
        description:
          "This case involves the probate of the estate of Eleanor Vance, including the distribution of assets and resolution of any outstanding debts. The estate includes various properties and financial holdings requiring careful legal oversight.",
        client: "Alice Johnson (Executor)",
        clientPhone: "+65 345 7890 551",
        opposingParty: "N/A (Standard Probate)",
        agreedFee: "$5,000.00",
        totalExpenses: "$250.00",
        paymentStatus: "Paid",
        invoicedAmount: "$5,250.00",
        hearings: [
          {
            date: "March 15, 2024",
            court: "Superior Court",
            purpose: "Initial Hearing",
            status: "Complete",
            description: "Status Complete: Docusate enveloexualer",
          },
          {
            date: "July 20, 2024",
            court: "Superior Court",
            purpose: "Final distribution plan approval",
            status: "Next Hearing",
            description: "Purpose: Final distribution plan approval",
          },
        ],
        documents: [
          "Will of Eleanor Vance.pdf",
          "Estate Valuation Report.pdf",
          "Client Correspondence Log.pdf",
        ],
        timeline: [
          {
            date: "Mar 15, 2024",
            event: "Initial Hearing",
            status: "completed",
          },
          { date: "Feb 01, 2024", event: "Case Briefing", status: "completed" },
          { date: "Apr 20, 2024", event: "Discovery Phase", status: "current" },
          { date: "Jul 20, 2024", event: "Next Hearing", status: "upcoming" },
        ],
      },
      "2": {
        caseNumber: "#4324",
        title: "The Matter of the Guardianship of Finnigan O'Malley",
        caseOwner: "Sarah Lee",
        caseType: "Guardianship",
        status: "Active",
        nextHearing: "2024-04-22",
        associates: ["David Chen"],
        amount: "$3,500 (Due)",
        description:
          "Guardianship case for establishing legal guardianship of Finnigan O'Malley. This involves court proceedings to ensure proper care and protection of the individual.",
        client: "Mary O'Malley (Petitioner)",
        clientPhone: "+65 456 7891 662",
        opposingParty: "State Guardian Office",
        agreedFee: "$3,500.00",
        totalExpenses: "$180.00",
        paymentStatus: "Not payed",
        invoicedAmount: "$3,680.00",
        hearings: [
          {
            date: "April 22, 2024",
            court: "Family Court",
            purpose: "Guardianship Hearing",
            status: "Next Hearing",
            description: "Purpose: Guardianship establishment review",
          },
        ],
        documents: [
          "Guardianship Petition.pdf",
          "Medical Reports.pdf",
          "Character References.pdf",
        ],
        timeline: [
          { date: "Mar 10, 2024", event: "Case Filed", status: "completed" },
          { date: "Mar 25, 2024", event: "Documentation", status: "completed" },
          { date: "Apr 22, 2024", event: "Hearing", status: "upcoming" },
        ],
      },
      "3": {
        caseNumber: "#4325",
        title: "The Case of the Disputed Will of Arthur Pendragon",
        caseOwner: "Michael Brown",
        caseType: "Estate",
        status: "Pending",
        nextHearing: "2024-05-10",
        associates: ["Emily White"],
        amount: "$7,200 (Paid)",
        description:
          "Estate litigation case involving disputed will of Arthur Pendragon. Multiple parties contesting the validity and distribution outlined in the will.",
        client: "Merlin Wizard (Beneficiary)",
        clientPhone: "+65 567 8902 773",
        opposingParty: "Mordred Pendragon (Contestant)",
        agreedFee: "$7,200.00",
        totalExpenses: "$420.00",
        paymentStatus: "Partially payed",
        invoicedAmount: "$7,620.00",
        hearings: [
          {
            date: "May 10, 2024",
            court: "Probate Court",
            purpose: "Will Contest Hearing",
            status: "Next Hearing",
            description: "Purpose: Will validity examination",
          },
        ],
        documents: [
          "Original Will.pdf",
          "Medical Records.pdf",
          "Witness Statements.pdf",
        ],
        timeline: [
          { date: "Feb 15, 2024", event: "Case Filed", status: "completed" },
          { date: "Mar 01, 2024", event: "Discovery", status: "completed" },
          { date: "May 10, 2024", event: "Hearing", status: "upcoming" },
        ],
      },
    };

    return casesData[caseId] || null;
  };

  const caseData = getCaseData(id as string);

  // Initialize payment status
  useEffect(() => {
    if (caseData && caseData.paymentStatus) {
      setCurrentPaymentStatus(caseData.paymentStatus);
    }
  }, [caseData]);

  if (!caseData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Case not found</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-black px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#111827",
            fontFamily: fonts.semiBold,
          }}
        >
          Case No. {caseData.caseNumber}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        onTouchStart={(e) => {
          // Only close dropdown if clicking outside of it
          if (showPaymentDropdown) {
            setShowPaymentDropdown(false);
          }
        }}
      >
        {/* Case Overview */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 16,
              fontFamily: fonts.semiBold,
            }}
          >
            Case Overview
          </Text>

          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 4,
                    fontFamily: fonts.regular,
                  }}
                >
                  Case Name:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#111827",
                    fontFamily: fonts.medium,
                  }}
                >
                  {caseData.title}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 4,
                    fontFamily: fonts.regular,
                  }}
                >
                  Case Type:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#111827",
                    fontFamily: fonts.medium,
                  }}
                >
                  {caseData.caseType}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 4,
                    fontFamily: fonts.regular,
                  }}
                >
                  Case Number:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#111827",
                    fontFamily: fonts.medium,
                  }}
                >
                  {caseData.caseNumber}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 4,
                    fontFamily: fonts.regular,
                  }}
                >
                  Status:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: caseData.status === "Open" ? "#10b981" : "#ff8800",
                    fontFamily: fonts.medium,
                  }}
                >
                  {caseData.status}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Description:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#374151",
                  lineHeight: 20,
                  fontFamily: fonts.regular,
                }}
              >
                {caseData.description}
              </Text>
            </View>
          </View>
        </View>

        {/* Parties Involved */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 16,
              fontFamily: fonts.semiBold,
            }}
          >
            Parties Involved
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Client:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: 8,
                  fontFamily: fonts.medium,
                }}
              >
                {caseData.client}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Client Phone:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111827",
                  fontFamily: fonts.regular,
                }}
              >
                {caseData.clientPhone}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Opposing Party:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: 8,
                  fontFamily: fonts.medium,
                }}
              >
                {caseData.opposingParty}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Junior Associated:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111827",
                  fontFamily: fonts.regular,
                }}
              >
                {caseData.associates.join(", ")}
              </Text>
            </View>
          </View>
        </View>

        {/* Financials */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 16,
              fontFamily: fonts.semiBold,
            }}
          >
            Financials
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Agreed Fee:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: 12,
                  fontFamily: fonts.medium,
                }}
              >
                {caseData.agreedFee}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Total Expenses:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111827",
                  fontFamily: fonts.regular,
                }}
              >
                {caseData.totalExpenses}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Payment Status:
              </Text>
              <View style={{ position: "relative", zIndex: 1 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 6,
                    backgroundColor: "#ffffff",
                    marginBottom: showPaymentDropdown ? 0 : 12,
                  }}
                  onPress={(e) => {
                    e.stopPropagation();
                    setShowPaymentDropdown(!showPaymentDropdown);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color:
                        paymentStatusOptions.find(
                          (option) => option.value === currentPaymentStatus
                        )?.color || "#6b7280",
                      fontFamily: fonts.medium,
                    }}
                  >
                    {currentPaymentStatus || "Select Status"}
                    {currentPaymentStatus && " ✓"}
                  </Text>
                  <Ionicons
                    name={showPaymentDropdown ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#6b7280"
                  />
                </TouchableOpacity>

                {showPaymentDropdown && (
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                      borderTopWidth: 0,
                      borderRadius: 6,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                      marginBottom: 12,
                    }}
                  >
                    {paymentStatusOptions.map((option, index) => (
                      <TouchableOpacity
                        key={option.value}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                          borderBottomWidth:
                            index < paymentStatusOptions.length - 1 ? 1 : 0,
                          borderBottomColor: "#f3f4f6",
                        }}
                        onPress={(e) => {
                          e.stopPropagation();
                          setCurrentPaymentStatus(option.value);
                          setShowPaymentDropdown(false);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: option.color,
                            fontFamily: fonts.medium,
                          }}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontFamily: fonts.regular,
                }}
              >
                Invoiced Amount:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111827",
                  fontFamily: fonts.regular,
                }}
              >
                {caseData.invoicedAmount}
              </Text>
            </View>
          </View>
        </View>

        {/* Hearings & Key Dates */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                fontFamily: fonts.semiBold,
              }}
            >
              Hearings & Key Dates
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#111827",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: "500",
                  fontFamily: fonts.medium,
                }}
              >
                Add next Hearing Date
              </Text>
            </TouchableOpacity>
          </View>

          {caseData.hearings.map((hearing: any, index: number) => (
            <View
              key={index}
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: 8,
                  fontFamily: fonts.medium,
                }}
              >
                {hearing.status}: {hearing.date} ({hearing.court})
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  fontFamily: fonts.regular,
                }}
              >
                {hearing.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Case Progress Timeline */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 30,
              fontFamily: fonts.semiBold,
            }}
          >
            Case Progress Timeline
          </Text>

          <View style={{ position: "relative", paddingVertical: 60 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  position: "relative",
                  minWidth: Math.max(400, caseData.timeline.length * 120),
                }}
              >
                {/* Timeline Line */}
                <View
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: "#e5e7eb",
                  }}
                />

                {/* Active portion of timeline */}
                <View
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "75%", // Adjust based on progress
                    height: 2,
                    backgroundColor: "#ff8800",
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 160,
                    minWidth: "100%",
                  }}
                >
                  {caseData.timeline.map((item: any, index: number) => {
                    const isAbove = index % 2 === 0; // Alternate above/below

                    return (
                      <View
                        key={index}
                        style={{
                          alignItems: "center",
                          width: Math.max(
                            100,
                            Math.max(400, caseData.timeline.length * 120) /
                              caseData.timeline.length
                          ),
                          position: "relative",
                          height: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {/* Date and Event - above the line */}
                        {isAbove && (
                          <View
                            style={{
                              position: "absolute",
                              top: 0,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                color: "#111827",
                                textAlign: "center",
                                marginBottom: 4,
                                fontFamily: fonts.medium,
                              }}
                            >
                              {item.date}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#6b7280",
                                textAlign: "center",
                                marginBottom: 8,
                                fontFamily: fonts.regular,
                              }}
                            >
                              {item.event}
                            </Text>
                            {/* Connecting line from text to dot */}
                            <View
                              style={{
                                width: 1,
                                height: 22,
                                backgroundColor: "#d1d5db",
                              }}
                            />
                          </View>
                        )}

                        {/* Timeline dot - positioned exactly on the line */}
                        <View
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            backgroundColor:
                              item.status === "completed" ||
                              item.status === "current"
                                ? "#ff8800"
                                : "#e5e7eb",
                            borderWidth: 3,
                            borderColor: "#ffffff",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                            zIndex: 1,
                          }}
                        />

                        {/* Inner dot for completed items */}
                        {item.status === "completed" && (
                          <View
                            style={{
                              position: "absolute",
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "#ffffff",
                              zIndex: 2,
                            }}
                          />
                        )}

                        {/* Date and Event - below the line */}
                        {!isAbove && (
                          <View
                            style={{
                              position: "absolute",
                              bottom: 0,
                              alignItems: "center",
                            }}
                          >
                            {/* Connecting line from dot to text */}
                            <View
                              style={{
                                width: 1,
                                height: 22,
                                backgroundColor: "#d1d5db",
                                marginBottom: 8,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                color: "#111827",
                                textAlign: "center",
                                marginBottom: 4,
                                fontFamily: fonts.medium,
                              }}
                            >
                              {item.date}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#6b7280",
                                textAlign: "center",
                                fontFamily: fonts.regular,
                              }}
                            >
                              {item.event}
                            </Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Documents */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginHorizontal: 20,
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                fontFamily: fonts.semiBold,
              }}
            >
              Documents
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#111827",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: "500",
                  fontFamily: fonts.medium,
                }}
              >
                Add Documents
              </Text>
            </TouchableOpacity>
          </View>

          {caseData.documents.map((doc: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth:
                  index < caseData.documents.length - 1 ? 1 : 0,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Ionicons
                name="document-text"
                size={20}
                color="#3b82f6"
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#3b82f6",
                  flex: 1,
                  fontFamily: fonts.regular,
                }}
              >
                {doc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaseDetailScreen;
