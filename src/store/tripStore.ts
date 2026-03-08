import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip, Expenses, Partner } from '../types';

const STORAGE_KEY = '@travel_record_trips';

interface TripState {
  trips: Trip[];
  currentDestination: string | null;
  currentPartner: Partner | string | null;
  currentExpenses: Expenses;
  runningTotal: number;
  isLoading: boolean;
}

interface TripActions {
  loadTrips: () => Promise<void>;
  startTrip: (destination: string) => void;
  setPartner: (partner: Partner | string) => void;
  setExpense: (category: keyof Expenses, amount: number) => void;
  finishTrip: () => Promise<Trip>;
  resetSession: () => void;
}

const calcTotal = (expenses: Expenses): number =>
  Object.values(expenses).reduce((sum, v) => sum + (v ?? 0), 0);

export const useTripStore = create<TripState & TripActions>((set, get) => ({
  trips: [],
  currentDestination: null,
  currentPartner: null,
  currentExpenses: {},
  runningTotal: 0,
  isLoading: true,

  loadTrips: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const trips: Trip[] = raw ? JSON.parse(raw) : [];
      set({ trips, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  startTrip: (destination: string) => {
    set({
      currentDestination: destination,
      currentPartner: null,
      currentExpenses: {},
      runningTotal: 0,
    });
  },

  setPartner: (partner: Partner | string) => {
    set({ currentPartner: partner });
  },

  setExpense: (category: keyof Expenses, amount: number) => {
    set((state) => {
      const updated = { ...state.currentExpenses, [category]: amount };
      return { currentExpenses: updated, runningTotal: calcTotal(updated) };
    });
  },

  finishTrip: async () => {
    const { currentDestination, currentPartner, currentExpenses, trips } = get();
    const newTrip: Trip = {
      id: Date.now().toString(),
      destination: currentDestination ?? 'Unknown',
      partner: currentPartner ?? 'just me',
      expenses: currentExpenses,
      total: calcTotal(currentExpenses),
      date: new Date().toISOString(),
    };
    const updated = [newTrip, ...trips];
    set({ trips: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newTrip;
  },

  resetSession: () => {
    set({
      currentDestination: null,
      currentPartner: null,
      currentExpenses: {},
      runningTotal: 0,
    });
  },
}));
