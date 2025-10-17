import { fonts } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const clients = [
  {
    name: 'Anura De Mel',
    phone: '+94711234567',
    email: 'anura.d@example.com',
    case: 'Divorce settlement and child custody.',
    added: '2024-05-15',
  },
  {
    name: 'Gayani Silva',
    phone: '+94777654321',
    email: 'gayani.s@example.com',
    case: 'Immigration application.',
    added: '2024-03-01',
  },
  {
    name: 'Kamal J.',
    phone: '+94781234567',
    email: 'kamal.j@example.com',
    case: 'Contract review for small business.',
    added: '2023-12-10',
  },
  {
    name: 'Nimal Perera',
    phone: '+94701234567',
    email: 'nimal.p@example.com',
    case: 'Criminal defense.',
    added: '2024-01-20',
  },
  {
    name: 'S. Fernando',
    phone: '+94778901234',
    email: 's.fernando@example.com',
    case: 'Property dispute resolution.',
    added: '2024-02-02',
  },
];

const user = {
  name: 'Nishagi Jewantha',
  email: 'jewanthadheerath@gmail.com',
};

const Clients = () => {
  const [notificationCount, setNotificationCount] = useState(1);

  const handleNotificationClick = () => {
    // Handle notification logic
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Client Details</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.clientContainer}>
          <Text style={styles.title}>Your Clients</Text>
          
          <View style={styles.clientList}>
            {clients.map((client, idx) => (
              <View key={idx} style={styles.clientCard}>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text style={styles.clientInfo}>Phone: {client.phone}</Text>
                <Text style={styles.clientInfo}>Email: {client.email}</Text>
                <Text style={styles.clientInfo}>Case: {client.case}</Text>
                <Text style={styles.clientAdded}>Added: {client.added}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#111827',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: fonts.semiBold,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF8800',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderTopLeftRadius: 100,
    paddingTop: 40,
  },
  clientContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#323D68',
    fontFamily: fonts.semiBold,
  },
  clientList: {
    gap: 16,
  },
  clientCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#323D68',
    marginBottom: 8,
    fontFamily: fonts.semiBold,
  },
  clientInfo: {
    fontSize: 14,
    color: '#5E788F',
    marginBottom: 4,
    fontFamily: fonts.regular,
  },
  clientAdded: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    fontFamily: fonts.regular,
  },
});

export default Clients;