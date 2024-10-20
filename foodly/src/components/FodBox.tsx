import React from "react";
import { IPlate } from "./Hero";

function FodBox({ plate }: { plate: IPlate }) {
  return (
    <div className="relative min-w-[400px] max-w-[420px] flex justify-end mb-10">
      <div className="z-10 absolute left-[5%] -top-[20px] rounded-full w-[140px] h-[140px] overflow-hidden border-[2px] border-solid border-secondary">
        <img
          className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.4]"
          src={plate?.image}
          alt=""
        />
      </div>
      <div className="w-2/3">
        <h1 className="w-full bg-secondary text-primary text-[1.3rem] text-nowrap pl-7 rounded-full">
          {plate?.name}{" "}
        </h1>
        <div className="w-full pl-7">
          <p> {plate?.name + " " + plate?.subName} </p>
        </div>
      </div>
    </div>
  );
}

export default FodBox;
