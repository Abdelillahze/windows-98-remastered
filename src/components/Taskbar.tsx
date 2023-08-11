"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import formDate from "@/utils/formDate";

export default function Page() {
  const winButton = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(new Date());
  const [win, setWin] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      const target: Node = e.target;
      if (
        target !== winButton.current &&
        target.parentElement !== winButton.current &&
        target.parentElement?.parentElement !== winButton.current
      ) {
        setWin(false);
      }
    });
  }, []);

  useEffect(() => {
    const duration = (60 - date.getSeconds()) * 1000;
    const timer = setInterval(() => {
      setDate(new Date());
    }, duration);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="relative flex gap-1 bg-tBck h-[5%] p-0.5">
        <div
          className={`${
            win ? "" : "hidden"
          } overflow-scroll absolute w-52 h-[300px] border-outset border-b-tBck border-r-tBck bg-tBck bottom-full`}
        >
          <div className="relative w-[500px] h-screen">
            <span className="text-2xl absolute top-1/2 left-1/2 text-black">
              Tizk 7mra
            </span>
          </div>
        </div>
        <div
          ref={winButton}
          className={`flex justify-center min-w-fit select-none w-[5%] h-full ${
            win ? "border-inset" : "border-outset"
          } cursor-pointer px-0.5 py-1`}
          onClick={() => setWin(!win)}
        >
          <span
            className={`flex h-full w-fit items-center ${
              win ? "  border border-dashed border-black" : ""
            }`}
          >
            <Image
              className="w-[16px] h-[14px] mr-1"
              src="/windows-logo.png"
              alt="logo"
              width={16}
              height={14}
            />
            <span className="text-black">Start</span>
          </span>
        </div>
        <div className="flex taskbar w-[87%] h-full border border-x-white border-y-transparent"></div>
        <div className="flex items-center min-w-fit w-[8%] h-full border border-inset py-0.5 p-1">
          <Image
            className="mr-1 w-[16px] h-[16px] cursor-pointer"
            src="/scheduler-icon.png"
            alt="sheduler"
            width={16}
            height={16}
          />
          <Image
            className="mr-1 w-[16px] h-[16px] cursor-pointer"
            src="/audio-icon.png"
            alt="audio"
            width={16}
            height={16}
          />
          <span className="text-black">
            {formDate(date.getHours())}:{formDate(date.getMinutes())}{" "}
            {date.getHours() > 12 ? "PM" : "AM"}
          </span>
        </div>
      </div>
    </>
  );
}
