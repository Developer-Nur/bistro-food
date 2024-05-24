import MenuItem from "../Compo/MenuItem";

const MenuCategiry = ({ items }) => {

    return (
        <div className="py-10">
            <div className="grid md:grid-cols-2 gap-6 p-10">
                {
                    items && items.map((item, index) => <MenuItem
                        key={index}
                        items={item}
                    ></MenuItem>)
                }
            </div>
            <div className="w-full text-center">
                <button className="btn btn-outline border-0 border-b-4">Order Our Favorite Food</button>
            </div>
        </div>
    );
};

export default MenuCategiry;