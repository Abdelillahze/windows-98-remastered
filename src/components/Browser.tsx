"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";
import { FaLessThanEqual, FaRegWindowMinimize } from "react-icons/fa";
import { BiWindow, BiWindows } from "react-icons/bi";
import { createPortal } from "react-dom";
import MiniWindow from "./MiniWindow";
import getSearchUrl from "@/utils/getSearchUrl";

export default function Browser({ show, setShow }: any) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);
  const [url, setUrl] = useState("https://www.google.com/");
  const [result, setResult] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState(false);
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const taskBar = document.querySelector(".taskbar")!;

  const onCloseHandler = () => {
    setOpen(false);
    setShow(false);
  };

  useEffect(() => {
    if (show) {
      setOpen(true);
    }
  }, [show]);

  const drag = (e: any) => {
    if (!windowRef.current) return;

    if (windowRef.current) {
      if (fullscreen) return;
      windowRef.current.style.cssText = `left:${e.clientX}px !important;top:${e.clientY}px !important;transform: translate(-${coord.x}px, -${coord.y}px) !important`;
    }
  };

  useEffect(() => {
    if (!windowRef.current) return;
    if (fullscreen) {
      windowRef.current.style.cssText = `left: 0 !important; top: 0 !important; translate(0,0) !important`;
    } else {
      windowRef.current.style.cssText = `left: 50% !important; top: 50% !important; translate(-50%, -50%) !important`;
    }
  }, [fullscreen]);

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
      {open &&
        createPortal(
          <MiniWindow
            src={"/internet-explorer-page.png"}
            title={url}
            show={show}
            setShow={setShow}
          />,
          taskBar
        )}
      <div
        ref={windowRef}
        onMouseUp={() => setIsHolding(false)}
        className={`${
          show ? "" : "hidden"
        } absolute select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          fullscreen
            ? "priority:top-0 priority:left-0 priority:translate-x-0 priority:translate-y-0 h-full w-full"
            : "min-w-[800px] h-[400px]"
        } bg-tBck border-outset time p-1`}
      >
        <div className="flex h-[20px] max-h-fit justify-between items-center bg-gradient-to-r from-selected to-light-blue px-1 py-0.5 mb-1">
          <div className="flex">
            <Image
              src="/internet-explorer-page.png"
              alt="img"
              width={16}
              height={16}
              className="mr-0.5"
            />
            <span className="leading-4">{url}</span>
          </div>
          <div className="flex">
            <span
              onClick={() => setShow(false)}
              className="close w-4 h-4 flex mr-0.5 items-center justify-center cursor-pointer bg-tBck text-black"
            >
              <FaRegWindowMinimize className="w-2" />
            </span>
            <span
              onClick={() => setFullScreen(!fullscreen)}
              className="close w-4 h-4 mr-0.5 flex items-center justify-center cursor-pointer bg-tBck text-black"
            >
              {fullscreen ? (
                <BiWindows className="w-2.5" />
              ) : (
                <BiWindow className="w-2.5" />
              )}
            </span>
            <span
              onClick={onCloseHandler}
              className="close w-4 h-4 flex items-center justify-center cursor-pointer bg-tBck text-black"
            >
              <IoCloseOutline />
            </span>
          </div>
        </div>
        <div className="h-[30px] max-h-fit flex w-full border border-sbord px-1 py-0.5 mb-1">
          <div className="h-full mr-1 w-[4px] border-outset time border-r-tBck border-b-tBck"></div>
          <span className="text-black mr-2">Address</span>
          <div className="relative w-full h-6">
            <Image
              src="/internet-explorer-page.png"
              alt="img"
              width={16}
              height={16}
              className="absolute top-1/2 -translate-y-1/2 left-0.5"
            />
            <input
              onKeyDown={() => setResult(true)}
              className="w-full h-full px-5 py-0.5 border-inset border-r-tBck border-b-tBck outline-none text-black"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full h-[calc(100%-60px)] border-inset border-r-sbord time border-b-sbord bg-white">
          {/* {result && <div dangerouslySetInnerHTML={{ __html: result }}></div>} */}
          <iframe
            width={"100%"}
            height={"100%"}
            src={
              result ? getSearchUrl(url) : getSearchUrl("https://google.com")
            }
            sandbox={
              "allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-modals allow-popups"
            }
            allow="camera https://brie.fi;microphone https://brie.fi"
          ></iframe>
        </div>
      </div>
    </>
  );
}
