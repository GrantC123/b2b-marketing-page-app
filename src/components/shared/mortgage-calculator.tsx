"use client";

import { useState, useCallback, useMemo, useId } from "react";
import {
  CaretDown,
  CaretUp,
  ExternalLink,
  Info,
  Star,
} from "@bankrate/icons-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  calculateLoanAmount,
  calculateDownPaymentPercent,
  calculateDownPaymentAmount,
  calculateMonthlyPaymentBreakdown,
  generateYearlyAmortizationSummary,
  generateAmortizationSchedule,
  formatCurrency,
  parseCurrency,
  isPMIRequired,
  type MortgageInputs,
} from "@/lib/mortgage-helpers";
import { Button } from "@/components/ui/button";

// Data Visualization colors for charts (from brand palette)
const CHART_COLORS = {
  principalInterest: "#0080FF",  // data-2: Primary blue
  propertyTax: "#028C76",        // data-3: Teal green
  insurance: "#574CFA",          // data-1: Purple
  hoa: "#DE7300",                // data-4: Orange
  pmi: "#A4002E",                // data-5: Red
};

// Mock lender offers
const LENDER_OFFERS = [
  {
    id: 1,
    name: "Sage",
    fullName: "Sage Home Loans Corporation",
    nmls: "NMLS# 3304",
    apr: "5.568%",
    rating: 4.76,
    reviews: 712,
    monthlyPayment: 1903,
    savings: 616,
  },
  {
    id: 2,
    name: "TOMO",
    fullName: "Tomo Mortgage",
    nmls: "NMLS# 2059741",
    apr: "5.573%",
    rating: 4.78,
    reviews: 215,
    monthlyPayment: 1904,
    savings: 615,
  },
  {
    id: 3,
    name: "First Federal",
    fullName: "First Federal Bank Mortgage Lenders",
    nmls: "NMLS# 408902",
    apr: "5.798%",
    rating: 4.96,
    reviews: 179,
    monthlyPayment: 1958,
    savings: 561,
  },
];

const LOAN_TERMS = [
  { value: 30, label: "30 years" },
  { value: 20, label: "20 years" },
  { value: 15, label: "15 years" },
  { value: 10, label: "10 years" },
];

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  info?: boolean;
  type?: "text" | "number";
  "aria-describedby"?: string;
}

