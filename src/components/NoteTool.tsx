"use client";
import { useState, useEffect, useRef } from "react";
import Tool from "./Tool";

interface ITool {
  name: string;
  underline: number;
  shortcut: string | boolean;
  isUsable: boolean;
  function?: () => void;
}

interface IGroup {
  tools: ITool[];
}

export default function NoteTool({
  index,
  content,
  setContent,
  click,
  setClick,
  name,
  underline,
  tools,
  toolsSection,
  setToolsSection,
}: {
  index: number;
  content: string;
  setContent: any;
  click: boolean;
  setClick: any;
  name: string;
  underline: number;
  tools: IGroup[];
  toolsSection: number | null;
  setToolsSection: any;
}) {
  const toolRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function reset(e: any) {
      const target = e.target;
      if (toolsSection !== index) return;
      if (
        target !== toolRef.current &&
        target.parentElement !== toolRef.current
      ) {
        setClick(false);
      }
    }

    window.addEventListener("click", reset);
    return () => window.removeEventListener("click", reset);
  }, [toolsSection]);

  return (
    <>
      <span
        ref={toolRef}
        onClick={() => setClick(!click)}
        onMouseEnter={() => setToolsSection(index)}
        className={`relative p-1 h-5 flex items-center justify-center text-black border border-solid border-transparent ${
          click ? "border-inset-hover" : "border-outset-hover"
        }`}
      >
        {...Array.from(name, (e: any, i: number) => {
          if (i === underline) {
            return <span className="underline">{e}</span>;
          }
          return e;
        })}
        {
          <div
            className={`${
              toolsSection === index && click ? "" : "hidden"
            } w-fit h-fit bg-tBck absolute left-0 top-full border-outset time`}
          >
            {tools.map((group: IGroup) => {
              return (
                <div className="bg-tBck w-[250px] [&:not(:first-child)]:pt-0.5 [&:not(:last-child)]:py-0.5 border-b border-b-solid border-transparent [&:not(:last-child)]:border-b-sbord">
                  {group.tools.map((tool: ITool) => {
                    return <Tool content={content} tool={tool} />;
                  })}
                </div>
              );
            })}
          </div>
        }
      </span>
    </>
  );
}
