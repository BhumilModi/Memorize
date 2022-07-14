import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {client} from "../client";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response.access_token;

      const userInfoEndPoint = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

      try {
        const userData = await axios.get(userInfoEndPoint);
        localStorage.setItem("user", JSON.stringify(userData.data));
        if (userData && userData.data) {
          const {name, id, picture} = userData.data;

          const doc = {
            _id: id,
            _type: "user",
            userName: name,
            image: picture,
          };

          client.createIfNotExists(doc).then(() => {
            navigate("/", {replace: true});
            console.log("success");
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src="/share.mp4"
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 w-130px flex justify-center items-center flex-col">
            <div className="font-logo text-4xl text-white p-2">Memorize</div>
            <div className="shadow-2xl">
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={() => login()}
              >
                <FcGoogle className="mr-4" />
                Sign-in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
