import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { MdLogin } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Navbar = () => {
  const cartLength = useSelector((state) => state.carts.length);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-white text-lg font-semibold">
          CRM-Project
        </Link>
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            )}
          </svg>
        </button>
        <ul
          className={`lg:flex lg:gap-x-5 lg:items-center ${
            isMenuOpen ? 'block' : 'hidden gap-x-5'
          } mt-4 lg:mt-0`}
        >
          <li>
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/categories" className="text-white hover:text-gray-200">
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-white hover:text-gray-200 relative"
              data-tooltip-id="carts"
            >
              <BsCart4 size={25} />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartLength}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/orders" className="text-white hover:text-gray-200">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/view-ratings" className="text-white hover:text-gray-200">
              Reviews
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-white hover:text-gray-200 "
              data-tooltip-id="profile"
            >
              <CgProfile size={25} />
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white hover:text-gray-200"
              data-tooltip-id="login"
            >
              <MdLogin size={25} />
            </Link>
          </li>
        </ul>
      </div>
      <ReactTooltip id="login" place="bottom" content="Login" />
      <ReactTooltip id="signin" place="bottom" content="SignIn" />
      <ReactTooltip id="profile" place="bottom" content="Profile" />
      <ReactTooltip id="carts" place="bottom" content="Carts" />
    </nav>
  );
};

export default Navbar;
