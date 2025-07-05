import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "@/constants/fonts";

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={["#fff3e0", "#f9fafb", "#f9fafb"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: "#ffffff",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#000000",
              fontFamily: fonts.semiBold,
            }}
          >
            Profile
          </Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {/* Profile Section */}
          <View
            style={{
              backgroundColor: "#ffffff",
              marginHorizontal: 20,
              marginTop: 20,
              borderRadius: 16,
              padding: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#F3F4F6",
                  marginRight: 16,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#111827",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="person" size={30} color="white" />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 4,
                    fontFamily: fonts.semiBold,
                  }}
                >
                  Thusitha Wijekoon
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    fontFamily: fonts.regular,
                  }}
                >
                  Attorney at Law
                </Text>
              </View>
            </View>
          </View>

          {/* Settings Section */}
          <View
            style={{
              backgroundColor: "#ffffff",
              marginHorizontal: 20,
              marginTop: 24,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
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
                Settings
              </Text>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Ionicons
                name="settings-outline"
                size={20}
                color="#6b7280"
                style={{ marginRight: 16 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#111827",
                  flex: 1,
                }}
              >
                Preferences
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
              onPress={() => router.push("/common/(screens)/pricing")}
            >
              <Ionicons
                name="card-outline"
                size={20}
                color="#6b7280"
                style={{ marginRight: 16 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#111827",
                  flex: 1,
                }}
              >
                Plans & Pricing
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color="#6b7280"
                style={{ marginRight: 16 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#111827",
                  flex: 1,
                }}
              >
                Account
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Resources Section */}
          <View
            style={{
              backgroundColor: "#ffffff",
              marginHorizontal: 20,
              marginTop: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                Resources
              </Text>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Ionicons
                name="help-circle-outline"
                size={20}
                color="#6b7280"
                style={{ marginRight: 16 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#111827",
                  flex: 1,
                }}
              >
                Support
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
              onPress={() => router.replace("/auth/login")}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color="#dc2626"
                style={{ marginRight: 16 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#dc2626",
                  flex: 1,
                  fontWeight: "500",
                }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>

          {/* Version */}
          <View
            style={{
              alignItems: "center",
              marginVertical: 32,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#9ca3af",
              }}
            >
              4.21.5
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
