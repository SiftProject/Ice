import Nav from "./nav";
import { useSelector } from "react-redux";
import SignUp from "./sign-up";
import Login from "./login";

const Layout = ({ children }) => {
  const { auth, UI } = useSelector((store) => store);
  return (
    <>
      {UI.showSignup.show && <SignUp />}
      {UI.showLogin.show && <Login />}
      {/* <Login /> */}
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
