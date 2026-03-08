import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import FilterChip from '../components/FilterChip';
import TripCard from '../components/TripCard';
import BottomTabBar from '../components/BottomTabBar';
import { useTripStore } from '../store/tripStore';
import { Trip } from '../types';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const FILTER_CHIPS = ['Recent Trips', 'year ago', 'Adventure'];

// Seed Egypt trip shown by default
const EGYPT_SEED: Trip = {
  id: '0',
  destination: 'Egypt',
  partner: 'just me',
  expenses: {},
  total: 0,
  date: new Date().toISOString(),
  coverImage: require('../../assets/homepagpic_1.png'),
};

export default function HomeScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Recent Trips');
  const { trips, loadTrips, startTrip } = useTripStore();

  useEffect(() => {
    loadTrips();
  }, []);

  const handleSearch = () => {
    const dest = searchText.trim();
    if (!dest) return;
    startTrip(dest);
    setSearchText('');
    navigation.navigate('QuestionFlow', { destination: dest });
  };

  const handleTripPress = (trip: Trip) => {
    startTrip(trip.destination);
    navigation.navigate('QuestionFlow', { destination: trip.destination });
  };

  // Merge seed Egypt trip with saved trips (deduplicate by destination)
  const displayTrips: Trip[] = trips.length > 0 ? trips : [EGYPT_SEED];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[Typography.caption, styles.welcomeLabel]}>welcome back,</Text>
            <Text style={[Typography.h2, styles.userName]}>shayla</Text>
          </View>
          <Image source={require('../../assets/person1.png')} style={styles.avatar} />
        </View>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <TextInput
            style={[Typography.body, styles.searchInput]}
            placeholder="Where have you been?"
            placeholderTextColor={Colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="go"
          />
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsRow}
          contentContainerStyle={styles.chipsContent}
        >
          {FILTER_CHIPS.map((chip) => (
            <FilterChip
              key={chip}
              label={chip}
              active={activeFilter === chip}
              onPress={() => setActiveFilter(chip)}
            />
          ))}
        </ScrollView>

        {/* Trip cards */}
        <View style={styles.tripsSection}>
          {displayTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onPress={() => handleTripPress(trip)} />
          ))}
        </View>
      </ScrollView>

      <BottomTabBar activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 24 : 8,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeLabel: {
    color: Colors.textMuted,
  },
  userName: {
    color: Colors.textDark,
    marginTop: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  searchRow: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: Colors.inputBg,
    borderRadius: 32,
    height: 48,
    paddingHorizontal: 20,
    color: Colors.textDark,
  },
  chipsRow: {
    marginBottom: 20,
  },
  chipsContent: {
    paddingRight: 16,
  },
  tripsSection: {
    gap: 12,
  },
});
