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
import Link from "next/link";

export default function Slider() {
  return (
    <Swiper
      className="h-[600px] w-full"
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {/* Kitchenware Slide */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row h-full w-full rounded-lg bg-[#F7F7F7] shadow-lg">
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="h-[500px] w-[600px]">
              <Image
                src={KitchenWare}
                alt="kitchenware"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex py-6 md:py-0 md:w-1/2 justify-center items-center flex-col bg-[#FFF7E0] px-10">
            <h3 className="text-3xl lg:text-4xl mb-4 text-blue-900 font-semibold">
              Kitchen Essentials Sale
            </h3>
            <p className="text-lg md:text-xl text-gray-700 mb-4 text-center">
              Elevate your cooking experience with our premium kitchenware.
              Enjoy up to{" "}
              <span className="font-bold text-red-500">40% off</span>!
            </p>
            <Link href="/main/products/1">
              <button className="lowercase bg-slate-600 text-yellow-300 px-3 py-2 rounded-lg text-xl">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* Furniture Slide */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row h-full w-full rounded-lg bg-[#FFF3E0] shadow-lg">
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="h-[500px] w-[600px]">
              <Image
                src={furniture}
                alt="furniture"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex py-6 md:py-0 md:w-1/2 justify-center items-center flex-col bg-[#ecf0e9] px-10">
            <h3 className="text-3xl lg:text-4xl mb-4 text-blue-900 font-semibold">
              Trendy Furniture Sale
            </h3>
            <p className="text-lg md:text-xl text-gray-700 mb-4 text-center">
              Discover modern furniture to transform your space. Get up to{" "}
              <span className="font-bold text-red-500">50% off</span> on
              selected items.
            </p>
            <Link href="/main/products/1">
              <button className="lowercase bg-slate-600 text-yellow-300 px-3 py-2 rounded-lg text-xl">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* Gaming Slide */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row h-full w-full rounded-lg bg-[#F9F9E0] shadow-lg">
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="h-[500px] w-[600px]">
              <Image
                src={gaming}
                alt="gaming"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex py-6 md:py-0 md:w-1/2 justify-center items-center flex-col bg-[#f2f1f3] px-10">
            <h3 className="text-3xl lg:text-4xl mb-4 text-blue-900 font-semibold">
              Ultimate Gaming Gear
            </h3>
            <p className="text-lg md:text-xl text-gray-700 mb-4 text-center">
              Upgrade your gaming setup with top-tier accessories. Limited-time
              offer with{" "}
              <span className="font-bold text-red-500">up to 30% off</span>.
            </p>
            <Link href="/main/products/1">
              <button className="lowercase bg-slate-600 text-yellow-300 px-3 py-2 rounded-lg text-xl">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
