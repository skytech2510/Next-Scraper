import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-lg p-12 flex flex-col justify-center items-center gap-4 text-center">
        <h1 className="text-4xl font-semibold">Profile Scraper</h1>
        <p className="text-xl">Powered Profile Scraper by @skytech2510</p>
        <p className="text-lg">
          If you have any question about this, please contact{" "}
          <strong>@johnveetle0914</strong> in discord
        </p>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/skytech2510/Next-Scraper"
        >
          <Image
            src="/cutestar.png"
            alt="Logo"
            width={160}
            height={160}
            className="h-10 w-10 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default About;
