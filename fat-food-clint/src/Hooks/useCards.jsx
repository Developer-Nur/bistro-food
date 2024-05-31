import { useQuery } from "@tanstack/react-query";
import useBaseUrl from "./useBaseUrl";
import useUserinfo from "./useUserinfo";

const useCards = () => {
    // baseurl
    const axiosSecure = useBaseUrl();
    

    const {user} = useUserinfo()
;    // tarnstec query code to get data from api

    const { refetch , data: card = [], isLoading } = useQuery({
        queryKey: ['card', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cards?email=${user.email}`);
            // setLoader(true)
            return res.data;
        }
    });



    return [card, refetch, isLoading];
};

export default useCards;