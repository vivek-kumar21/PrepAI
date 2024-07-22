import { useRef } from "react";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import PdfToText from "../components/PdfToText";
import ProgressBar from "../components/ProgressBar";
import Testimonial from "../components/Testimonial";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  const mainRef = useRef(null);

  return (
    <div ref={mainRef}>
      <ProgressBar target={mainRef} />
      <Navbar />

      <PdfToText />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonial />
      <ContactUs />

      <Footer />
    </div>
  );
};

export default Home;
