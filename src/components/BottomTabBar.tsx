import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const TABS = [
  { icon: require('../../assets/icon1.png'), label: 'home' },
  { icon: require('../../assets/icon2.png'), label: 'profile' },
  { icon: require('../../assets/icon3.png'), label: 'search' },
  { icon: require('../../assets/icon4.png'), label: 'map' },
];

interface Props {
  activeTab?: string;
  onTabPress?: (label: string) => void;
}

export default function BottomTabBar({ activeTab = 'home', onTabPress }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={styles.tab}
          onPress={() => onTabPress?.(tab.label)}
          activeOpacity={0.7}
        >
          <Image
            source={tab.icon}
            style={[
              styles.icon,
              { opacity: activeTab === tab.label ? 1 : 0.45 },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.tabBarBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#FFFFFF',
  },
});
