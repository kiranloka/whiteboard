import { HeroSectionOne } from "@/components/HeroSectionOne";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  Pencil1Icon,
  EraserIcon,
  Share1Icon,
  TextIcon,
} from "@radix-ui/react-icons";
import Navbar from "@/components/Navbar";
import { Marquee } from "@/components/magicui/marquee";
import logos from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        {" "}
        <HeroSectionOne></HeroSectionOne>
        <div className="container mx-auto px-27  py-12">
          <BentoGrid>
            <BentoCard
              name="Drawing Tools"
              description="Express your ideas with our intuitive drawing tools. Create smooth lines, shapes, and freehand sketches with precision."
              className="col-span-1"
              background={
                <div className="absolute inset-0 border border-neutral-200 bg-white" />
              }
              Icon={Pencil1Icon}
              href="/drawing"
              cta="Start Drawing"
            />
            <BentoCard
              name="Smart Shapes"
              description="Add professional shapes and diagrams to your whiteboard. Perfect for flowcharts, mind maps, and system designs."
              className="col-span-1"
              background={
                <div className="absolute inset-0 border border-neutral-200 bg-white" />
              }
              Icon={Share1Icon}
              href="/shapes"
              cta="Explore Shapes"
            />
            <BentoCard
              name="Text & Notes"
              description="Add and format text anywhere on your whiteboard. Perfect for annotations, labels, and detailed explanations."
              className="col-span-1"
              background={
                <div className="absolute inset-0 border border-neutral-200 bg-white" />
              }
              Icon={TextIcon}
              href="/text"
              cta="Add Text"
            />
            <BentoCard
              name="Collaboration"
              description="Work together in real-time with your team. Share, edit, and comment on whiteboards seamlessly."
              className="col-span-3"
              background={
                <div className="absolute inset-0 border border-neutral-200 bg-white" />
              }
              Icon={EraserIcon}
              href="/collaborate"
              cta="Start Collaborating"
            />
          </BentoGrid>
        </div>
        <div className="mt-10 flex justify-center text-3xl">
          Trusted by People and Companies accross the World
        </div>
        <section className="w-full bg-background py-6">
          <Marquee pauseOnHover repeat={4} className="max-w-screen-xl mx-auto">
            {logos.map((logo, i) => (
              <Image
                key={i}
                src={logo.src}
                alt={logo.name}
                width={80}
                height={80}
                className="grayscale opacity-70 hover:opacity-100 transition duration-300"
              />
            ))}
          </Marquee>
        </section>
        <Image
          src={"/public/Wormies-SunnyDay.png"}
          alt="nothing"
          width={24}
          height={24}
        />{" "}
      </div>
    </div>
  );
}
