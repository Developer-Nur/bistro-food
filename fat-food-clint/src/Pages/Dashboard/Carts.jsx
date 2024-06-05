import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../Compo/SectionTitle";
import useCards from "../../Hooks/useCards";
import Swal from "sweetalert2";
import useBaseUrl from "../../Hooks/useBaseUrl";
import { Link } from "react-router-dom";


const Carts = () => {

    const [cart, refetch, isLoading] = useCards();
    const axiosSecure = useBaseUrl();

    const priceSum = cart.reduce((sum, item) => sum + item.price, 0);
    // console.log("the ultimate total amount is", priceSum)


    const handleDeleteFromCart = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {


                axiosSecure.delete(`/delete-card/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(error => console.log(error.message))

            }
        });
    }


    return (
        <div>
            <SectionTitle
                text='---Excellent Ambience---'
                title=' MY BOOKINGS'
            >
            </SectionTitle>


            {
                isLoading ? <p>Loading...</p> :
                    <div className="px-20 w-full mx-auto">
                        <div className=" flex justify-between items-center">
                            <h2>Total bookings: {cart.length}</h2>
                            <h2>total price: ${priceSum}</h2>
                            {
                                cart.length ? <Link to='/dashboard/payment'>
                                    <button className="btn bg-orange-500">Pay</button>
                                </Link> : <button disabled className="btn bg-orange-500">Pay</button>
                            }
                        </div>
                        {/* table */}

                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full mt-10">
                                {/* head */}
                                <thead className="bg-orange-500 ">
                                    <tr>
                                        <th></th>
                                        <th>Item Image</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* dynamic content */}

                                    {
                                        cart.map((item, index) => <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{item.name}</p>
                                            </td>
                                            <td>
                                                <p>${item.price}</p>
                                            </td>
                                            <th>
                                                <button onClick={() => handleDeleteFromCart(item._id)} className="btn btn-ghost">
                                                    <FaTrash size={18} />
                                                </button>
                                            </th>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>



                    </div>
            }
        </div>
    );
};
export default Carts;