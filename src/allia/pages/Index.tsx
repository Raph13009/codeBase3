
import Header from "../components/Header";
import Hero from "../components/Hero";
import Demo from "../components/Demo";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import BetaSignup from "../components/BetaSignup";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Demo />
      <Problem />
      <Solution />
      <BetaSignup />
      <Footer />
    </div>
  );
};

export default Index;
