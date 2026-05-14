"use client";

import { useState, useMemo, useEffect } from "react";
import type { MarketSnapshot } from "@/lib/getMarketData";

// ─── Types ────────────────────────────────────────────────────────────────────

type Currency = "USD" | "GBP" | "SAR" | "AED" | "EUR" | "PKR";
type Basis = "gold" | "silver";

interface Assets {
  cashAndBank: number;
  goldSilver: number;
  investments: number;
  business: number;
  receivables: number;
}

interface Liabilities {
  loans: number;
  bills: number;
  wages: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD - United States Dollar",
  GBP: "GBP - British Pound",
  SAR: "SAR - Saudi Riyal",
  AED: "AED - UAE Dirham",
  EUR: "EUR - Euro",
  PKR: "PKR - Pakistani Rupee",
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", GBP: "£", SAR: "﷼", AED: "د.إ", EUR: "€", PKR: "₨",
};

const GOLD_NISAB_GRAMS   = 87.48;
const SILVER_NISAB_GRAMS = 612.36;

const DEFAULT_ASSETS: Assets = {
  cashAndBank: 0, goldSilver: 0, investments: 0, business: 0, receivables: 0,
};

const DEFAULT_LIABILITIES: Liabilities = {
  loans: 0, bills: 0, wages: 0,
};

// ─── Input Row ────────────────────────────────────────────────────────────────

function InputRow({
  icon, label, symbol, value, onChange,
}: {
  icon: string; label: string; symbol: string;
  value: number; onChange: (v: number) => void;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      gap: "16px",
    }}>
      {/* Left: icon + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "20px",
            color: "#8e9192",
            fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <span style={{ color: "#e5e2e1", fontSize: "16px", lineHeight: "24px" }}>
          {label}
        </span>
      </div>

      {/* Right: boxed input — [$  |  0.00] */}
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#1c1b1b",
        border: "1px solid #444748",
        borderRadius: "2px",
        width: "220px",
        overflow: "hidden",
      }}>
        <span style={{
          padding: "8px 12px",
          color: "#8e9192",
          fontSize: "13px",
          borderRight: "1px solid #444748",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}>
          {symbol}
        </span>
        <input
          type="number"
          min={0}
          placeholder="0.00"
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#e5e2e1",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            textAlign: "right",
            padding: "8px 12px",
            width: "100%",
            MozAppearance: "textfield",
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

// ─── Summary Row ─────────────────────────────────────────────────────────────

function SummaryRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: bold ? "#e5e2e1" : "#8e9192", fontSize: "16px", fontWeight: bold ? 700 : 400 }}>
        {label}
      </span>
      <span style={{ color: "#e5e2e1", fontSize: "14px", fontWeight: bold ? 700 : 500, letterSpacing: "0.02em" }}>
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ZakatCalculator() {
  const [market, setMarket]           = useState<MarketSnapshot | null>(null);
  const [currency, setCurrency]       = useState<Currency>("USD");
  const [basis, setBasis]             = useState<Basis>("gold");
  const [assets, setAssets]           = useState<Assets>(DEFAULT_ASSETS);
  const [liabilities, setLiabilities] = useState<Liabilities>(DEFAULT_LIABILITIES);

  // Fetch via API route — never call Redis from client
  useEffect(() => {
    fetch("/api/metal-data")
      .then((res) => res.json())
      .then((data) => { if (data && !data.error) setMarket(data); })
      .catch((err) => console.error("Failed to load market data:", err));
  }, []);

  // ── Calculation ──
  const calc = useMemo(() => {
    if (!market) return null;
    const { rates, exchangeRates } = market;
    const fxRate        = exchangeRates[currency] > 0 ? 1 / exchangeRates[currency] : 1;
    const goldPerGram   = rates.goldPricePerGram   * fxRate;
    const silverPerGram = rates.silverPricePerGram * fxRate;
    const nisabValue    = basis === "gold"
      ? GOLD_NISAB_GRAMS   * goldPerGram
      : SILVER_NISAB_GRAMS * silverPerGram;
    const totalAssets      = assets.cashAndBank + assets.goldSilver + assets.investments + assets.business + assets.receivables;
    const totalLiabilities = liabilities.loans + liabilities.bills + liabilities.wages;
    const netAssets        = Math.max(0, totalAssets - totalLiabilities);
    const isNisabMet       = netAssets >= nisabValue;
    const zakatDue         = isNisabMet ? netAssets * 0.025 : 0;
    return { totalAssets, totalLiabilities, netAssets, nisabValue, isNisabMet, zakatDue, goldPerGram, silverPerGram };
  }, [market, currency, basis, assets, liabilities]);

  const symbol = CURRENCY_SYMBOLS[currency];
  const fmt    = (n: number) => new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

  const setAsset     = (k: keyof Assets)      => (v: number) => setAssets((p)       => ({ ...p, [k]: v }));
  const setLiability = (k: keyof Liabilities) => (v: number) => setLiabilities((p) => ({ ...p, [k]: v }));

  const handleReset = () => {
    setAssets(DEFAULT_ASSETS);
    setLiabilities(DEFAULT_LIABILITIES);
    setCurrency("USD");
    setBasis("gold");
  };

  // ── Loading state ──
  if (!market || !calc) {
    return (
      <div style={{
        minHeight: "100vh", background: "#141313",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: "16px",
      }}>
        <div style={{
          width: "32px", height: "32px",
          border: "2px solid #444748", borderTopColor: "#e5e2e1",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }} />
        <p style={{ color: "#8e9192", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Fetching live market rates…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Full render ──
  return (
   <>
    
  
     <main
      id="calculator"
      style={{
        paddingTop: "80px",
        paddingBottom: "40px",
        paddingLeft: "24px",
        paddingRight: "24px",
        maxWidth: "1440px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: "24px",
      }}
    >

      {/* ══ LEFT COLUMN ══════════════════════════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* 1. Setup */}
        <section style={{ background: "#201f1f", border: "1px solid rgba(255,255,255,0.05)", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#e5e2e1", letterSpacing: "-0.01em" }}>
              1. Setup
            </h2>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#8e9192", fontSize: "12px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>sync</span>
              Live Rates Updated: {new Date(market.metalTimestamp).toLocaleTimeString()}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>

            {/* Currency */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#8e9192", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>
                Currency
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  style={{
                    width: "100%", background: "#1c1b1b", border: "none",
                    borderBottom: "1px solid #444748", color: "#e5e2e1",
                    fontSize: "14px", padding: "8px 24px 8px 0",
                    outline: "none", cursor: "pointer", appearance: "none",
                  }}
                >
                  {(Object.keys(CURRENCY_LABELS) as Currency[]).map((c) => (
                    <option key={c} value={c} style={{ background: "#1c1b1b" }}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
                <span style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", color: "#8e9192", pointerEvents: "none", fontSize: "12px" }}>▾</span>
              </div>
            </div>

            {/* Basis toggle */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#8e9192", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>
                Calculation Basis
              </label>
              <div style={{ display: "flex", background: "#1c1b1b", padding: "4px", gap: "4px" }}>
                {(["gold", "silver"] as Basis[]).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBasis(b)}
                    style={{
                      flex: 1, padding: "6px 0",
                      fontSize: "12px", fontWeight: 700,
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      border: "none", cursor: "pointer", transition: "all 0.15s",
                      background: basis === b ? "#474747" : "transparent",
                      color: basis === b ? "#e5e2e1" : "#8e9192",
                    }}
                  >
                    {b === "gold" ? "Gold Basis" : "Silver Basis"}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Nisab */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#8e9192", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>
                Live Nisab Rate
              </label>
              <div style={{ padding: "8px 16px", background: "#353434", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e5e2e1", fontSize: "14px", fontWeight: 500, letterSpacing: "0.02em" }}>
                  {symbol}{fmt(calc.nisabValue)}
                </span>
                <span style={{ fontSize: "10px", background: "rgba(200,198,197,0.15)", color: "#c8c6c5", padding: "2px 6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {basis === "gold" ? "Gold" : "Silver"}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Assets */}
        <section style={{ background: "#201f1f", border: "1px solid rgba(255,255,255,0.05)", padding: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#e5e2e1", letterSpacing: "-0.01em", marginBottom: "24px" }}>
            2. Assets
          </h2>
          <InputRow icon="savings"           label="Cash on Hand & Bank Accounts"     symbol={symbol} value={assets.cashAndBank}  onChange={setAsset("cashAndBank")} />
          <InputRow icon="monetization_on"   label="Gold & Silver (Market Value)"     symbol={symbol} value={assets.goldSilver}   onChange={setAsset("goldSilver")} />
          <InputRow icon="trending_up"       label="Investments, Stocks & Shares"     symbol={symbol} value={assets.investments}  onChange={setAsset("investments")} />
          <InputRow icon="business_center"   label="Business Assets (Stock for Sale)" symbol={symbol} value={assets.business}     onChange={setAsset("business")} />
          <InputRow icon="real_estate_agent" label="Money Owed to You (Receivables)"  symbol={symbol} value={assets.receivables}  onChange={setAsset("receivables")} />
        </section>

        {/* 3. Liabilities */}
        <section style={{ background: "#201f1f", border: "1px solid rgba(255,255,255,0.05)", padding: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#e5e2e1", letterSpacing: "-0.01em", marginBottom: "24px" }}>
            3. Liabilities & Debts
          </h2>
          <InputRow icon="receipt_long" label="Borrowed Money / Personal Loans"     symbol={symbol} value={liabilities.loans} onChange={setLiability("loans")} />
          <InputRow icon="payments"     label="Outstanding Bills & Rent"            symbol={symbol} value={liabilities.bills} onChange={setLiability("bills")} />
          <InputRow icon="work_history" label="Unpaid Wages / Employee Obligations" symbol={symbol} value={liabilities.wages} onChange={setLiability("wages")} />
        </section>

      </div>

      {/* ══ RIGHT COLUMN — sticky sidebar ════════════════ */}
      <aside>
        <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Summary card */}
          <div style={{
            background: "#2b2a2a", border: "1px solid rgba(255,255,255,0.05)",
            padding: "24px", boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
          }}>
            <h3 style={{ fontSize: "12px", fontWeight: 600, color: "#8e9192", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "32px" }}>
              Calculation Summary
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
              <SummaryRow label="Total Assets"      value={`${symbol}${fmt(calc.totalAssets)}`} />
              <SummaryRow label="Total Liabilities" value={`(${symbol}${fmt(calc.totalLiabilities)})`} />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
              <SummaryRow label="Net Assets" value={`${symbol}${fmt(calc.netAssets)}`} bold />
            </div>

            {/* Zakat amount — big white block */}
            <div style={{ background: "#e5e2e1", padding: "24px", marginBottom: "16px" }}>
              <span style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#313030", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px", opacity: 0.7 }}>
                Zakat Amount Due (2.5%)
              </span>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <span style={{ color: "#141313", fontSize: "48px", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {symbol}{fmt(calc.zakatDue)}
                </span>
                <span style={{ color: "#141313", fontSize: "12px", fontWeight: 700, marginBottom: "6px", opacity: 0.6, letterSpacing: "0.05em" }}>
                  {currency}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                style={{ width: "100%", padding: "16px", background: "#ffffff", color: "#000000", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>volunteer_activism</span>
                Give Zakat
              </button>
              <button
                onClick={handleReset}
                style={{ width: "100%", padding: "16px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#e5e2e1", cursor: "pointer", fontSize: "14px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>download</span>
                Download Report
              </button>
            </div>

            <p style={{ marginTop: "32px", textAlign: "center", color: "#7c7d7e", fontSize: "12px", lineHeight: "1.6" }}>
              Values are calculated based on current market rates.
              Please consult a financial advisor for complex business cases.
            </p>
          </div>

          {/* Sharia compliant */}
          <div style={{ background: "#201f1f", border: "1px solid rgba(255,255,255,0.05)", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span className="material-symbols-outlined" style={{ color: "#c8c6c5", fontSize: "22px", flexShrink: 0 }}>verified_user</span>
            <div>
              <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#e5e2e1", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>
                Sharia Compliant
              </h4>
              <p style={{ fontSize: "12px", color: "#7c7d7e", lineHeight: "1.5" }}>
                Audited calculation logic following standard AAOIFI guidelines.
              </p>
            </div>
          </div>

        </div>
      </aside>
    </main>
  
   </>
  );
}