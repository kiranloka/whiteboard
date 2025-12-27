import React from "react";
import Image from "next/image";

const logos = [
  { name: "Google", src: "/google-2015-logo-svgrepo-com.svg" },
  { name: "Apple", src: "/apple-black-logo-svgrepo-com.svg" },
  { name: "Tinder", src: "/tinder-1-logo-svgrepo-com.svg" },
  { name: "Slack", src: "/slack-logo-svgrepo-com.svg" },
  { name: "Visa", src: "/visa-logo-svgrepo-com.svg" },
  { name: "Netflix", src: "/netflix-2-logo-svgrepo-com.svg" },
  { name: "Coca-Cola", src: "/coca-cola-logo-svgrepo-com.svg" },
  { name: "Counter-Strike", src: "/counter-strike-global-offensive-logo-svgrepo-com.svg" },
  { name: "Forbes", src: "/forbes-logo-svgrepo-com.svg" },
  { name: "McDonald's", src: "/mcdonald-s-15-logo-svgrepo-com.svg" },
];

export function getLogoComponents() {
  return logos.map(({ name, src }, index) => (
    <div key={index} className="relative h-12 w-auto">
      <Image
        src={src}
        alt={`${name} logo`}
        width={48}
        height={48}
        className="grayscale opacity-80 hover:opacity-100 transition-opacity"
      />
    </div>
  ));
}
