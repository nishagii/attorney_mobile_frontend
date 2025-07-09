import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "@/constants/fonts";
import Header from "@/app/components/Header";

export default function Dashboard() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleMenuPress = () => {
    // Handle menu action
    console.log("Menu pressed");
  };

  const handleNotificationPress = () => {
    // Handle notification action
    console.log("Notification pressed");
  };

  const handlePaymentsPress = () => {
    router.push("/lawyer/(screens)/payments");
  };

  const handleMeetingsPress = () => {
    router.push("/lawyer/(tabs)/calendar");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111827" }}>
      {/* Header with blue background and white icons */}
      <Header
        title=""
        showMenu={true}
        showNotification={true}
        showNotificationBadge={true}
        onMenuPress={handleMenuPress}
        onNotificationPress={handleNotificationPress}
        onPaymentsPress={handlePaymentsPress}
        onMeetingsPress={handleMeetingsPress}
        backgroundColor="#111827"
        textColor="#ffffff"
        iconColor="#ffffff"
        borderColor="#111827"
      />

      {/* Main Content with Layered Background */}
      <View style={{ flex: 1, backgroundColor: "#111827" }}>
        {/* Welcome Message Section in Orange Background */}
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
            Hello Thusitha, Welcome!
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
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* White Rounded Overlay Container with Gradient */}
        <LinearGradient
          colors={["#fff3e0", "#f9fafb", "#f9fafb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.1 }}
          style={{
            flex: 1,
            marginTop: 40,
            borderTopLeftRadius: 100,
            paddingTop: 40,
          }}
        >
          {/* Cards Positioned to Float on Top of Boundary */}
          <Animated.View
            style={{
              position: "absolute",
              top: -60,
              left: 20,
              right: 20,
              zIndex: 10,
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [0, 150],
                    outputRange: [1, 0.7], // Scale down more for single row
                    extrapolate: "clamp",
                  }),
                },
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 150],
                    outputRange: [0, -40], // Move up more for strip effect
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            {/* Single Row Strip Layout - Shows when scrolling */}
            <Animated.View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                opacity: scrollY.interpolate({
                  inputRange: [40, 90],
                  outputRange: [0, 1], // Fade in single row layout
                  extrapolate: "clamp",
                }),
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [40, 90],
                      outputRange: [20, 0], // Slide up into view
                      extrapolate: "clamp",
                    }),
                  },
                ],
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 80,
                paddingHorizontal: 8,
              }}
            >
              {/* Due Payments - Strip */}
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 16,
                  flex: 1,
                  marginHorizontal: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#999999",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 8,
                }}
                onPress={() => router.push("/lawyer/(screens)/duePayments")}
              >
                <View
                  style={{
                    backgroundColor: "#323D68",
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="cash-outline" size={20} color="white" />
                </View>
              </TouchableOpacity>

              {/* Timeline - Strip */}
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 16,
                  flex: 1,
                  marginHorizontal: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#999999",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#FF8800",
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="time-outline" size={20} color="white" />
                </View>
              </TouchableOpacity>

              {/* Incomes - Strip */}
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 16,
                  flex: 1,
                  marginHorizontal: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#999999",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#5E788F",
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name="trending-up-outline"
                    size={20}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              {/* Day Summary - Strip */}
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 16,
                  flex: 1,
                  marginHorizontal: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#999999",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#7B1FA2",
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="calendar-outline" size={20} color="white" />
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Original 2x2 Grid Layout - Hides when scrolling */}
            <Animated.View
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [0, 60],
                  outputRange: [1, 0], // Fade out original layout
                  extrapolate: "clamp",
                }),
                transform: [
                  {
                    scale: scrollY.interpolate({
                      inputRange: [0, 60],
                      outputRange: [1, 0.9], // Slightly scale down as it fades
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            >
              {/* First Row of Floating Cards */}
              <Animated.View
                style={{
                  flexDirection: "row",
                  marginHorizontal: -4,
                  marginBottom: 12,
                  transform: [
                    {
                      scaleY: scrollY.interpolate({
                        inputRange: [0, 80, 150],
                        outputRange: [1, 0.7, 0.5], // Smoother compression to strip
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                }}
              >
                <View style={{ width: "50%", padding: 4 }}>
                  <Animated.View
                    style={{
                      shadowColor: "#999999",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: scrollY.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0.15, 0.15], // Consistent bottom shadow for big cards
                        extrapolate: "clamp",
                      }),
                      shadowRadius: scrollY.interpolate({
                        inputRange: [0, 100],
                        outputRange: [8, 6], // Reduce blur radius for strip effect
                        extrapolate: "clamp",
                      }),
                      elevation: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        borderRadius: 16,
                        padding: 16,
                        overflow: "hidden",
                        shadowColor: "#999999",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        elevation: 20,
                      }} // Hide content that overflows during scaling
                      onPress={() =>
                        router.push("/lawyer/(screens)/duePayments")
                      }
                    >
                      <Animated.View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          opacity: scrollY.interpolate({
                            inputRange: [30, 80],
                            outputRange: [0, 1], // Fade in strip layout earlier
                            extrapolate: "clamp",
                          }),
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          paddingHorizontal: 8,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#323D68",
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 8,
                          }}
                        >
                          <Ionicons
                            name="cash-outline"
                            size={14}
                            color="white"
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#323D68",
                            fontFamily: fonts.semiBold,
                          }}
                        >
                          $2,500
                        </Text>
                      </Animated.View>

                      <Animated.View
                        style={{
                          opacity: scrollY.interpolate({
                            inputRange: [0, 50],
                            outputRange: [1, 0], // Hide vertical layout when scrolling
                            extrapolate: "clamp",
                          }),
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#323D68",
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 12,
                          }}
                        >
                          <Ionicons
                            name="cash-outline"
                            size={20}
                            color="white"
                          />
                        </View>
                        <Text
                          style={{
                            color: "#5E788F",
                            fontSize: 14,
                            fontFamily: fonts.regular,
                          }}
                        >
                          Due Payments
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginTop: 4,
                            color: "#323D68",
                            fontFamily: fonts.semiBold,
                          }}
                        >
                          $2,500
                        </Text>
                      </Animated.View>
                    </TouchableOpacity>
                  </Animated.View>
                </View>

                <View style={{ width: "50%", padding: 4 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      borderRadius: 16,
                      padding: 16,
                      shadowColor: "#999999",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: 20,
                      overflow: "hidden",
                    }}
                  >
                    <Animated.View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        opacity: scrollY.interpolate({
                          inputRange: [30, 80],
                          outputRange: [0, 1],
                          extrapolate: "clamp",
                        }),
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        paddingHorizontal: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#FF8800",
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 8,
                        }}
                      >
                        <Ionicons name="time-outline" size={14} color="white" />
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#323D68",
                          fontFamily: fonts.semiBold,
                        }}
                      >
                        12 Items
                      </Text>
                    </Animated.View>

                    <Animated.View
                      style={{
                        opacity: scrollY.interpolate({
                          inputRange: [0, 50],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#FF8800",
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 12,
                        }}
                      >
                        <Ionicons name="time-outline" size={20} color="white" />
                      </View>
                      <Text
                        style={{
                          color: "#5E788F",
                          fontSize: 14,
                          fontFamily: fonts.regular,
                        }}
                      >
                        Timeline
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          marginTop: 4,
                          color: "#323D68",
                          fontFamily: fonts.semiBold,
                        }}
                      >
                        12 Items
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {/* Second Row of Floating Cards */}
              <Animated.View
                style={{
                  flexDirection: "row",
                  marginHorizontal: -4,
                  transform: [
                    {
                      scaleY: scrollY.interpolate({
                        inputRange: [0, 80, 150],
                        outputRange: [1, 0.7, 0.5], // Smoother compression
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                }}
              >
                <View style={{ width: "50%", padding: 4 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      borderRadius: 16,
                      padding: 16,
                      shadowColor: "#999999",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: 20,
                      overflow: "hidden",
                    }}
                  >
                    <Animated.View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        opacity: scrollY.interpolate({
                          inputRange: [30, 80],
                          outputRange: [0, 1],
                          extrapolate: "clamp",
                        }),
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        paddingHorizontal: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#5E788F",
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 8,
                        }}
                      >
                        <Ionicons
                          name="trending-up-outline"
                          size={14}
                          color="white"
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#323D68",
                          fontFamily: fonts.semiBold,
                        }}
                      >
                        $8,750
                      </Text>
                    </Animated.View>

                    <Animated.View
                      style={{
                        opacity: scrollY.interpolate({
                          inputRange: [0, 50],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#5E788F",
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 12,
                        }}
                      >
                        <Ionicons
                          name="trending-up-outline"
                          size={20}
                          color="white"
                        />
                      </View>
                      <Text
                        style={{
                          color: "#5E788F",
                          fontSize: 14,
                          fontFamily: fonts.regular,
                        }}
                      >
                        Incomes
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          marginTop: 4,
                          color: "#323D68",
                          fontFamily: fonts.semiBold,
                        }}
                      >
                        $8,750
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: "50%", padding: 4 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      borderRadius: 16,
                      padding: 16,
                      shadowColor: "#999999",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: 20,
                      overflow: "hidden",
                    }}
                  >
                    <Animated.View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        opacity: scrollY.interpolate({
                          inputRange: [30, 80],
                          outputRange: [0, 1],
                          extrapolate: "clamp",
                        }),
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        paddingHorizontal: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#7B1FA2",
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 8,
                        }}
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color="white"
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#323D68",
                          fontFamily: fonts.semiBold,
                        }}
                      >
                        5 Activities
                      </Text>
                    </Animated.View>

                    <Animated.View
                      style={{
                        opacity: scrollY.interpolate({
                          inputRange: [0, 50],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#7B1FA2",
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 12,
                        }}
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color="white"
                        />
                      </View>
                      <Text
                        style={{
                          color: "#5E788F",
                          fontSize: 14,
                          fontFamily: fonts.regular,
                        }}
                      >
                        Day Summary
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          marginTop: 4,
                          color: "#323D68",
                          fontFamily: fonts.semiBold,
                        }}
                      >
                        5 Activities
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            bounces={true}
          >
            {/* Spacer for floating cards */}
            <View style={{ height: 250 }} />

            {/* Action Cards Grid - 2x3 Layout */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 32,
              }}
            >
              {/* First Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    width: "30%",
                    minHeight: 90,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#E3F2FD",
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons
                      name="arrow-up-outline"
                      size={24}
                      color="#1976D2"
                    />
                  </View>
                  <Text
                    style={{
                      color: "#323D68",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: fonts.medium,
                    }}
                  >
                    Due Payments
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    width: "30%",
                    minHeight: 90,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#E8F5E8",
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons name="cash-outline" size={24} color="#2E7D32" />
                  </View>
                  <Text
                    style={{
                      color: "#323D68",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: fonts.medium,
                    }}
                  >
                    Send Money
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    width: "30%",
                    minHeight: 90,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FFF3E0",
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons
                      name="swap-horizontal-outline"
                      size={24}
                      color="#FF8800"
                    />
                  </View>
                  <Text
                    style={{
                      color: "#323D68",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: fonts.medium,
                    }}
                  >
                    Transfer
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Second Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    width: "30%",
                    minHeight: 90,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FFEBEE",
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons
                      name="phone-portrait-outline"
                      size={24}
                      color="#D32F2F"
                    />
                  </View>
                  <Text
                    style={{
                      color: "#323D68",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: fonts.medium,
                    }}
                  >
                    Mobile Cases
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    width: "30%",
                    minHeight: 90,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#F3E5F5",
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons
                      name="document-text-outline"
                      size={24}
                      color="#7B1FA2"
                    />
                  </View>
                  <Text
                    style={{
                      color: "#323D68",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: fonts.medium,
                    }}
                  >
                    Bill Payment
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    width: "30%",
                    minHeight: 90,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#F1F8E9",
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons name="card-outline" size={24} color="#689F38" />
                  </View>
                  <Text
                    style={{
                      color: "#323D68",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: fonts.medium,
                    }}
                  >
                    Analytics
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Account Summary Cards */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#FF8800",
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 16,
                    }}
                  >
                    <Ionicons name="person-outline" size={24} color="white" />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#323D68",
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      Accounts
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#5E788F",
                        fontFamily: fonts.regular,
                      }}
                    >
                      Total Account Balance
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#323D68",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  $8,750.24
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#D32F2F",
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 16,
                    }}
                  >
                    <Ionicons name="card-outline" size={24} color="white" />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#323D68",
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      Cases
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#5E788F",
                        fontFamily: fonts.regular,
                      }}
                    >
                      Total Case Balance
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#323D68",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  $2,500.00
                </Text>
              </TouchableOpacity>
            </View>

            {/* Hearings Section */}
            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 12,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Hearings to attend today
              </Text>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginBottom: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#323D68",
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      Case # 103464 - H.M.S.J Dewasiritha
                    </Text>
                    <Text
                      style={{
                        color: "#5E788F",
                        fontSize: 14,
                        fontFamily: fonts.regular,
                      }}
                    >
                      High Court
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#E3F2FD",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1976D2",
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      In-progress
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginBottom: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#323D68",
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      Case # 103465 - Sahan Perera
                    </Text>
                    <Text
                      style={{
                        color: "#5E788F",
                        fontSize: 14,
                        fontFamily: fonts.regular,
                      }}
                    >
                      Magistrate Court
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#F3E5F5",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#7B1FA2",
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      Upfront
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginBottom: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#323D68",
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      Case # 103465 - Kamala Silva
                    </Text>
                    <Text
                      style={{
                        color: "#5E788F",
                        fontSize: 14,
                        fontFamily: fonts.regular,
                      }}
                    >
                      District Court
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#FFF3E0",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FF8800",
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      Delayed
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Monthly Income */}
            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 12,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Monthly Income
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#323D68",
                    fontFamily: fonts.semiBold,
                  }}
                >
                  $7,500
                </Text>
              </View>
            </View>

            {/* Meeting Requests */}
            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 12,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Meeting Requests
              </Text>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginBottom: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#323D68",
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      H.M.N.L Dewasiritha
                    </Text>
                    <Text
                      style={{
                        color: "#5E788F",
                        fontSize: 14,
                        fontFamily: fonts.regular,
                      }}
                    >
                      2023-08-10 · Sunday
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#FFF3E0",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FF8800",
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      Pending
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginBottom: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#323D68",
                        fontFamily: fonts.semiBold,
                      }}
                    >
                      Nimal Bandara
                    </Text>
                    <Text
                      style={{
                        color: "#5E788F",
                        fontSize: 14,
                        fontFamily: fonts.regular,
                      }}
                    >
                      2023-08-12 · Tuesday | Case # 203247
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#E8F5E8",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#2E7D32",
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: fonts.medium,
                      }}
                    >
                      Confirmed
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginBottom: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "600", color: "#323D68" }}>
                      Priya Fernando
                    </Text>
                    <Text style={{ color: "#5E788F", fontSize: 14 }}>
                      2023-08-16 · Wednesday
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#FFEBEE",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#C62828",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      Rescheduled
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Analytics */}
            <View
              style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 32 }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 12,
                  color: "#323D68",
                  fontFamily: fonts.semiBold,
                }}
              >
                Overall Analytics
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#5E788F",
                    fontSize: 16,
                    fontFamily: fonts.regular,
                  }}
                >
                  Overall Analytics Chart
                </Text>
                {/* You can add a chart component here */}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
}
