"use client";
import createFile from "@/utils/createFile";
import { useEffect } from "react";

interface ITool {
  name: string;
  underline: number;
  shortcut: string | boolean;
  isUsable: boolean;
  function?: () => void;
}

export default function Tool({
  tool,
  content,
}: {
  tool: ITool;
  content: string;
}) {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      const keys =
        typeof tool.shortcut === "string" && tool.shortcut.split("+")!;
      if (keys) {
        const conditions = keys.map((key) => {
          if (key === "Ctrl") {
            return e.ctrlKey;
          } else if (key === "Shift") {
            return e.shiftKey;
          } else if (e.key === key.toLowerCase()) {
            return true;
          } else {
            return false;
          }
        });

        if (conditions.every((v) => v)) {
          e.preventDefault();
          if (tool.function) {
            tool.function();
          }
        }
      }
    });
  }, []);

  return (
    <div
      onClick={() => {
        if (tool.function) {
          tool.function();
        }
      }}
      className="flex w-full px-4 py-0.5 group hover:bg-selected"
    >
      {/* name */}
      <span className={`w-1/2 flex group-hover:text-white`}>
        {...Array.from(tool.name, (e: any, i: number) => {
          if (i === tool.underline) {
            return <span className="underline">{e}</span>;
          }
          return e;
        })}
      </span>
      {/* shortcut */}
      {tool.shortcut && (
        <span className={`group-hover:text-white`}>{tool.shortcut}</span>
      )}
    </div>
  );
}
