"use client";
import React, { useEffect, useState } from "react";
import { IPlate } from "../Hero";
import BoxPlate from "./BoxPlate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function PlatesBox({
  MainPLates,
  MainPlate,
  setMainPlate,
}: {
  MainPLates: IPlate[];
  MainPlate: IPlate;
  setMainPlate: any;
}) {
  const [index, setindex] = useState<number>(0);
  const [left, setleft] = useState<number>(+index * 25);
  const ChangeMainPlait = (ind: number) => {
    if (+ind < MainPLates.length - 1) {
      setleft((+ind + 1) * 25);
      setMainPlate(MainPLates[+ind + 1]);
      setindex(+ind + 1);
    } else {
      setleft(0);
      setMainPlate(MainPLates[0]);
      setindex(0);
    }
    setAnimate(true); // Reset animation state
    setTimeout(() => setAnimate(false), 300);
  };
  const [animate, setAnimate] = useState<boolean>(false);
  useEffect(() => {
    setAnimate(true); // Reset animation state
    setTimeout(() => setAnimate(false), 300);
  }, []);
  return (
    <div className="w-full md:w-[75%] ml-auto mr-0 flex md:block flex-wrap">
      <div className="w-full justify-center sm:justify-end flex md:justify-center gap-5 items-center md:mb-3 order-3">
        <div className="min-w-[57.5%] flex-1 hidden text-[4rem] md:text-[6rem] text-secondary md:block overflow-hidden">
          <h1
            className={`font-extrabold capitalize  text-center w-full ${
              animate ? "HeaderRight" : ""
            } `}
          >
            {" "}
            <span className="text-nowrap ">{MainPlate.name}</span>{" "}
          </h1>
          <h1
            className={`font-light capitalize -translate-y-10 text-center w-full ${
              animate ? "HeaderLeft" : ""
            }`}
          >
            {" "}
            <span className="text-nowrap ">{MainPlate?.subName}</span>{" "}
          </h1>
        </div>
        <div className="w-[42.5%] min-w-[320px] max-w-[340px]">
          {" "}
          <BoxPlate
            animate={animate}
            Plate={MainPlate}
            key={MainPlate._id}
          />{" "}
        </div>
      </div>
      <div className="w-full mb-4  sm:mb-5 order-1 flex justify-center items-center gap-10">
        <span className="p-3 hidden md:block bg-primary text-secondary text-[2rem] cursor-pointer rounded-full font-black">
          {" "}
          <AiOutlineArrowLeft
            onClick={() => ChangeMainPlait(index)}
            className=""
          />{" "}
        </span>
        <div className="flex relative items-center justify-center px-0">
          <div
            style={{ left: `${left}%` }}
            className={`absolute w-1/4 z-0 top-0 h-full bg-[#4c424275] rounded-2xl transition-[0.5s] `}
          ></div>
          {MainPLates.map((plate, i) => (
            <div
              onClick={() => ChangeMainPlait(i - 1)}
              className="pb-1 z-20 text-[0.9rem] sm:text-[1.4rem] px-1 sm:px-3 w-[25%] overflow-hidden cursor-pointer text-secondary"
            >
              <img
                className="w-[70px] md:w-[120px] mx-auto"
                src={plate?.image?.url}
                alt="Image"
              />
              <p className="mx-auto mt-3 w-fit font-medium text-secondary capitalize">
                {plate?.name}
              </p>
              <p className="mx-auto w-fit font-medium capitalize">
                {plate?.subName}
              </p>
            </div>
          ))}
        </div>
        <span className="p-3 hidden  md:block bg-primary text-secondary text-[2rem] cursor-pointer rounded-full font-black">
          <AiOutlineArrowRight onClick={() => ChangeMainPlait(index)} />
        </span>
      </div>
    </div>
  );
}

export default PlatesBox;
