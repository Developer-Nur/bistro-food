import Swal from "sweetalert2";
import useUserinfo from "../Hooks/useUserinfo";
import { useLocation, useNavigate } from "react-router-dom";
import useBaseUrl from "../Hooks/useBaseUrl";
import useCards from "../Hooks/useCards";

const FoodCard = ({ items: item }) => {

    const { user } = useUserinfo()
    const { name, recipe, price, image, _id } = item || {};
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useBaseUrl();
    const [, refetch] = useCards();
 

    const handleAddToCard = () => {
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                image,
                price,
                name
            }
            axiosSecure.post('/cards', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "Added successfully",
                            icon: "success",
                            title: `${name}, Item added to your card`,
                            showConfirmButton: false,
                            timer: 3000
                        });
                        // re-fetching the data from api to add to the shoping card
                        refetch()
                    }
                })

        }
        else {
            Swal.fire({
                title: "Please login to add to card",
                text: "All meal is waiting for you!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }


    return (
        <div className="relative  card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="Shoes" />
                <figcaption className="absolute top-4 left-4 py-1 px-2 rounded-lg bg-orange-400 text-black">${price}</figcaption>
            </figure>
            <div className="card-body flex flex-col items-center space-y-3">
                <h2 className="card-title">{name}</h2>
                <p className="text-center">{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={handleAddToCard}
                        className="btn btn-outline border-0 border-b-4 bg-slate-200 border-orange-300 hover:text-orange-300">Add to card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;




