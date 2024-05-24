import { Helmet } from 'react-helmet-async';
import Cover from '../Compo/Cover';
import DesirtedCover from '../../public/assets/menu/dessert-bg.jpeg';
import PizzaCover from '../../public/assets/menu/pizza-bg.jpg';
import SoupCover from '../../public/assets/menu/soup-bg.jpg';
import saladCover from '../../public/assets/menu/salad-bg.jpg';
import CoverBg from '../../public/assets/menu/banner3.jpg'
import MenuCategiry from './MenuCategiry';
import SectionTitle from '../Compo/SectionTitle';
import useFilterRecipy from '../Hooks/useFilterRecipy';
import useMenu from '../Hooks/useMenu';

const Menu = () => {

    const [menu, loader] = useMenu()
    const [dessert, soup, salad, pizza, offered ] = useFilterRecipy(menu);

    if (loader) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Helmet>
                <title>
                    Fat-Food-Menus
                </title>
            </Helmet>
            <Cover
                text="Would you like to try a dish?"
                title="OUR MENU"
                img={CoverBg}
            ></Cover>
            <SectionTitle text="Get the offer for today" title="Todays Offer"></SectionTitle>
            
            <MenuCategiry items={offered}></MenuCategiry>
            <Cover
                text="Would you like to try a dish?"
                title="DESSERTS"
                img={DesirtedCover}
            ></Cover>
            <MenuCategiry items={dessert}></MenuCategiry>


            {/* Pizza menu */}
            <Cover
                text="Would you like to try a dish?"
                title="Pizza"
                img={PizzaCover}
            ></Cover>
            <MenuCategiry items={pizza}></MenuCategiry>

            {/* Salad menu */}
            <Cover
                text="Would you like to try a dish?"
                title="Salad"
                img={saladCover}
            ></Cover>
            <MenuCategiry items={salad}></MenuCategiry>



            {/* Soup menu */}
            <Cover
                text="Would you like to try a dish?"
                title="Soup"
                img={SoupCover}
            ></Cover>
            <MenuCategiry items={soup}></MenuCategiry>

        </div>
    );
};

export default Menu;