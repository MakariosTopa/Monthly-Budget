import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Calculator, DollarSign } from 'lucide-react';

export const SalaryCalculator: React.FC = () => {
  const { settings } = useSettings();
  const [baseSalary, setBaseSalary] = useState('');
  const [customRates, setCustomRates] = useState({
    socialInsurance: settings.socialInsuranceRate,
    taxes: settings.taxesRate,
    additionalTaxes: settings.additionalTaxesRate,
    penalty: 0,
    additionalDeduction: 0,
  });
  const [useCustomRates, setUseCustomRates] = useState(false);
  const [usePenalty, setUsePenalty] = useState(false);
  const [useAdditionalDeduction, setUseAdditionalDeduction] = useState(false);

  const currentRates = useCustomRates ? customRates : settings;

  const calculateDeductions = () => {
    const salary = parseFloat(baseSalary) || 0;
    
    const socialInsuranceDeduction = salary * (useCustomRates ? currentRates.socialInsurance : settings.socialInsuranceRate);
    const taxesDeduction = salary * (useCustomRates ? currentRates.taxes : settings.taxesRate);
    const additionalTaxesDeduction = salary * (useCustomRates ? currentRates.additionalTaxes : settings.additionalTaxesRate);
    const penaltyDeduction = usePenalty ? (useCustomRates ? currentRates.penalty : 0) : 0;
    const additionalDeductionAmount = useAdditionalDeduction ? (useCustomRates ? currentRates.additionalDeduction : 0) : 0;
    
    const totalDeductions = socialInsuranceDeduction + taxesDeduction + additionalTaxesDeduction + penaltyDeduction + additionalDeductionAmount;
    const netSalary = salary - totalDeductions;

    return {
      grossSalary: salary,
      socialInsuranceDeduction,
      taxesDeduction,
      additionalTaxesDeduction,
      penaltyDeduction,
      additionalDeductionAmount,
      totalDeductions,
      netSalary,
    };
  };

  const results = calculateDeductions();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Salary Calculator</span> 💼
          </h1>
          <p className="text-gray-600 mt-1">Calculate your net salary after deductions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Salary Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gross Salary (EGP)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-lg font-medium"
                placeholder="Enter your gross salary in EGP"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="useCustomRates"
                  checked={useCustomRates}
                  onChange={(e) => setUseCustomRates(e.target.checked)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="useCustomRates" className="ml-2 text-sm font-medium text-gray-700">
                  Use custom rates for this calculation
                </label>
              </div>

              {useCustomRates && (
                <div className="space-y-4 bg-white p-4 rounded-xl border border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Social Insurance Rate
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      min="0"
                      max="1"
                      value={customRates.socialInsurance}
                      onChange={(e) => setCustomRates({ ...customRates, socialInsurance: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(customRates.socialInsurance * 100).toFixed(4)}%
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Taxes Rate
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      min="0"
                      max="1"
                      value={customRates.taxes}
                      onChange={(e) => setCustomRates({ ...customRates, taxes: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(customRates.taxes * 100).toFixed(4)}%
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Taxes Rate
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      min="0"
                      max="1"
                      value={customRates.additionalTaxes}
                      onChange={(e) => setCustomRates({ ...customRates, additionalTaxes: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(customRates.additionalTaxes * 100).toFixed(4)}%
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Optional Deductions</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="usePenalty"
                          checked={usePenalty}
                          onChange={(e) => setUsePenalty(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="usePenalty" className="ml-2 text-sm text-gray-700">
                          Apply Penalty Deduction
                        </label>
                      </div>
                      
                      {usePenalty && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Penalty Amount (EGP)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={customRates.penalty}
                            onChange={(e) => setCustomRates({ ...customRates, penalty: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter penalty amount"
                          />
                        </div>
                      )}

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="useAdditionalDeduction"
                          checked={useAdditionalDeduction}
                          onChange={(e) => setUseAdditionalDeduction(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="useAdditionalDeduction" className="ml-2 text-sm text-gray-700">
                          Apply Additional Deduction
                        </label>
                      </div>
                      
                      {useAdditionalDeduction && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Deduction (EGP)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={customRates.additionalDeduction}
                            onChange={(e) => setCustomRates({ ...customRates, additionalDeduction: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter additional deduction amount"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!useCustomRates && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800">
                    Using system default rates. You can modify these in Settings.
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
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Calculation Results</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Gross Salary</span>
                <span className="text-lg font-semibold text-gray-900">
                  EGP {results.grossSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Deductions</h3>
              
              <div className="flex justify-between items-center py-3 px-3 bg-white rounded-lg border border-gray-100">
                <div>
                  <span className="text-sm text-gray-600">Social Insurance</span>
                  <p className="text-xs text-gray-500">
                    {((useCustomRates ? currentRates.socialInsurance : settings.socialInsuranceRate) * 100).toFixed(4)}%
                  </p>
                </div>
                <span className="text-sm font-medium text-red-600">
                  -EGP {results.socialInsuranceDeduction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 px-3 bg-white rounded-lg border border-gray-100">
                <div>
                  <span className="text-sm text-gray-600">Taxes</span>
                  <p className="text-xs text-gray-500">
                    {((useCustomRates ? currentRates.taxes : settings.taxesRate) * 100).toFixed(4)}%
                  </p>
                </div>
                <span className="text-sm font-medium text-red-600">
                  -EGP {results.taxesDeduction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 px-3 bg-white rounded-lg border border-gray-100">
                <div>
                  <span className="text-sm text-gray-600">Additional Taxes</span>
                  <p className="text-xs text-gray-500">
                    {((useCustomRates ? currentRates.additionalTaxes : settings.additionalTaxesRate) * 100).toFixed(4)}%
                  </p>
                </div>
                <span className="text-sm font-medium text-red-600">
                  -EGP {results.additionalTaxesDeduction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {usePenalty && results.penaltyDeduction > 0 && (
                <div className="flex justify-between items-center py-3 px-3 bg-white rounded-lg border border-gray-100">
                  <div>
                    <span className="text-sm text-gray-600">Penalty Deduction</span>
                    <p className="text-xs text-gray-500">Fixed amount</p>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    -EGP {results.penaltyDeduction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              {useAdditionalDeduction && results.additionalDeductionAmount > 0 && (
                <div className="flex justify-between items-center py-3 px-3 bg-white rounded-lg border border-gray-100">
                  <div>
                    <span className="text-sm text-gray-600">Additional Deduction</span>
                    <p className="text-xs text-gray-500">Fixed amount</p>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    -EGP {results.additionalDeductionAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-3 px-3 bg-red-50 rounded-lg border border-red-100 font-medium">
                <span className="text-gray-700">Total Deductions</span>
                <span className="text-red-600">
                  -EGP {results.totalDeductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-800">Net Salary</span>
                <span className="text-2xl font-bold text-green-600">
                  EGP {results.netSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Take-home pay after all deductions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};