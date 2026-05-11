import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZakatCalculator from "@/components/ZakatCalculator";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <ZakatCalculator />
      </main>
      <Footer />
    </>
  );
}
