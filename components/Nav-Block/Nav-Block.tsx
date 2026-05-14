"use client";

import Link from "next/link";

const NAV: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  height: "64px",
  backgroundColor: "#141313",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  display: "flex",
  alignItems: "center",
};

const INNER: React.CSSProperties = {
  width: "100%",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "0 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const LEFT: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "40px",
};

const LOGO: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#e5e2e1",
  letterSpacing: "-0.01em",
};

const NAV_LINKS: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
};

const LINK_ACTIVE: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#c8c6c5",
  textDecoration: "none",
  borderBottom: "2px solid #c8c6c5",
  paddingBottom: "4px",
};

const LINK_IDLE: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#7c7d7e",
  textDecoration: "none",
};

const RIGHT: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const ICON_BTN: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  background: "none",
  border: "none",
  borderRadius: "8px",
  color: "#7c7d7e",
  cursor: "pointer",
  fontFamily: '"Material Symbols Outlined", sans-serif',
  fontSize: "20px",
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 1,
  letterSpacing: "normal",
  textTransform: "none",
  whiteSpace: "nowrap",
  WebkitFontSmoothing: "antialiased",
};

const BTN_SECONDARY: React.CSSProperties = {
  padding: "6px 16px",
  background: "#2b2a2a",
  color: "#e5e2e1",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const BTN_PRIMARY: React.CSSProperties = {
  padding: "6px 16px",
  background: "#e5e2e1",
  color: "#141313",
  border: "none",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
};

export default function Navbar() {
  return (
    <header style={NAV}>
      <div style={INNER}>
        {/* ── Left ── */}
        <div style={LEFT}>
          <span style={LOGO}>ZakatPro</span>
          <nav style={NAV_LINKS}>
            <Link href="#calculator" style={LINK_ACTIVE}>
              Calculator
            </Link>
            <Link href="#" style={LINK_IDLE}>
              Nisab Rates
            </Link>
            <Link href="#" style={LINK_IDLE}>
              Guides
            </Link>
          </nav>
        </div>

        {/* ── Right ── */}
        <div style={RIGHT}>
          <button style={ICON_BTN} aria-label="Notifications">
            notifications
          </button>
          <button style={ICON_BTN} aria-label="Settings">
            settings
          </button>
          <button style={BTN_SECONDARY}>Support</button>
          <button style={BTN_PRIMARY}>Account</button>
        </div>
      </div>
    </header>
  );
}
