/**
 * Mortgage calculation helper functions
 */

export interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  loanTermYears: number;
  interestRate: number; // Annual rate as percentage (e.g., 6.609)
  propertyTax: number; // Monthly
  homeInsurance: number; // Monthly
  hoaFees: number; // Monthly
  pmiEnabled: boolean;
  pmiAmount: number; // Monthly
}

export interface MonthlyPaymentBreakdown {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
  pmi: number;
  total: number;
}

export interface AmortizationEntry {
  month: number;
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalPrincipal: number;
  totalInterest: number;
}

export interface YearlyAmortizationEntry {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  endingBalance: number;
}

/**
 * Calculate the loan amount (home price - down payment)
 */
export function calculateLoanAmount(homePrice: number, downPayment: number): number {
  return Math.max(0, homePrice - downPayment);
}

/**
 * Calculate down payment percentage from amount
 */
export function calculateDownPaymentPercent(homePrice: number, downPayment: number): number {
  if (homePrice <= 0) return 0;
  return (downPayment / homePrice) * 100;
}

/**
 * Calculate down payment amount from percentage
 */
export function calculateDownPaymentAmount(homePrice: number, percent: number): number {
  return (homePrice * percent) / 100;
}

/**
 * Calculate monthly principal and interest payment using standard amortization formula
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Where:
 * M = Monthly payment
 * P = Principal (loan amount)
 * r = Monthly interest rate
 * n = Number of payments (months)
 */
export function calculateMonthlyPrincipalAndInterest(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  if (loanAmount <= 0) return 0;
  if (annualInterestRate <= 0) return loanAmount / (loanTermYears * 12);
  
  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
  
  return loanAmount * (numerator / denominator);
}

/**
 * Calculate PMI (Private Mortgage Insurance)
 * Typically required when down payment is less than 20%
 * Standard PMI rate is around 0.5-1% of loan amount annually
 */
export function calculatePMI(
  loanAmount: number,
  homePrice: number,
  pmiRate: number = 0.5
): number {
  const ltv = loanAmount / homePrice;
  if (ltv <= 0.8) return 0; // No PMI if LTV <= 80%
  return (loanAmount * (pmiRate / 100)) / 12;
}

/**
 * Check if PMI is required based on loan-to-value ratio
 */
export function isPMIRequired(homePrice: number, downPayment: number): boolean {
  if (homePrice <= 0) return false;
  return (downPayment / homePrice) < 0.2;
}

/**
 * Calculate complete monthly payment breakdown
 */
export function calculateMonthlyPaymentBreakdown(inputs: MortgageInputs): MonthlyPaymentBreakdown {
  const loanAmount = calculateLoanAmount(inputs.homePrice, inputs.downPayment);
  const principalAndInterest = calculateMonthlyPrincipalAndInterest(
    loanAmount,
    inputs.interestRate,
    inputs.loanTermYears
  );
  
  const pmi = inputs.pmiEnabled ? inputs.pmiAmount : 0;
  
  return {
    principalAndInterest: Math.round(principalAndInterest * 100) / 100,
    propertyTax: inputs.propertyTax,
    homeInsurance: inputs.homeInsurance,
    hoaFees: inputs.hoaFees,
    pmi,
    total: Math.round((principalAndInterest + inputs.propertyTax + inputs.homeInsurance + inputs.hoaFees + pmi) * 100) / 100,
  };
}

/**
 * Generate monthly amortization schedule
 */
export function generateAmortizationSchedule(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): AmortizationEntry[] {
  const schedule: AmortizationEntry[] = [];
  const monthlyPayment = calculateMonthlyPrincipalAndInterest(loanAmount, annualInterestRate, loanTermYears);
  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  let balance = loanAmount;
  let totalPrincipal = 0;
  let totalInterest = 0;
  
  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    totalPrincipal += principalPayment;
    totalInterest += interestPayment;
    
    schedule.push({
      month,
      year: Math.ceil(month / 12),
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.round(balance * 100) / 100,
      totalPrincipal: Math.round(totalPrincipal * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
    });
  }
  
  return schedule;
}

/**
 * Generate yearly amortization summary
 */
export function generateYearlyAmortizationSummary(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): YearlyAmortizationEntry[] {
  const monthlySchedule = generateAmortizationSchedule(loanAmount, annualInterestRate, loanTermYears);
  const yearlySummary: YearlyAmortizationEntry[] = [];
  
  for (let year = 1; year <= loanTermYears; year++) {
    const yearlyEntries = monthlySchedule.filter(entry => entry.year === year);
    const totalPayment = yearlyEntries.reduce((sum, entry) => sum + entry.payment, 0);
    const totalPrincipal = yearlyEntries.reduce((sum, entry) => sum + entry.principal, 0);
    const totalInterest = yearlyEntries.reduce((sum, entry) => sum + entry.interest, 0);
    const endingBalance = yearlyEntries[yearlyEntries.length - 1]?.balance ?? 0;
    
    yearlySummary.push({
      year,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalPrincipal: Math.round(totalPrincipal * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      endingBalance: Math.round(endingBalance * 100) / 100,
    });
  }
  
  return yearlySummary;
}

/**
 * Format currency with proper locale formatting
 */
export function formatCurrency(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}
