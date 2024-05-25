import { Link } from "react-router-dom";
import MenuItem from "../Compo/MenuItem";

const MenuCategiry = ({ items, title }) => {

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
                <Link to={`/shop/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4">Order Our Favorite Food</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategiry;