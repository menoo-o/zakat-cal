"use client";

import { useMemo, useState } from "react";
import type { MarketSnapshot } from "@/lib/getMarketData";

type Metal = "gold" | "silver";
type Currency = "USD" | "GBP" | "SAR" | "AED" | "EUR" | "PKR";

interface Props {
  market: MarketSnapshot;
  currency: Currency;
}

const TROY_OZ_PER_GRAM  = 0.0321507;
const DWT_PER_GRAM      = 0.0643015;
const TOLA_PER_GRAM     = 0.0857333;
const GRAMS_PER_KG      = 1000;

const GOLD_PURITY: Record<string, number> = {
  "24K": 1,
  "22K": 22 / 24,
  "18K": 18 / 24,
};

interface RateRow { label: string; multiplier: number; }

const GOLD_ROWS: RateRow[] = [
  { label: "1 Gram 24K",  multiplier: 1 * GOLD_PURITY["24K"] },
  { label: "1 Gram 22K",  multiplier: 1 * GOLD_PURITY["22K"] },
  { label: "1 Gram 18K",  multiplier: 1 * GOLD_PURITY["18K"] },
  { label: "1 Tola",      multiplier: 1 / TOLA_PER_GRAM      },
  { label: "Gold / oz",   multiplier: 1 / TROY_OZ_PER_GRAM   },
];

const SILVER_ROWS: RateRow[] = [
  { label: "1 Gram",      multiplier: 1                       },
  { label: "1 dwt",       multiplier: 1 / DWT_PER_GRAM        },
  { label: "1 Tola",      multiplier: 1 / TOLA_PER_GRAM       },
  { label: "1 KG",        multiplier: GRAMS_PER_KG            },
  { label: "Silver / oz", multiplier: 1 / TROY_OZ_PER_GRAM    },
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", GBP: "£", SAR: "﷼", AED: "د.إ", EUR: "€", PKR: "₨",
};

const fmt = (n: number, currency: Currency) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const fmtWithSymbol = (n: number, currency: Currency) =>
  `${CURRENCY_SYMBOLS[currency]}${fmt(n, currency)}`;

export default function MetalsDashboard({ market, currency }: Props) {
  const [activeMetal, setActiveMetal] = useState<Metal>("gold");

  const { goldPerGram, silverPerGram, goldPerOz, silverPerOz } = useMemo(() => {
    const { rates, exchangeRates } = market;
    const fxRate = exchangeRates[currency] > 0 ? 1 / exchangeRates[currency] : 1;
    const gpg = rates.goldPricePerGram   * fxRate;
    const spg = rates.silverPricePerGram * fxRate;
    return {
      goldPerGram:   gpg,
      silverPerGram: spg,
      goldPerOz:     gpg / TROY_OZ_PER_GRAM,
      silverPerOz:   spg / TROY_OZ_PER_GRAM,
    };
  }, [market, currency]);

  const tableRows: { label: string; value: number }[] = useMemo(() => {
    const pricePerGram = activeMetal === "gold" ? goldPerGram : silverPerGram;
    const rows = activeMetal === "gold" ? GOLD_ROWS : SILVER_ROWS;
    return rows.map(({ label, multiplier }) => ({
      label,
      value: pricePerGram * multiplier,
    }));
  }, [activeMetal, goldPerGram, silverPerGram]);

  const sym = CURRENCY_SYMBOLS[currency];
  const timestamp = new Date(market.metalTimestamp).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZone: "UTC", timeZoneName: "short",
  });

  return (
    <section
      id="metals-dashboard"
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "64px 24px 48px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4caf50", display: "inline-block", boxShadow: "0 0 6px #4caf50" }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#8e9192", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Live Market Data
            </span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 700, color: "#e5e2e1", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "6px" }}>
            Precious Metals Dashboard
          </h2>
          <p style={{ fontSize: "13px", color: "#7c7d7e" }}>
            Last updated: {timestamp}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>

        <div style={{
          background: "#201f1f",
          border: `1px solid ${activeMetal === "gold" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
          borderRadius: "4px",
          padding: "28px",
          cursor: "pointer",
          transition: "border-color 0.2s",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
          onClick={() => setActiveMetal("gold")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "52px", height: "52px", background: "#2b2a2a", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
              🥇
            </div>
            <div>
              <p style={{ fontSize: "18px", fontWeight: 700, color: "#e5e2e1", letterSpacing: "-0.01em", marginBottom: "2px" }}>Gold / oz</p>
              <p style={{ fontSize: "12px", color: "#7c7d7e", letterSpacing: "0.04em" }}>XAU / {currency}</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "36px", fontWeight: 700, color: "#e5e2e1", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {fmtWithSymbol(goldPerOz, currency)}
            </p>
            <p style={{ fontSize: "12px", color: "#7c7d7e", marginTop: "4px" }}>
              {sym}{fmt(goldPerGram, currency)} / g
            </p>
          </div>
        </div>

        <div style={{
          background: "#201f1f",
          border: `1px solid ${activeMetal === "silver" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
          borderRadius: "4px",
          padding: "28px",
          cursor: "pointer",
          transition: "border-color 0.2s",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
          onClick={() => setActiveMetal("silver")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "52px", height: "52px", background: "#2b2a2a", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
              🥈
            </div>
            <div>
              <p style={{ fontSize: "18px", fontWeight: 700, color: "#e5e2e1", letterSpacing: "-0.01em", marginBottom: "2px" }}>Silver / oz</p>
              <p style={{ fontSize: "12px", color: "#7c7d7e", letterSpacing: "0.04em" }}>XAG / {currency}</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "36px", fontWeight: 700, color: "#e5e2e1", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {fmtWithSymbol(silverPerOz, currency)}
            </p>
            <p style={{ fontSize: "12px", color: "#7c7d7e", marginTop: "4px" }}>
              {sym}{fmt(silverPerGram, currency)} / g
            </p>
          </div>
        </div>

      </div>

      <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#1c1b1b",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "14px 20px" }}>
            {(["gold", "silver"] as Metal[]).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMetal(m)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "4px 12px",
                  fontSize: "12px", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  border: "none", cursor: "pointer", borderRadius: "2px",
                  background: activeMetal === m ? "#353434" : "transparent",
                  color: activeMetal === m ? "#e5e2e1" : "#7c7d7e",
                  transition: "all 0.15s",
                }}
              >
                {m}
                {activeMetal === m && (
                  <span style={{ fontSize: "10px", color: "#8e9192" }}>▾</span>
                )}
              </button>
            ))}
          </div>

          <div style={{ padding: "14px 20px", textAlign: "right" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#7c7d7e", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Rate / {currency}
            </span>
          </div>
        </div>

        {tableRows.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              padding: "18px 20px",
              borderBottom: i < tableRows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              background: i % 2 === 0 ? "#201f1f" : "#1e1d1d",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2b2a2a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#201f1f" : "#1e1d1d")}
          >
            <span style={{ fontSize: "15px", fontWeight: 500, color: "#c4c7c7", letterSpacing: "0.01em" }}>
              {row.label}
            </span>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#e5e2e1", textAlign: "right", letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums" }}>
              {fmtWithSymbol(row.value, currency)}
            </span>
          </div>
        ))}

      </div>
    </section>
  );
}