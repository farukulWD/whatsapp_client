import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="bg-panel-header-background border-b-2 border-l border-l-slate-600 border-b-green-500 flex justify-center items-center w-full max-w-full h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-center">
        <Image src={"/whatsapp.gif"} width={300} height={300} />
      </div>
    </div>
  );
}

export default Empty;
