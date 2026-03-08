import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from '../constants/typography';
import { Trip } from '../types';

interface Props {
  trip: Trip;
  onPress: () => void;
}

// Default Egypt images cycled by trip index
const EGYPT_IMAGES = [
  require('../../assets/homepagpic_1.png'),
  require('../../assets/homepagepic_2.png'),
  require('../../assets/homepagepic_3.png'),
];

let cardIndex = 0;
const getImageForTrip = (trip: Trip) => {
  if (trip.coverImage) return trip.coverImage;
  const idx = parseInt(trip.id, 10) % EGYPT_IMAGES.length;
  return EGYPT_IMAGES[idx];
};

export default function TripCard({ trip, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <ImageBackground
        source={getImageForTrip(trip)}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.65)']}
          style={styles.gradient}
        >
          <View style={styles.labelRow}>
            <Text style={[Typography.h3, styles.destination]}>{trip.destination}</Text>
            {trip.total > 0 && (
              <Text style={[Typography.caption, styles.total]}>${trip.total}</Text>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradient: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 60,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  destination: {
    color: '#FFFFFF',
  },
  total: {
    color: 'rgba(255,255,255,0.85)',
  },
});
