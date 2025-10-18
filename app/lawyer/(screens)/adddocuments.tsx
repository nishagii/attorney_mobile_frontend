import { fonts } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button1 from '../../components/UI/Button1';
import Button2 from '../../components/UI/Button2';
import Input1 from '../../components/UI/Input1';

interface LawyerAddDocumentsProps {
  isOpen: boolean;
  onClose: () => void;
  caseNumber: string;
  onSave: (document: any) => void;
}

const LawyerAddDocuments: React.FC<LawyerAddDocumentsProps> = ({
  isOpen,
  onClose,
  caseNumber,
  onSave,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('legal');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [fileError, setFileError] = useState('');
  const [nameError, setNameError] = useState('');

  const documentTypes = [
    { value: 'legal', label: 'Legal Document' },
    { value: 'evidence', label: 'Evidence' },
    { value: 'court', label: 'Court Filing' },
    { value: 'contract', label: 'Contract' },
    { value: 'correspondence', label: 'Correspondence' },
    { value: 'other', label: 'Other' },
  ];

  const handleFileSelect = () => {
    // Simulate file selection
    Alert.alert(
      'Select Document',
      'Choose document type',
      [
        { text: 'PDF Document', onPress: () => simulateFileSelection('sample.pdf', 'pdf') },
        { text: 'Word Document', onPress: () => simulateFileSelection('sample.docx', 'docx') },
        { text: 'Image', onPress: () => simulateFileSelection('sample.jpg', 'image') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const simulateFileSelection = (fileName: string, type: string) => {
    const file = {
      name: fileName,
      size: Math.floor(Math.random() * 1000000) + 100000, // Random size between 100KB - 1MB
      uri: `file://path/to/${fileName}`,
      type: type,
    };
    
    setSelectedFile(file);
    setFileError('');
    
    // Auto-fill document name with file name (without extension)
    if (!documentName && file.name) {
      const fileName = file.name.split('.').slice(0, -1).join('.');
      setDocumentName(fileName);
    }
  };

  const handleNameChange = (text: string) => {
    setDocumentName(text);
    if (text.trim()) {
      setNameError('');
    }
  };

  const validateForm = () => {
    let valid = true;

    if (!documentName.trim()) {
      setNameError('Document name is required');
      valid = false;
    }

    if (!selectedFile) {
      setFileError('Please select a file to upload');
      valid = false;
    }

    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsUploading(true);
      
      // Simulate file upload with timeout
      setTimeout(() => {
        const newDocument = {
          name: documentName,
          type: documentType,
          uri: selectedFile.uri,
          uploadDate: new Date().toISOString(),
          fileSize: selectedFile.size ? `${(selectedFile.size / 1024).toFixed(2)} KB` : 'Unknown size',
          fileName: selectedFile.name,
        };
        
        onSave(newDocument);
        setIsUploading(false);
        
        // Reset form
        setDocumentName('');
        setDocumentType('legal');
        setSelectedFile(null);
        setFileError('');
        setNameError('');
        
        onClose();
      }, 1500);
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Document</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.caseInfo}>
              Uploading document for Case: <Text style={styles.caseNumber}>{caseNumber}</Text>
            </Text>

            <Input1
              label="Document Name"
              value={documentName}
              onChangeText={handleNameChange}
              placeholder="Enter document name"
              error={nameError}
              required
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Document Type</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.typeSelector}
              >
                {documentTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.typeOption,
                      documentType === type.value && styles.selectedType
                    ]}
                    onPress={() => setDocumentType(type.value)}
                  >
                    <Text style={[
                      styles.typeText,
                      documentType === type.value && styles.selectedTypeText
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Upload File</Text>
              <TouchableOpacity style={styles.fileUploadArea} onPress={handleFileSelect}>
                <Ionicons name="cloud-upload-outline" size={48} color="#9CA3AF" />
                <Text style={styles.uploadText}>Tap to select file</Text>
                <Text style={styles.uploadSubtext}>
                  PDF, DOCX, XLSX, JPG, PNG up to 10MB
                </Text>
              </TouchableOpacity>
              {selectedFile && (
                <View style={styles.selectedFileInfo}>
                  <Ionicons name="document-outline" size={16} color="#059669" />
                  <Text style={styles.selectedFileName}>
                    {selectedFile.name} ({selectedFile.size ? `${(selectedFile.size / 1024).toFixed(2)} KB` : 'Unknown size'})
                  </Text>
                </View>
              )}
              {fileError && <Text style={styles.errorText}>{fileError}</Text>}
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <Button2
              text="Cancel"
              onPress={onClose}
              disabled={isUploading}
              style={styles.cancelButton}
            />
            <Button1
              text={isUploading ? "Uploading..." : "Upload Document"}
              onPress={handleSubmit}
              disabled={isUploading}
              isLoading={isUploading}
              style={styles.uploadButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#323D68',
    fontFamily: fonts.semiBold,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
    maxHeight: 400,
  },
  caseInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    fontFamily: fonts.regular,
  },
  caseNumber: {
    fontWeight: '500',
    color: '#323D68',
    fontFamily: fonts.medium,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#323D68',
    marginBottom: 6,
    fontFamily: fonts.medium,
  },
  typeSelector: {
    flexDirection: 'row',
  },
  typeOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedType: {
    backgroundColor: '#FF8800',
    borderColor: '#FF8800',
  },
  typeText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: fonts.medium,
  },
  selectedTypeText: {
    color: 'white',
  },
  fileUploadArea: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    fontFamily: fonts.medium,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: fonts.regular,
  },
  selectedFileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 6,
  },
  selectedFileName: {
    fontSize: 12,
    color: '#065F46',
    marginLeft: 8,
    flex: 1,
    fontFamily: fonts.regular,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.regular,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  uploadButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default LawyerAddDocuments;