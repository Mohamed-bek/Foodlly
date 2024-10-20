"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Plates from "./Plates/Plates";
import PlatesBox from "./Plates/PlatesBox";

export interface IPlate {
  _id?: string;
  name: string;
  subName: string;
  image: {
    public_id: string;
    url: string;
  };
  description?: string;
  likes?: number;
  dislikes?: number;
  chef?: string;
  rating?: number;
  price?: number;
  type?: string;
  isMain?: boolean;
  isBestSelles?: boolean;
}
function Hero() {
  // const [MainPlates, setMainPlates] = useState<IPlate[]>([
  //   {
  //     _id: "0",
  //     name: "LOTEK",
  //     subName: "PERKEDEL",
  //     image: "/images/plat1.png",
  //   },
  //   {
  //     _id: "1",
  //     name: "LOTEK",
  //     subName: "PERKEDEL",
  //     image: "/images/plat2.png",
  //   },
  //   {
  //     _id: "2",
  //     name: "LOTEK",
  //     subName: "PERKEDEL",
  //     image: "/images/plat3.png",
  //   },
  //   {
  //     _id: "3",
  //     name: "LOTEK",
  //     subName: "PERKEDEL",
  //     image: "/images/plat4.png",
  //   },
  // ]);
  const [MainPlates, setMainPlates] = useState<IPlate[]>([
    {
      _id: "0",
      name: "Salamon",
      subName: "Salad",
      image: {
        url: "/images/plat1.png",
        public_id: "1",
      },
      chef: "Mohamed",
      price: 1200,
      likes: 0,
      dislikes: 0,
      rating: 5,
      description:
        "is a flavorful dish made from ground meat (typically beef or lamb) mixed with aromatic spices, herbs, onions, and sometimes breadcrumbs. The meat mixture is shaped into patties, balls, or skewers and grilled, baked, or pan-fried until juicy and tender. It pairs perfectly with pita bread, hummus, or a drizzle of yogurt sauce for extra flavor.",
    },
    {
      _id: "1",
      name: "bikin",
      subName: "eggs",
      image: {
        url: "/images/plat2.png",
        public_id: "1",
      },
      chef: "Mohamed",
      price: 2000,
      likes: 100,
      dislikes: 19,
      rating: 4.5,
      description:
        "is a flavorful dish made from ground meat (typically beef or lamb) mixed with aromatic spices, herbs, onions, and sometimes breadcrumbs. The meat mixture is shaped into patties, balls, or skewers and grilled, baked, or pan-fried until juicy and tender. It pairs perfectly with pita bread, hummus, or a drizzle of yogurt sauce for extra flavor.",
    },
    {
      _id: "2",
      name: "chicken",
      subName: "salad",
      image: {
        url: "/images/plat3.png",
        public_id: "1",
      },
      chef: "Mohamed",
      price: 1500,
      likes: 187,
      dislikes: 22,
      rating: 4.8,
      description:
        "is a flavorful dish made from ground meat (typically beef or lamb) mixed with aromatic spices, herbs, onions, and sometimes breadcrumbs. The meat mixture is shaped into patties, balls, or skewers and grilled, baked, or pan-fried until juicy and tender. It pairs perfectly with pita bread, hummus, or a drizzle of yogurt sauce for extra flavor.",
    },
    {
      _id: "2",
      name: "Grilled",
      subName: "Meat",
      image: {
        url: "/images/plat4.png",
        public_id: "1",
      },
      chef: "Mohamed",
      price: 3000,
      likes: 253,
      dislikes: 11,
      rating: 4.9,
      description:
        "is a flavorful dish made from ground meat (typically beef or lamb) mixed with aromatic spices, herbs, onions, and sometimes breadcrumbs. The meat mixture is shaped into patties, balls, or skewers and grilled, baked, or pan-fried until juicy and tender. It pairs perfectly with pita bread, hummus, or a drizzle of yogurt sauce for extra flavor.",
    },
  ]);
  const [MainPlate, setMainPlate] = useState(MainPlates[0]);
  useEffect(() => {
    const GetMainsPlats = async () => {
      try {
        const res = await axios.get(
          "https://foodlly-ozos.vercel.app/main-plats"
        );
        setMainPlates(res.data.mainPlats);
        setMainPlate(res.data.mainPlats[0]);
      } catch (error) {
        console.log(error);
      }
    };
    GetMainsPlats();
  }, []);
  return (
    <div className="hero relative overflow-hidden">
      <div className="w-[90%] mx-auto pt-2 md:pt-10">
        <div className="animate__hinge animate__animated animated-element animate__duration2s animate__delay05s">
          <h2 className="text-[1.1rem] font-normal text-secondary  text-nowrap md:text-[1.6rem] lg:text-[1.9rem]">
            {" "}
            Are You Hungry ?{" "}
          </h2>
          <h1 className="text-[2.2rem] font-bold uppercase text-secondary m-0 -mt-3 text-nowrap md:text-[2.5rem] lg:text-[3.5rem]">
            {" "}
            Don't Wait !{" "}
          </h1>
        </div>
        <PlatesBox
          MainPLates={MainPlates}
          MainPlate={MainPlate}
          setMainPlate={setMainPlate}
        />
      </div>
      <Plates MainPLates={MainPlates} MainPlate={MainPlate} />
    </div>
  );
}

export default Hero;
