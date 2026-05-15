import Footer from "@/components/Footer";
import ZakatCalculator from "@/components/Zakat-Block/ZakatCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141313] text-[#e5e2e1]">
    
      <ZakatCalculator />
      <Footer />
      
    </div>
  );
}
