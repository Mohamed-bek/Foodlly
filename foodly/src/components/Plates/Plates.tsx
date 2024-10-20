"use client";
import React, { useEffect, useState } from "react";
import { IPlate } from "../Hero";

function Plates({
  MainPLates,
  MainPlate,
}: {
  MainPLates: IPlate[];
  MainPlate: IPlate;
}) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const updateRotationAngle = () => {
    const width = window.visualViewport?.width || window.innerWidth;
    setScreenWidth(width);
    const index = MainPLates.indexOf(MainPlate);
    var angle: number = 0;
    if (index !== -1) {
      angle = index * 90; // Calculate rotation angle based on the index
      setRotationAngle(angle); // Update the rotation angle state
    } else {
      console.error("MainPlate not found in MainPLates array");
    }
    // const angle = parseInt(MainPLates.indexOf[MainPlate], 10) * 90; // Base rotation
    setRotationAngle(width > 640 ? angle + 45 : angle); // Add 45 degrees if screen is larger than 678px
  };

  useEffect(() => {
    updateRotationAngle(); // Initial call
    window.addEventListener("resize", updateRotationAngle); // Update on resize

    return () => {
      window.removeEventListener("resize", updateRotationAngle); // Cleanup
    };
  }, [MainPlate?._id]);

  // Extend CSSProperties to allow custom CSS variables
  const style: React.CSSProperties & { [key: string]: string } = {
    "--rotation-angle": `${rotationAngle}deg`,
  };

  return (
    <div
      className="plates  absolute bottom-0 transition-transform duration-500 bg-transparent rounded-full border border-secondary"
      style={style}
    >
      <img
        className="w-[170px] h-[170px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[60%] transition-transform duration-500"
        src={MainPLates[0]?.image?.url}
        alt={`${MainPLates[0]?.name} - Main Plate`}
      />
      <img
        className="w-[350px] h-[350px] absolute top-1/2 right-0 translate-x-[60%] -translate-y-1/2 transition-transform duration-500"
        src={MainPLates[3]?.image?.url}
        alt={`${MainPLates[3]?.name} - Main Plate`}
      />
      <img
        className="w-[350px] h-[350px] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] transition-transform duration-500"
        src={MainPLates[2]?.image?.url}
        alt={`${MainPLates[2]?.name} - Main Plate`}
      />
      <img
        className="w-[350px] h-[350px] absolute top-1/2 left-0 -translate-x-[60%] -translate-y-1/2 transition-transform duration-500"
        src={MainPLates[1]?.image?.url}
        alt={`${MainPLates[1]?.name} - Main Plate`}
      />
    </div>
  );
}

export default Plates;
