import React from "react";
import {Circles} from "react-loader-spinner";

function Spinner({message}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles color="#00BFFF" height={50} widht={200} />
      <p className="text-lg text-center px-2 mt-5">{message}</p>
    </div>
  );
}

export default Spinner;