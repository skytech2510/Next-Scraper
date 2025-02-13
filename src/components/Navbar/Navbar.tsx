import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/">
            <Image
              src="/cutestar.png"
              alt="Logo"
              width={100}
              height={100}
              className="h-10 w-10 rounded-full"
            />
          </Link>
        </div>
        
        <div className="flex space-x-8">
          <Link href="/">
            <button className="text-white hover:text-gray-300">
              Dashboard
            </button>
          </Link>
          {/* <Link href="/scrape">
            <button className="text-white hover:text-gray-300">Scrape</button>
          </Link> */}
          <Link href="/about">
            <button className="text-white hover:text-gray-300">About</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
