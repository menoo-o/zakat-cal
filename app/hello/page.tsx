"use client"

import MetalsDashboard from "@/components/MetalsDashboard";
import type { MarketSnapshot, Currency } from "@/lib/getMarketData";
export default function Hello() {


const mockMarketData: MarketSnapshot = {
  rates: {
    goldPricePerGram: 82.45,    // Mock USD price
    silverPricePerGram: 0.98,   // Mock USD price
    lastUpdated: new Date().toISOString(), // This fixes the "Property lastUpdated is missing" error
  },
  exchangeRates: {
    USD: 1,
    GBP: 0.79,
    SAR: 3.75,
    AED: 3.67,
    EUR: 0.92,
    PKR: 278.50,
  },
  metalTimestamp: new Date().toISOString(),
  currencyTimestamp: new Date().toISOString(),
};
  

  return (
    <>
      <div className="min-h-screen bg-[#141313] text-[#e5e2e1] flex items-center justify-center">
       <MetalsDashboard 
        market={mockMarketData} 
        currency={"USD" as Currency} 
      />

      </div>
        
      
    </>
  );
}