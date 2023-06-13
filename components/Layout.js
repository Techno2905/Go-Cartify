import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import { ProductsContext } from "./ProductsContext";

export default function Layout({ children }) {
     const { setSelectedProducts } = useContext(ProductsContext);
     const [success, setSuccess] = useState(false);
     useEffect(() => {
          if (window.location.href.includes("success")) {
               setSelectedProducts([]);
               setSuccess(true);
          }
     }, []);

     function continueShopping() {
          setSuccess(false);
     }

     if (success) {
          return (
               <div className="p-10">
                    <div class="fixed inset-0 flex items-center justify-center">
                         <div class=" fixed inset-0 z-10"></div>
                         <div class="bg-white rounded-lg md:max-w-md p-4 z-50 border shadow-primary shadow-xl">
                              <div class="flex items-center">
                                   <div className="text-green-500 ">
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor"
                                             className="w-40 h-40"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                             />
                                        </svg>
                                   </div>
                                   <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                        <p class="font-bold text-xl">
                                             Order Placed!
                                        </p>
                                        <p class="text-sm text-gray-700 mt-1">
                                             Thank you for placing your order on
                                             Gocartify
                                        </p>
                                   </div>
                              </div>
                              <div class="text-center">
                                   <button
                                        onClick={continueShopping}
                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-purple-200 text-purple-700 rounded-lg font-semibold text-lg "
                                   >
                                        Continue Shopping
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div>
               <div className="p-5">{children}</div>
               <Footer />
          </div>
     );
}
