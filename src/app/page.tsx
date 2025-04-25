import image1 from "@/assets/about1.png";
import check from "@/assets/check.png";
import c1 from "@/assets/1.png";
import c2 from "@/assets/2.png";
import c3 from "@/assets/3.png";
import c4 from "@/assets/4.png";
import c5 from "@/assets/5.gif";
import c6 from "@/assets/6.gif";
import c7 from "@/assets/7.gif";
import testimonial from "@/assets/test.png";
import banner from "@/assets/banner.png";

import bg from "@/assets/texture2.svg";
import hoverMe from "@/assets/hoverMe.png";

import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { Link } from "next-view-transitions";
import Layout from "@/components/layout/Layout";
import Wrapper from "@/components/Wrappers";
import { AutoTextLineBreak } from "@/components/TextWithLineBreak";
import { LuBadgeIndianRupee } from "react-icons/lu";
import BackStyle3 from "@/components/backgroundStyle/BackStyle3";
import { cn } from "@/lib/utils";
import { resumeStyles } from "@/components/ResumeStyles/Styles";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import prisma from "@/lib/prisma";
import TemplateCard from "./(resumeSample)/templates/TemplateCard";
import { canCreateResume } from "@/lib/permissions";
import { PremiumCards } from "@/components/premium/PremiumModal";
import Testimonials from "./_sections/Testimonials";

export default function Home() {
  return (
    <Layout footerStyle>
      <BannerSection />
      <Section1 />
      <Section2 />
      <Templates />
      <PricingPlans />
      <TestimonialsSection />
    </Layout>
  );
}

function BannerSection() {
  return (
    <BackStyle3 className="grid gap-5 py-8 font-inter md:grid-cols-2 md:py-16 lg:h-[90vh]">
      <div className="my-auto space-y-5">
        <h2 className="flex items-center gap-1 rounded-full bg-w1/30 p-1 px-4 text-sm text-white sm:w-max sm:text-pretty sm:text-base">
          <LuBadgeIndianRupee className="rounded-full bg-w1 p-1 text-3xl text-white" />{" "}
          Discover The Easiest ways to Build Your CV!
        </h2>
        <h1 className="text-4xl font-bold text-white md:leading-[5rem] lg:text-6xl">
          Create Your Winning Resume in Minutes.
        </h1>
        <h6 className="font-light text-white/70 md:text-xl">
          Our Perfect resume builder takes the hassle out of resume writing.
          Choose from several templates and follow easy prompts to create the
          perfect job-ready resume.
        </h6>
        <ul className="list-inside list-disc font-rubik text-white/70 max-sm:text-sm">
          <li>Built with smart design & formatting</li>
          <li>Optimized for modern job search platforms</li>
          <li>Increase your interview chances instantly</li>
        </ul>
        <Button className="!px-8 !py-2" asChild size="lg" variant="premium">
          <Link href="/resumes">Create Your CV</Link>
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={banner}
          alt="resume preview"
          width={800}
          height={800}
          className="h-[25rem] object-contain"
        />
      </div>
    </BackStyle3>
  );
}

function Section1() {
  return (
    <Wrapper className="space-y-5 py-16 font-inter">
      <SubTitle className="mx-auto">Try Our Creative Tool</SubTitle>
      <Title className="text-center">
        On-the-Fly Creative Resume and CV \n Builder ✍️ Across Your Favorite
        Tools
      </Title>
      <div className="mt-10 grid grid-cols-1 gap-10 md:!mt-20 md:grid-cols-3 md:gap-20">
        <Card
          icon={c5}
          title="AI-Powered Resume \n Writing"
          content="Craft a job-ready resume in minutes with AI-driven suggestions, ensuring clarity, precision, and professional formatting."
        />
        <Card
          icon={c6}
          title="Ready-to-Use \n Templates"
          content="Pick from a wide range of ATS-friendly templates, fully customizable to highlight your skills and experience effectively."
        />
        <Card
          icon={c7}
          title="Intuitive and \n User-Friendly"
          content="Enjoy a seamless resume-building experience with an easy-to-use interface, step-by-step guidance, and smart formatting."
        />
      </div>
    </Wrapper>
  );
}

