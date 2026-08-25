import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '../lib/storage';

export type SecurityStatus = 'secure' | 'attention' | 'critical';

interface AppState {
  // Onboarding
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Security state
  securityStatus: SecurityStatus;
  riskScore: number;
  systemsOnlinePercent: number;
  emergencyMode: boolean;

  // Actions
  setSecurityStatus: (status: SecurityStatus) => void;
  setRiskScore: (score: number) => void;
  toggleEmergencyMode: () => void;
  activateEmergencyMode: () => void;
  deactivateEmergencyMode: () => void;
}

const zustandStorage = {
  setItem: async (name: string, value: string) => {
    return await storage.setItem(name, value);
  },
  getItem: async (name: string) => {
    const value = await storage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name: string) => {
    return await storage.removeItem(name);
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Onboarding
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),

      // Security state
      securityStatus: 'secure',
      riskScore: 18,
      systemsOnlinePercent: 98,
      emergencyMode: false,

      // Actions
      setSecurityStatus: (status) => set({ securityStatus: status }),
      setRiskScore: (score) => set({ riskScore: score }),
      toggleEmergencyMode: () =>
        set((state) => ({
          emergencyMode: !state.emergencyMode,
          securityStatus: !state.emergencyMode ? 'critical' : 'secure',
        })),
      activateEmergencyMode: () =>
        set({ emergencyMode: true, securityStatus: 'critical' }),
      deactivateEmergencyMode: () =>
        set({ emergencyMode: false, securityStatus: 'secure' }),
    }),
    {
      name: 'sentinel-app-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
