"use client";
import styles from "./CurrencyInput.module.css";

interface Props {
  label: string;
  icon: string;
  value: number;
  onChange: (value: number) => void;
  symbol?: string;
}

export default function CurrencyInput({
  label,
  icon,
  value,
  onChange,
  symbol = "$",
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(raw);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        <span className={styles.icon}>{icon}</span>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <span className={styles.prefix}>{symbol}</span>
        <input
          type="number"
          className={styles.input}
          value={value === 0 ? "" : value}
          onChange={handleChange}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
}
