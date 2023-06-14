import { ProductsContextProvider } from "../components/ProductsContext";
import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
     return (
          <>
               <Head>
                    <title>Your Website Title</title>
               </Head>
               <ProductsContextProvider>
                    <Component {...pageProps} />
               </ProductsContextProvider>
          </>
     );
}

export default MyApp;
