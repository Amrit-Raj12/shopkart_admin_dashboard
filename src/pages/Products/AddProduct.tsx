import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { useCategory } from '../../context/CategoryContext';
import useAddProducts from '../../hooks/useAddProduct';

const AddProduct = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    
    const { categories } = useCategory()

    const token = localStorage.getItem('token') || '';
    const { addProduct, loading, error, success } = useAddProducts(token);
  
    const [formData, setFormData] = useState({
      thumbnail: '',
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      brand: '',
      stock: 0,
      rating: 0,
      category: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: name === 'price' || name === 'discountPercentage' || name === 'stock' || name === 'rating' ? parseFloat(value) : value,
        });
      };

    // const changeTextColor = () => {
    //     setIsOptionSelected(true);
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("submit", formData)
        await addProduct(formData);
      };

    return (
        <>
            <Breadcrumb pageName="Add Product" />

            <div className="flex flex-col gap-9">
                {/* <!-- Add Products Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Add Product Form
                        </h3>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Product added successfully!</p>}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter product name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product Category
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                                        fill="#637381"
                                                    ></path>
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                                        fill="#637381"
                                                    ></path>
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                                        fill="#637381"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>

                                        <select
                                            // value={selectedOption}
                                            // onChange={(e) => {
                                            //     setSelectedOption(e.target.value);
                                            //     changeTextColor();
                                            // }}
                                            name="title"
                                            value={selectedOption}
                                            onChange={(e) => {setSelectedOption(e.target.value); setFormData(prev => ({...prev, category: e.target.value}))}}
                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-lightgreen active:border-lightgreen dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                }`}
                                        >
                                            <option value="" disabled className="text-body dark:text-bodydark">
                                                Select Category
                                            </option>
                                           {categories.length > 0 && categories.map((cat) => (<option key={cat.id} value={cat.name} className="text-body dark:text-bodydark">
                                                {cat.name}
                                            </option>)) }
                                           
                                        </select>

                                        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill="#637381"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product Price <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Enter product price"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />
                                </div>

                                {/* <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product SKU (Stock Keeping Unit) <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product SKU"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div> */}
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-black dark:text-white">
                                    Product Discount/Offer
                                    </label>
                                    <input
                                        type="number"
                                        name="discountPercentage"
                                        value={formData.discountPercentage}
                                        onChange={handleInputChange}
                                        placeholder="Enter product discount"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Product Image
                                    </label>
                                    {/* <input
                                        type="file"
                                        className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-lightgreen file:focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                                    /> */}
                                    <input
                                        type="text"
                                        name="thumbnail"
                                        value={formData.thumbnail}
                                        onChange={handleInputChange}
                                        placeholder="Enter product image url"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product Rating <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter product tags"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Product Brand
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product brand"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product SKU (Stock Keeping Unit) <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product SKU"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                                {/* <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product Weight <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter product weight"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div> */}
                            </div>
                            {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Product Dimensions
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product dimension"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product Status <span className="text-meta-1">*</span>
                                    </label>
                                    <div className="flex items-center space-x-6">
                                        <label className="flex items-center text-black dark:text-white">
                                            <input
                                                type="radio"
                                                name="productStatus"
                                                value="active"
                                                className="mr-2 h-4 w-4 border-stroke bg-transparent text-lightgreen outline-none transition focus:ring-2 focus:ring-lightgreen dark:border-form-strokedark dark:bg-form-input dark:checked:bg-lightgreen"
                                            />
                                            Active
                                        </label>
                                        <label className="flex items-center text-black dark:text-white">
                                            <input
                                                type="radio"
                                                name="productStatus"
                                                value="inactive"
                                                className="mr-2 h-4 w-4 border-stroke bg-transparent text-lightgreen outline-none transition focus:ring-2 focus:ring-lightgreen dark:border-form-strokedark dark:bg-form-input dark:checked:bg-lightgreen"
                                            />
                                            Inactive
                                        </label>
                                    </div>
                                </div>

                            </div> */}
                            {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-black dark:text-white">
                                    Product Discount/Offer
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter product discount"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                                <div className="w-full xl:w-1/2">
                                    <DatePickerOne />
                                </div>

                            </div> */}
                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white">
                                Product Description
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Type product description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                ></textarea>
                            </div>

                            <button className="flex w-full justify-center rounded bg-lightgreen p-3 font-medium text-black hover:bg-opacity-90">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct