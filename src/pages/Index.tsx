
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MissionPhases from "../components/MissionPhases";
import TrainingModules from "../components/TrainingModules";
import SuccessStories from "../components/SuccessStories";
import DeploymentOptions from "../components/DeploymentOptions";
import Instructors from "../components/Instructors";
import FAQ from "../components/FAQ";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <MissionPhases />
        <TrainingModules />
        <SuccessStories />
        <DeploymentOptions />
        <Instructors />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
