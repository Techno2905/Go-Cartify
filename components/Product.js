import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Product({ _id, name, price, description, pictures }) {
     const { setSelectedProducts } = useContext(ProductsContext);

     function addProduct() {
          setSelectedProducts((prev) => [...prev, _id]);
     }

     return (
          <div className="w-64 flex flex-col justify-between">
               <div className="bg-bg p-5 rounded-xl">
                    <img src={pictures} alt="" />
               </div>
               <div className="mt-2">
                    <h3 className="font-bold text-lg">{name}</h3>
               </div>
               <div className="flex-grow">
                    <p className="text-sm mt-1 leading-5 max-h-[5em] overflow-hidden">
                         {description}
                    </p>
               </div>
               <div className="flex mt-1">
                    <div className="text-2xl font-bold">${price}</div>
                    <button
                         onClick={addProduct}
                         className="flex bg-primary text-white py-1 px-3 rounded-md"
                    >
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
                                   d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              />
                         </svg>
                         +
                    </button>
               </div>
          </div>
     );
}
