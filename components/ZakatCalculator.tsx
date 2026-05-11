"use client";

import { useState, useMemo } from "react";
import styles from "./ZakatCalculator.module.css";
import CurrencyInput from "./CurrencyInput";
import ResultsPanel from "./ResultsPanel";
import {
  AssetInputs,
  DebtInputs,
  CalculationBasis,
  Currency,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
  FALLBACK_RATES,
  calculateZakat,
  formatCurrency,
  GOLD_NISAB_GRAMS,
  SILVER_NISAB_GRAMS_SUNNAH,
} from "@/lib/zakat";

const DEFAULT_ASSETS: AssetInputs = {
  gold: 0,
  silver: 0,
  cashAndBank: 0,
  deposited: 0,
  loansGiven: 0,
  businessInvestments: 0,
};

const DEFAULT_DEBTS: DebtInputs = {
  borrowedCredit: 0,
  taxesRentBills: 0,
  employeeWages: 0,
};

const CALC_BASIS_OPTIONS: { value: CalculationBasis; label: string }[] = [
  { value: "silver_sunnah", label: "Silver (Sunnah Standard)" },
  { value: "silver_hanafi", label: "Silver (Hanafi / 595g)" },
  { value: "gold", label: "Gold (87.48g)" },
];

export default function ZakatCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [basis, setBasis] = useState<CalculationBasis>("silver_sunnah");
  const [assets, setAssets] = useState<AssetInputs>(DEFAULT_ASSETS);
  const [debts, setDebts] = useState<DebtInputs>(DEFAULT_DEBTS);

  const rates = FALLBACK_RATES; // In production: fetch live rates
  const symbol = CURRENCY_SYMBOLS[currency];

  const result = useMemo(
    () => calculateZakat(assets, debts, basis, rates, currency),
    [assets, debts, basis, rates, currency]
  );

  const nisabLabel = result.nisabThresholdLabel;
  const nisabAmount = formatCurrency(result.nisabThreshold, currency);

  const goldNisabUSD = GOLD_NISAB_GRAMS * rates.goldPricePerGram;
  const silverNisabUSD = SILVER_NISAB_GRAMS_SUNNAH * rates.silverPricePerGram;

  const setAsset = (key: keyof AssetInputs) => (value: number) =>
    setAssets((prev) => ({ ...prev, [key]: value }));

  const setDebt = (key: keyof DebtInputs) => (value: number) =>
    setDebts((prev) => ({ ...prev, [key]: value }));

  const handleReset = () => {
    setAssets(DEFAULT_ASSETS);
    setDebts(DEFAULT_DEBTS);
    setCurrency("USD");
    setBasis("silver_sunnah");
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Zakat Calculator</h1>
        
      </section>

      {/* Calculator Layout */}
      <div className={styles.layout} id="calculator">
        {/* Left: Form */}
        <div className={styles.formCol}>
          {/* Controls */}
          <div className={styles.controlsRow}>
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>
                <span className={styles.controlIcon}>⊙</span>
                Select Currency
              </label>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.select}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                >
                  {(Object.keys(CURRENCY_LABELS) as Currency[]).map((c) => (
                    <option key={c} value={c}>
                      {c === "USD" ? "$ " : ""}{CURRENCY_LABELS[c]}
                    </option>
                  ))}
                </select>
                <span className={styles.selectArrow}>⌄</span>
              </div>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>
                <span className={styles.controlIcon}>∿</span>
                Calculation Basis
              </label>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.select}
                  value={basis}
                  onChange={(e) => setBasis(e.target.value as CalculationBasis)}
                >
                  {CALC_BASIS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span className={styles.selectArrow}>⌄</span>
              </div>
            </div>
          </div>

          {/* Nisab Banner */}
          <div className={styles.nisabBanner}>
            <div className={styles.nisabLeft}>
              <div className={styles.nisabBadgeIcon}>⊙</div>
              <div>
                <p className={styles.nisabBannerLabel}>
                  NISAB THRESHOLD (UPDATED LIVE)
                </p>
                <p className={styles.nisabBannerValue}>{nisabLabel}</p>
              </div>
            </div>
            <p className={styles.nisabBannerAmount}>{nisabAmount}</p>
          </div>

          {/* Assets Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>⊞</span>
              Assets
            </h2>
            <div className={styles.inputGrid}>
              <CurrencyInput
                label="Value of gold"
                icon="◎"
                value={assets.gold}
                onChange={setAsset("gold")}
                symbol={symbol}
              />
              <CurrencyInput
                label="Value of silver"
                icon="○"
                value={assets.silver}
                onChange={setAsset("silver")}
                symbol={symbol}
              />
              <CurrencyInput
                label="Cash & Bank Balance"
                icon="⊙"
                value={assets.cashAndBank}
                onChange={setAsset("cashAndBank")}
                symbol={symbol}
              />
              <CurrencyInput
                label="Deposited for purpose (e.g. Hajj)"
                icon="⊡"
                value={assets.deposited}
                onChange={setAsset("deposited")}
                symbol={symbol}
              />
              <CurrencyInput
                label="Given out in loans"
                icon="⊕"
                value={assets.loansGiven}
                onChange={setAsset("loansGiven")}
                symbol={symbol}
              />
              <CurrencyInput
                label="Business investments & shares"
                icon="∿"
                value={assets.businessInvestments}
                onChange={setAsset("businessInvestments")}
                symbol={symbol}
              />
            </div>
          </section>

          <div className={styles.separator} />

          {/* Debts Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>⊞</span>
              Debts
            </h2>
            <div className={styles.inputGrid}>
              <CurrencyInput
                label="Borrowed money / Credit"
                icon="⊟"
                value={debts.borrowedCredit}
                onChange={setDebt("borrowedCredit")}
                symbol={symbol}
              />
              <CurrencyInput
                label="Taxes, rent, bills due now"
                icon="⊠"
                value={debts.taxesRentBills}
                onChange={setDebt("taxesRentBills")}
                symbol={symbol}
              />
              <CurrencyInput
                label="Wages due to employees"
                icon="⊹"
                value={debts.employeeWages}
                onChange={setDebt("employeeWages")}
                symbol={symbol}
              />
            </div>
          </section>
        </div>

        {/* Right: Results */}
        <ResultsPanel
          result={result}
          currency={currency}
          goldNisabUSD={goldNisabUSD}
          silverNisabUSD={silverNisabUSD}
          onGiveZakat={() => alert("Redirecting to Zakat payment portal…")}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
