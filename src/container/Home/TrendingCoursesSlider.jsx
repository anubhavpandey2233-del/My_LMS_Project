import React, { useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ThemeContext } from '../../context/reducer/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/slice/course.slice';
import { IMAGE_URL } from '../../utills/url';

function TrendingCoursesSlider(props) {

  const theme = useContext(ThemeContext)
    console.log(theme);

    const courseData = useSelector((state) => state.course)
    console.log(courseData);

    const dispatch=useDispatch()

      useEffect(() => {
            dispatch(fetchCourses())
        }, [])

    return (
        <Swiper
       
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >

            {
                courseData?.course.map(v=>(
                     <SwiperSlide>
                <div>
                    <div className={theme.theme=='dark'?`bodyBG action-trigger-hover border`:"card action-trigger-hover border"}>
                        {/* Image */}
                        <img src={IMAGE_URL + v.course_img?.[0]} className="card-img-top" alt="course image" />
                        {/* Ribbon */}
                        <div className="ribbon mt-3"><span>${v.fees}</span></div>
                        {/* Card body */}
                        <div className="card-body pb-0">
                            {/* Badge and favorite */}
                            <div className="d-flex justify-content-between mb-3">
                                <span className="hstack gap-2">
                                    <a href="#" className="badge bg-primary bg-opacity-10 text-primary">{v.level}</a>
                                </span>
                                <a href="#" className="h6 fw-light mb-0"><i className="far fa-bookmark" /></a>
                            </div>
                            {/* Title */}
                            <h5 className="card-title"><a href="#">{v.name}</a></h5>
                            {/* Rating */}
                            <div className="d-flex justify-content-between mb-2">
                                <div className="hstack gap-2">
                                    <p className="text-warning m-0">4.5<i className="fas fa-star text-warning ms-1" /></p>
                                    <span className="small">(6500)</span>
                                </div>
                                <div className="hstack gap-2">
                                    <p className="h6 fw-light mb-0 m-0">6500</p>
                                    <span className="small">(Student)</span>
                                </div>
                            </div>
                            {/* Time */}
                            <div className="hstack gap-3">
                                <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />6h 56m</span>
                                <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />82 lectures</span>
                            </div>
                        </div>
                        {/* Card footer */}
                        <div className={theme.theme=='dark'?`bodyBG card-footer pt-0`:"card-footer pt-0"}>
                            <hr />
                            {/* Avatar and Price */}
                            <div className="d-flex justify-content-between align-items-center">
                                {/* Avatar */}
                                <div className="d-flex align-items-center">
                                    <div className="avatar avatar-sm">
                                        <img className="avatar-img rounded-1" src="assets/images/avatar/10.jpg" alt="avatar" />
                                    </div>
                                    <p className="mb-0 ms-2"><a href="#" className="h6 fw-light mb-0">Larry Lawson</a></p>
                                </div>
                                {/* Price */}
                                <div>
                                    <h4 className="text-success mb-0 item-show">Free</h4>
                                    <a href="#" className="btn-sm btn-success-soft item-show-hover"><i className="fas fa-shopping-cart me-2" />Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
                ))
            }
           
          

        </Swiper>
    );
}

export default TrendingCoursesSlider;