"use client";
import { Navigation, Autoplay } from "swiper/modules";
import KitchenWare from "@/public/carousels/kitchen-ware.jpg";
import gaming from "@/public/carousels/gaming.jpg";
import furniture from "@/public/carousels/furniture.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from "next/image";

export default function Slider() {
  return (
    <Swiper
      className="h-[600px] w-full"
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 2000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div className="flex flex-col md:flex-row h-full w-full rounded-lg bg-[#F9F9E0]">
          <div className="md:w-1/2 flex justify-center items-center">
            <Image
              src={KitchenWare}
              alt="kitchenware"
              className="h-[400px] md:h-[500px] w-[600px] rounded-lg"
            />
          </div>
          <div className="flex py-2 md:py-0 md:w-1/2 justify-center items-center flex-col">
            <h3 className="text-2xl lg:text-3xl mb-2 text-blue-950 font-semibold">
              Kitchen Favourites
            </h3>
            <p className="text-xl text-gray-700">Grab your choices</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col md:flex-row h-full w-full rounded-lg bg-[#f9f9e0]">
          <div className="md:w-1/2 flex justify-center items-center">
            <Image
              src={furniture}
              alt="furniture"
              className="h-[400px] md:h-[500px] w-[600px] rounded-lg"
            />
          </div>
          <div className="flex py-2 md:py-0 md:w-1/2 justify-center items-center flex-col">
            <h3 className="text-2xl lg:text-3xl mb-2 text-blue-950 font-semibold">
              Furniture Favourites
            </h3>
            <p className="text-xl text-gray-700">Grab your choices</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col md:flex-row h-full w-full rounded-lg bg-[#F9F9E0]">
          <div className="md:w-1/2 flex justify-center items-center">
            <Image
              src={gaming}
              alt="gaming"
              className="h-[400px] md:h-[500px] w-[600px] rounded-lg"
            />
          </div>
          <div className="flex py-2 md:py-0 md:w-1/2 justify-center items-center flex-col">
            <h3 className="text-2xl lg:text-3xl mb-2 text-blue-950 font-semibold">
              Gaming Favourites
            </h3>
            <p className="text-xl text-gray-700">Grab your choices</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
