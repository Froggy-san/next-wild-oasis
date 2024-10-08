import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  // ! this auth works with cookies and headers, so this auth function need to read the incoming cookies from the incoming request, and reading cookies makes the route dynamic, so it's no longer a static page.
  const sesstion = await auth();
  console.log(sesstion, "GOOGLE SEESTION");

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {sesstion?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className=" h-8 rounded-full"
                src={sesstion.user.image}
                alt="USERS IMAGE"
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
