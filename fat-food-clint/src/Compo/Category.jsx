import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import Slide1 from '../../public/assets/home/slide1.jpg'
import Slide2 from '../../public/assets/home/slide2.jpg'
import Slide3 from '../../public/assets/home/slide3.jpg'
import Slide4 from '../../public/assets/home/slide4.jpg'
import Slide5 from '../../public/assets/home/slide5.jpg'
import SectionTitle from './SectionTitle';



const Category = () => {
    return (
        <section>
            <SectionTitle
                text={'10.00am to 11.00pm'}
                title={'Order Online'}
            >

            </SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>

                    <img src={Slide1} alt="Slide one" />

                </SwiperSlide>
                <SwiperSlide>

                    <img src={Slide2} alt="Slide one" />

                </SwiperSlide>
                <SwiperSlide>

                    <img src={Slide3} alt="Slide one" />

                </SwiperSlide>
                <SwiperSlide>

                    <img src={Slide4} alt="Slide one" />

                </SwiperSlide>
                <SwiperSlide>

                    <img src={Slide5} alt="Slide one" />

                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;