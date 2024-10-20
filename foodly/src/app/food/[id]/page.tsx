"use client";
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { IPlate } from "@/components/Hero"; // Adjust import path as necessary
import axios from "axios";
import { useAuthStore } from "@/context/context";
import { useRouter } from "next/navigation";

const arePlatesEqual = (
  plate1: IPlate | null,
  plate2: IPlate | null
): boolean => {
  if (!plate1 || !plate2) return false; // Return false if either is null
  return JSON.stringify(plate1) === JSON.stringify(plate2);
};

const Page = ({ params }: { params: any }) => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    !isLoggedIn ? router.push("/login") : null;
  }, []);
  const popRef = useRef<HTMLDivElement>(null);
  const [originalPlat, setoriginalPlat] = useState<IPlate>();
  const [plate, setPlate] = useState<IPlate>({
    _id: "",
    name: "",
    subName: "",
    image: { public_id: "", url: "" },
    description: "",
    likes: 0,
    dislikes: 0,
    chef: "",
    rating: 0,
    price: 0,
    type: "",
    isMain: false,
    isBestSelles: false,
  });
  useEffect(() => {
    const GetPlate = async () => {
      try {
        const res = await axios.get("http://localhost:8000/plat/" + params.id, {
          withCredentials: true,
        });
        setPlate(res.data.plat);
        setoriginalPlat(res.data.plat);
      } catch (error) {
        console.log(error);
      }
    };
    GetPlate();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!arePlatesEqual(originalPlat as any, plate)) {
      try {
        const res = await axios.put(
          "http://localhost:8000/plat/" + params.id,
          plate,
          {
            withCredentials: true,
          }
        );
        popRef.current?.classList.add("scale-[1]");
        setoriginalPlat(plate);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateField = <K extends keyof IPlate>(field: K, value: IPlate[K]) => {
    setPlate((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full h-[calc(100dvh-70px)] flex justify-center items-center overflow-hidden">
      <div
        ref={popRef}
        className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
      >
        {" "}
        The Plat have been successfully updated
        <button
          onClick={() => popRef.current?.classList.remove("scale-[1]")}
          className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
        >
          {" "}
          Ok{" "}
        </button>
      </div>
      {/* Left Section: Image */}
      <div className="w-1/2 h-full relative flex justify-end items-center">
        <div className="absolute -z-[1] top-1/2 right-[30%] -translate-y-1/2 w-[70vw] h-[60vw] bg-secondary rounded-full"></div>
        {plate.image.url && (
          <img
            className="w-[78%] sclaing"
            src={plate?.image?.url}
            alt="Delicious dish"
          />
        )}
      </div>

      {/* Right Section: Form */}
      <form onSubmit={handleSubmit} className="w-1/2 h-fit p-8 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-[1.2rem] font-medium mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full p-2 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
            value={plate.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="subName"
            className="block text-[1.2rem] font-medium mb-1"
          >
            Sub Name
          </label>
          <input
            id="subName"
            type="text"
            className="w-full p-2 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
            value={plate.subName}
            onChange={(e) => updateField("subName", e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="chef"
            className="block text-[1.2rem] font-medium mb-1"
          >
            Chef
          </label>
          <input
            id="chef"
            type="text"
            className="w-full p-2 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
            value={plate.chef}
            onChange={(e) => updateField("chef", e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-[1.2rem] font-medium mb-1"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            className="w-full p-2 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
            value={plate.price}
            onChange={(e) => updateField("price", +e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-[1.2rem] font-medium mb-1"
          >
            Type
          </label>
          <select
            id="type"
            className="w-full p-2 border rounded"
            value={plate.type}
            onChange={(e) => updateField("type", e.target.value)}
          >
            <option value="appetizers">Appetizers</option>
            <option value="main_courses">Entrées</option>
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="block text-[1.2rem] font-medium mb-1">
            Main Plat:
          </label>
          <label className="block text-[1.2rem] font-medium mb-1">
            <input
              type="radio"
              name="isMain"
              value="true"
              className=" scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
              checked={plate.isMain === true}
              onChange={() => updateField("isMain", true)}
            />
            <span>Yes</span>
          </label>
          <label className="block text-[1.2rem] font-medium mb-1">
            <input
              type="radio"
              name="isMain"
              value="false"
              className=" scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
              checked={plate.isMain === false}
              onChange={() => updateField("isMain", false)}
            />
            <span>No</span>
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <label className="block text-[1.2rem] font-medium mb-1">
            Best Seller Plat:
          </label>
          <label className="block text-[1.2rem] font-medium mb-1 cursor-pointer">
            <input
              type="radio"
              name="isBestSelles"
              className=" scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
              value="true"
              checked={plate.isBestSelles === true}
              onChange={() => updateField("isBestSelles", true)}
            />
            <span>Yes</span>
          </label>
          <label className="block text-[1.2rem] font-medium mb-1 cursor-pointer">
            <input
              type="radio"
              name="isBestSelles"
              className=" scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
              value="false"
              checked={plate.isBestSelles === false}
              onChange={() => updateField("isBestSelles", false)}
            />
            <span>No</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-2/3 min-w-[200px] bg-secondary p-2 text-[1.15rem] cursor-pointer font-bold mx-auto block text-primary rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
