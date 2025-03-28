import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await axios.get("http://localhost:8181/user/checklogin", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsLogin(true);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-blue-600 fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-white font-bold text-xl">Ecommerce</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-3 py-2 rounded-md text-sm"
                  : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-3 py-2 rounded-md text-sm"
                  : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm"
              }
            >
              Add Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-3 py-2 rounded-md text-sm"
                  : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm"
              }
            >
              Cart
            </NavLink>
          </div>

          {/* Profile/Login Section */}
          <div className="hidden md:flex items-center ml-auto">
            {isLogin ? (
              <NavLink to="/profile">
                <CgProfile className="w-[35px] h-[35px] text-white" />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold px-3 py-2 rounded-md text-sm"
                    : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm"
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 py-2 px-4 shadow-lg border-t">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block text-white font-semibold px-3 py-2 rounded-md text-base"
                    : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base"
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? "block text-white font-semibold px-3 py-2 rounded-md text-base"
                    : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base"
                }
                onClick={() => setIsOpen(false)}
              >
                Add Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "block text-white font-semibold px-3 py-2 rounded-md text-base"
                    : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base"
                }
                onClick={() => setIsOpen(false)}
              >
                Cart
              </NavLink>
            </li>
            <li>
              {isLogin ? (
                <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                  <CgProfile className="w-[30px] h-[30px] text-white" />
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "block text-white font-semibold px-3 py-2 rounded-md text-sm"
                      : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;











