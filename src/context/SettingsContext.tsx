import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface Settings {
  socialInsuranceRate: number;
  taxesRate: number;
  additionalTaxesRate: number;
  commissionRate: number;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
  resetToDefaults: () => void;
}

const defaultSettings: Settings = {
  socialInsuranceRate: 0.031589696969697,
  taxesRate: 0.121712727272727,
  additionalTaxesRate: 0.0005,
  commissionRate: 4000,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { user } = useAuth();

  const fetchSettings = useCallback(async () => {
    if (!supabase || !user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No settings found, create default settings
          await createDefaultSettings();
        } else {
          console.error('Error loading settings:', error);
        }
      } else {
        setSettings({
          socialInsuranceRate: data.social_insurance_rate,
          taxesRate: data.taxes_rate,
          additionalTaxesRate: data.additional_taxes_rate,
          commissionRate: data.commission_rate,
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }, [user]);

  // Load user's settings when component mounts or user changes
  React.useEffect(() => {
    if (user) {
      fetchSettings();
    } else {
      setSettings(defaultSettings);
    }
  }, [user, fetchSettings]);

  const createDefaultSettings = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_settings')
      .upsert([
        {
          user_id: user.id,
          social_insurance_rate: defaultSettings.socialInsuranceRate,
          taxes_rate: defaultSettings.taxesRate,
          additional_taxes_rate: defaultSettings.additionalTaxesRate,
          commission_rate: defaultSettings.commissionRate,
        }
      ]);

    if (error) {
      console.error('Error creating default settings:', error);
    } else {
      setSettings(defaultSettings);
    }
  };

  const updateSettings = async (newSettings: Settings) => {
    if (!user) return;

    setSettings(newSettings);

    const { error } = await supabase
      .from('user_settings')
      .upsert([
        {
          user_id: user.id,
          social_insurance_rate: newSettings.socialInsuranceRate,
          taxes_rate: newSettings.taxesRate,
          additional_taxes_rate: newSettings.additionalTaxesRate,
          commission_rate: newSettings.commissionRate,
        }
      ]);

    if (error) {
      console.error('Error updating settings:', error);
    }
  };

  const resetToDefaults = async () => {
    await updateSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      resetToDefaults,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};