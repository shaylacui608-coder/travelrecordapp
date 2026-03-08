import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const Typography: Record<string, TextStyle> = {
  display: {
    fontFamily: FontFamily.extraBold,
    fontSize: 32,
    lineHeight: 40,
  },
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    lineHeight: 32,
  },
  h2: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
  },
  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    lineHeight: 26,
  },
  body: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
  },
  inputText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  coinCounter: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
  },
};
