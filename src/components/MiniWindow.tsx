import Image from "next/image";

export default function MiniWindow({
  title,
  src,
  show,
  setShow,
}: {
  title: string;
  src: string;
  show: boolean;
  setShow: any;
}) {
  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className={`ml-2 flex items-center bg-tBck ${
          show ? "border-inset" : "border-outset"
        } w-[210px] time cursor-pointer h-full px-1`}
      >
        <Image
          src={src}
          alt="icon"
          width={16}
          height={16}
          className="mr-1 h-fit"
        />
        <p className="text-black">
          {title.length > 24 ? `${title.slice(0, 24)}...` : title}
        </p>
      </div>
    </>
  );
}
