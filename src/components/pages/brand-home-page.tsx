import Editorial from "@/components/homepage/editorial";
import Hero from "@/components/homepage/hero";
import MemberExperience from "@/components/homepage/member-experience";
import NextSteps from "@/components/homepage/next-steps";
import Proof from "@/components/homepage/proof";
import Trust from "@/components/homepage/trust";
import WhoWeAre from "@/components/homepage/who-we-are";
import WhyBankrate from "@/components/homepage/why-bankrate";

/** Brand-identity homepage prototype (ported from bankrate/brand-identity-pages-app). */
export function BrandHomePage() {
  return (
    <div className="bg-gray-50 pb-14">
      <Hero />
      <Proof />
      <NextSteps />
      <WhyBankrate />
      <MemberExperience />
      <Editorial />
      <Trust />
      <WhoWeAre />
    </div>
  );
}
