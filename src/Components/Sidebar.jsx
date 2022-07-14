import React from "react";
import {NavLink, Link} from "react-router-dom";
import {RiHome2Fill} from "react-icons/ri";
import {IoIosArrowForward} from "react-icons/io";
import {categories} from "../utils/data";

const isActiveStyle =
  "flex items-center px-5 gap-5 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const isNotActiveStyle =
  "flex items-center px-5 gap-5 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({user, closeToggle}) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-[250px] hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-10 gap-2 mt-4 mb-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <div className="font-logo text-[40px] text-black">Memorize</div>
        </Link>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({isActive}) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHome2Fill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-[22px] 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({isActive}) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt=""
                className="rounded-full w-8 h-8 shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`/user/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 "
          onClick={handleCloseSidebar}
        >
          <img src={user.image} alt="" className="w-10 h-10 rounded-full " />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
