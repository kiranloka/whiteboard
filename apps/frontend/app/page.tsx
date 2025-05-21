"use client";

import { HeroSectionOne } from "@/components/HeroSectionOne";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  Pencil1Icon,
  EraserIcon,
  Share1Icon,
  TextIcon,
} from "@radix-ui/react-icons";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import { Marquee } from "@/components/magicui/marquee";
import constants from "@/lib/constants";
import Image from "next/image";
import { HeroCanvas } from "@/components/HeroCanvas";
import { inView, motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, Shapes } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FaqSection from "@/components/FaqSection";
import { Input } from "@/components/ui/input";

export default function Home() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLoaded = true;
  return (
    <>
      <Navbar />

      <div>
        <HeroSectionOne />

        <div className="container mx-auto px-27 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to create
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features that help you bring your ideas to life quickly
              and easily
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-500/10"
              />
              <div className="flex flex-col gap-4 relative z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute inset-0 rounded-full bg-rose-500/20"
                  />
                  <Pencil1Icon className="h-6 w-6 relative z-10" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold">Drawing Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Express your ideas with our intuitive drawing tools. Create
                    smooth lines, shapes, and freehand sketches with precision.
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-rose-500/10 transform translate-x-1/4 translate-y-1/4"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-500/10"
              />
              <div className="flex flex-col gap-4 relative z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute inset-0 rounded-full bg-rose-500/20"
                  />
                  <Share1Icon className="h-6 w-6 relative z-10" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold">Smart Shapes</h3>
                  <p className="text-sm text-muted-foreground">
                    Add professional shapes and diagrams to your whiteboard.
                    Perfect for flowcharts, mind maps, and system designs.
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-rose-500/10 transform translate-x-1/4 translate-y-1/4"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-500/10"
              />
              <div className="flex flex-col gap-4 relative z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute inset-0 rounded-full bg-rose-500/20"
                  />
                  <TextIcon className="h-6 w-6 relative z-10" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold">Text & Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    Add and format text anywhere on your whiteboard. Perfect for
                    annotations, labels, and detailed explanations.
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-rose-500/10 transform translate-x-1/4 translate-y-1/4"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all col-span-3"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-500/10"
              />
              <div className="flex flex-col gap-4 relative z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute inset-0 rounded-full bg-rose-500/20"
                  />
                  <EraserIcon className="h-6 w-6 relative z-10" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold">Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Work together in real-time with your team. Share, edit, and
                    comment on whiteboards seamlessly.
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-rose-500/10 transform translate-x-1/4 translate-y-1/4"
              />
            </motion.div>
          </div>
        </div>

        <div className="mt-10 flex justify-center text-3xl">
          Trusted by People and Companies across the World
        </div>

        <section className="w-full bg-background py-6">
          <Marquee pauseOnHover repeat={4} className="max-w-screen-xl mx-auto">
            {constants.logos.map(
              (logo: { name: string; src: string }, i: number) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.name}
                  width={80}
                  height={80}
                  className="grayscale opacity-70 hover:opacity-100 transition duration-300"
                />
              )
            )}
          </Marquee>
        </section>

        <section
          ref={ref}
          className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-20 md:px-12 py-40"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-3xl md:text-4xl font-bold text-rose-500 mb-4">
              Try WhiteBoard
            </p>
            <span className="text-neutral-600 text-lg md:text-xl opacity-80">
              Sketch Ideas, Plan projects, or just doodle.
            </span>
            <br />
            <span className="text-neutral-600 text-lg md:text-xl opacity-80">
              Your ideas need space to breathe
            </span>
            <br />
            <button className="px-8 py-2 rounded-full bg-gradient-to-b from-rose-300 to-rose-500 mt-4 text-gray-50 focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
              Get Started
            </button>
          </motion.div>

          <motion.div
            className="w-[500px] h-[400px] relative border border-neutral-300 p-2 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <HeroCanvas isLoaded={isLoaded} />
          </motion.div>
        </section>

        <section className="pt-20 pb-20 px-4 bg-gray-100">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-4xl font-semibold mb-2">Join our Newsletter</h3>
            <p className="text-gray-500 mb-4">
              Stay updated with our latest news and updates.
            </p>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
            </div>
          </div>
        </section>
        <section className="mt-0 pb-10 mb-5">
          <FaqSection />
        </section>
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Shapes className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold ">Whiteboard</span>
            </div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
              <a href="#" className="hover:text-gray-300">
                About
              </a>
              <a href="#" className="hover:text-gray-300">
                Contact
              </a>
              <a href="#" className="hover:text-gray-300">
                Terms
              </a>
              <a href="#" className="hover:text-gray-300">
                Privacy?
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-4">
            <p className="text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} WhiteBoard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
