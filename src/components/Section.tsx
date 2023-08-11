import Image from "next/image";
import Icon from "./Icon";
import Window from "./Window";
import Browser from "./Browser";

export default function Page() {
  return (
    <>
      <div className="section relative grid grid-sys bg-black w-full h-[95%] p-1 overflow-hidden">
        <Icon name="My Computer" src="/my-computer-icon.png" />
        <Icon name="Internet explorer" src="/internet-explorer-icon.png" />
        <Icon name="Notepad" src="/notepad-icon.png" />
        {/* <Window
          title="Window"
          content="you can not enter this because you are so bot that i couldn't resiste"
        /> */}
      </div>
    </>
  );
}
