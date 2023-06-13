import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Footer() {
     const router = useRouter();
     const path = router.pathname;
     const { selectedProducts } = useContext(ProductsContext);

     return (
          <footer className="sticky bottom-0  flex items-center  bg-white p-2 w-full border-t border-gray-200 justify-center space-x-12">
               <Link href={"/"}>
                    <a
                         className={
                              (path === "/"
                                   ? "text-primary"
                                   : "text-gray-500") +
                              " flex  justify-center items-center flex-col"
                         }
                    >
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                         >
                              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                         </svg>
                         <span>Home</span>
                    </a>
               </Link>
               <Link href={"/checkout"}>
                    <a
                         className={
                              (path === "/checkout"
                                   ? "text-primary"
                                   : "text-gray-500") +
                              " flex  justify-center items-center flex-col"
                         }
                    >
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                         >
                              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                         </svg>
                         <span>Cart {selectedProducts.length}</span>
                    </a>
               </Link>
          </footer>
     );
}
