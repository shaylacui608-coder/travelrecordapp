import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { QuestionConfig } from '../types';
import PartnerCard from './PartnerCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -80;

const PARTNERS = [
  { label: 'just me', image: require('../../assets/person1.png') },
  { label: 'my mom', image: require('../../assets/person2.png') },
  { label: 'friends', image: require('../../assets/person3.png') },
  { label: 'colleague', image: require('../../assets/person4.png') },
];

interface Props {
  question: QuestionConfig;
  runningTotal: number;
  onNext: (value: string | number) => void;
  onSkip: () => void;
  isVisible: boolean;
}

export default function QuestionCard({ question, runningTotal, onNext, onSkip, isVisible }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [otherPartner, setOtherPartner] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const translateX = useSharedValue(SCREEN_WIDTH * 0.3);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateX.value = SCREEN_WIDTH * 0.3;
      opacity.value = 0;
      translateX.value = withSpring(0, { damping: 22, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 250 });
      setInputValue('');
      setSelectedPartner(null);
      setShowOtherInput(false);
      setOtherPartner('');
    }
  }, [isVisible]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX < SWIPE_THRESHOLD) {
        translateX.value = withTiming(
          -SCREEN_WIDTH * 1.5,
          { duration: 280 },
          () => { runOnJS(onSkip)(); }
        );
        opacity.value = withTiming(0, { duration: 200 });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 90 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-SCREEN_WIDTH, 0], [-15, 0]);
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const exitNext = (value: string | number) => {
    translateX.value = withTiming(
      -SCREEN_WIDTH * 1.5,
      { duration: 280 },
      () => { runOnJS(onNext)(value); }
    );
    opacity.value = withTiming(0, { duration: 200 });
  };

  const handleNext = () => {
    if (question.id === 'partner') {
      const partner = showOtherInput ? otherPartner.trim() : selectedPartner;
      if (!partner) return;
      exitNext(partner);
    } else {
      const amount = parseFloat(inputValue) || 0;
      exitNext(amount);
    }
  };

  const handleSkip = () => {
    translateX.value = withTiming(
      -SCREEN_WIDTH * 1.5,
      { duration: 280 },
      () => { runOnJS(onSkip)(); }
    );
    opacity.value = withTiming(0, { duration: 200 });
  };

  const isNextEnabled =
    question.id === 'partner'
      ? !!selectedPartner || (showOtherInput && otherPartner.trim().length > 0)
      : true;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inner}
        >
          {/* Coin counter */}
          <View style={styles.coinRow}>
            <Image source={require('../../assets/coin.png')} style={styles.coinIcon} />
            <Text style={[Typography.coinCounter, styles.coinText]}>{runningTotal}</Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            {question.id === 'partner' ? (
              <View style={styles.partnerGrid}>
                {PARTNERS.map((p) => (
                  <PartnerCard
                    key={p.label}
                    label={p.label}
                    image={p.image}
                    selected={selectedPartner === p.label}
                    onPress={() => {
                      setSelectedPartner(p.label);
                      setShowOtherInput(false);
                    }}
                  />
                ))}
              </View>
            ) : (
              <Image
                source={question.image}
                style={styles.illustration}
                resizeMode="contain"
              />
            )}
          </View>

          {/* Question text */}
          <Text style={[Typography.h1, styles.questionText]}>{question.question}</Text>

          {/* Input */}
          {question.id === 'partner' ? (
            <>
              {showOtherInput ? (
                <TextInput
                  style={[Typography.body, styles.textInput]}
                  placeholder="Enter partner name"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={otherPartner}
                  onChangeText={setOtherPartner}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setShowOtherInput(true);
                    setSelectedPartner(null);
                  }}
                >
                  <Text style={[Typography.caption, styles.otherText]}>other partner</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.inputContainer}>
              <Text style={[Typography.body, styles.currencySymbol]}>$</Text>
              <TextInput
                style={[Typography.inputText, styles.amountInput]}
                placeholder="0"
                placeholderTextColor={Colors.textMuted}
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={[styles.nextButton, !isNextEnabled && styles.nextButtonDisabled]}
              onPress={handleNext}
              activeOpacity={0.85}
            >
              <Text style={[Typography.body, styles.nextButtonText]}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip} style={styles.skipTouchable}>
              <Text style={[Typography.caption, styles.skipText]}>skip</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.cardBrown,
    borderRadius: 28,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  inner: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  coinRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  coinText: {
    color: Colors.textOnCard,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  partnerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  questionText: {
    color: Colors.textOnCard,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 32,
    paddingHorizontal: 20,
    height: 52,
    marginBottom: 16,
  },
  currencySymbol: {
    color: Colors.textMuted,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    color: Colors.textDark,
    padding: 0,
  },
  textInput: {
    backgroundColor: Colors.inputBg,
    borderRadius: 32,
    paddingHorizontal: 20,
    height: 52,
    color: Colors.textDark,
    marginBottom: 16,
  },
  otherText: {
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  buttonArea: {
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: Colors.buttonBrown,
    borderRadius: 32,
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: Colors.textOnCard,
    fontWeight: '700',
  },
  skipTouchable: {
    paddingVertical: 6,
  },
  skipText: {
    color: 'rgba(255,255,255,0.65)',
  },
});
