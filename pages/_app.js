import Layout from "../components/general/layout"

const MyApp = ({Component, pageProps})=>{
  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}
export default MyApp