import { Parallax } from 'react-parallax';

const Cover = ({ img, title, text }) => {



    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero h-[500px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="py-10 px-40 hero-content text-center text-neutral-content" style={{ backgroundColor: 'rgba(21, 21, 21, 0.6)' }}>
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                        <p className="mb-5">{text}</p>
                        <button className="btn btn-outline border-0 border-b-4 text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;