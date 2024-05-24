import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BannerImage1 from '../../public/assets/home/01.jpg'
import BannerImage2 from '../../public/assets/home/02.jpg'
import BannerImage3 from '../../public/assets/home/03.png'
import BannerImage4 from '../../public/assets/home/04.jpg'
import BannerImage5 from '../../public/assets/home/05.png'
import BannerImage6 from '../../public/assets/home/06.png'

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={BannerImage1} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={BannerImage2} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={BannerImage3} />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src={BannerImage4} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={BannerImage5} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={BannerImage6} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default Banner;