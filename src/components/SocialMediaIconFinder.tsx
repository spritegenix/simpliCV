import React from "react";
import { BiLogoGmail } from "react-icons/bi";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ImLink } from "react-icons/im";

interface SocialMediaIconFinderProps {
  url: string;
  className?: string;
}

const SocialMediaIconFinder: React.FC<SocialMediaIconFinderProps> = ({
  url,
  className,
}) => {
  // Function to detect the platform from the URL
  const detectPlatform = (url: string): string => {
    if (url.includes("tel:")) return "phone";
    if (url.includes("facebook.com")) return "facebook";
    if (url.includes("twitter.com")) return "twitter";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("youtube.com")) return "youtube";
    if (url.includes("github.com")) return "github";
    if (url.includes("gmail.com")) return "gmail";
    return "generic"; 
  };

  // Function to return the respective icon
  const getIcon = (platform: string) => {
    switch (platform) {
      case "phone":
        return <FaPhoneAlt className={`${className}`} />;
      case "facebook":
        return <FaFacebook className={`${className}`} />;
      case "github":
        return <FaGithub className={`${className}`} />;
      case "gmail":
        return <BiLogoGmail className={`${className}`} />;
      case "twitter":
        return <FaXTwitter className={`${className}`} />;
      case "instagram":
        return <FaInstagram className={`${className}`} />;
      case "linkedin":
        return <FaLinkedin className={`${className}`} />;
      case "youtube":
        return <FaYoutube className={`${className}`} />;
      default:
        return <ImLink className={`${className}`} />;
    }
  };

  // Detect platform and get the corresponding icon
  const platform = detectPlatform(url);
  return getIcon(platform);
};

export default SocialMediaIconFinder;

//  <SocialMediaIconFinder url={link} />
