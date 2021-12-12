import { useEffect } from "react";
import { Provider } from "react-redux";


import Layout from "../components/general/layout";
import store from "../redux/store";
import '../styles/globals.sass'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    /*
      1. Get the cookie from the localstorage.
      2. Get the current user based on the cookie.
      3. store that in the redux state.
    */
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
export default MyApp;