function Section2() {
  return (
    <Wrapper className="bg-custom-gradient rounded-t-3xl px-3 py-8 font-inter md:py-16">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Image
          src={image1}
          width={800}
          height={800}
          alt="about"
          className="hidden w-full object-contain md:block"
        />
        <div className="space-y-5">
          <SubTitle className="max-md:mx-auto">Learn about us</SubTitle>
          <Title className="max-md:text-center">
            Remove Headache of Creating a Resume!
          </Title>
          <p>
            Struggling to create the perfect resume? Our AI-powered platform
            takes the stress out of resume writing, ensuring a professional,
            polished, and job-winning CV in minutes.
          </p>
          <Button
            asChild
            size="lg"
            variant="premium"
            className="max-md:mx-auto"
          >
            <Link href="/resumes">Create Your CV</Link>
          </Button>
        </div>
        <ul className="list-none md:mt-8 md:space-y-5 md:text-xl">
          {[
            "Proven CV Templates to increase Hiring Chance",
            "Creative and Clean Templates Design",
            "Easy and Intuitive Online CV Builder",
            "Free to use. Developed by hiring professionals.",
            "Fast Easy CV and Resume Formatting",
            "Recruiter Approved Phrases.",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Image src={check} alt="Check" className="mt-1 h-6 w-6" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-16 space-y-5">
        <SubTitle className="mx-auto">How it Works</SubTitle>
        <Title className="text-center">Easy Steps To Build your Resume</Title>
        <div className="grid grid-cols-2 gap-5 pt-5 md:grid-cols-4">
          <Card1 icon={c1} title="Create your Account" index={1} />
          <Card1 icon={c2} title="Choose Your Resume" index={2} />
          <Card1 icon={c3} title="Add Your Information" index={3} />
          <Card1 icon={c4} title="Download Your Resume" index={4} />
        </div>
      </div>
    </Wrapper>
  );
}

async function Templates() {
  const { userId } = await auth();

  let totalCount = 0;
  let subscriptionLevel = null;

  if (userId) {
    [totalCount, subscriptionLevel] = await Promise.all([
      prisma.resume.count({
        where: { userId },
      }),
      getUserSubscriptionLevel(userId),
    ]);
  }
  return (
    <Wrapper bgColor="pattern1 bg-w3" className="relative space-y-5 py-16">
      <Image
        src={hoverMe}
        alt="Hover Me"
        className="absolute left-0 top-16 hidden w-36 -rotate-45 sm:block"
      />
      <SubTitle className="mx-auto bg-white/40 text-white">
        Our Creative Templates
      </SubTitle>
      <Title className="text-center text-white">
        Choose a Template, and Let’s Create \n Your Resume in Minutes
      </Title>
      <div className="flex w-full grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-3">
        {resumeStyles.map((style) => (
          <TemplateCard
            key={style.id}
            style={style}
            canCreate={
              subscriptionLevel
                ? canCreateResume(subscriptionLevel, totalCount)
                : false
            }
            isUser={userId ? true : false}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-3 text-lg font-semibold text-white">
        <p>More Resume Templates Will be added Soon, </p>
        <Link href={"/contact-us"}>
          <SubTitle className="cursor-pointer bg-white/40 text-white underline">
            Contact Us
          </SubTitle>
        </Link>
      </div>
    </Wrapper>
  );
}

function TestimonialsSection() {
  return (
    <Wrapper bgImage={bg} bgColor="bg-w3" className="relative space-y-5 py-16">
      <SubTitle className="mx-auto bg-white/40 text-white">
        What Our Client Say
      </SubTitle>
      <Title className="text-center text-white">
        Listen to What Our Clients Say
      </Title>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        <Image
          src={testimonial}
          alt="Testimonials"
          className="hidden w-full object-contain sm:block"
        />
        <div className="col-span-2 flex items-center">
          <Testimonials />
        </div>
      </div>
    </Wrapper>
  );
}

function PricingPlans() {
  return (
    <Wrapper className="space-y-5 py-16">
      <SubTitle className="mx-auto">Our Pricing Plans</SubTitle>
      <Title className="text-center">
        Ready to Start? Don&apos;t Worry, We&apos;ll Keep \n You at Comfortable
        Budget
      </Title>
      <PremiumCards />
    </Wrapper>
  );
}
function SubTitle({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "w-max rounded-md bg-w2/20 px-4 py-1 text-center font-semibold text-w3",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Title({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <>
      <AutoTextLineBreak
        as={"h2"}
        className={cn("text-2xl font-bold text-w3 md:text-4xl", className)}
      >
        {children}
      </AutoTextLineBreak>
    </>
  );
}

function Card({
  icon,
  title,
  content,
}: {
  icon: StaticImageData;
  title: string;
  content: string;
}) {
  return (
    <div className="space-y-5 text-center">
      <div className="mx-auto w-max rounded-lg bg-white p-3 shadow-lg">
        <Image src={icon} alt="Resume Steps" className="w-20 object-contain" />
      </div>
      <AutoTextLineBreak
        as={"h2"}
        className="border-w2 text-xl font-bold text-w3 md:text-3xl"
      >
        {title}
      </AutoTextLineBreak>
      <p className="">{content}</p>
    </div>
  );
}

function Card1({
  icon,
  title,
  index,
}: {
  icon: StaticImageData;
  title: string;
  index: number;
}) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="rounded-lg bg-white p-3 shadow-lg">
        <Image src={icon} alt="Resume Steps" className="w-16 object-contain" />
      </div>
      <p className="font-semibold">Step Num #{index}</p>
      <p className="text-center text-lg font-bold">{title}</p>
    </div>
  );
}

// function Card2({title, subtitle, price, }){
//   return (
//     <div className="flex flex-col items-center justify-center space-y-3">
// <h2></h2>
//     </div>
//   )
// }
