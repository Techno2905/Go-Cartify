import { useState } from "react";
import Product from "../components/Product";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";
import mongoose from "mongoose";
import Nav from "../components/nav";

export default function Home({ products }) {
     const [phrase, setPhrase] = useState("");

     const categoriesNames = [...new Set(products.map((p) => p.category))];
     if (phrase) {
          products = products.filter((p) =>
               p.name.toLowerCase().includes(phrase.toLowerCase())
          );
     }

     return (
          <Layout>
               <div className="flex gap-2 py-2">
                    <div className="flex items-center bg-gray-200 grow  px-4 rounded-xl">
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              />
                         </svg>

                         <input
                              value={phrase}
                              onChange={(e) => setPhrase(e.target.value)}
                              type="text"
                              placeholder={"Search.."}
                              className="bg-gray-200 w-full py-2 px-4 rounded-xl focus:outline-none "
                         />
                    </div>
                    <Nav />
               </div>

               <div>
                    {categoriesNames.map((categoryName) => (
                         <div key={categoryName}>
                              {products.find(
                                   (p) => p.category === categoryName
                              ) && (
                                   <div>
                                        <h2 className="text-2xl py-5 font-semibold capitalize">
                                             {categoryName}
                                        </h2>
                                        <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                                             {products
                                                  .filter(
                                                       (p) =>
                                                            p.category ===
                                                            categoryName
                                                  )
                                                  .map((productInfo) => (
                                                       <div
                                                            key={
                                                                 productInfo._id
                                                            }
                                                            className="px-5 snap-start"
                                                       >
                                                            <Product
                                                                 {...productInfo}
                                                            />
                                                       </div>
                                                  ))}
                                        </div>
                                   </div>
                              )}
                         </div>
                    ))}
               </div>
          </Layout>
     );
}

export async function getServerSideProps() {
     console.log("entered lol");
     await mongoose.connect(process.env.MONGODB_URL);
     console.log("connected to db");
     const products = await findAllProducts();
     console.log("got products");
     return {
          props: {
               products: JSON.parse(JSON.stringify(products)),
          },
     };
}
