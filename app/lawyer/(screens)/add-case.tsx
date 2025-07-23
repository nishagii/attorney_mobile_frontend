import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import SimpleHeader from "@/app/components/SimpleHeader";
// Assuming fonts is for NativeWind/Tailwind font configuration or a utility
// If `fonts` directly imports a StyleSheet, you might need to adjust or remove it.
// For Tailwind, you'd typically configure fonts in tailwind.config.js
import { fonts } from "@/constants/fonts";

// Define types for your form state and options
interface CaseFormState {
  caseName: string;
  caseNumber: string;
  caseType: string;
  court: string;
  date: string; // YYYY-MM-DD
  description: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  opposingParty: string;
  junior: string;
  agreedFee: string;
  paymentStatus: string;
}

interface Option {
  value: string;
  label: string;
}

const initialState: CaseFormState = {
  caseName: "",
  caseNumber: "",
  caseType: "",
  court: "",
  date: "",
  description: "",
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  opposingParty: "",
  junior: "",
  agreedFee: "",
  paymentStatus: "",
};

const caseTypeOptions: Option[] = [
  { value: "MR/DMR", label: "MR/DMR - Money Recovery" },
  { value: "DR/DDR", label: "DR/DDR - Debt Recovery" },
  { value: "L/DLM", label: "L/DLM - Land" },
  // ... (add more options as needed)
];

const paymentStatusOptions: Option[] = [
  { value: "Paid", label: "Paid" },
  { value: "Partially Paid", label: "Partially Paid" },
  { value: "Not Paid", label: "Not Paid" },
];

// Props for navigation, assuming it's part of a React Navigation setup
interface AddCaseScreenProps {
  navigation: any; // You can refine this type based on your navigation setup (e.g., StackNavigationProp)
}

