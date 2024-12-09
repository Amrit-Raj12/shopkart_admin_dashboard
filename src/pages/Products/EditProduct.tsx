import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { useCategory } from '../../context/CategoryContext';
import { GET_SINGLE_PRODUCT_URL } from '../../constants/apiUrl';
import Loader from '../../common/Loader';
import useFetchWithToken from '../../hooks/useFetchWithToken';
import { useParams } from 'react-router-dom';
import useEditProduct from '../../hooks/useEditProduct';

const EditProduct = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
    
    const { categories } = useCategory()

    const token = localStorage.getItem('token') || ''; 

    const { id } = useParams();

    const { data, error, loading } = useFetchWithToken<any>(
        `${GET_SINGLE_PRODUCT_URL}/${id}`,
      token
    );

    const { editProduct, editLoading, editError, success } = useEditProduct(`${id}`, token);

    useEffect(() => {
        if (!loading && data) {
            delete data._id;
            delete data.createdAt;
            delete data.updatedAt;
            delete data.__v;
            delete data.images;
            delete data.owner;
            setFormData(data);
            setSelectedOption(data.category);
            setIsSuccess(success)
        }
    }, [loading, data, success]);
  
    if (error) return <div>Error: {error}</div>;

  
   

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: name === 'price' || name === 'discountPercentage' || name === 'stock' || name === 'rating' ? parseFloat(value) : value,
        });
      };

   

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("submit", formData)
        await editProduct(formData);
        
      };

      const hideSuccessMessage = () => {
        setIsSuccess(false);
      }

      const successElement = () => { return ( <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] mb-2 px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-2 items-center">
        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
              fill="white"
              stroke="white"
            ></path>
          </svg>
        </div>
        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
          Product updated successfully!
          </h5>
        </div>
        <div className='cursor-pointer' onClick={hideSuccessMessage}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg>

        </div>
      </div>
      )}
      
      

    return (
        <>
            <Breadcrumb pageName="Edit Product" />
            {isSuccess && successElement()}

            <div className="flex flex-col gap-9">
                {/* <!-- Edit Products Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Edit Product Form
                        </h3>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* {success && <p style={{ color: '#D0D820' }}>Product updated successfully!</p>} */}
      

      {editError && <p style={{ color: 'red' }}>{editError}</p>}
                    </div>
                    {loading ? <Loader/> : <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData?.title}
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
                                        value={formData?.price}
                                        onChange={handleInputChange}
                                        placeholder="Enter product price"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-black dark:text-white">
                                    Product Discount/Offer
                                    </label>
                                    <input
                                        type="number"
                                        name="discountPercentage"
                                        value={formData?.discountPercentage}
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
                                    <input
                                        type="text"
                                        name="thumbnail"
                                        value={formData?.thumbnail}
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
                                        value={formData?.rating}
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
                                        value={formData?.brand}
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
                                        value={formData?.stock}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                    />

                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white">
                                Product Description
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Type product description"
                                    name="description"
                                    value={formData?.description}
                                    onChange={handleInputChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-lightgreen active:border-lightgreen disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-lightgreen"
                                ></textarea>
                            </div>

                            <button className="flex w-full justify-center rounded bg-lightgreen p-3 font-medium text-black hover:bg-opacity-90" disabled={editLoading}>
                                {editLoading ? <div className='flex items-center justify-center'><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg> <span>Loading...</span></div> : 'Update Product'}
                            </button>
                        </div>
                    </form>}
                </div>
            </div>
        </>
    )
}

export default EditProduct