import { HeroSectionOne } from "@/components/HeroSectionOne";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        {" "}
        <HeroSectionOne></HeroSectionOne>
      </div>
    </div>
  );
}