export default function AddCaseScreen({ navigation }: AddCaseScreenProps) {
  const [form, setForm] = useState<CaseFormState>(initialState);
  const [juniorLawyerOptions, setJuniorLawyerOptions] = useState<Option[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDateObject, setSelectedDateObject] = useState<Date>(
    new Date()
  );

  useEffect(() => {
    // Mock data for juniors
    setJuniorLawyerOptions([
      { value: "1", label: "Jane Smith" },
      { value: "2", label: "David Chen" },
      { value: "3", label: "Aisha Khan" },
    ]);
  }, []);

  const handleChange = <K extends keyof CaseFormState>(
    name: K,
    value: CaseFormState[K]
  ) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || selectedDateObject;
    setShowDatePicker(Platform.OS === "ios");
    setSelectedDateObject(currentDate);

    const formattedDate = currentDate.toISOString().split("T")[0];
    handleChange("date", formattedDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (
        !form.caseName ||
        !form.caseNumber ||
        !form.caseType ||
        !form.court ||
        !form.date ||
        !form.clientName ||
        !form.clientPhone
      ) {
        Alert.alert("Validation Error", "Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Your API call would go here
      // console.log("Submitting form:", form);
      // const response = await fetch('YOUR_API_ENDPOINT/cases', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(form),
      // });
      // const data = await response.json();
      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to create case');
      // }

      Alert.alert("Success", "Case profile created successfully!");
      setForm(initialState);
      navigation.goBack();
    } catch (error: any) {
      console.error("Submission error:", error);
      Alert.alert(
        "Error",
        `Failed to create case. ${error.message || "Please try again."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputWrapper: React.FC<{
    label: string;
    children: React.ReactNode;
    required?: boolean;
  }> = ({ label, children, required = false }) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      {children}
    </View>
  );

  const scrollViewRef = useRef(null);

  return (
    <View className="flex-1 bg-gray-50">
      <SimpleHeader title="New Case Profile" />
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Case Details Card */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm shadow-gray-200">
          <Text className="text-xl font-semibold text-gray-800 mb-5">
            Case Details
          </Text>
          <InputWrapper label="Case Name" required>
            <TextInput
              placeholder="e.g., John Doe vs. ACME Corp"
              value={form.caseName}
              onChangeText={(v) => handleChange("caseName", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              placeholderTextColor="#9ca3af"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </InputWrapper>
          <InputWrapper label="Case Type" required>
            <View className="bg-gray-100 rounded-lg border border-gray-200 justify-center overflow-hidden">
              <Picker
                selectedValue={form.caseType}
                onValueChange={(v) => handleChange("caseType", v)}
                className="h-12 w-full text-base"
                itemStyle={{
                  fontFamily: fonts.regular,
                  fontSize: 16,
                  color: "#111827",
                }} // iOS only, for font and color
              >
                <Picker.Item
                  label="Select a type..."
                  value=""
                  enabled={true}
                  style={{ color: "#9ca3af" }}
                />
                {caseTypeOptions.map((opt) => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}
              </Picker>
            </View>
          </InputWrapper>
          <InputWrapper label="Case Number" required>
            <TextInput
              placeholder="e.g., MR/1234/2025"
              value={form.caseNumber}
              onChangeText={(v) => handleChange("caseNumber", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              placeholderTextColor="#9ca3af"
              returnKeyType="next"
              blurOnSubmit={false}
              autoCapitalize="characters"
            />
          </InputWrapper>
          <InputWrapper label="Court" required>
            <TextInput
              placeholder="e.g., District Court of Colombo"
              value={form.court}
              onChangeText={(v) => handleChange("court", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              placeholderTextColor="#9ca3af"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </InputWrapper>
          <InputWrapper label="Hearing Date" required>
            <TouchableOpacity onPress={showDatepicker} activeOpacity={0.7}>
              <TextInput
                placeholder="YYYY-MM-DD"
                value={form.date}
                editable={false}
                className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
                placeholderTextColor="#9ca3af"
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={selectedDateObject}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </InputWrapper>
          <InputWrapper label="Description">
            <TextInput
              placeholder="Brief summary of the case..."
              value={form.description}
              onChangeText={(v) => handleChange("description", v)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200 min-h-[100px] pt-3"
              placeholderTextColor="#9ca3af"
              returnKeyType="default"
            />
          </InputWrapper>
        </View>

        {/* Parties Involved Card */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm shadow-gray-200">
          <Text className="text-xl font-semibold text-gray-800 mb-5">
            Parties Involved
          </Text>
          <InputWrapper label="Client Name" required>
            <TextInput
              placeholder="e.g., John Doe"
              value={form.clientName}
              onChangeText={(v) => handleChange("clientName", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              placeholderTextColor="#9ca3af"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </InputWrapper>
          <InputWrapper label="Client Phone" required>
            <TextInput
              placeholder="e.g., 0712345678"
              value={form.clientPhone}
              onChangeText={(v) => handleChange("clientPhone", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              keyboardType="phone-pad"
              placeholderTextColor="#9ca3af"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </InputWrapper>
          <InputWrapper label="Client Email">
            <TextInput
              placeholder="e.g., client@example.com"
              value={form.clientEmail}
              onChangeText={(v) => handleChange("clientEmail", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </InputWrapper>
          <InputWrapper label="Opposing Party">
            <TextInput
              placeholder="e.g., ACME Corporation"
              value={form.opposingParty}
              onChangeText={(v) => handleChange("opposingParty", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              placeholderTextColor="#9ca3af"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </InputWrapper>
          <InputWrapper label="Junior Associated">
            <View className="bg-gray-100 rounded-lg border border-gray-200 justify-center overflow-hidden">
              <Picker
                selectedValue={form.junior}
                onValueChange={(v) => handleChange("junior", v)}
                className="h-12 w-full text-base"
                itemStyle={{
                  fontFamily: fonts.regular,
                  fontSize: 16,
                  color: "#111827",
                }} // iOS only
              >
                <Picker.Item
                  label="Select a junior lawyer..."
                  value=""
                  enabled={true}
                  style={{ color: "#9ca3af" }}
                />
                {juniorLawyerOptions.map((opt) => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}
              </Picker>
            </View>
          </InputWrapper>
        </View>

        {/* Financials Card */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm shadow-gray-200">
          <Text className="text-xl font-semibold text-gray-800 mb-5">
            Financials
          </Text>
          <InputWrapper label="Agreed Fee (LKR)">
            <TextInput
              placeholder="e.g., 50000"
              value={form.agreedFee}
              onChangeText={(v) => handleChange("agreedFee", v)}
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900 border border-gray-200"
              keyboardType="decimal-pad"
              placeholderTextColor="#9ca3af"
              returnKeyType="done"
            />
          </InputWrapper>
          <InputWrapper label="Payment Status">
            <View className="bg-gray-100 rounded-lg border border-gray-200 justify-center overflow-hidden">
              <Picker
                selectedValue={form.paymentStatus}
                onValueChange={(v) => handleChange("paymentStatus", v)}
                className="h-12 w-full text-base"
                itemStyle={{
                  fontFamily: fonts.regular,
                  fontSize: 16,
                  color: "#111827",
                }} // iOS only
              >
                <Picker.Item
                  label="Select status..."
                  value=""
                  enabled={true}
                  style={{ color: "#9ca3af" }}
                />
                {paymentStatusOptions.map((opt) => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}
              </Picker>
            </View>
          </InputWrapper>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          className={`
            bg-gray-800 rounded-lg py-4 items-center mb-5
            ${isSubmitting ? "opacity-50" : ""}
          `}
        >
          <Text className="text-white text-base font-bold">
            {isSubmitting ? "Creating..." : "Create Case Profile"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
