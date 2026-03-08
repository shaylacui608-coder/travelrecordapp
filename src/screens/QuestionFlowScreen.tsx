import React, { useState } from 'react';
import {
  View,
  Text,
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
import QuestionCard from '../components/QuestionCard';
import { useTripStore } from '../store/tripStore';
import { QUESTIONS } from '../constants/questions';
import { ExpenseCategory, Partner } from '../types';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'QuestionFlow'>;
  route: RouteProp<RootStackParamList, 'QuestionFlow'>;
};

export default function QuestionFlowScreen({ navigation, route }: Props) {
  const { destination } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setPartner, setExpense, finishTrip, runningTotal } = useTripStore();

  const advance = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleFinish();
    }
  };

  const handleNext = async (value: string | number) => {
    const q = QUESTIONS[currentIndex];
    if (q.id === 'partner') {
      setPartner(value as Partner | string);
    } else {
      setExpense(q.id as ExpenseCategory, value as number);
    }
    if (currentIndex === QUESTIONS.length - 1) {
      await handleFinish();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleSkip = () => {
    advance();
  };

  const handleFinish = async () => {
    const trip = await finishTrip();
    navigation.replace('Summary', { total: trip.total });
  };

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[Typography.h2, styles.backArrow]}>←</Text>
        </TouchableOpacity>
        <Text style={[Typography.h3, styles.destinationText]}>{destination}</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Card */}
      <View style={styles.cardWrapper}>
        <QuestionCard
          key={currentIndex}
          question={currentQuestion}
          runningTotal={runningTotal}
          onNext={handleNext}
          onSkip={handleSkip}
          isVisible={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 24 : 12,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    color: Colors.textDark,
  },
  destinationText: {
    color: Colors.textDark,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  cardWrapper: {
    flex: 1,
    paddingBottom: 24,
  },
});
