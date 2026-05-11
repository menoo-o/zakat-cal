"use client";
import styles from "./ResultsPanel.module.css";
import { ZakatResult, Currency, formatCurrency } from "@/lib/zakat";

interface Props {
  result: ZakatResult;
  currency: Currency;
  goldNisabUSD: number;
  silverNisabUSD: number;
  onGiveZakat: () => void;
  onReset: () => void;
}

export default function ResultsPanel({
  result,
  currency,
  goldNisabUSD,
  silverNisabUSD,
  onGiveZakat,
  onReset,
}: Props) {
  const fmt = (n: number) => formatCurrency(n, currency);

  return (
    <aside className={styles.panel}>
      {/* Summary */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total Assets</span>
          <span className={styles.summaryValue}>{fmt(result.totalAssets)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Debts</span>
          <span className={`${styles.summaryValue} ${styles.negative}`}>
            {result.totalDebts > 0 ? `−${fmt(result.totalDebts)}` : fmt(0)}
          </span>
        </div>
        <div className={styles.divider} />
        <div className={`${styles.summaryRow} ${styles.netRow}`}>
          <span className={styles.netLabel}>NET ASSETS</span>
          <span className={styles.netValue}>{fmt(result.netAssets)}</span>
        </div>
        <div className={styles.nisabBadge}>
          <span
            className={`${styles.nisabDot} ${result.isAboveNisab ? styles.dotAbove : styles.dotBelow}`}
          />
          <span className={styles.nisabText}>
            {result.isAboveNisab ? "Above" : "Below"} Nisab threshold
          </span>
        </div>
      </div>

      {/* Zakat Amount */}
      <div
        className={`${styles.zakatCard} ${!result.isAboveNisab ? styles.zakatCardInactive : ""}`}
      >
        <p className={styles.zakatLabel}>
          ZAKAT AMOUNT ({(result.zakatRate * 100).toFixed(1)}%)
        </p>
        <p className={styles.zakatAmount}>{fmt(result.zakatAmount)}</p>
        <p className={styles.zakatNote}>
          {result.isAboveNisab
            ? "Zakat is obligatory on every adult Muslim whose wealth reaches the Nisab and has been in possession for one lunar year."
            : `Your net assets are below the Nisab threshold of ${fmt(result.nisabThreshold)}. Zakat is not obligatory.`}
        </p>
      </div>

      {/* CTAs */}
      <button className={styles.giveBtn} onClick={onGiveZakat}>
        Give Zakat →
      </button>
      <button className={styles.resetBtn} onClick={onReset}>
        ↺&nbsp;&nbsp;Reset
      </button>

      {/* Nisab Rates */}
      <div className={styles.ratesCard} id="nisab">
        <p className={styles.ratesTitle}>Recent Nisab Rates</p>
        <div className={styles.rateRow}>
          <span className={styles.rateLabel}>Gold (87.48g)</span>
          <span className={styles.rateValue}>{formatCurrency(goldNisabUSD, "USD")}</span>
        </div>
        <div className={styles.rateRow}>
          <span className={styles.rateLabel}>Silver (612.36g)</span>
          <span className={styles.rateValue}>{formatCurrency(silverNisabUSD, "USD")}</span>
        </div>
        <a href="#" className={styles.historicalLink}>
          Historical Rates ↗
        </a>
      </div>
    </aside>
  );
}
