import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import LivestreamForm from "@/components/LivestreamForm";
import SocialProof from "@/components/SocialProof";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <HeroSection />
      <main>
        <ValueProposition />
        <LeadMagnetForm />
        <LivestreamForm />
        <SocialProof />
      </main>
      <FinalCTA />
    </div>
  );
};

export default Index;
