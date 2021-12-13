import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styles from '../../styles/nav.module.sass'
import {useRouter} from 'next/router';

const Nav = () => {
  const dispatch = useDispatch();
  const isAuthen = useSelector(store=>store.auth.isAuthen)
  const router = useRouter()

  const renderStatus =  ()=>{
    if(isAuthen) return(
      <div>
        <div>balance:</div>
        <div>name:</div>
      </div>
    )
    if(!isAuthen) return (
      <div className={styles.actionBtns}>
        <button className={styles.signUp} onClick={() => dispatch({ type: "SHOW_SIGNUP" })}>Sign up</button>
        <button className={styles.login} onClick={() => dispatch({ type: "SHOW_LOGIN" })}>Login</button>
      </div>
    )
  }

  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>
        <span>Ice</span>
        Case
      </h1>

      <ul className={styles.navLinks}>
        <li  className={router.pathname === '/' ? styles.activeLi : null}>
          <Link href="/">Unboxing</Link>
        </li>
        <li className={router.pathname === '/battles' ? styles.activeLi : null}>
          <Link href="/battles">Battles</Link>
        </li>
        <li className={router.pathname === '/free-cases' ? styles.activeLi : null}>
          <Link href="/free-cases">Free Cases</Link>
        </li>
        <li className={router.pathname === '/how-it-works' ? styles.activeLi : null}>
          <Link href="/how-it-works">How it works</Link>
        </li>
      </ul>
      {renderStatus()}
    </nav>
  );
};

export default Nav;
