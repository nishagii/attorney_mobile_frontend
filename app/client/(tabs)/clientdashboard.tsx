import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

export default function Dashboard() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showNotifications, setShowNotifications] = useState(false);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleNotificationPress = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#111827" }}>
      {/* Unified Header */}
      <Header
        title=""
        showMenu={true}
        showNotification={true}
        backgroundColor="#111827"
        textColor="#fff"
        iconColor="#fff"
        borderColor="#111827"
        showNotificationBadge={true}
        onMenuPress={() => {}}
        onNotificationPress={handleNotificationPress}
        onPaymentsPress={() => {}}
        onMeetingsPress={() => {}}
        onCasedetails={() => {}}
        onAccountUsers={() => {}}
      />

      {/* Main Content with Layered Background */}
      <View style={{ flex: 1, backgroundColor: "#111827" }}>
        {/* Welcome Message Section */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 4,
              fontFamily: fonts.semiBold,
            }}
          >
            Hello Nethsilu Marasinghe, Welcome
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#FF8800",
              marginBottom: 12,
              fontWeight: "500",
              fontFamily: fonts.medium,
            }}
          >
            Today is 07/16/2025
          </Text>
        </View>

        {/* White Rounded Overlay Container */}
        <LinearGradient
          colors={["#fff3e0", "#f9fafb", "#f9fafb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.1 }}
          style={{
            flex: 1,
            marginTop: 40,
            borderTopLeftRadius: 100,
            paddingTop: 80,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            bounces={true}
          >
            {/* Due Payments Section */}
            <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Due Payments
              </Text>

              {/* Case A Payment */}
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#323D68",
                      marginBottom: 4,
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Case A
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#666",
                      fontFamily: fonts.regular,
                    }}
                  >
                    Due: Jul 12, 2023
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#EF4444",
                    fontFamily: fonts.bold,
                  }}
                >
                  $1,200
                </Text>
              </View>

              {/* Case B Payment */}
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#323D68",
                      marginBottom: 4,
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Case B
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#666",
                      fontFamily: fonts.regular,
                    }}
                  >
                    Due: Jul 15, 2023
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#EF4444",
                    fontFamily: fonts.bold,
                  }}
                >
                  $850
                </Text>
              </View>

              {/* View All Payments Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#323D68",
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  View All Payments
                </Text>
              </TouchableOpacity>
            </View>

            {/* Upcoming Meetings Section */}
            <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Upcoming Meetings
              </Text>

              {/* Meeting 1 */}
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#323D68",
                      marginBottom: 4,
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Lawyer: Nishagi Jewantha
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#666",
                      fontFamily: fonts.regular,
                    }}
                  >
                    Jul 12, 2023
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#10B981",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "600",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Confirmed
                  </Text>
                </View>
              </View>

              {/* Meeting 2 */}
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#323D68",
                      marginBottom: 4,
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Lawyer: John Doe
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#666",
                      fontFamily: fonts.regular,
                    }}
                  >
                    Jul 18, 2023
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#F59E0B",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "600",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Pending
                  </Text>
                </View>
              </View>

              {/* Request Meeting Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#323D68",
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  Request Meeting
                </Text>
              </TouchableOpacity>
            </View>

            {/* Recent Cases Section */}
            <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Your Cases
              </Text>

              {/* Case Card */}
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#323D68",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Civil Case #12345
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#3B82F6",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      Active
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    marginBottom: 8,
                    fontFamily: fonts.regular,
                  }}
                >
                  Lawyer: Nishagi Jewantha
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    fontFamily: fonts.regular,
                  }}
                >
                  Next hearing: July 20, 2023
                </Text>
              </TouchableOpacity>

              {/* Another Case Card */}
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#323D68",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Contract Dispute #67890
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#10B981",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      Completed
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    marginBottom: 8,
                    fontFamily: fonts.regular,
                  }}
                >
                  Lawyer: John Doe
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    fontFamily: fonts.regular,
                  }}
                >
                  Completed: June 15, 2023
                </Text>
              </TouchableOpacity>

              {/* View All Cases Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#FF8800",
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  View All Cases
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Actions Section */}
            <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Quick Actions
              </Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 20,
                    alignItems: "center",
                    flex: 1,
                    marginRight: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Ionicons name="document-text" size={32} color="#3B82F6" style={{ marginBottom: 8 }} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#323D68",
                      textAlign: "center",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    New Case
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 20,
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Ionicons name="people" size={32} color="#10B981" style={{ marginBottom: 8 }} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#323D68",
                      textAlign: "center",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Find Lawyer
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 20,
                    alignItems: "center",
                    flex: 1,
                    marginRight: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Ionicons name="card" size={32} color="#F59E0B" style={{ marginBottom: 8 }} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#323D68",
                      textAlign: "center",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Make Payment
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 20,
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Ionicons name="chatbubbles" size={32} color="#EF4444" style={{ marginBottom: 8 }} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#323D68",
                      textAlign: "center",
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    Messages
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
}