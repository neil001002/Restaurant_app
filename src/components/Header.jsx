import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import LogoImg from "../assets/logo.png";
import FambellsLogoImg from "../assets/fambells.png";
import AvatarImg from "../assets/avatar.png";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      // console.log(response);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={FambellsLogoImg} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold ">Fambells</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              onClick={() => setIsMenu(false)}
            >
              Services
            </li>
          </motion.ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
              <p className="text-sm text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : AvatarImg}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 overflow-hidden"
              >
                {user && user.email === "sunil@createprotocol.org" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />{" "}
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
            <p className="text-sm text-white font-semibold">2</p>
          </div>
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={FambellsLogoImg} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold ">Fambells</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : AvatarImg}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 overflow-hidden"
            >
              {user && user.email === "sunil@createprotocol.org" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />{" "}
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li
                  className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer "
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer "
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer "
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer "
                  onClick={() => setIsMenu(false)}
                >
                  Services
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
