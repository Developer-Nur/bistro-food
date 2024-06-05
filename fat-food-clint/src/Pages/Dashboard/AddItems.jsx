import SectionTitle from '../../Compo/SectionTitle'
import { useForm } from "react-hook-form"
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useBaseUrl from '../../Hooks/useBaseUrl';

// image hosting related 
const imageHostingKeyImageBB = import.meta.env.VITE_image_hosting;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKeyImageBB}`

const AddItems = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useBaseUrl();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        // hosting the image form the form to imageBB
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // console.log("resnonse from image BB", res.data.data.display_url);
        if (res.data.success) {
            // send the fomr data to server to set it to the DB
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }
            console.log(menuItem);
            const menuRes = await axiosSecure.post('/add-menu-item', menuItem)

            if (menuRes.data.insertedId) {
                reset()
                alert("Created Itme successfully")
            }

        }

    }



    return (
        <div >
            <SectionTitle
                text="--Add Here--"
                title="Add a Food Recipe "
            ></SectionTitle>

            <div className='bg-gray-300 p-10 rounded-lg w-4/5 mx-auto'>
                <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit(onSubmit)}>

                    <label className='flex flex-col'>
                        <span>Recipe Name</span>

                        <input {...register("name", { required: true })} type='text' placeholder='Recipe Name' className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className='flex flex-col'>
                        <span>Select Recipe Category </span>

                        <select {...register("category", { required: true })} className="select select-info w-full max-w-xs">
                            <option disabled defaultValue='Select Category'></option>
                            <option value='salad'>Salad</option>
                            <option value='pizza'>Pizza</option>
                            <option value='soup'>Soup</option>
                            <option value='desserts'>Desserts</option>
                            <option value='drinks'>Drinks</option>
                        </select>
                    </label>



                    <label className='flex flex-col'>
                        <span>Recipe Price</span>
                        <input {...register("price", { required: true })} type='number' placeholder='Item Price' className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className='flex flex-col'>
                        <span>Gallery Image</span>
                        <input {...register("image", { required: true })} type='file' placeholder='Image' className=" input input-bordered w-full max-w-xs" />

                        {errors.exampleRequired && <span>This field is required</span>}
                    </label>

                    <label className='flex flex-col col-span-2 mr-4 '>
                        <span>Recipe Details</span>
                        <textarea {...register("recipe", { required: true })} type='text' placeholder='Recipe Details' className=" resize-none input input-bordered w-full " />
                    </label>

                    <button className='btn btn-primary col-span-2'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddItems;