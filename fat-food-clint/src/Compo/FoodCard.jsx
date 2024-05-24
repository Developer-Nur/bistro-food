
const FoodCard = ({ items }) => {

    const { name, recipe, price, image } = items || {}
    return (
        <div className="relative  card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="Shoes" />
                <figcaption className="absolute top-4 left-4 py-1 px-2 rounded-lg bg-orange-400 text-black">${price}</figcaption>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline border-0 border-b-4">Add to card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;