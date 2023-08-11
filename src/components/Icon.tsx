"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Browser from "./Browser";
import { createPortal } from "react-dom";
import NotePad from "./NotePad";

interface IProps {
  name: string;
  src: string;
}

export default function Icon({ name, src }: IProps) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [doomReady, setDoomReady] = useState(false);

  useEffect(() => {
    setDoomReady(true);
    addEventListener("click", (e: any) => {
      const target: Node = e.target;
      if (
        target !== iconRef.current &&
        target.parentElement !== iconRef.current
      ) {
        setSelected(false);
      }
    });
  }, []);

  return (
    <>
      {doomReady && name === "Internet explorer"
        ? createPortal(
            <Browser show={show} setShow={setShow} />,
            document.querySelector(".section")!
          )
        : doomReady && name === "Notepad"
        ? createPortal(
            <NotePad show={show} setShow={setShow} />,
            document.querySelector(".section")!
          )
        : ""}
      <div
        draggable
        onDoubleClick={() => {
          setShow(true);
        }}
        ref={iconRef}
        className="w-[75px] h-[75px] flex flex-col items-center"
        onClick={() => setSelected(true)}
      >
        <Image
          draggable={false}
          className={`w-[32px] h-[32px] mb-2 ${selected ? "selected" : ""}`}
          src={src}
          alt="name"
          width={32}
          height={32}
        />
        <span
          className={`w-full border-[0.5px] border-dotted ${
            selected ? "bg-selected border-white" : "bg-bck border-bck"
          } text-center h-fit leading-4 text-xs`}
        >
          {name}
        </span>
      </div>
    </>
  );
}
