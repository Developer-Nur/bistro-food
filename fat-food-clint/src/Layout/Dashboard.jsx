import { NavLink, Outlet } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaHome, FaList, FaUtensils } from "react-icons/fa";
import useCards from "../Hooks/useCards";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {

    const [card] = useCards()

    const [isAdmin] = useAdmin();

    return (
        <div className="flex  overflow-hidden ">

            {/* Sticky item */}
            <div className=" w-64 min-h-screen bg-orange-500 text-gray-600 pt-10">
                <ul className="fixed pl-3 pt-3 text-[18px] font-semibold space-y-3">
                    {
                        isAdmin ?
                            // MENU FOR ADMIN
                            <>
                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/'>Admin Home</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <FaUtensils size={23} />
                                    <NavLink to='/dashboard/'>add items</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/cart'>manage items</NavLink>
                                </li>

                                <li className="hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/cart'>Manage bookings</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/users'>all users</NavLink>
                                </li>

                                
                            </>

                            :

                            // MENU FOR USERS
                            <>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/'>User Home</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/'>Reservation</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/cart'>Payment History</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/cart'>My Cards ({card.length})</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/cart'>Add Review</NavLink>
                                </li>

                                <li className="uppercase hover:text-white flex items-start gap-2">
                                    <TiShoppingCart size={23} />
                                    <NavLink to='/dashboard/cart'>My Booking</NavLink>
                                </li>
                            </>
                    }

                    <div className="divider"></div>

                    <li className="uppercase hover:text-white flex items-start gap-2">
                        <FaHome size={23} />
                        <NavLink to='/'>Home</NavLink>
                    </li>

                    <li className="uppercase hover:text-white flex items-start gap-2">
                        <FaList size={23} />
                        <NavLink to='/shop/salad'>Menu</NavLink>
                    </li>

                    <li className="uppercase hover:text-white flex items-start gap-2">
                        <FaHome size={23} />
                        <NavLink to=''>Shop</NavLink>
                    </li>

                    <li className="uppercase hover:text-white flex items-start gap-2">
                        <FaHome size={23} />
                        <NavLink to=''>Contact</NavLink>
                    </li>
                </ul>
            </div>


            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;