import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function FilterChip({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, active ? styles.active : styles.inactive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[Typography.label, active ? styles.activeText : styles.inactiveText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginRight: 8,
  },
  active: {
    backgroundColor: Colors.chipActive,
  },
  inactive: {
    backgroundColor: Colors.chipInactiveBg,
  },
  activeText: {
    color: Colors.chipActiveText,
  },
  inactiveText: {
    color: Colors.chipInactiveText,
  },
});
