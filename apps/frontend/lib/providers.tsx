import React from "react";
import GoogleLogo from "../public/google-2015-logo-svgrepo-com.svg";
import AppleLogo from "../public/apple-black-logo-svgrepo-com.svg";
import TinderLogo from "../public/tinder-1-logo-svgrepo-com.svg";
import SlackLogo from "../public/slack-logo-svgrepo-com.svg";
import VisaLogo from "../public/visa-logo-svgrepo-com.svg";
import NetflixLogo from "../public/netflix-2-logo-svgrepo-com.svg";
import CocaLogo from "../public/coca-cola-logo-svgrepo-com.svg";
import CounterStrikeLogo from "../public/counter-strike-global-offensive-logo-svgrepo-com.svg";
import ForbesLogo from "../public/forbes-logo-svgrepo-com.svg";
import McDLogo from "../public/mcdonald-s-15-logo-svgrepo-com.svg";

const logos = [
  { name: "Google", Logo: GoogleLogo },
  { name: "Apple", Logo: AppleLogo },
  { name: "Tinder", Logo: TinderLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Visa", Logo: VisaLogo },
  { name: "Netflix", Logo: NetflixLogo },
  { name: "Coca-Cola", Logo: CocaLogo },
  { name: "Counter-Strike", Logo: CounterStrikeLogo },
  { name: "Forbes", Logo: ForbesLogo },
  { name: "McDonald's", Logo: McDLogo },
];

export function getLogoComponents() {
  return logos.map(({ name, Logo }, index) => (
    <Logo
      key={index}
      className="h-12 w-auto grayscale opacity-80 hover:opacity-100 transition-opacity"
    />
  ));
}
