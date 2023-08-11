import Section from "@/components/Section";
import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Section />
      <Taskbar />
    </div>
  );
}