function FormInput({ id, label, value, onChange, prefix, suffix, info, type = "text", "aria-describedby": ariaDescribedBy }: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <label htmlFor={id} className="text-sm font-medium text-[#00293D]">
          {label}
        </label>
        {info && (
          <button
            type="button"
            aria-label={`More information about ${label}`}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-offset-1 rounded-full"
          >
            <Info className="size-3.5" />
          </button>
        )}
      </div>
      <div className="relative flex">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={ariaDescribedBy}
          className={`w-full h-11 border border-gray-300 rounded-lg bg-white text-[#00293D] font-medium
            focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:border-transparent
            transition-all duration-150
            ${prefix ? "pl-7" : "pl-3"}
            ${suffix ? "pr-10" : "pr-3"}
          `}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function MortgageCalculator() {
  const formId = useId();

  // Form state
  const [homePrice, setHomePrice] = useState(425000);
  const [downPayment, setDownPayment] = useState(85000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.609);
  const [zipCode, setZipCode] = useState("90210");
  const [propertyTax, setPropertyTax] = useState(280);
  const [homeInsurance, setHomeInsurance] = useState(66);
  const [hoaFees, setHoaFees] = useState(0);
  const [pmiEnabled, setPmiEnabled] = useState(false);
  const [pmiAmount, setPmiAmount] = useState(0);
  
  // UI state
  const [activeTab, setActiveTab] = useState<"breakdown" | "amortization">("breakdown");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [amortizationView, setAmortizationView] = useState<"yearly" | "monthly">("yearly");

  // Sync down payment amount and percentage
  const handleHomePriceChange = useCallback((value: string) => {
    const price = parseCurrency(value);
    setHomePrice(price);
    setDownPayment(calculateDownPaymentAmount(price, downPaymentPercent));
  }, [downPaymentPercent]);

  const handleDownPaymentChange = useCallback((value: string) => {
    const amount = parseCurrency(value);
    setDownPayment(amount);
    setDownPaymentPercent(Math.round(calculateDownPaymentPercent(homePrice, amount) * 100) / 100);
  }, [homePrice]);

  const handleDownPaymentPercentChange = useCallback((value: string) => {
    const percent = parseFloat(value) || 0;
    setDownPaymentPercent(percent);
    setDownPayment(Math.round(calculateDownPaymentAmount(homePrice, percent)));
  }, [homePrice]);

  // Calculate mortgage values
  const mortgageInputs: MortgageInputs = useMemo(() => ({
    homePrice,
    downPayment,
    loanTermYears: loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    hoaFees,
    pmiEnabled: pmiEnabled || isPMIRequired(homePrice, downPayment),
    pmiAmount,
  }), [homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, hoaFees, pmiEnabled, pmiAmount]);

  const breakdown = useMemo(() => calculateMonthlyPaymentBreakdown(mortgageInputs), [mortgageInputs]);
  
  const loanAmount = useMemo(() => calculateLoanAmount(homePrice, downPayment), [homePrice, downPayment]);
  
  const yearlyAmortization = useMemo(
    () => generateYearlyAmortizationSummary(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );
  
  const monthlyAmortization = useMemo(
    () => generateAmortizationSchedule(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );

  // Chart data
  const chartData = useMemo(() => {
    const data = [
      { name: "Principal & Interest", value: breakdown.principalAndInterest, color: CHART_COLORS.principalInterest },
      { name: "Property Tax", value: breakdown.propertyTax, color: CHART_COLORS.propertyTax },
      { name: "Insurance", value: breakdown.homeInsurance, color: CHART_COLORS.insurance },
    ];
    if (breakdown.hoaFees > 0) {
      data.push({ name: "HOA", value: breakdown.hoaFees, color: CHART_COLORS.hoa });
    }
    if (breakdown.pmi > 0) {
      data.push({ name: "PMI", value: breakdown.pmi, color: CHART_COLORS.pmi });
    }
    return data;
  }, [breakdown]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-[#00293D]">Mortgage Calculator</h2>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Panel - Form Inputs */}
        <div className="w-full lg:w-80 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50/50">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Home Price */}
            <FormInput
              id={`${formId}-home-price`}
              label="Home price"
              value={homePrice.toLocaleString()}
              onChange={handleHomePriceChange}
              prefix="$"
            />

            {/* Down Payment */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <label className="text-sm font-medium text-[#00293D]">Down payment</label>
                <button
                  type="button"
                  aria-label="More information about down payment"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-offset-1 rounded-full"
                >
                  <Info className="size-3.5" />
                </button>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">$</span>
                  <input
                    id={`${formId}-down-payment`}
                    type="text"
                    value={downPayment.toLocaleString()}
                    onChange={(e) => handleDownPaymentChange(e.target.value)}
                    aria-label="Down payment amount"
                    className="w-full h-11 pl-7 pr-3 border border-gray-300 rounded-lg bg-white text-[#00293D] font-medium
                      focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:border-transparent transition-all duration-150"
                  />
                </div>
                <div className="relative w-24">
                  <input
                    id={`${formId}-down-payment-percent`}
                    type="text"
                    value={downPaymentPercent}
                    onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
                    aria-label="Down payment percentage"
                    className="w-full h-11 pl-3 pr-8 border border-gray-300 rounded-lg bg-white text-[#00293D] font-medium text-center
                      focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:border-transparent transition-all duration-150"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">%</span>
                </div>
              </div>
            </div>

            {/* Loan Term */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <label htmlFor={`${formId}-loan-term`} className="text-sm font-medium text-[#00293D]">
                  Loan term
                </label>
                <button
                  type="button"
                  aria-label="More information about loan term"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-offset-1 rounded-full"
                >
                  <Info className="size-3.5" />
                </button>
              </div>
              <div className="relative">
                <select
                  id={`${formId}-loan-term`}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-11 px-3 pr-10 border border-gray-300 rounded-lg bg-white text-[#00293D] font-medium appearance-none
                    focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:border-transparent transition-all duration-150 cursor-pointer"
                >
                  {LOAN_TERMS.map((term) => (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  ))}
                </select>
                <CaretDown className="pointer-events-none absolute right-3 top-1/2 size-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <label htmlFor={`${formId}-interest-rate`} className="text-sm font-medium text-[#00293D]">
                  Interest rate
                </label>
                <button
                  type="button"
                  aria-label="More information about interest rate"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-offset-1 rounded-full"
                >
                  <Info className="size-3.5" />
                </button>
              </div>
              <div className="relative">
                <input
                  id={`${formId}-interest-rate`}
                  type="text"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="w-full h-11 pl-3 pr-8 border border-gray-300 rounded-lg bg-white text-[#00293D] font-medium
                    focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:border-transparent transition-all duration-150"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">%</span>
              </div>
            </div>

            {/* ZIP Code */}
            <FormInput
              id={`${formId}-zip-code`}
              label="ZIP code"
              value={zipCode}
              onChange={setZipCode}
            />

            {/* Advanced Options Toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-medium text-[#00293D] hover:text-[#00a6ca] transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-offset-2 rounded"
            >
              Taxes, insurance, HOA fees
              {showAdvanced ? (
                <CaretUp className="size-4" />
              ) : (
                <CaretDown className="size-4" />
              )}
            </button>

            {/* Advanced Options Panel */}
            {showAdvanced && (
              <div className="space-y-4 pt-2 border-t border-gray-200">
                <FormInput
                  id={`${formId}-property-tax`}
                  label="Property tax (monthly)"
                  value={propertyTax.toString()}
                  onChange={(v) => setPropertyTax(parseFloat(v) || 0)}
                  prefix="$"
                />
                <FormInput
                  id={`${formId}-home-insurance`}
                  label="Homeowner's insurance (monthly)"
                  value={homeInsurance.toString()}
                  onChange={(v) => setHomeInsurance(parseFloat(v) || 0)}
                  prefix="$"
                />
                <FormInput
                  id={`${formId}-hoa-fees`}
                  label="HOA fees (monthly)"
                  value={hoaFees.toString()}
                  onChange={(v) => setHoaFees(parseFloat(v) || 0)}
                  prefix="$"
                />
                <div className="flex items-center gap-3">
                  <input
                    id={`${formId}-pmi-enabled`}
                    type="checkbox"
                    checked={pmiEnabled}
                    onChange={(e) => setPmiEnabled(e.target.checked)}
                    className="w-4 h-4 text-[#00a6ca] border-gray-300 rounded focus:ring-[#00a6ca]"
                  />
                  <label htmlFor={`${formId}-pmi-enabled`} className="text-sm font-medium text-[#00293D]">
                    Include PMI
                  </label>
                </div>
                {pmiEnabled && (
                  <FormInput
                    id={`${formId}-pmi-amount`}
                    label="PMI (monthly)"
                    value={pmiAmount.toString()}
                    onChange={(v) => setPmiAmount(parseFloat(v) || 0)}
                    prefix="$"
                  />
                )}
              </div>
            )}

            {/* Update Button */}
            <Button type="submit" variant="secondary" className="w-full h-12">
              Update
            </Button>
          </form>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("breakdown")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-inset
                ${activeTab === "breakdown"
                  ? "border-[#00a6ca] text-[#00293D]"
                  : "border-transparent text-gray-500 hover:text-[#00293D]"
                }`}
            >
              Payment breakdown
            </button>
            <button
              onClick={() => setActiveTab("amortization")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-inset
                ${activeTab === "amortization"
                  ? "border-[#00a6ca] text-[#00293D]"
                  : "border-transparent text-gray-500 hover:text-[#00293D]"
                }`}
            >
              Amortization
            </button>
          </div>

          {/* Payment Breakdown Tab */}
          {activeTab === "breakdown" && (
            <div>
              {/* Header with Advertiser Disclosure */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#00293D]">Monthly payment breakdown</h3>
                  <p className="text-sm text-gray-500">Based on national average rates</p>
                </div>
                <button className="text-sm text-[#00a6ca] hover:underline focus:outline-none focus:ring-2 focus:ring-[#00a6ca] rounded">
                  Advertiser Disclosure
                </button>
              </div>

              {/* Chart and Legend */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                {/* Donut Chart */}
                <div className="relative w-56 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#00293D]">
                      {formatCurrency(breakdown.total, 0)}
                    </span>
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-4">
                  {/* Principal & Interest */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.principalInterest }} />
                      <span className="text-sm text-[#00293D]">Principal & interest</span>
                    </div>
                    <span className="font-semibold text-[#00293D]">{formatCurrency(breakdown.principalAndInterest, 2)}</span>
                  </div>

                  {/* Property Tax - Editable */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.propertyTax }} />
                      <span className="text-sm text-[#00293D]">Property tax</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">+</span>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          type="text"
                          value={propertyTax}
                          onChange={(e) => setPropertyTax(parseFloat(e.target.value) || 0)}
                          aria-label="Property tax amount"
                          className="w-20 h-8 pl-5 pr-2 text-right border border-gray-300 rounded text-sm font-medium text-[#00293D]
                            focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Homeowner's Insurance - Editable */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.insurance }} />
                      <span className="text-sm text-[#00293D]">Homeowner&apos;s insurance</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">+</span>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          type="text"
                          value={homeInsurance}
                          onChange={(e) => setHomeInsurance(parseFloat(e.target.value) || 0)}
                          aria-label="Homeowner's insurance amount"
                          className="w-20 h-8 pl-5 pr-2 text-right border border-gray-300 rounded text-sm font-medium text-[#00293D]
                            focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Filters Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#00293D] transition-colors
                      focus:outline-none focus:ring-2 focus:ring-[#00a6ca] rounded"
                  >
                    Additional filters
                    {showFilters ? (
                      <CaretUp className="size-3.5" />
                    ) : (
                      <CaretDown className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Compare to Top Offers */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-bold text-[#00293D]">Compare to top offers on Bankrate</h4>
                  <button
                    aria-label="More information about offers"
                    className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00a6ca] rounded-full"
                  >
                    <Info className="size-4" />
                  </button>
                </div>

                {/* Lender Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  {LENDER_OFFERS.map((lender) => (
                    <div
                      key={lender.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      {/* Lender Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center mb-1">
                            <span className="text-xs font-bold text-[#00293D]">{lender.name}</span>
                          </div>
                          <p className="text-xs text-gray-500">{lender.nmls}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#00293D]">{lender.apr} <span className="text-xs font-normal">APR</span></p>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="size-3 text-[#e8a317]" />
                            <span className="text-gray-600">{lender.rating} ({lender.reviews})</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-xl font-bold text-[#00293D]">{formatCurrency(lender.monthlyPayment)}</p>
                          <p className="text-xs text-gray-500">Monthly Payment</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#17A673]">{formatCurrency(lender.savings)}</p>
                          <p className="text-xs text-gray-500">Lower Payment</p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full h-10 bg-[#00a6ca] hover:bg-[#008ba8] text-white font-medium rounded-lg
                        flex items-center justify-center gap-2 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-offset-2">
                        View offer
                        <ExternalLink className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Amortization Tab */}
          {activeTab === "amortization" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#00293D]">Amortization Schedule</h3>
                  <p className="text-sm text-gray-500">
                    Loan amount: {formatCurrency(loanAmount)} over {loanTerm} years at {interestRate}%
                  </p>
                </div>
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setAmortizationView("yearly")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                      focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-inset
                      ${amortizationView === "yearly"
                        ? "bg-white text-[#00293D] shadow-sm"
                        : "text-gray-500 hover:text-[#00293D]"
                      }`}
                  >
                    Yearly
                  </button>
                  <button
                    onClick={() => setAmortizationView("monthly")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                      focus:outline-none focus:ring-2 focus:ring-[#00a6ca] focus:ring-inset
                      ${amortizationView === "monthly"
                        ? "bg-white text-[#00293D] shadow-sm"
                        : "text-gray-500 hover:text-[#00293D]"
                      }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Amortization Table */}
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-[#00293D]">
                        {amortizationView === "yearly" ? "Year" : "Month"}
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-[#00293D]">Payment</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-[#00293D]">Principal</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-[#00293D]">Interest</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-[#00293D]">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationView === "yearly" ? (
                      yearlyAmortization.map((row) => (
                        <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2 text-sm text-[#00293D] font-medium">{row.year}</td>
                          <td className="py-3 px-2 text-sm text-right text-[#00293D]">{formatCurrency(row.totalPayment, 2)}</td>
                          <td className="py-3 px-2 text-sm text-right text-[#00a6ca]">{formatCurrency(row.totalPrincipal, 2)}</td>
                          <td className="py-3 px-2 text-sm text-right text-gray-500">{formatCurrency(row.totalInterest, 2)}</td>
                          <td className="py-3 px-2 text-sm text-right text-[#00293D] font-medium">{formatCurrency(row.endingBalance, 2)}</td>
                        </tr>
                      ))
                    ) : (
                      monthlyAmortization.slice(0, 60).map((row) => (
                        <tr key={row.month} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2 text-sm text-[#00293D] font-medium">{row.month}</td>
                          <td className="py-3 px-2 text-sm text-right text-[#00293D]">{formatCurrency(row.payment, 2)}</td>
                          <td className="py-3 px-2 text-sm text-right text-[#00a6ca]">{formatCurrency(row.principal, 2)}</td>
                          <td className="py-3 px-2 text-sm text-right text-gray-500">{formatCurrency(row.interest, 2)}</td>
                          <td className="py-3 px-2 text-sm text-right text-[#00293D] font-medium">{formatCurrency(row.balance, 2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {amortizationView === "monthly" && monthlyAmortization.length > 60 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Showing first 60 months. Full schedule contains {monthlyAmortization.length} payments.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
