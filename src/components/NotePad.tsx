"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegWindowMinimize } from "react-icons/fa";
import { BiWindow, BiWindows } from "react-icons/bi";
import axios from "axios";
import NoteTool from "./NoteTool";
import { createPortal } from "react-dom";
import MiniWindow from "./MiniWindow";
import createFile from "@/utils/createFile";

export default function NotePad({ show, setShow }: any) {
  const fileRef = useRef<any>(null);
  const readRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [name, setName] = useState("Untitled");
  const [content, setContent] = useState(``);
  const [toolsSection, setToolsSection] = useState<null | number>(null);
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
            src={"/notepad-icon.png"}
            title={`${name} - Notepad`}
            show={show}
            setShow={setShow}
          />,
          taskBar
        )}
      <a
        ref={fileRef}
        href={`data:text/plain;base64,${createFile(content)}`}
        download={true}
        hidden
      >
        {name}
      </a>
      <input ref={readRef} type="file" accept="text/plain" hidden />
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
        <div className="flex h-[20px] max-h-fit justify-between items-center bg-gradient-to-r from-selected to-light-blue px-1 py-0.5 mb-0.5">
          <div className="flex">
            <Image
              src="/notepad-icon.png"
              alt="img"
              width={16}
              height={16}
              className="mr-0.5"
            />
            <span className="leading-4">{name} - Notepad</span>
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
        <div className="flex mb-0.5">
          <NoteTool
            content={content}
            setContent={setContent}
            index={0}
            click={click}
            setClick={setClick}
            name="File"
            underline={0}
            toolsSection={toolsSection}
            setToolsSection={setToolsSection}
            tools={[
              {
                tools: [
                  {
                    name: "New",
                    underline: 0,
                    shortcut: "Ctrl+N",
                    isUsable: true,
                  },
                  {
                    name: "Open",
                    underline: 0,
                    shortcut: "Ctrl+O",
                    isUsable: true,
                    function: () => {
                      if (!readRef.current) return;
                      readRef.current.click();
                      readRef.current.onchange = async (e: any) => {
                        const file = e.target.files[0];
                        const url = URL.createObjectURL(file);
                        const res = await axios.get(url);
                        const text = await res.data;
                        setContent(text);
                      };
                    },
                  },
                  {
                    name: "Save",
                    underline: 0,
                    shortcut: "Ctrl+S",
                    isUsable: true,
                    function: () => {
                      console.log(fileRef.current);
                      fileRef.current.click();
                    },
                  },
                  {
                    name: "Save As...",
                    underline: 5,
                    shortcut: "Ctrl+Shift+S",
                    isUsable: true,
                  },
                ],
              },
              {
                tools: [
                  {
                    name: "Page Setup...",
                    underline: 7,
                    shortcut: false,
                    isUsable: true,
                  },
                  {
                    name: "Print...",
                    underline: 0,
                    shortcut: "Ctrl+P",
                    isUsable: true,
                  },
                ],
              },
              {
                tools: [
                  {
                    name: "Exit",
                    underline: 1,
                    shortcut: false,
                    isUsable: true,
                    function: onCloseHandler,
                  },
                ],
              },
            ]}
          />
          <NoteTool
            content={content}
            setContent={setContent}
            index={1}
            click={click}
            setClick={setClick}
            name="Edit"
            underline={0}
            toolsSection={toolsSection}
            setToolsSection={setToolsSection}
            tools={[
              {
                tools: [
                  {
                    name: "Undo",
                    underline: 0,
                    shortcut: "Ctrl+Z",
                    isUsable: true,
                  },
                  {
                    name: "Repeat",
                    underline: 0,
                    shortcut: "Ctrl+Shift+Z",
                    isUsable: true,
                  },
                ],
              },
              {
                tools: [
                  {
                    name: "Cut",
                    underline: 2,
                    shortcut: "Ctrl+X",
                    isUsable: true,
                  },
                  {
                    name: "Copy",
                    underline: 0,
                    shortcut: "Ctrl+C",
                    isUsable: true,
                  },
                  {
                    name: "Paste",
                    underline: 0,
                    shortcut: "Ctrl+V",
                    isUsable: true,
                  },
                  {
                    name: "Delete",
                    underline: 2,
                    shortcut: "Del",
                    isUsable: true,
                  },
                ],
              },
              {
                tools: [
                  {
                    name: "Select All",
                    underline: 7,
                    shortcut: "Ctrl+A",
                    isUsable: true,
                  },
                  {
                    name: "Time/Date",
                    underline: 5,
                    shortcut: "F5",
                    isUsable: true,
                  },
                ],
              },
              {
                tools: [
                  {
                    name: "Word Wrap",
                    underline: 0,
                    shortcut: false,
                    isUsable: true,
                  },
                  {
                    name: "Set Font...",
                    underline: 4,
                    shortcut: false,
                    isUsable: false,
                  },
                ],
              },
            ]}
          />
          <NoteTool
            content={content}
            setContent={setContent}
            index={2}
            click={click}
            setClick={setClick}
            name="Search"
            underline={0}
            toolsSection={toolsSection}
            setToolsSection={setToolsSection}
            tools={[
              {
                tools: [
                  {
                    name: "Find",
                    underline: 0,
                    shortcut: "Ctrl+F",
                    isUsable: false,
                  },
                  {
                    name: "Find Next",
                    underline: 5,
                    shortcut: "F3",
                    isUsable: false,
                  },
                ],
              },
            ]}
          />
          <NoteTool
            content={content}
            setContent={setContent}
            index={3}
            click={click}
            setClick={setClick}
            name="Help"
            underline={0}
            toolsSection={toolsSection}
            setToolsSection={setToolsSection}
            tools={[
              {
                tools: [
                  {
                    name: "Help Topics",
                    underline: 0,
                    shortcut: false,
                    isUsable: true,
                  },
                ],
              },
              {
                tools: [
                  {
                    name: "About Notepad",
                    underline: 0,
                    shortcut: false,
                    isUsable: true,
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="w-full h-[calc(100%-45px)] border-inset border-r-sbord time border-b-sbord bg-white">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full selection:bg-selected selection:text-white outline-none resize-none text-black px-1 py-0.5"
          ></textarea>
        </div>
      </div>
    </>
  );
}
