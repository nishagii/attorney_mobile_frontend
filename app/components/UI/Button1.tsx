import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fonts } from '@/constants/fonts';

interface Button1Props {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: any;
}

const Button1: React.FC<Button1Props> = ({
  text,
  onPress,
  disabled = false,
  isLoading = false,
  style
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" size="small" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF8800',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  disabled: {
    backgroundColor: '#cccccc',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.semiBold,
  }
});

export default Button1;