// import useMenu from "./useMenu";

const useFilterRecipy = (menu) => {


    const populer = menu ? menu.filter(itm => itm.category === "popular") : [];
    const dessert = menu ? menu.filter(itm => itm.category === "dessert") : [];
    const soup = menu ? menu.filter(itm => itm.category === "soup") : [];
    const salad = menu ? menu.filter(itm => itm.category === "salad") : [];
    const pizza = menu ? menu.filter(itm => itm.category === "pizza") : [];
    const offered = menu ? menu.filter(itm => itm.category === "offered") : [];
    const drinks = menu ? menu.filter(itm => itm.category === "drinks") : [];

    return [dessert, soup, salad, pizza, offered, populer, drinks]
};

export default useFilterRecipy;