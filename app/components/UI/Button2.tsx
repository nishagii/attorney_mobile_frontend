import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fonts } from '@/constants/fonts';

interface Button2Props {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
}

const Button2: React.FC<Button2Props> = ({
  text,
  onPress,
  disabled = false,
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
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#323D68',
    minWidth: 100,
  },
  disabled: {
    borderColor: '#cccccc',
  },
  text: {
    color: '#323D68',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  disabledText: {
    color: '#cccccc',
  }
});

export default Button2;