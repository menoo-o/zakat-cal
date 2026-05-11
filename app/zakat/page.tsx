import React from 'react'

function Zakatpage() {
  return (
    <div className="bg-background font-body-md text-on-surface geometric-bg min-h-screen flex flex-col">

<nav className="sticky top-0 z-50 bg-surface-container-lowest shadow-sm dark:shadow-none w-full border-none">
<div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-16">
<div className="font-headline-md text-headline-md font-extrabold text-primary flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="account_balance">account_balance</span>
                Al-Hisab
            </div>
<div className="hidden md:flex items-center space-x-gutter">
<a className="text-primary font-bold border-b-2 border-secondary font-label-md text-label-md py-1" href="#">Calculator</a>
<a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">Nisab Rates</a>
<a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">About Zakat</a>
<a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">FAQ</a>
</div>
<div className="flex items-center gap-4">
<button className="hidden md:block text-primary font-label-md text-label-md hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors">Login</button>
<button className="bg-primary text-white font-label-md text-label-md px-6 py-2.5 rounded-lg hover:bg-primary-container transition-all active:scale-95">Give Zakat</button>
</div>
</div>
</nav>
<main className="grow max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter py-section-gap">

<header className="text-center mb-section-gap max-w-3xl mx-auto">
<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary/5">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="calculate">calculate</span>
</div>
<h1 className="font-display-lg text-display-lg text-on-background mb-4">Zakat Calculator 2026</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">
                Fulfill your religious obligation with precision. Calculate your Zakat based on live market rates for Gold and Silver, managed with ethical clarity.
            </p>
</header>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<div className="lg:col-span-8">
<div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(33,49,69,0.06)] border border-outline-variant p-card-padding">

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-8">
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="payments">payments</span>
                                Select Currency
                            </label>
<div className="relative">
<select className="w-full h-14 bg-surface-container-low border-2 border-transparent focus:border-primary-container rounded-lg px-4 font-body-md appearance-none cursor-pointer">
<option>$ USD - US Dollar</option>
<option>£ GBP - British Pound</option>
<option>€ EUR - Euro</option>
<option>SAR - Saudi Riyal</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-4 text-on-surface-variant pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="show_chart">show_chart</span>
                                Calculation Basis
                            </label>
<div className="relative">
<select className="w-full h-14 bg-surface-container-low border-2 border-transparent focus:border-primary-container rounded-lg px-4 font-body-md appearance-none cursor-pointer">
<option>Silver (Sunnah Standard)</option>
<option>Gold</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-4 text-on-surface-variant pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
</div>
</div>

<div className="bg-primary text-on-primary rounded-lg p-6 mb-10 flex flex-wrap items-center justify-between gap-4 shadow-md overflow-hidden relative group">
<div className="absolute inset-0 bg-primary-container opacity-0 group-hover:opacity-10 transition-opacity"></div>
<div className="flex items-center gap-4 relative z-10">
<div className="bg-white/20 p-2 rounded-full">
<span className="material-symbols-outlined" data-icon="verified">verified</span>
</div>
<div>
<h3 className="font-label-md text-label-md uppercase tracking-wider opacity-80">Nisab Threshold (Updated Live)</h3>
<p className="font-headline-md text-headline-md font-bold">595g Silver</p>
</div>
</div>
<div className="text-right relative z-10">
<p className="font-numeric-lg text-numeric-lg font-extrabold">$1,581.84</p>
</div>
</div>

<div className="space-y-8">
<div>
<h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-3">
<span className="material-symbols-outlined text-secondary" data-icon="account_balance_wallet">account_balance_wallet</span>
                                Assets
                            </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-sm" data-icon="radio_button_checked">radio_button_checked</span>
                                        Value of gold
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-sm" data-icon="radio_button_unchecked">radio_button_unchecked</span>
                                        Value of silver
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="savings">savings</span>
                                        Cash &amp; Bank Balance
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="bookmark">bookmark</span>
                                        Deposited for purpose (e.g. Hajj)
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="currency_exchange">currency_exchange</span>
                                        Given out in loans
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="trending_up">trending_up</span>
                                        Business investments &amp; shares
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
</div>
</div>

<div className="pt-8 border-t border-outline-variant">
<h2 className="font-headline-md text-headline-md text-error mb-6 flex items-center gap-3">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
                                Debts
                            </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-error text-sm" data-icon="credit_card">credit_card</span>
                                        Borrowed money / Credit
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-error/20 focus:border-error rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-error text-sm" data-icon="event_busy">event_busy</span>
                                        Taxes, rent, bills due now
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-error/20 focus:border-error rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2 md:col-span-2">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-error text-sm" data-icon="groups">groups</span>
                                        Wages due to employees
                                    </label>
<div className="relative">
<span className="absolute left-4 top-4 text-outline font-bold">$</span>
<input className="w-full h-14 pl-10 pr-4 bg-white border border-outline-variant focus:ring-2 focus:ring-error/20 focus:border-error rounded-lg font-body-md transition-all" placeholder="0.00" type="number"/>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<aside className="lg:col-span-4 sticky top-24 space-y-gutter">
<div className="bg-primary-container text-white rounded-xl shadow-lg p-8 overflow-hidden relative">

<div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
<div className="absolute -left-8 -bottom-8 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
<div className="relative z-10 space-y-6">
<div className="flex justify-between items-center pb-4 border-b border-white/10">
<span className="font-body-md opacity-80">Total Assets</span>
<span className="font-numeric-lg text-2xl">$9,795.00</span>
</div>
<div className="flex justify-between items-center pb-4 border-b border-white/10">
<span className="font-body-md opacity-80">Debts</span>
<span className="font-numeric-lg text-2xl text-error-container">-$21.00</span>
</div>
<div className="space-y-1">
<div className="flex justify-between items-center">
<span className="font-label-md uppercase tracking-widest opacity-80">Net Assets</span>
<span className="font-numeric-lg text-3xl font-bold">$9,774.00</span>
</div>
<div className="flex items-center gap-2 text-primary-fixed font-label-md text-sm mt-2">
<span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span>
                                Above Nisab threshold
                            </div>
</div>

<div className="bg-white rounded-xl p-6 text-center shadow-inner mt-4">
<span className="text-on-surface-variant font-label-md uppercase tracking-wider block mb-2">Zakat Amount (2.5%)</span>
<span className="text-primary font-numeric-lg text-4xl block">$244.35</span>
</div>
<div className="flex gap-3 text-xs opacity-70 leading-relaxed italic">
<span className="material-symbols-outlined text-sm shrink-0" data-icon="info">info</span>
<p>Zakat is obligatory on every adult Muslim whose wealth reaches the Nisab and has been in possession for one lunar year.</p>
</div>
</div>
</div>
<div className="flex flex-col gap-4">
<button className="bg-primary-container text-white font-headline-md h-16 rounded-xl hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group">
                        Give Zakat
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</button>
<button className="bg-white text-on-surface-variant border border-outline-variant font-headline-md h-16 rounded-xl hover:bg-surface-container-low transition-colors flex items-center justify-center gap-3">
<span className="material-symbols-outlined" data-icon="restart_alt">restart_alt</span>
                        Reset
                    </button>
</div>
<div className="bg-surface-container-high/50 border border-outline-variant rounded-xl p-6">
<h4 className="font-label-md text-primary mb-3">Recent Nisab Rates</h4>
<div className="space-y-3">
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Gold (87.48g)</span>
<span className="font-bold text-on-surface">$5,420.12</span>
</div>
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Silver (612.36g)</span>
<span className="font-bold text-on-surface">$1,581.84</span>
</div>
<div className="pt-3 mt-3 border-t border-outline-variant flex items-center justify-center">
<a className="text-primary font-label-md text-xs hover:underline flex items-center gap-1" href="#">
                                Historical Rates <span className="material-symbols-outlined text-xs" data-icon="open_in_new">open_in_new</span>
</a>
</div>
</div>
</div>
</aside>
</div>
</main>

<footer className="bg-surface-container-high border-t border-outline-variant py-section-gap w-full mt-auto">
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter px-margin-mobile md:px-gutter max-w-container-max mx-auto">
<div className="space-y-4">
<div className="font-headline-md text-headline-md font-bold text-primary">Al-Hisab</div>
<p className="font-body-md text-on-surface-variant max-w-sm">
                    Empowering the Ummah with modern financial tools built on timeless Islamic principles. Manage your Zakat, Sadaqah, and wealth with absolute clarity.
                </p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
<span className="material-symbols-outlined" data-icon="public">public</span>
</a>
<a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
<span className="material-symbols-outlined" data-icon="mail">mail</span>
</a>
</div>
</div>
<div className="flex flex-col md:items-end justify-between gap-gutter">
<div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
<a className="text-on-surface-variant hover:text-secondary transition-colors font-label-md text-label-md" href="#">Privacy Policy</a>
<a className="text-on-surface-variant hover:text-secondary transition-colors font-label-md text-label-md" href="#">Terms of Service</a>
<a className="text-on-surface-variant hover:text-secondary transition-colors font-label-md text-label-md" href="#">Contact Support</a>
<a className="text-on-surface-variant hover:text-secondary transition-colors font-label-md text-label-md" href="#">Zakat Guide</a>
</div>
<p className="font-body-md text-body-md text-on-surface-variant text-sm md:text-right">
                    © 2026 Al-Hisab Wealth Management. All rights reserved. Built for the Ummah.
                </p>
</div>
</div>
</footer>
</div>
  )
}

export default Zakatpage