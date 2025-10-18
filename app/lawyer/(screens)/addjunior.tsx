import { fonts } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../../components/Header';

export default function AddJunior() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setFormError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setFormError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setFormError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormError('');

    try {
      // TODO: Implement actual invitation service
      // const invitationData = {
      //   fullName: formData.fullName,
      //   email: formData.email,
      //   role: 'JUNIOR'
      // };
      // await sendInvitation(invitationData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Success',
        `Invitation sent successfully to ${formData.email}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({ fullName: '', email: '', phoneNumber: '' });
              router.back();
            }
          }
        ]
      );

    } catch (err) {
      console.error("Failed to send invitation:", err);
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Add New Junior"
        showMenu={false}
        showNotification={false}
        showBack={true}
        backgroundColor="#111827"
        textColor="#fff"
        iconColor="#fff"
        borderColor="#111827"
        onBackPress={() => router.back()}
      />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Form Container */}
        <View style={styles.formContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-add" size={48} color="#FF8800" />
          </View>
          
          <Text style={styles.title}>Enter Junior Lawyer Details</Text>
          <Text style={styles.subtitle}>
            Send an invitation to add a new junior lawyer to your team
          </Text>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Junior Lawyer Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.fullName}
                onChangeText={(value) => handleChange('fullName', value)}
                placeholder="e.g., John Doe"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(value) => handleChange('phoneNumber', value)}
                placeholder="e.g., +1234567890"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                placeholder="e.g., john.doe@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {formError ? (
              <Text style={styles.errorText}>{formError}</Text>
            ) : null}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Sending Invitation...' : 'Send Invitation'}
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#323D68',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: fonts.semiBold,
  },
  subtitle: {
    fontSize: 14,
    color: '#5E788F',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: fonts.regular,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#323D68',
    marginBottom: 8,
    fontFamily: fonts.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#323D68',
    backgroundColor: '#F9FAFB',
    fontFamily: fonts.regular,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
  submitButton: {
    backgroundColor: '#FF8800',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.semiBold,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
});