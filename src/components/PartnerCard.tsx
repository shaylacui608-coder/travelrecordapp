import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface Props {
  label: string;
  image: number;
  selected: boolean;
  onPress: () => void;
}

export default function PartnerCard({ label, image, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={[Typography.label, styles.label]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    height: 140,
    backgroundColor: Colors.inputBg,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 8,
  },
  cardSelected: {
    borderColor: Colors.cardBorder,
    backgroundColor: '#E8D9BC',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    color: Colors.textDark,
    textAlign: 'center',
  },
});
