"use client";
import React, { useState, FormEvent, useRef, useEffect } from "react";
import { IPlate } from "@/components/Hero"; // Adjust import path as necessary
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { useAuthStore } from "@/context/context";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const popRef = useRef<HTMLDivElement>(null);
  const FileRef = useRef<HTMLInputElement>(null);
  const [plate, setPlate] = useState<IPlate>({
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
  const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to hold the image preview URL

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();

    // Append plate information to the form data
    for (const [key, value] of Object.entries(plate)) {
      formData.append(key, value);
    }

    // Check if an image file was selected and append it to the form data
    if (imageFile) {
      formData.append("file", imageFile);
    } else {
      alert("Please upload an image before submitting.");
      return;
    }
    console.log("Form data : ", formData.get("file"));
    try {
      // Send the combined data to your endpoint
      setisLoading(true);
      await axios.post("https://foodlly-ozos.vercel.app/plat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setPlate({
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
      setImagePreview(null);
      popRef.current?.classList.add("scale-[1]");
    } catch (error) {
      console.error("Error saving plate:", error);
    } finally {
      setisLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = <K extends keyof IPlate>(field: K, value: IPlate[K]) => {
    setPlate((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full h-[calc(100dvh-70px)]">
      {isLoading && (
        <div className="w-full flex justify-center items-center absolute top-0 left-0 z-[9999999999999] h-full bg-[#00000029]">
          <div className="loader"></div>
        </div>
      )}
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        <div
          ref={popRef}
          className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
        >
          The Plat has been successfully updated
          <button
            onClick={() => popRef.current?.classList.remove("scale-[1]")}
            className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
          >
            Ok
          </button>
        </div>

        <div className="w-1/2 h-full relative flex justify-end items-center">
          <div className="absolute -z-[1] top-1/2 right-[30%] -translate-y-1/2 w-[70vw] h-[60vw] bg-secondary rounded-full"></div>
          {imagePreview ? (
            <img
              className="w-[78%] scaling"
              src={imagePreview}
              alt="Delicious dish"
            />
          ) : plate.image.url ? (
            <img
              className="w-[78%] scaling"
              src={plate.image.url}
              alt="Delicious dish"
            />
          ) : (
            <div
              onClick={() => FileRef.current?.click()}
              className="w-[170px] p-4 absolute top-1/2 translate-x-1/2 -translate-y-1/2 right-[30%] h-[170px] bg-primary "
            >
              <p className="w-fit mx-auto text-[1.7rem] text-secondary">
                Add Image
              </p>
              <IoMdAdd className="text-[5rem] text-secondary font-bold cursor-pointer block mx-auto" />
            </div>
          )}
          <input
            ref={FileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hide the input
          />
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
              className="w-full px-2 py-1 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
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
              className="w-full px-2 py-1 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
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
              className="w-full px-2 py-1 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
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
              className="w-full px-2 py-1 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
              value={plate.price === 0 ? "" : plate.price}
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
              className="w-full px-2 py-1 border rounded"
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
                className="scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
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
                className="scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
                checked={plate.isMain === false}
                onChange={() => updateField("isMain", false)}
              />
              <span>No</span>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-[1.2rem] font-medium mb-1">
              Best Sellers:
            </label>
            <label className="block text-[1.2rem] font-medium mb-1">
              <input
                type="radio"
                name="isBestSelles"
                className="scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
                value="true"
                checked={plate.isBestSelles === true}
                onChange={() => updateField("isBestSelles", true)}
              />
              <span>Yes</span>
            </label>
            <label className="block text-[1.2rem] font-medium mb-1">
              <input
                type="radio"
                name="isBestSelles"
                className="scale-[1.1] cursor-pointer mr-[2px] accent-secondary"
                value="false"
                checked={plate.isBestSelles === false}
                onChange={() => updateField("isBestSelles", false)}
              />
              <span>No</span>
            </label>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-[1.2rem] font-medium mb-1"
            >
              Description
            </label>
            <input
              id="description"
              className="w-full px-2 py-1 border rounded text-[1.1rem] text-secondary focus:outline-secondary"
              type="text"
              value={plate.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-2/3 min-w-[200px] bg-secondary px-2 py-1 text-[1.15rem] cursor-pointer font-bold mx-auto block text-primary rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
