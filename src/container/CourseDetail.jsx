
import React, { useContext, useEffect } from "react";
import { fetchCourses } from "../redux/slice/course.slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IMAGE_URL } from "../utills/url";
import { fetchSection } from "../redux/slice/section.slice";
import Accordion from 'react-bootstrap/Accordion';
import { ThemeContext } from "../context/reducer/ThemeContext";
import { useGetAllContentQuery } from "../redux/api/content.api";


function CourseDetail() {
    const courseData = useSelector(state => state.course)
    console.log(courseData);

    const theme = useContext(ThemeContext)
    console.log("Themmmmeeeeeeeee");

    const sectionData = useSelector(state => state.section)
    console.log("sectionDatasectionData", sectionData.section);




    const { id } = useParams();

    const dispatch = useDispatch()

    const sData = sectionData?.section?.filter((v) => v.course_id === id)

    console.log(sData);

    useEffect(() => {
        dispatch(fetchCourses())
        dispatch(fetchSection())
    }, [])

    const selectedCourse = courseData?.course?.find(
        (v) => v._id === id
    );

    console.log("selectedCourse", selectedCourse);


    // -------------------------------RTK QUERY START----------------------------

    const { data: contentData } = useGetAllContentQuery()
    console.log("Content Data", contentData?.data);


    const cData = contentData?.data?.filter((v) => v.course_id === id)

    const selectedContent=contentData?.data?.find(v=>v.course_id===id)
    console.log("selectedContent",selectedContent);


    // -------------------------------RTK QUERY END----------------------------

    console.log("Selected Course:", selectedCourse);


    return (
        <main>levelExperienced

            {/* ================= HERO SECTION ================= */}
            <section className="bg-light py-5">
                <div className="container">
                    <div className="row align-items-center g-5">

                        {/* Course Information */}
                        <div className="col-lg-7">

                            <span className="badge bg-purple bg-opacity-10 text-purple mb-3">
                                {selectedCourse?.level}
                            </span>

                            <h1 className="display-5 fw-bold mb-3">
                                {selectedCourse?.name}
                            </h1>

                            <p className="lead  mb-4">
                                {selectedCourse?.description}
                            </p>

                            {/* Rating */}
                            <div className="d-flex align-items-center mb-4">

                                <span className="fw-bold me-2">
                                    4.5
                                </span>

                                <i className="fas fa-star text-warning" />
                                <i className="fas fa-star text-warning" />
                                <i className="fas fa-star text-warning" />
                                <i className="fas fa-star text-warning" />
                                <i className="far fa-star text-warning" />

                                <span className="text-muted ms-2">
                                    (125 Reviews)
                                </span>

                            </div>

                            {/* Course Info */}
                            <div className="d-flex flex-wrap gap-4">

                                <div>
                                    <i className="far fa-clock text-danger me-2" />
                                    <strong>Duration</strong>
                                    <div className="text-muted">
                                        {selectedCourse?.duration}
                                    </div>
                                </div>

                                <div>
                                    <i className="fas fa-video text-primary me-2" />
                                    <strong>Lectures</strong>
                                    <div className="text-muted">
                                        25 Lectures
                                    </div>
                                </div>

                                <div>
                                    <i className="fas fa-signal text-success me-2" />
                                    <strong>Level</strong>
                                    <div className="text-muted">
                                        All Level
                                    </div>
                                </div>

                            </div>

                        </div>


                        {/* Course Card */}
                        <div className="col-lg-5">

                            <div className={theme.theme == 'dark' ? `bodyBG card shadow border-0` : "card shadow border-0"}>

                                <img
                                    src={IMAGE_URL + selectedCourse?.course_img?.[0]}
                                    className="card-img-top"
                                    alt="Course"
                                    style={{
                                        height: "280px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body p-4">

                                    <div className="mb-3">



                                        <span className="fs-2 fw-bold">
                                            ${selectedCourse?.fees}
                                        </span>

                                    </div>

                                    <button className="btn btn-primary btn-lg w-100 mb-3">
                                        Enroll Now
                                    </button>

                                    <button className="btn btn-outline-primary w-100">
                                        <i className="far fa-heart me-2" />
                                        Add to Wishlist
                                    </button>

                                    {/* <hr className="my-4" /> */}

                                    {/* <h6 className="fw-bold mb-3">
                                    This course includes:
                                </h6>

                                <p className="mb-2">
                                    <i className="fas fa-video text-primary me-2" />
                                    25 Video Lectures
                                </p>

                                <p className="mb-2">
                                    <i className="fas fa-file-alt text-success me-2" />
                                    Downloadable Resources
                                </p>

                                <p className="mb-2">
                                    <i className="fas fa-infinity text-warning me-2" />
                                    Lifetime Access
                                </p>

                                <p className="mb-0">
                                    <i className="fas fa-certificate text-danger me-2" />
                                    Certificate of Completion
                                </p> */}

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>


            {/* ================= COURSE CONTENT ================= */}
            <section className="py-5">

                <div className="container">

                    <div className="row g-5">

                        {/* Main Content */}
                        <div className="col-lg-8">

                            {/* About Course */}
                            <div className="mb-5">

                                <h2 className="fw-bold mb-3">
                                    About This Course
                                </h2>

                                <p className="">
                                    {selectedCourse?.description}
                                </p>

                                {/* <p className="text-muted">
                            By the end of this course, you will be able
                            to create responsive websites and build
                            real-world web applications.
                        </p> */}

                            </div>


                            {/* What You Will Learn */}
                            <div className={theme.theme == 'dark' ? `bodyBG card border-0 shadow-sm mb-5` : "card border-0 shadow-sm mb-5"}>

                                <div className="card-body p-4">

                                    <h3 className="fw-bold mb-4">
                                        What You'll Learn
                                    </h3>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                HTML & CSS fundamentals
                                            </p>

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                Responsive web design
                                            </p>

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                JavaScript fundamentals
                                            </p>

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                DOM manipulation
                                            </p>

                                        </div>

                                        <div className="col-md-6">

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                Modern JavaScript
                                            </p>

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                API integration
                                            </p>

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                Real-world projects
                                            </p>

                                            <p>
                                                <i className="fas fa-check-circle text-success me-2" />
                                                Deployment basics
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Curriculum */}
                            <div>

                                <h2 className="fw-bold mb-4">
                                    Course Curriculum
                                </h2>

                                {
                                    sData?.map((v, i) => (


                                        <Accordion className={theme.theme === 'dark' ? `bodyBG` : ''}>
                                            <Accordion.Item eventKey={i} className={theme.theme === 'dark' ? `bodyBG` : ''}>

                                                <Accordion.Header className={theme.theme === 'dark' ? `bodyBG` : ''}>{v.name}</Accordion.Header>

                                                {/* {
                                                    cData?.map((v, i) => ( */}
                                                        <Accordion.Body className={theme.theme === 'dark' ? `bodyBG` : ''}>
                                                            {selectedContent?.name}
                                                        </Accordion.Body>
                                                    {/* ))
                                                } */}




                                            </Accordion.Item>

                                        </Accordion>


                                    ))

                                }

                            </div>

                        </div>


                        {/* Sidebar */}
                        {/* <div className="col-lg-4"> */}

                        {/* Instructor */}
                        {/* <div className="card shadow-sm border-0 mb-4">

                                <div className="card-body p-4">

                                    <h4 className="fw-bold mb-4">
                                        Instructor
                                    </h4>

                                    <div className="d-flex align-items-center">

                                        <img
                                            src="https://i.pravatar.cc/100?img=12"
                                            className="rounded-circle"
                                            width="65"
                                            height="65"
                                            alt="Instructor"
                                        />

                                        <div className="ms-3">

                                            <h6 className="fw-bold mb-1">
                                                John Smith
                                            </h6>

                                            <small className="text-muted">
                                                Web Development Instructor
                                            </small>

                                        </div>

                                    </div>

                                    <hr />

                                    <p className="text-muted mb-0">
                                        Experienced instructor with years of
                                        experience in web development and
                                        software engineering.
                                    </p>

                                </div>

                            </div> */}


                        {/* Course Features */}
                        {/* <div className="card shadow-sm border-0">

                                <div className="card-body p-4">

                                    <h4 className="fw-bold mb-4">
                                        Course Features
                                    </h4>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span>
                                            <i className="fas fa-book text-primary me-2" />
                                            Lectures
                                        </span>
                                        <span>25</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span>
                                            <i className="far fa-clock text-danger me-2" />
                                            Duration
                                        </span>
                                        <span>12h 56m</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span>
                                            <i className="fas fa-signal text-success me-2" />
                                            Level
                                        </span>
                                        <span>All Level</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span>
                                            <i className="fas fa-language text-warning me-2" />
                                            Language
                                        </span>
                                        <span>English</span>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <span>
                                            <i className="fas fa-certificate text-info me-2" />
                                            Certificate
                                        </span>
                                        <span>Yes</span>
                                    </div>

                                </div>

                            </div> */}

                        {/* </div> */}

                    </div>

                </div>

            </section>

        </main >
    );
}

export default CourseDetail;
