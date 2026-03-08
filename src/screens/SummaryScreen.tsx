import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { useTripStore } from '../store/tripStore';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Summary'>;
  route: RouteProp<RootStackParamList, 'Summary'>;
};

export default function SummaryScreen({ navigation, route }: Props) {
  const { total } = route.params;
  const { resetSession } = useTripStore();

  const handleBackToHome = () => {
    resetSession();
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Back arrow */}
      <TouchableOpacity onPress={handleBackToHome} style={styles.backButton}>
        <Text style={[Typography.h2, styles.backArrow]}>←</Text>
      </TouchableOpacity>

      {/* Center content */}
      <View style={styles.center}>
        <View style={styles.cardSurface}>
          <Image
            source={require('../../assets/coin.png')}
            style={styles.coinImage}
            resizeMode="contain"
          />
          <Text style={[Typography.caption, styles.subtitle]}>You have spent</Text>
          <View style={styles.totalRow}>
            <Text style={[Typography.h2, styles.dollarSign]}>$</Text>
            <Text style={[Typography.display, styles.totalText]}>{total}</Text>
          </View>
        </View>
      </View>

      {/* Bottom button */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome} activeOpacity={0.85}>
          <Text style={[Typography.body, styles.homeButtonText]}>back to homepage</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 32 : 16,
  },
  backArrow: {
    color: Colors.textDark,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cardSurface: {
    width: '100%',
    backgroundColor: Colors.inputBg,
    borderRadius: 28,
    paddingVertical: 48,
    alignItems: 'center',
  },
  coinImage: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  subtitle: {
    color: Colors.textMuted,
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  dollarSign: {
    color: Colors.textMuted,
    marginBottom: 4,
  },
  totalText: {
    color: Colors.textDark,
  },
  bottomArea: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  homeButton: {
    backgroundColor: Colors.buttonBrown,
    borderRadius: 32,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
