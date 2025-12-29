import { fontBangla } from "@/app/layout";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 space-y-5">
        <h2 className={`${fontBangla.className} text-6xl font-bold leading-20`}>
          আপনার শিশুকে দিন একটি <span className="text-primary">সুন্দর ভবিষ্যৎ</span> 
        </h2>
        <p>Buy toys upto 15% off</p>
        <button className="btn btn-primary btn-outline">
          Explore Products
        </button>
      </div>
      <div className="flex-1">
        <Image
          alt="hero-kidz-banner"
          src={"/assets/hero.png"}
          width={500}
          height={400}></Image>
      </div>
    </div>
  );
};

export default Banner;
