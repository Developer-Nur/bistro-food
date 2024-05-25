import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Testimonial = () => {

    const [reviews, setReviews] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])


    return (
        <section>
            <SectionTitle
                text="Testimonial"
                title="What our customer says"
            >
            </SectionTitle>


            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews && reviews.map((items, index) => <SwiperSlide
                        key={index} >

                        <div className="px-20">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={items.rating}
                                readOnly
                            />
                            
                            <p>{items.details}</p>
                            <h3>{items.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>

        </section>
    );
};

export default Testimonial;