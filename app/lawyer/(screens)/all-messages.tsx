import { fonts } from "@/constants/fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import Header from "../../components/Header";
import NotificationPanel from "../(screens)/notifications";

interface Message {
  id: number;
  location: string;
  client: string;
  description: string;
  date: string;
  time: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
}

export default function AllMessages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread" | "high">("all");
  const [showNotifications, setShowNotifications] = useState(false);

  // Responsive design calculations
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  const isSmallScreen = screenWidth < 375;
  const isMediumScreen = screenWidth >= 375 && screenWidth < 414;
  const isLargeScreen = screenWidth >= 414;
  
  const cardPadding = isSmallScreen ? 16 : isMediumScreen ? 20 : 24;
  const horizontalPadding = isSmallScreen ? 20 : isMediumScreen ? 24 : 32;

  const handleNotificationPress = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleMarkAllRead = () => {
    // Implement mark all as read logic here
    setShowNotifications(false);
  };

  const messages: Message[] = [
    {
      id: 1,
      location: "Galle",
      client: "Kumara",
      description: "I want to request a meeting with you to discuss my case",
      date: "2025-07-11",
      time: "10:30 AM",
      isRead: false,
      priority: "high"
    },
    {
      id: 2,
      location: "Galle",
      client: "Kumara",
      description: "how the progress of my case is going?",
      date: "2025-07-11", 
      time: "11:15 AM",
      isRead: false,
      priority: "medium"
    },
    {
      id: 3,
      location: "Colombo",
      client: "Silva",
      description: "Need clarification on the legal documents",
      date: "2025-07-10",
      time: "2:45 PM",
      isRead: true,
      priority: "medium"
    },
    {
      id: 4,
      location: "Kandy",
      client: "Fernando",
      description: "Urgent: Court hearing scheduled for next week",
      date: "2025-07-10",
      time: "9:20 AM",
      isRead: false,
      priority: "high"
    },
    {
      id: 5,
      location: "Galle",
      client: "Perera",
      description: "Thank you for the successful case resolution",
      date: "2025-07-09",
      time: "4:00 PM",
      isRead: true,
      priority: "low"
    },
    {
      id: 6,
      location: "Negombo",
      client: "Wijesinghe",
      description: "Request for payment schedule adjustment",
      date: "2025-07-09",
      time: "1:30 PM",
      isRead: false,
      priority: "medium"
    },
    {
      id: 7,
      location: "Matara",
      client: "Rajapaksa",
      description: "Case documentation review needed",
      date: "2025-07-08",
      time: "11:00 AM",
      isRead: true,
      priority: "low"
    },
    {
      id: 8,
      location: "Colombo",
      client: "De Silva",
      description: "Emergency consultation required immediately",
      date: "2025-07-08",
      time: "8:45 AM",
      isRead: false,
      priority: "high"
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && !message.isRead) ||
                         (filterType === "high" && message.priority === "high");
    
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "#EF4444";
      case "medium": return "#F59E0B";
      case "low": return "#10B981";
      default: return "#6B7280";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "alert-circle";
      case "medium": return "warning";
      case "low": return "checkmark-circle";
      default: return "information-circle";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      {/* Header with Back Button */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: horizontalPadding,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={{
          fontSize: isSmallScreen ? 18 : 20,
          fontFamily: fonts.bold,
          color: '#000000'
        }}>
          All Messages
        </Text>
      </View>

      {/* Header */}
      <Header
        title=""
        showMenu={true}
        showNotification={true}
        backgroundColor="#f9fafb"
        textColor="#000"
        iconColor="#000"
        borderColor="#e5e7eb"
        showNotificationBadge={true}
        onMenuPress={() => {}}
        onNotificationPress={handleNotificationPress}
        onPaymentsPress={() => router.push("/lawyer/(drawer)/payments")}
        onMeetingsPress={() => router.push("/lawyer/(tabs)/calendar")}
        onCasedetails={() => router.push("/lawyer/(tabs)/cases")}
        onAccountUsers={() => router.push("/lawyer/(tabs)/profile")}
      />
      <NotificationPanel
        visible={showNotifications}
        onClose={handleCloseNotifications}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* Hero Section */}
        <View style={{ paddingHorizontal: horizontalPadding, paddingTop: isSmallScreen ? 32 : 24, paddingBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            backgroundColor: '#E1F1FF',
            paddingHorizontal: 16,
            borderRadius: 20,
            alignSelf: 'flex-start'
          }}>
            <Ionicons name="mail" size={16} color="#5E788F" style={{ marginRight: 8 }} />
            <Text style={{
              fontSize: isSmallScreen ? 11 : 12,
              fontFamily: fonts.medium,
              paddingVertical: 4,
              color: "#5E788F"
            }}>
              {filteredMessages.length} messages found
            </Text>
          </View>
          
          <Text style={{
            fontSize: isSmallScreen ? 20 : 24,
            fontFamily: fonts.bold,
            color: "#000000",
            marginBottom: 8,
            textAlign: 'left'
          }}>
            All Messages
          </Text>
          
          <Text style={{
            fontSize: isSmallScreen ? 14 : 16,
            fontFamily: fonts.regular,
            color: "#6b7280",
            textAlign: 'left',
            lineHeight: isSmallScreen ? 20 : 24
          }}>
            Manage and respond to all your client communications
          </Text>
        </View>

        {/* Search and Filter Section */}
        <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 24 }}>
          {/* Search Bar */}
          <View style={{
            backgroundColor: "#ffffff",
            borderRadius: isSmallScreen ? 8 : 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: isSmallScreen ? 10 : 12,
                paddingHorizontal: 12,
                fontSize: isSmallScreen ? 14 : 16,
                color: "#000000",
                fontFamily: fonts.regular,
              }}
              placeholder="Search messages..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Buttons */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#f3f4f6",
            borderRadius: isSmallScreen ? 8 : 12,
            padding: 4,
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: filterType === "all" ? "#ffffff" : "transparent",
                borderRadius: isSmallScreen ? 6 : 8,
                paddingHorizontal: isSmallScreen ? 16 : 20,
                paddingVertical: isSmallScreen ? 8 : 10,
                flex: 1,
                marginRight: 4,
                alignItems: "center",
                shadowColor: filterType === "all" ? "#000" : "transparent",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: filterType === "all" ? 0.1 : 0,
                shadowRadius: 2,
                elevation: filterType === "all" ? 2 : 0,
              }}
              onPress={() => setFilterType("all")}
            >
              <Text style={{
                color: filterType === "all" ? "#000000" : "#6B7280",
                fontSize: isSmallScreen ? 12 : 14,
                fontFamily: fonts.semiBold,
              }}>
                All ({messages.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: filterType === "unread" ? "#ffffff" : "transparent",
                borderRadius: isSmallScreen ? 6 : 8,
                paddingHorizontal: isSmallScreen ? 16 : 20,
                paddingVertical: isSmallScreen ? 8 : 10,
                flex: 1,
                marginHorizontal: 2,
                alignItems: "center",
                shadowColor: filterType === "unread" ? "#000" : "transparent",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: filterType === "unread" ? 0.1 : 0,
                shadowRadius: 2,
                elevation: filterType === "unread" ? 2 : 0,
              }}
              onPress={() => setFilterType("unread")}
            >
              <Text style={{
                color: filterType === "unread" ? "#000000" : "#6B7280",
                fontSize: isSmallScreen ? 12 : 14,
                fontFamily: fonts.semiBold,
              }}>
                Unread ({messages.filter(m => !m.isRead).length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: filterType === "high" ? "#ffffff" : "transparent",
                borderRadius: isSmallScreen ? 6 : 8,
                paddingHorizontal: isSmallScreen ? 16 : 20,
                paddingVertical: isSmallScreen ? 8 : 10,
                flex: 1,
                marginLeft: 4,
                alignItems: "center",
                shadowColor: filterType === "high" ? "#000" : "transparent",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: filterType === "high" ? 0.1 : 0,
                shadowRadius: 2,
                elevation: filterType === "high" ? 2 : 0,
              }}
              onPress={() => setFilterType("high")}
            >
              <Text style={{
                color: filterType === "high" ? "#000000" : "#6B7280",
                fontSize: isSmallScreen ? 12 : 14,
                fontFamily: fonts.semiBold,
              }}>
                Priority ({messages.filter(m => m.priority === "high").length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages List */}
        <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 40 }}>
          {filteredMessages.length === 0 ? (
            <View style={{
              backgroundColor: "#ffffff",
              borderRadius: isSmallScreen ? 12 : 16,
              padding: cardPadding * 2,
              alignItems: "center",
              marginTop: 40,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}>
              <Ionicons name="mail-outline" size={64} color="#D1D5DB" />
              <Text style={{
                fontSize: isSmallScreen ? 16 : 18,
                color: "#6B7280",
                marginTop: 16,
                fontFamily: fonts.medium,
              }}>
                No messages found
              </Text>
              <Text style={{
                fontSize: isSmallScreen ? 13 : 14,
                color: "#9CA3AF",
                marginTop: 8,
                textAlign: "center",
                fontFamily: fonts.regular,
              }}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          ) : (
            filteredMessages.map((message) => (
              <TouchableOpacity
                key={message.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: isSmallScreen ? 8 : 12,
                  padding: cardPadding,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderLeftWidth: 4,
                  borderLeftColor: message.isRead ? "#E5E7EB" : "#FF8800",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                {/* Message Header */}
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}>
                  <View style={{ flex: 1 }}>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}>
                      <Ionicons name="person-circle" size={20} color="#6B7280" style={{ marginRight: 8 }} />
                      <Text style={{
                        fontSize: isSmallScreen ? 13 : 14,
                        color: "#000000",
                        fontFamily: fonts.semiBold,
                      }}>
                        {message.client}
                      </Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                      <Ionicons name="location" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                      <Text style={{
                        fontSize: isSmallScreen ? 12 : 13,
                        color: "#6B7280",
                        fontFamily: fonts.medium,
                      }}>
                        {message.location}
                      </Text>
                    </View>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}>
                      <Ionicons 
                        name={getPriorityIcon(message.priority)} 
                        size={16} 
                        color={getPriorityColor(message.priority)} 
                        style={{ marginRight: 4 }}
                      />
                      <Text style={{
                        fontSize: isSmallScreen ? 10 : 11,
                        color: getPriorityColor(message.priority),
                        fontFamily: fonts.semiBold,
                        textTransform: "uppercase",
                      }}>
                        {message.priority}
                      </Text>
                    </View>
                    <Text style={{
                      fontSize: isSmallScreen ? 11 : 12,
                      color: "#6B7280",
                      fontFamily: fonts.regular,
                    }}>
                      {message.date}
                    </Text>
                    <Text style={{
                      fontSize: isSmallScreen ? 11 : 12,
                      color: "#6B7280",
                      fontFamily: fonts.regular,
                    }}>
                      {message.time}
                    </Text>
                  </View>
                </View>

                {/* Message Content */}
                <Text style={{
                  fontSize: isSmallScreen ? 13 : 14,
                  color: "#374151",
                  lineHeight: 20,
                  fontFamily: fonts.regular,
                  marginBottom: 12,
                }}>
                  {message.description}
                </Text>

                {/* Action Buttons */}
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 6,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      marginRight: 8,
                    }}
                  >
                    <Text style={{
                      fontSize: isSmallScreen ? 11 : 12,
                      color: "#374151",
                      fontFamily: fonts.medium,
                    }}>
                      Reply
                    </Text>
                  </TouchableOpacity>
                  
                  {!message.isRead && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FF8800",
                        borderRadius: 6,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                      }}
                    >
                      <Text style={{
                        fontSize: isSmallScreen ? 11 : 12,
                        color: "#ffffff",
                        fontFamily: fonts.medium,
                      }}>
                        Mark Read
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Custom Bottom Navigation */}
      <View style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderTopColor: "#f3f4f6",
        paddingHorizontal: horizontalPadding,
        paddingVertical: 12,
        paddingBottom: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/dashboard")}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}>
            <MaterialIcons name="dashboard" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/calendar")}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}>
            <Ionicons name="calendar" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/cases")}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}>
            <Ionicons name="briefcase" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/search")}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}>
            <Ionicons name="search" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
          }}
          onPress={() => router.push("/lawyer/(tabs)/profile")}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}>
            <Ionicons name="person" size={24} color="#6b7280" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
