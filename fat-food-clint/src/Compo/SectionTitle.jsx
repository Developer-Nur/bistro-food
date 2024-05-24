
const SectionTitle = ({text, title}) => {
    return (
        <div className="mx-auto text-center w-4/12 my-10">
            <p className="text-orange-600">---{text}---</p>
            <h2 className="text-3xl text-black border-y-4 py-4">{title}</h2>
        </div>
    );
};

export default SectionTitle;