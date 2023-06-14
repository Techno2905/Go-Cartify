import { useContext, useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { ProductsContext } from "../components/ProductsContext";
import Nav from "../components/Nav";
import Link from "next/link";

export default function CheckoutPage() {
     const { selectedProducts, setSelectedProducts } =
          useContext(ProductsContext);
     const [productsInfos, setProductsInfos] = useState([]);
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [address, setAddress] = useState("");
     const [city, setCity] = useState("");
     const [pin, setPin] = useState("");
     useEffect(() => {
          const uniqIds = [...new Set(selectedProducts)];
          fetch(
               "https://go-cartify.vercel.app/api/products?ids=" +
                    uniqIds.join(",")
          )
               .then((response) => response.json())
               .then((json) => setProductsInfos(json));
     }, [selectedProducts]);

     function more(id) {
          setSelectedProducts((prev) => [...prev, id]);
     }
     function less(id) {
          const pos = selectedProducts.indexOf(id);
          if (pos !== -1) {
               setSelectedProducts((prev) => {
                    return prev.filter((value, index) => index !== pos);
               });
          }
     }

     let subTotal = 0;
     if (selectedProducts?.length) {
          for (let id of selectedProducts) {
               const productInfo = productsInfos.find((p) => p._id === id);
               if (productInfo && productInfo.price) {
                    subTotal += productInfo.price;
               }
          }
     }
     const shippingPrice = subTotal > 0 ? 5 : 0;
     const total = subTotal + shippingPrice;

     return (
          <Layout>
               <div className="flex justify-center items- center py-2 position-right">
                    <Nav />
               </div>

               <div>
                    {shippingPrice === 0 && (
                         <div className="mt-5 flex h-screen flex-col items-center justify-center">
                              <div className="text-center flex justify-center text-2xl font-bold mb-2">
                                   No products in your shopping cart
                              </div>
                              <div>
                                   <Link className="border " href={"/"}>
                                        <a className="bg-bg mt-2 p-4 text-center flex justify-center text-2xl text-white font-bold mb-2 border-2 border-bg rounded-2xl shadow-2xl">
                                             Click to continue shopping
                                        </a>
                                   </Link>
                              </div>
                         </div>
                    )}
                    {productsInfos.length &&
                         productsInfos.map((productInfo) => {
                              const amount = selectedProducts.filter(
                                   (id) => id === productInfo._id
                              ).length;
                              if (amount === 0) {
                                   return null;
                              } else {
                                   return (
                                        <div
                                             key={productInfo.id}
                                             className="flex mb-5 items-center"
                                        >
                                             <div className="bg-graay p-3 rounded-xl shrink-0">
                                                  <img
                                                       className="w-24 aspect-square"
                                                       src={
                                                            productInfo.pictures
                                                       }
                                                       alt=""
                                                  />
                                             </div>
                                             <div className="pl-4 grow">
                                                  <h3 className="text-xl font-bold border-b ">
                                                       {productInfo.name}
                                                  </h3>
                                                  <div className="flex items-center mt-2">
                                                       <div className="font-semibold text-l grow">
                                                            ${productInfo.price}
                                                       </div>
                                                       <div className="flex gap-2">
                                                            <button
                                                                 onClick={() =>
                                                                      less(
                                                                           productInfo._id
                                                                      )
                                                                 }
                                                                 className="text-primary px-0.5 border font-bold border-primary rounded-lg "
                                                            >
                                                                 <svg
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      fill="none"
                                                                      viewBox="0 0 24 24"
                                                                      strokeWidth={
                                                                           2.5
                                                                      }
                                                                      stroke="currentColor"
                                                                      className="w-5 h-5"
                                                                 >
                                                                      <path
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                           d="M18 12H6"
                                                                      />
                                                                 </svg>
                                                            </button>
                                                            <div className="text-l font-semibold">
                                                                 {
                                                                      selectedProducts.filter(
                                                                           (
                                                                                id
                                                                           ) =>
                                                                                id ===
                                                                                productInfo._id
                                                                      ).length
                                                                 }
                                                            </div>
                                                            <button
                                                                 onClick={() =>
                                                                      more(
                                                                           productInfo._id
                                                                      )
                                                                 }
                                                                 className="bg-primary px-0.5 text-white border font-bold border-primary rounded-lg "
                                                            >
                                                                 <svg
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      fill="none"
                                                                      viewBox="0 0 24 24"
                                                                      strokeWidth={
                                                                           2.5
                                                                      }
                                                                      stroke="currentColor"
                                                                      className="w-5 h-5"
                                                                 >
                                                                      <path
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                           d="M12 6v12m6-6H6"
                                                                      />
                                                                 </svg>
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   );
                              }
                         })}
               </div>
               {selectedProducts.length > 0 && (
                    <form
                         action="https://go-cartify.vercel.app/api/checkout"
                         method="POST"
                    >
                         <div>
                              <input
                                   required
                                   name="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                                   type="text"
                                   placeholder="Your Name"
                              />
                              <input
                                   required
                                   name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                                   type="email"
                                   placeholder="Email address"
                              />
                              <input
                                   required
                                   name="address"
                                   value={address}
                                   onChange={(e) => setAddress(e.target.value)}
                                   className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                                   type="text"
                                   placeholder="Street address, number"
                              />
                              <input
                                   required
                                   name="city"
                                   value={city}
                                   onChange={(e) => setCity(e.target.value)}
                                   className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                                   type="text"
                                   placeholder="City"
                              />
                              <input
                                   required
                                   name="pin"
                                   value={pin}
                                   onChange={(e) =>
                                        setPin(Number(e.target.value))
                                   }
                                   className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                                   type="tel"
                                   placeholder="Postal Code"
                                   maxLength="6"
                              />
                         </div>
                         <div className="mt-4">
                              <div className="flex mt-5">
                                   <h3 className="grow text-gray-500  font-semibold">
                                        Subtotal:
                                   </h3>
                                   <h3 className="font-bold">${subTotal}</h3>
                              </div>
                              <div className="flex mt-2">
                                   <h3 className="grow text-gray-500 font-semibold">
                                        Shipping:
                                   </h3>
                                   <h3 className="font-bold">
                                        ${shippingPrice}
                                   </h3>
                              </div>
                              <div className="flex mt-2 border-t-2 border-dashed border-bg">
                                   <h3 className="grow text-gray-500 font-semibold">
                                        Total:
                                   </h3>
                                   <h3 className="font-bold">${total}</h3>
                              </div>
                         </div>

                         <input
                              type="hidden"
                              name="products"
                              value={selectedProducts.join(",")}
                         />
                         <div
                              class="flex p-4 mb-2 mt-2 text-l text-white border border-purple-300 rounded-xl bg-purple-50 font-semibold"
                              role="info"
                         >
                              <svg
                                   aria-hidden="true"
                                   class="flex-shrink-0 inline w-5 h-5 mr-3"
                                   fill="currentColor"
                                   viewBox="0 0 20 20"
                                   xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                        fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clip-rule="evenodd"
                                   ></path>
                              </svg>
                              <span class="sr-only">Info</span>
                              <div>
                                   <span class="font-medium">Alert!</span> You
                                   can use Card number : 4242 4242 4242 4242, to
                                   mimic a sucessful purchase on Stripe
                              </div>
                         </div>
                         <button
                              type="submit"
                              className="bg-primary px-5 py-3 rounded-xl text-white text-xl font-bold w-full my-4 shadow-primary shadow-md "
                         >
                              Pay ${total}
                         </button>
                    </form>
               )}
          </Layout>
     );
}
