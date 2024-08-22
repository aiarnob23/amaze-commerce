import Link from "next/link";
import UserIcon from "@/public/icons/user.png";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

export default function NavBar() {
  // Nav links
  const NavLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/trash">Trash</Link>
      </li>
    </>
  );

  return (
    <nav>
      <div className="navbar mb-[40px] md:mb-[10px]  bg-base-200 text-[#1E2A5E] relative">
        {/*navbar start  */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {NavLinks}
            </ul>
          </div>
          <a className="btn btn-ghost ml-16 md:ml-0 text-xl">AmazeCom</a>
        </div>
        {/* search field */}
        <div className="absolute ml-20 md:relative mt-[80px] md:mt-0">
          <input
            type="text"
            placeholder="search"
            className="border-2 flex  rounded-lg border-yellow-300 px-2 py-1"
          />
          <Button className="-ml-12">
            <SearchIcon />
          </Button>
        </div>
        {/* navbar center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
        </div>
        {/* navbar end */}
        <div className="navbar-end">
          <Button>
            <Image src={UserIcon} alt="user" height={20} width={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
