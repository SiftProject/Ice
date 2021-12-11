import Link from "next/link";
const Nav = () => {
  return (
    <ul>
      <li>
        <Link href="/">Unboxing</Link>
      </li>
      <li>
        <Link href="/battles">Battles</Link>
      </li>
      <li>
        <Link href="/free-cases">Free Cases</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
};

export default Nav;
