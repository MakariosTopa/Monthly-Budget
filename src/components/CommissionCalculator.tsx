import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Percent, TrendingUp } from 'lucide-react';

export const CommissionCalculator: React.FC = () => {
  const { settings } = useSettings();
  const [baseValue, setBaseValue] = useState('');
  const [customRate, setCustomRate] = useState(settings.commissionRate);
  const [useCustomRate, setUseCustomRate] = useState(false);

  const currentRate = useCustomRate ? customRate : settings.commissionRate;

  const calculateCommission = () => {
    const value = parseFloat(baseValue) || 0;
    const commission = value * currentRate;
    const total = value + commission;

    return {
      baseValue: value,
      commissionRate: currentRate,
      commissionAmount: commission,
      totalAmount: total,
    };
  };

  const results = calculateCommission();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
          <Percent className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Commission Calculator</span> 📈
          </h1>
          <p className="text-gray-600 mt-1">Calculate your commission earnings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Commission Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
               Base Value (EGP)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm text-lg font-medium"
                placeholder="Enter base value for commission calculation"
              />
              <p className="text-xs text-gray-500 mt-1">
                This is the base amount on which commission will be calculated
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="useCustomRate"
                  checked={useCustomRate}
                  onChange={(e) => setUseCustomRate(e.target.checked)}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="useCustomRate" className="ml-2 text-sm font-medium text-gray-700">
                  Use custom commission rate
                </label>
              </div>

              {useCustomRate && (
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commission Rate (multiplier)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={customRate}
                    onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter commission rate"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current rate: ×{customRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}

              {!useCustomRate && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-sm text-purple-800">
                    Using system default commission rate: ×{settings.commissionRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    You can modify this rate in Settings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Commission Results</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Base Value</span>
                <span className="text-lg font-semibold text-gray-900">
                  EGP {results.baseValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-purple-800">Commission Rate</span>
                  <p className="text-xs text-purple-600">Multiplier applied to base value</p>
                </div>
                <span className="text-lg font-semibold text-purple-600">
                  ×{results.commissionRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-green-800">Commission Amount</span>
                  <p className="text-xs text-green-600">Base Value × Commission Rate</p>
                </div>
                <span className="text-xl font-bold text-green-600">
                  EGP {results.commissionAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-semibold text-indigo-800">Total Amount</span>
                  <p className="text-xs text-indigo-600">Base Value + Commission</p>
                </div>
                <span className="text-2xl font-bold text-indigo-600">
                  EGP {results.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {results.baseValue > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Calculation Breakdown</h3>
                <div className="text-xs text-yellow-700 space-y-1">
                  <p>Base Value: EGP {results.baseValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  <p>Commission Rate: ×{results.commissionRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  <p>Commission: EGP {results.baseValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} × {results.commissionRate.toLocaleString('en-US', { minimumFractionDigits: 2 })} = EGP {results.commissionAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  <p className="font-semibold">Total: EGP {results.baseValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} + EGP {results.commissionAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} = EGP {results.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};