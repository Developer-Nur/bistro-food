import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/menu');
                const data = await response.json();
                setMenu(data);
                setLoader(false);
            } catch (error) {
                console.error('Error fetching menu:', error);
                // Handle error state if needed
            }
        };

        fetchData();

    }, []);

    return [menu, loader];
};

export default useMenu;
