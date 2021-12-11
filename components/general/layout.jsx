import Nav from "./nav";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./sign-up";

const Layout = ({ children }) => {
  const { auth, UI } = useSelector((store) => store);
  return (
    <>
      {UI.showSignup.show && <SignUp />}
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
