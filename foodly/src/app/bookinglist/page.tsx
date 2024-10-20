"use client";
import { useAuthStore } from "@/context/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface IReservation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  isConfirmed: boolean;
}

function page() {
  const DeleteRef = useRef<HTMLDivElement>(null);
  const ConfirmRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    !isLoggedIn ? router.push("/login") : null;
  }, []);

  const [listReservation, setlistReservation] = useState<IReservation[]>([]);
  const ConfirmReservation = async (id: string) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/reservation/" + id,
        {},
        { withCredentials: true }
      );
      ConfirmRef.current?.classList.add("scale-[1]");
      const confirmed = listReservation.find((res) => res._id === id);
      if (confirmed) {
        confirmed.isConfirmed = true;
      }
      setlistReservation((prev) => listReservation);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const CancelReservation = async (id: string) => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/reservation/" + id,
        { withCredentials: true }
      );
      DeleteRef.current?.classList.add("scale-[1]");
      const UpdatedList = listReservation.filter((res) => res._id !== id);
      setlistReservation(UpdatedList);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  useEffect(() => {
    const GetListOfReservation = async () => {
      try {
        const res = await axios.get("http://localhost:8000/reservations", {
          withCredentials: true,
        });
        setlistReservation(res.data.reservations);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetListOfReservation();
  }, [listReservation]);
  return (
    <div className="h-fit relative  md:h-[calc(100dvh-70px)] flex justify-center items-start pt-10">
      <div
        ref={ConfirmRef}
        className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
      >
        {" "}
        Reservation Confirmed successfully
        <button
          onClick={() => ConfirmRef.current?.classList.remove("scale-[1]")}
          className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
        >
          {" "}
          Ok{" "}
        </button>
      </div>
      <div
        ref={DeleteRef}
        className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
      >
        {" "}
        Reservation Canceld successfully
        <button
          onClick={() => DeleteRef.current?.classList.remove("scale-[1]")}
          className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
        >
          {" "}
          Ok{" "}
        </button>
      </div>
      <div className="w-[90%] h-fit border-t border-l border-r border-secondary border-solid">
        <div className="w-full bg-secondary text-primary flex items-center">
          <span className="w-[20%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            {" "}
            Name{" "}
          </span>
          <span className="w-[23%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            {" "}
            Email{" "}
          </span>
          <span className="w-[15%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            {" "}
            Phone{" "}
          </span>
          <span className="w-[10%] min-w-fit border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            {" "}
            Date{" "}
          </span>
          <span className="w-[10%] min-w-fit border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            {" "}
            Time{" "}
          </span>
          <span className="min-w-fit w-[7%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            {" "}
            Guests{" "}
          </span>
          <span className="w-[15%] block px-1 py-2 text-center text-[1.15rem]">
            {" "}
            Confirmation{" "}
          </span>
        </div>
        {listReservation.map((reser) => (
          <div className="w-full border-b border-secondary border-solid bg-primary text-secondary flex items-center">
            <span className="w-[20%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {reser?.name}
            </span>
            <span className="w-[23%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {" "}
              {reser?.email}
            </span>
            <span className="w-[15%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {" "}
              {reser?.phone}
            </span>
            <span className="w-[10%] min-w-fit border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {" "}
              {reser?.date}
            </span>
            <span className="w-[10%] min-w-fit border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {" "}
              {reser?.time}
            </span>
            <span className="min-w-fit w-[7%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {" "}
              {reser?.guests}
            </span>
            {!reser?.isConfirmed && (
              <span className="w-[15%] px-1 py-2 text-center text-[1.15rem] justify-center flex gap-1 items-center">
                <button
                  onClick={() => CancelReservation(reser._id)}
                  className="bg-[#ff0000af] p-1 px-2 cursor-pointer rounded-md"
                >
                  {" "}
                  Cancel{" "}
                </button>
                <button
                  onClick={() => {
                    reser.isConfirmed = true;
                    ConfirmReservation(reser._id);
                  }}
                  className="bg-[#008000b9] p-1 px-2 rounded-md cursor-pointer"
                >
                  {" "}
                  Confirm{" "}
                </button>
              </span>
            )}
            {reser?.isConfirmed && (
              <span className="w-[15%] px-1 py-2 text-center text-[1.15rem] justify-center flex gap-1 items-center">
                Confirmed
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
