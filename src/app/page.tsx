import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import HomePage from "@/pages/Home/HomePage";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center x">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
