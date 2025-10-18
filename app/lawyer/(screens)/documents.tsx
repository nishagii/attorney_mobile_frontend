import { fonts } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LawyerAddDocuments from './adddocuments';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  fileSize: string;
  fileName: string;
}

export default function DocumentsScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Case Contract',
      type: 'legal',
      uploadDate: '2024-01-15',
      fileSize: '245 KB',
      fileName: 'contract_case_001.pdf',
    },
    {
      id: '2',
      name: 'Evidence Photos',
      type: 'evidence',
      uploadDate: '2024-01-14',
      fileSize: '1.2 MB',
      fileName: 'evidence_photos.zip',
    },
  ]);

  const handleAddDocument = (newDocument: any) => {
    const documentWithId = {
      ...newDocument,
      id: Date.now().toString(),
    };
    setDocuments([documentWithId, ...documents]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'legal': return '#1976D2';
      case 'evidence': return '#388E3C';
      case 'court': return '#7B1FA2';
      case 'contract': return '#FF8800';
      case 'correspondence': return '#D32F2F';
      default: return '#5E788F';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'legal': return 'document-text-outline';
      case 'evidence': return 'camera-outline';
      case 'court': return 'library-outline';
      case 'contract': return 'handshake-outline';
      case 'correspondence': return 'mail-outline';
      default: return 'document-outline';
    }
  };

  const renderDocument = ({ item }: { item: Document }) => (
    <TouchableOpacity style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <View style={[styles.iconContainer, { backgroundColor: `${getTypeColor(item.type)}20` }]}>
          <Ionicons 
            name={getTypeIcon(item.type) as any} 
            size={24} 
            color={getTypeColor(item.type)} 
          />
        </View>
        <View style={styles.documentInfo}>
          <Text style={styles.documentName}>{item.name}</Text>
          <Text style={styles.documentType}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
      <View style={styles.documentFooter}>
        <Text style={styles.documentDate}>
          {new Date(item.uploadDate).toLocaleDateString()}
        </Text>
        <Text style={styles.documentSize}>{item.fileSize}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Case Documents</Text>
          
          <View style={styles.documentsSection}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>

            <FlatList
              data={documents}
              renderItem={renderDocument}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              style={styles.documentsList}
            />
          </View>
        </View>
      </View>

      <LawyerAddDocuments
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        caseNumber="103464"
        onSave={handleAddDocument}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#323D68',
    fontFamily: fonts.semiBold,
  },
  documentsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: 350,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FF8800',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  documentsList: {
    maxHeight: 250,
  },
  documentCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323D68',
    fontFamily: fonts.semiBold,
    marginBottom: 2,
  },
  documentType: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: fonts.regular,
  },
  moreButton: {
    padding: 4,
  },
  documentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  documentDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: fonts.regular,
  },
  documentSize: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: fonts.regular,
  },
});