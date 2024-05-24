import SectionTitle from "./SectionTitle";
import MenuItem from "./MenuItem";
import useMenu from "../Hooks/useMenu";
// import useMenu from "../Hooks/useMenu";

const PopulerMenu = () => {

    const [menu, loader] = useMenu();


    if (loader) {
        return <div>Loading...</div>;
    }

    const populer = menu ? menu.filter(itm => itm.category === "popular") : [];


    return (
        <section >
            <SectionTitle
                text="Popular Menu"
                title="Most popular items"
            ></SectionTitle>

            <div className="grid md:grid-cols-2 gap-6 p-10">
                {
                    populer && populer.map((item, index) => <MenuItem
                        key={index}
                        items={item}
                    ></MenuItem>)
                }
            </div>

            <div className="w-full text-center mb-10">
                <button className="btn btn-outline border-0 border-b-4">Get Started</button>

            </div>
        </section>
    );
};

export default PopulerMenu;