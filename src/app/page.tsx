import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { ThreeSteps } from "@/components/site/three-steps";
import { BattleCards } from "@/components/site/battle-cards";
import { Comparison } from "@/components/site/comparison";
import { Stats } from "@/components/site/stats";
import { Payments } from "@/components/site/payments";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ThreeSteps />
        <BattleCards />
        <Comparison />
        <Stats />
        <Payments />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
