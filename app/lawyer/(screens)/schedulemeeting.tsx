import { fonts } from '@/constants/fonts';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

const ScheduleMeeting = () => {
  const [clientName, setClientName] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [agenda, setAgenda] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Meeting request submitted');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="Schedule Meeting"
        showMenu={false}
        showNotification={false}
        showBack={true}
        backgroundColor="#111827"
        textColor="#fff"
        iconColor="#fff"
        borderColor="#111827"
        onBackPress={() => router.back()}
      />

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Page Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Schedule Client Meeting</Text>
          </View>

          {/* Request Meeting Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Request a Meeting</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Client Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Anura De Mel"
                value={clientName}
                onChangeText={setClientName}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Meeting Title/Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Case Review Discussion"
                value={meetingTitle}
                onChangeText={setMeetingTitle}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={date}
                  onChangeText={setDate}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="HH:MM"
                  value={time}
                  onChangeText={setTime}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 1 hour"
                value={duration}
                onChangeText={setDuration}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Agenda/Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter meeting agenda or notes..."
                value={agenda}
                onChangeText={setAgenda}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Meeting Request</Text>
            </TouchableOpacity>
          </View>

          {/* Scheduled Meetings */}
          <View style={styles.scheduledContainer}>
            <Text style={styles.scheduledTitle}>Scheduled Meetings</Text>
            <Text style={styles.noMeetingsText}>No meetings scheduled yet.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#323D68',
    fontFamily: fonts.semiBold,
  },
  formContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#323D68',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: fonts.semiBold,
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
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#323D68',
    backgroundColor: '#FAFAFA',
    fontFamily: fonts.regular,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#FF8800',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.semiBold,
  },
  scheduledContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scheduledTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#323D68',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: fonts.semiBold,
  },
  noMeetingsText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});

export default ScheduleMeeting;