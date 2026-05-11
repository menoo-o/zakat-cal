// Zakat calculation constants and utilities

export const ZAKAT_RATE = 0.025; // 2.5%

// Nisab standards
// Gold: 87.48g (modern scholarly consensus)
// Silver: 612.36g (Sunnah standard / 595g for Hanafi)
export const GOLD_NISAB_GRAMS = 87.48;
export const SILVER_NISAB_GRAMS_SUNNAH = 612.36;
export const SILVER_NISAB_GRAMS_HANAFI = 595;

export type CalculationBasis = "gold" | "silver_sunnah" | "silver_hanafi";
export type Currency = "USD" | "PKR" | "GBP" | "EUR" | "SAR" | "AED";

export interface NisabRates {
  goldPricePerGram: number; // in USD
  silverPricePerGram: number; // in USD
  lastUpdated: string;
}

export interface AssetInputs {
  gold: number;
  silver: number;
  cashAndBank: number;
  deposited: number; // savings for specific purpose (Hajj, etc.)
  loansGiven: number;
  businessInvestments: number;
}

export interface DebtInputs {
  borrowedCredit: number;
  taxesRentBills: number;
  employeeWages: number;
}

export interface ZakatResult {
  totalAssets: number;
  totalDebts: number;
  netAssets: number;
  nisabThreshold: number;
  nisabThresholdLabel: string;
  isAboveNisab: boolean;
  zakatAmount: number;
  zakatRate: number;
}

// Static fallback rates (approximate market values)
export const FALLBACK_RATES: NisabRates = {
  goldPricePerGram: 61.93, // ~$1927/oz
  silverPricePerGram: 0.75, // ~$23.3/oz
  lastUpdated: new Date().toISOString(),
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  PKR: "₨",
  GBP: "£",
  EUR: "€",
  SAR: "﷼",
  AED: "د.إ",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD - US Dollar",
  PKR: "PKR - Pakistani Rupee",
  GBP: "GBP - British Pound",
  EUR: "EUR - Euro",
  SAR: "SAR - Saudi Riyal",
  AED: "AED - UAE Dirham",
};

// Approximate exchange rates to USD (static fallback)
export const EXCHANGE_RATES_TO_USD: Record<Currency, number> = {
  USD: 1,
  PKR: 0.0036,
  GBP: 1.27,
  EUR: 1.09,
  SAR: 0.267,
  AED: 0.272,
};

export function getNisabThreshold(
  basis: CalculationBasis,
  rates: NisabRates,
  currency: Currency
): { threshold: number; label: string } {
  const exchangeRate = EXCHANGE_RATES_TO_USD[currency];
  let thresholdUSD: number;
  let label: string;

  switch (basis) {
    case "gold":
      thresholdUSD = GOLD_NISAB_GRAMS * rates.goldPricePerGram;
      label = `${GOLD_NISAB_GRAMS}g Gold`;
      break;
    case "silver_hanafi":
      thresholdUSD = SILVER_NISAB_GRAMS_HANAFI * rates.silverPricePerGram;
      label = `${SILVER_NISAB_GRAMS_HANAFI}g Silver`;
      break;
    case "silver_sunnah":
    default:
      thresholdUSD = SILVER_NISAB_GRAMS_SUNNAH * rates.silverPricePerGram;
      label = `${SILVER_NISAB_GRAMS_SUNNAH}g Silver`;
      break;
  }

  return {
    threshold: thresholdUSD / exchangeRate,
    label,
  };
}

export function calculateZakat(
  assets: AssetInputs,
  debts: DebtInputs,
  basis: CalculationBasis,
  rates: NisabRates,
  currency: Currency
): ZakatResult {
  const totalAssets =
    assets.gold +
    assets.silver +
    assets.cashAndBank +
    assets.deposited +
    assets.loansGiven +
    assets.businessInvestments;

  const totalDebts =
    debts.borrowedCredit + debts.taxesRentBills + debts.employeeWages;

  const netAssets = Math.max(0, totalAssets - totalDebts);

  const { threshold: nisabThreshold, label: nisabThresholdLabel } =
    getNisabThreshold(basis, rates, currency);

  const isAboveNisab = netAssets >= nisabThreshold;
  const zakatAmount = isAboveNisab ? netAssets * ZAKAT_RATE : 0;

  return {
    totalAssets,
    totalDebts,
    netAssets,
    nisabThreshold,
    nisabThresholdLabel,
    isAboveNisab,
    zakatAmount,
    zakatRate: ZAKAT_RATE,
  };
}

export function formatCurrency(
  amount: number,
  currency: Currency,
  compact = false
): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  if (compact && amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(2)}M`;
  }
  if (compact && amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  }
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
