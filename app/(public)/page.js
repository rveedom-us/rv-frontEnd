import Hero from "@/_components/Landing/Hero";
import Pricing from "@/_components/Landing/Pricing";
import Why from "@/_components/Landing/Why";
import OurSecretSauce from "@/_components/Landing/OurSecretSauce";
import SampleFloorplans from "@/_components/Landing/SampleFloorplans";
import Divider from "@/_ui/Divider";
import HappyGuests from "@/_components/Landing/HappyGuests";
import ForOwners from "@/_components/Landing/ForOwners";
import Faq from "@/_components/Landing/Faq";

import HowItWorks from "@/_components/Landing/HowItWorks";
import RVSelector from "@/_components/Landing/RVSelector";
import Included from "@/_components/Landing/Included";
import VisualStyleByLevel from "@/_components/Landing/VisualStyleByLevel";
import Footer from "@/_ui/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Why />
      <HowItWorks />
      {/* <RVSelector /> */}

      <VisualStyleByLevel />
      <Divider />
      <Included />
      <Pricing />
      <Divider />
      <OurSecretSauce />
      <Divider />
      {/* <SampleFloorplans /> */}
      <Divider />
      <HappyGuests />
      <Divider />
      <ForOwners />
      <Divider />
      <Faq />
      <Footer />
    </>
  );
}
