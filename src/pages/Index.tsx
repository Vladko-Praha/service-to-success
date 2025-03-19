
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
import Login from "../components/Login";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-end items-center bg-military-beige px-4 py-2">
        <Login />
      </div>
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
