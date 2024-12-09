import React from "react";
import Loader from "../common/Loader";
import { ProductTypes } from "../types/product";
import { useNavigate } from "react-router-dom";

interface Props {
  products: ProductTypes[];
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

const ProductTable: React.FC<Props> = ({ products, onDelete, isLoading }) => {

  const navigate = useNavigate()

  const shortTitle = (str:string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  const noProductFound = () => {
    return (
      <div className="text-center py-6">
          <p className="text-xl text-black dark:text-white">
            No Products Found
          </p>
        </div>
    );
  }

  const gotoEditProduct = (id: string) => {
    navigate(`/product/${id}/edit`)
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

      {/* Table Header */}
      {/* @ts-ignore */}
      <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden sm:flex items-center">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 hidden sm:flex items-center">
          <p className="font-medium">Brand</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {/* Table Rows */}
      {console.log(products.length)}
      {isLoading ? <Loader /> : products.length === 0 ? noProductFound() : products.map((product) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={product._id}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-md overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {shortTitle(product.title, 30)}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">${product.price}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.stock}</p>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <p className="text-sm text-black dark:text-white">{product.brand}</p>
          </div>
          <div className="col-span-1 flex flex-col items-center sm:flex-row gap-2">
            {/* <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Edit
            </button> */}
            <svg onClick={()=>gotoEditProduct(product._id)} width="24px" height="24px" className="stroke-black-2 cursor-pointer hover:stroke-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg>

            <svg width="24px" height="24px" onClick={() => onDelete(product._id)} className="stroke-red-500 cursor-pointer hover:stroke-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M10 12V17"  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M14 12V17" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M4 7H20"  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g></svg>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTable;
