
const MenuItem = ({ items }) => {

    const { name, recipe, price, image } = items || {}

    return (
        <div className="flex space-x-5 items-start gap-3">
            <img style={{borderRadius: '0 200px 200px 200px'}} className="w-[120px] h-[100px]" src={image} alt="" />
            <div>
                <p className="uppercase">{name}</p>
                <p>{recipe}</p>
            </div>
            <p className="text-orange-600">{price}</p>
        </div>

    );
};

export default MenuItem;