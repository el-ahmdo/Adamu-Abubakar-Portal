"use client";
import Image from "next/image";
import html2canvas from "html2canvas-pro";
import { useRef, useState } from "react";

export default function EndorsementGenerator() {
  const posterRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [apper, setApper] = useState(false);

  // HANDLE IMAGE UPLOAD
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  // DOWNLOAD POSTER
  const handleDownload = async () => {
    if (!posterRef.current) return;

    document.documentElement.style.colorScheme = "light";

    const canvas = await html2canvas(posterRef.current, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      width: posterRef.current.offsetWidth,
      height: posterRef.current.offsetHeight,
      scrollX: 0,
      scrollY: 0,
    });

    const link = document.createElement("a");

    link.download = "poster.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
      {/* ================= MODAL ================= */}
      {open && (
        <div
          className="fixed  inset-0 z-50 flex items-center justify-center md:px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white  md:mr-0 w-full md:max-w-md max-w-[300px] rounded-2xl p-6">
            <h2 className="text-2xl text-center font-bold mb-6">
              Welcome to Abubakar Adamu <br /> Endorsment Portal
            </h2>

            {/* NAME */}
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border h-12 px-4 rounded-xl mb-4 outline-none"
            />

            {/* IMAGE */}
            <label
              htmlFor="picture"
              className="
    flex
    items-center
    justify-center
    w-full
    h-14
    mb-4
    bg-[#00357f]
    text-white
    rounded-xl
    cursor-pointer
  ">
              Click to Enter Your Picture
            </label>

            <input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* BUTTON */}

            <button
              onClick={() => {
                setOpen(false);
                setApper(true);
              }}
              disabled={!name || !preview}
              className="w-full h-12 text-white rounded-xl"
              style={{
                backgroundColor: "#000",
                opacity: !name || !preview ? 0.5 : 1,
              }}>
              Generate Poster
            </button>
          </div>
        </div>
      )}

      {/* ================= POSTER CANVAS ================= */}
      <div
        ref={posterRef}
        className={`relative w-[500px] h-[600px] overflow-hidden ${apper ? "block" : "hidden"}`}
        style={{
          backgroundImage: "url(/poster.png)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}>
        {/* AMBER TEST BOX (REMOVE LATER) */}

        {/* USER IMAGE */}
        {preview && (
          <Image
            src={preview}
            alt="user"
            width={150}
            height={150}
            className="
    absolute
    bottom-5
    left-100
    -translate-x-1/2
    w-[150px]
    h-[150px]
    rounded-full
    object-cover
    border-4
    border-white
  "
          />
        )}

        {/* USER NAME */}
        {name && (
          <div className="absolute -bottom-3 left-8 w-[250px] h-38 ">
            <p
              style={{
                WebkitTextStroke: ".2px black",
              }}
              className="text-[18px] text-center text-white leading-snug  ">
              I am <span className=" font-semibold ">{name}</span> and{" "}
              <span className="  font-semibold ">
                IGP Muhammad Adamu Abubakar (Rtd.)
              </span>{" "}
              is my preferred aspirant
            </p>
          </div>
        )}

        <div className="absolute top-53 left-62 w-[250px] h-38 ">
          <p
            style={{
              WebkitTextStroke: ".2px black",
            }}
            className="text-[20px] text-center font-stretch-semi-expanded font-extrabold text-white leading-snug  ">
            <span>
              IGP Muhammad Adamu <br /> Abubakar (Rtd.)
            </span>{" "}
            the <br /> Preferred Choice <br /> of the masses
          </p>
        </div>

        <div className="absolute -bottom-35 -left-9 w-[250px] h-38 ">
          <p
            style={{
              WebkitTextStroke: ".2px black",
            }}
            className="text-[9px] text-center font-stretch-semi-expanded font-extrabold text-white leading-snug  ">
            <span className="font-thin italic">Sponsored by :</span> Shu’aib
            Gayam
          </p>
        </div>
      </div>

      {/* ================= DOWNLOAD ================= */}
      <button
        onClick={handleDownload}
        className="mt-6 h-14 px-8 bg-black text-white rounded-xl text-lg">
        Download Poster
      </button>
    </div>
  );
}
