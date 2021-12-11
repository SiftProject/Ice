import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("the navbar moutned");
  }, []);

  return (
    <nav>
      <h1>IceCase</h1>

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

      <div>balance:</div>

      <div>name:</div>
      <button onClick={() => dispatch({ type: "SHOW_SIGNUP" })}>Sign up</button>
      <button>Login</button>
    </nav>
  );
};

export default Nav;
