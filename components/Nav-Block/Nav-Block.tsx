"use client";

import Link from "next/link";
import './nav.css'

export default function Navbar() {
  return (
    <header className="nav-header">
      <div className="nav-inner">
        {/* ── Left ── */}
        <div className="nav-left">
          <span className="nav-logo">ZakatPro</span>
          <nav className="nav-links">
            <Link href="/metalrates" className="nav-link idle">
              Metals Rates
            </Link>
          </nav>
        </div>

        {/* ── Right ── */}
        <div className="nav-right">
          <button className="nav-icon-btn" aria-label="Notifications">
            notifications
          </button>
          <button className="nav-icon-btn" aria-label="Settings">
            settings
          </button>
          <button className="nav-btn nav-btn-secondary">Support</button>
          <button className="nav-btn nav-btn-primary">Account</button>
        </div>
      </div>
    </header>
  );
}