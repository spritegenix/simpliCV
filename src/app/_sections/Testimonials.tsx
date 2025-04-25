"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider } from '@/components/Sliders/Slider';
import { StarRating } from '@/components/StarRating';
import React from 'react'

export default function Testimonials() {
  return (
    <Slider data={testimonials}
    swiperButtonStyle="opacity-50 hover:opacity-100 transition-all duration-300 !top-[96%] max-md:!hidden"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderItem={(item: any) => <StyledCard data={item} />}
   /> 
  )
}

function StyledCard({ data }: any) {
  return (
    <div className="space-y-3 rounded-lg border bg-white p-3">
      <StarRating rating={data.rating} className="text-yellow-500" />
      <p className='italic text-w3 font-medium'>&quot;{data.review}&quot;</p>
      <div className=''>
        <p className='font-semibold text-w3'>{data.userName}</p>
        <p className='text-sm text-zinc-500'>{data.designation}</p>
      </div>
    </div>
  );
}

const testimonials = [
  {
    id: 1,
    userName: "Pankaj Kumar",
    review:
      "This resume builder is a game-changer. The AI suggestions were incredibly helpful, and I landed more interviews within days. Highly recommend it to anyone job hunting!",
    rating: 5,
    designation: "Full Stack Web Developer",
  },
  {
    id: 2,
    userName: "Ashik",
    review:
      "Super easy to use and the templates are professional. I created a polished resume in under 10 minutes. It’s the best tool I’ve used so far.",
    rating: 5,
    designation: "Front-End Developer",
  },
];
