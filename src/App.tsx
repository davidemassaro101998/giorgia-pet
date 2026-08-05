import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { HowItWorks } from "./components/HowItWorks";
import { WhatIsBioresonance } from "./components/WhatIsBioresonance";
import { About } from "./components/About";
import { WhoItsFor } from "./components/WhoItsFor";
import { SocialProof } from "./components/SocialProof";
import { Pricing } from "./components/Pricing";
import { FinalCta } from "./components/FinalCta";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <WhatIsBioresonance />
        <About />
        <WhoItsFor />
        <SocialProof />
        <Pricing />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

export default App;
