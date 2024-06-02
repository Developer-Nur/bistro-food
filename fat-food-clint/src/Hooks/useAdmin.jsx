import useUserinfo from "./useUserinfo";
import useBaseUrl from "./useBaseUrl"
import { useQuery } from "@tanstack/react-query";




const useAdmin = () => {


    const { user } = useUserinfo();
    const axioxSecure = useBaseUrl();

    // calling the user admin api
    const {data: isAdmin, isPending} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axioxSecure.get(`/user-admin/${user.email}`)
            console.log("admin data is ",res.data);
            return res.data?.admin;
        }
    });

    return [isAdmin, isPending]
};

export default useAdmin;