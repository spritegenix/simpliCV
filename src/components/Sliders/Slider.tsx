"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";

interface SliderProps<T> {
  data: T[];
  uniqueId?: string;
  swiperButtonStyle?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}
export const Slider = <T,>({
  data = [],
  uniqueId = "Slider123",
  swiperButtonStyle = "",
  renderItem,
}: SliderProps<T>) => {
  const getSlidesPerView = (base: number) => {
    return data.length < base ? data.length : base;
  };

  const pagination = {
    clickable: true,
    el: `.swiper-pagination-${uniqueId}`,
    renderBullet: (index: number, className: string) =>
      `<span class="${className}">${index + 1}</span>`,
  };

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Navigation, Pagination],
    pagination,
    breakpoints: {
      640: { slidesPerView: getSlidesPerView(1) },
      768: { slidesPerView: getSlidesPerView(1) },
      1024: { slidesPerView: getSlidesPerView(1) },
    },
  };

  return (
    <div className="sliderStyle relative w-full">
      <Swiper {...swiperOptions} className="w-full max-w-fit px-5">
        {data &&
          data.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((item: any, index: number) => (
            <SwiperSlide key={item?.id || index}>
              {renderItem(item, index)}
            </SwiperSlide>
          ))}
      </Swiper>
      {/* Pagination */}
      <div
        className={cn(`swiper-pagination-${uniqueId}`, "flex justify-center mt-5 gap-3")}
      ></div>
      <div
        className={cn(
          `${uniqueId}-next`,
          "swiper-button-next",
          `${swiperButtonStyle}`,
        )}
      ></div>
      <div
        className={cn(
          `${uniqueId}-prev`,
          "swiper-button-prev",
          `${swiperButtonStyle}`,
        )}
      ></div>
    </div>
  );
};

