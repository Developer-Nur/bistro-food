import Cover from "../Compo/Cover";
import CoverImg from "../../public/assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import FoodCard from "../Compo/FoodCard";
import useFilterRecipy from "../Hooks/useFilterRecipy";
import useMenu from "../Hooks/useMenu";
import { useParams } from "react-router-dom";


const Orders = () => {
    const categores = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams();
    const initialeIndex = categores.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialeIndex);


    const [menu, loader] = useMenu()
    const [dessert, soup, salad, pizza, drinks] = useFilterRecipy(menu);
    console.log(category);


    if (loader) {
        return <div className="absolute top-1/2 right-1/2">Loading...</div>;
    }


    return (
        <div>
            <Cover
                img={CoverImg}
                title="Our Shop"
                text="Order Your food online"
            ></Cover>

            {/* different dist category tab */}
            <div className="py-20 text-center">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab >Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>

                    {/* Tab panel of Salad */}
                    <TabPanel>
                        <div className="text-left grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {
                                salad && salad.map(item => <FoodCard
                                    key={item._id}
                                    items={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>

                    {/* Tab panel of Pizza */}
                    <TabPanel>
                        <div className="text-left grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {
                                pizza && pizza.map(item => <FoodCard
                                    key={item._id}
                                    items={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>


                    {/* Tab panel of soup */}
                    <TabPanel>
                        <div className="text-left grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {
                                soup && soup.map(item => <FoodCard
                                    key={item._id}
                                    items={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>


                    {/* Tab panel of dessert */}
                    <TabPanel>
                        <div className="text-left grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {
                                dessert && dessert.map(item => <FoodCard
                                    key={item._id}
                                    items={item}
                                >

                                </FoodCard>)
                            }
                        </div>
                    </TabPanel>


                    {/* Tab panel of drinks */}
                    <TabPanel>
                        <div className="text-left grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {
                                drinks && drinks.map(item => <FoodCard
                                    key={item._id}
                                    items={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div >
    );
};

export default Orders;