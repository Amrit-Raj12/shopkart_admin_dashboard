import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { GET_PRODUCTS_URL } from "../../constants/apiUrl";
import { toast } from "react-toastify";
import axios from "axios";
import ProductTable from "../../modules/ProductTabele";


const AllProducts = () => {
  const token = localStorage.getItem("token") || "";

  // State for filters, sorting, pagination
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sortBy: "",
    sortOrder: "",
    page: 1,
    limit: 5,
  });

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${GET_PRODUCTS_URL}?page=${filters.page}&limit=${filters.limit}&search=${filters.search}&category=${filters.category}&sortBy=${filters.sortBy}&sortOrder=${filters.sortBy}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
      setCategories(response.data.category);
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.totalPages);
      setCurrentPage(response.data.pagination.currentPage);
    } catch (error) {
      toast.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Delete Product
  // const handleDelete = async (productId: string) => {
  //   try {
  //     await axios.delete(`${GET_PRODUCTS_URL}/${productId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     toast.success("Product deleted successfully!");
  //     fetchProducts();
  //   } catch (error) {
  //     toast.error("Failed to delete product!");
  //   }
  // };
  const handleDelete = async (productId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
  
    if (!isConfirmed) {
      return; // Exit the function if the user cancels the action
    }
  
    try {
      await axios.delete(`${GET_PRODUCTS_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };
  

  // Handle filter
  const handleFilterChange = (title: string, value: string) => {
    setFilters((prev) => ({ ...prev, [title]: value, page: 1 }));
  };

  // const handleFilterChange = useCallback(
  //   debounce((title: string, value: string) => {
  //     setFilters((prev) => {
  //       if (prev[title] === value) return prev; // Avoid unnecessary state updates
  //       return { ...prev, [title]: value, page: 1 };
  //     });
  //   }, 300), // Adjust debounce delay (300ms is common)
  //   []
  // );

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // if (loading) return <Loader />;

  return (
    <>
      <Breadcrumb pageName="All Products" />
      <div className="flex flex-col gap-10 p-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="p-2 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
          />
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="p-2 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
          >
            <option value="">All Categories</option>
           {categories.map((ctr, index) => (<option key={index} value={ctr}>{ctr}</option>)) }
            {/* <option value="Fashion">Fashion</option> */}
          </select>
          {/* <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="select"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select> */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="p-2 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
          {/* <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            className="select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select> */}
        </div>
        <ProductTable
          products={products}
          onDelete={handleDelete}
          isLoading={loading}
        />

{/* <div className="mt-6 flex flex-wrap justify-center gap-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded ${
                    filters.page === page ? "bg-lightgreen text-white" : "bg-gray-200"
                }`}
            >
                {page}
            </button>
        ))}
    </div> */}
    <div className="mt-6 flex justify-center gap-x-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-transparent"
      >
        <svg width="24px" height="24px" className={`${currentPage === 1 ? "fill-gray-400 cursor-not-allowed" : "fill-gray-600 hover:fill-lightgreen"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M18.3956 19.7691C19.0541 20.2687 20 19.799 20 18.9724L20 5.02764C20 4.20106 19.0541 3.73137 18.3956 4.23095L9.20476 11.2033C8.67727 11.6035 8.67727 12.3965 9.20476 12.7967L18.3956 19.7691ZM22 18.9724C22 21.4521 19.1624 22.8612 17.1868 21.3625L7.99598 14.3901C6.41353 13.1896 6.41353 10.8104 7.99599 9.60994L17.1868 2.63757C19.1624 1.13885 22 2.5479 22 5.02764L22 18.9724Z"  /> <path d="M2 3C2 2.44772 2.44772 2 3 2C3.55228 2 4 2.44772 4 3V21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21V3Z"  /> </g></svg>

      </button>

      {/* Current Page Display */}
      <span className="px-4 py-2 border rounded bg-lightgreen text-white">
        {currentPage}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-transparent"
      >
        <svg width="24px" className={`${currentPage === totalPages ? "fill-gray-400 cursor-not-allowed" : "fill-gray-600 hover:fill-lightgreen"}`} height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.60439 4.23093C4.94586 3.73136 4 4.20105 4 5.02762V18.9724C4 19.799 4.94586 20.2686 5.60439 19.7691L14.7952 12.7967C15.3227 12.3965 15.3227 11.6035 14.7952 11.2033L5.60439 4.23093ZM2 5.02762C2 2.54789 4.83758 1.13883 6.81316 2.63755L16.004 9.60993C17.5865 10.8104 17.5865 13.1896 16.004 14.3901L6.81316 21.3625C4.83758 22.8612 2 21.4521 2 18.9724V5.02762Z" /> <path d="M20 3C20 2.44772 20.4477 2 21 2C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22C20.4477 22 20 21.5523 20 21V3Z" /> </g></svg>

      </button>
    </div>
      </div>
    </>
  );
};

export default AllProducts;
