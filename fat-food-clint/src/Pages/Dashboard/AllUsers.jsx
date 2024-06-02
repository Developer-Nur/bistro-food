import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Compo/SectionTitle";
import useBaseUrl from "../../Hooks/useBaseUrl";
import { FaTrash } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {

    const axiosSecure = useBaseUrl();

    // fetching all user from api
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users');
            return res.data;
        }
    })

    // Delete a user
    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/delete-user/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => console.log(error.message))

            }
        });
    }

    // make a user Admin
    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {

            if (result.isConfirmed) {

                axiosSecure.patch(`/make/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Admin created!",
                                text: "A create a new admin.",
                                icon: "success"
                            });
                        }
                    }
                    )
                    .catch(error => console.log(error.message))

            }
        });
    }

    return (
        <div>
            <SectionTitle
                text="---At a Glance!--- "
                title="MANAGE ALL USERS"
            ></SectionTitle>



            <div className="shadow-xl py-5 px-10  rounded-lg">
                <h2 className="py-2">Total User: {users.length}</h2>

                {
                    isLoading ? <p>Loading...</p> : <>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full mt-10">
                                {/* head */}
                                <thead className="bg-orange-500 ">
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* dynamic content */}

                                    {
                                        users.map((user, index) => <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>

                                            <td >
                                                <p>{user.name}</p>
                                            </td>
                                            <td>
                                                <p>{user.email}</p>
                                            </td>
                                            <td>
                                                {
                                                    user.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost">
                                                        <FaUserGroup size={18} />
                                                    </button>
                                                }
                                            </td>
                                            <th>

                                                <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost">
                                                    <FaTrash size={18} />
                                                </button>
                                            </th>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </div>

        </div>
    );
};

export default AllUsers;