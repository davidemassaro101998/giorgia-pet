import { Nav } from "./components/Nav";
import { CutoutFilterDefs } from "./components/CutoutFilterDefs";
import { CinematicIntro } from "./components/CinematicIntro";
import { Problem } from "./components/Problem";
import { HowItWorks } from "./components/HowItWorks";
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
      <CutoutFilterDefs />
      <Nav />
      <main>
        <CinematicIntro />
        <Problem />
        <HowItWorks />
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
