"use client";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegWindowMinimize } from "react-icons/fa";
import { BiWindow, BiWindows } from "react-icons/bi";

export default function Window({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [fullscreen, setFullScreen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const onCloseHandler = () => {
    if (windowRef.current) {
      windowRef.current.remove();
    }
  };

  const drag = (e: any) => {
    if (!windowRef.current) return;

    console.log(e.clientX, e.clientY);
    if (coord.x === 0 || coord.y === 0) return;
    if (windowRef.current) {
      windowRef.current.style.cssText = `left:${e.clientX}px !important;top:${e.clientY}px !important;transform: translate(-${coord.x}px, -${coord.y}px) !important`;
    }
  };

  useEffect(() => {
    function hold(e: any) {
      if (!windowRef.current) return;
      const target = e.target;
      if (
        target === windowRef.current ||
        target.parentElement === windowRef.current
      ) {
        setIsHolding(true);
        const rect = windowRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCoord({ x, y });
      }
    }
    window.addEventListener("mousedown", hold);
    return () => window.removeEventListener("mousedown", hold);
  }, []);

  useEffect(() => {
    window.onmousemove = (e) => {
      if (!isHolding) return;
      drag(e);
    };
  }, [windowRef, isHolding]);

  return (
    <>
      <div
        ref={windowRef}
        onMouseUp={() => setIsHolding(false)}
        className={`absolute select-none resize overflow-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
          fullscreen
            ? "priority:top-0 priority:left-0 priority:translate-x-0 priority:translate-y-0 h-full w-full"
            : "min-w-[500px] h-[200px]"
        } bg-tBck border-outset time p-1`}
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-selected to-light-blue px-1 py-0.5">
          <span className="leading-4">{title}</span>
          <div className="flex">
            <span className="close w-4 h-4 flex items-center justify-center cursor-pointer bg-tBck text-black">
              <IoCloseOutline onClick={onCloseHandler} />
            </span>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="w-1/5 invisible"></div>
          <p className="w-4/6 text-black text-center">{content}</p>
        </div>
      </div>
    </>
  );
}
