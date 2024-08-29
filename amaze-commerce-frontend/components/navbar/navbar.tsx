import Link from "next/link";
import UserIcon from "@/public/icons/user.png";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";

export default function NavBar() {
  // Nav links
  const NavLinks = (
    <>
      <li>
        <Link href="/products/1">All Product</Link>
      </li>
      <li>
        <Link href="/auth/register">Register</Link>
      </li>
      <li>
        <Link href="/user/cart">Cart</Link>
      </li>
    </>
  );

  return (
    <div>
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
          <Link href="/" className="btn btn-ghost ml-16 md:ml-0 text-xl">
            <h3>
               Amaze<span className="text-yellow-500">Com</span>
            </h3>
          </Link>
        </div>
        {/* search field */}
        <div className="absolute ml-20 md:relative mt-[80px] md:mt-0">
          <form action="/products/searchResults" method="get">
            <input
              type="text"
              name="searchTerm"
              placeholder="search"
              className="border-2 rounded-lg border-yellow-300 px-2 py-1"
            />
            <button type="submit" className="absolute top-1 right-2">
              <SearchIcon style={{ fontSize: "24px" }} />
            </button>
          </form>
        </div>
        {/* navbar center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
        </div>
        {/* navbar end */}
        <div className="navbar-end">
          <button className="btn btn-ghost">
            <Image src={UserIcon} alt="user" height={20} width={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
