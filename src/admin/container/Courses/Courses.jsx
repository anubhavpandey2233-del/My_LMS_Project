import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { array, mixed, object, string } from 'yup';
import TextBox from '../../../container/TextBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from '../../../container/FileUpload';
import { addCourse, deleteCourse, fetchCourses, searchCourse } from '../../../redux/slice/course.slice';
import { IMAGE_URL } from '../../../utills/url';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCategory } from '../../../redux/slice/category.slice';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Courses(props) {

    const [search, setSearch] = useState()

    const courseData = useSelector((state) => state.course)
    console.log(courseData);

    const categoryData = useSelector((state) => state.category)
    console.log(categoryData);


    const dispatch = useDispatch()


    let yupSchema = object({
        category_id: string().required("Please select category"),
        name: string().required("Please enter course name"),
        description: string().required(),
        fees: string().required(),

        course_img: mixed()
            .test("course_img", "Plese select only .png,.jpg,jpeg files", function (val) {
                const fileType = ["image/jpg", "image/jpeg", "image/png"]

                console.log(val);


                return val?.every((v) => fileType.includes(v.type))



            })
            .test("course_img", "Plese select files under 2MB", function (val) {
                return val?.every((v) => v.size < 2 * 1024 * 1024)
            }),

    })

    useEffect(() => {
        dispatch(fetchCourses())
        dispatch(fetchCategory())
    }, [])


    const searchByName = () => {
        if (search) {
            dispatch(searchCourse(search))
        } else {
            dispatch(fetchCourses())
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    category_id: "",
                    name: "",
                    description: "",
                    fees: "",
                    course_img: [],
                }}
                validationSchema={yupSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log("SUBMIT VALUES:", values);
                    dispatch(addCourse(values));
                    resetForm();
                }}
            >


                {/* <TextField
                    id="outlined-multiline-flexible"
                    label="Search"
                    multiline
                    maxRows={4}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button variant="outlined" sx={{ ml: 2 }} onClick={searchByName}>
                    Search
                </Button> */}

                <Form enctype="multipart/form-data">
                    <TextBox
                        name="category_id"
                        label="Category"
                        select
                        categoryData={categoryData?.category}
                    />
                    <TextBox name="name" type="text" label="Course" />
                    <TextBox name="description" type="text" label="description" />
                    <TextBox name="fees" type="text" label="Fees" />
                    <FileUpload name="course_img" type="file" multiple={true} />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr.No</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Fees</TableCell>
                            <TableCell align="right">File</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courseData?.course?.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {i + 1}
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        categoryData?.category?.find((v) => v?._id === row?.category_id)?.name
                                    }
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.fees}</TableCell>
                                <TableCell align="center">
                                    {
                                        row.course_img.map((v) => (
                                            <img src={IMAGE_URL + v} width={'50px'} height={'50px'} />
                                        ))
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    <>
                                        <IconButton aria-label="delete" onClick={() => dispatch(deleteCourse(row))}>
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton aria-label="delete">
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Courses;