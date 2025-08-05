import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Settings as SettingsIcon, Save, RotateCcw } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    resetToDefaults();
    setLocalSettings({
      socialInsuranceRate: 0.031589696969697,
      taxesRate: 0.121712727272727,
      additionalTaxesRate: 0.0005,
      commissionRate: 4000,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(localSettings);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl">
          <SettingsIcon className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">Settings</span> ⚙️
          </h1>
          <p className="text-gray-600 mt-1">Configure your calculation rates</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Default Calculation Rates</h2>
          
          {showSuccess && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <p className="text-green-800 text-sm font-medium">✅ Settings saved successfully!</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Insurance Rate
              </label>
              <input
                type="number"
                step="0.000001"
                min="0"
                max="1"
                value={localSettings.socialInsuranceRate}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  socialInsuranceRate: parseFloat(e.target.value) || 0
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current rate: {(localSettings.socialInsuranceRate * 100).toFixed(6)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Default: 0.031589696969697 (3.158970%)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxes Rate
              </label>
              <input
                type="number"
                step="0.000001"
                min="0"
                max="1"
                value={localSettings.taxesRate}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  taxesRate: parseFloat(e.target.value) || 0
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current rate: {(localSettings.taxesRate * 100).toFixed(6)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Default: 0.121712727272727 (12.171273%)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Taxes Rate
              </label>
              <input
                type="number"
                step="0.000001"
                min="0"
                max="1"
                value={localSettings.additionalTaxesRate}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  additionalTaxesRate: parseFloat(e.target.value) || 0
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current rate: {(localSettings.additionalTaxesRate * 100).toFixed(4)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Default: 0.0005 (0.05%)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission Rate (Multiplier)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={localSettings.commissionRate}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  commissionRate: parseFloat(e.target.value) || 0
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current multiplier: ×{localSettings.commissionRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Default: 4000 (×4000.00)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                hasChanges 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save size={16} />
              Save Changes
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium hover:scale-105"
            >
              <RotateCcw size={16} />
              Reset to Defaults
            </button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">About These Settings</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Social Insurance Rate:</strong> Percentage deducted for social insurance coverage</p>
              <p><strong>Taxes Rate:</strong> Standard tax rate applied to salary</p>
              <p><strong>Additional Taxes Rate:</strong> Additional tax percentage for special circumstances</p>
              <p><strong>Commission Rate:</strong> Multiplier applied to base values for commission calculations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};