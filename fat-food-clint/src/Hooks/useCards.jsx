import { useQuery } from "@tanstack/react-query";
import useBaseUrl from "./useBaseUrl";
import useUserinfo from "./useUserinfo";

const useCards = () => {
    // baseurl
    const axiosSecure = useBaseUrl()

    const {user} = useUserinfo()
    // tarnstec query code to get data from api

    const { refetch ,data: card = [], isPending, error, } = useQuery({
        queryKey: ['card', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cards?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return [card, refetch];
};

export default useCards;