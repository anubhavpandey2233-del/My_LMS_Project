import React, { useEffect } from 'react';
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
import { fetchCourses } from '../../../redux/slice/course.slice';
import { IMAGE_URL } from '../../../utills/url';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCategory } from '../../../redux/slice/category.slice';

function Courses(props) {

    const courseData = useSelector((state) => state.course)
    console.log(courseData);

    const categoryData = useSelector((state) => state.category)
    console.log(categoryData);


    const dispatch = useDispatch()


    let yupSchema = object({
        category: string().required(),
        course: string().required(),
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

    return (
        <div>
            <Formik
                initialValues={{
                    category: '',
                    course: '',
                    description: '',
                    fees: '',
                    course_img: [],

                }}
                validationSchema={yupSchema}
                onSubmit={(values, actions) => {
                    console.log(values);

                }}
            >
                <Form>
                    <TextBox name="category" label="category" select categoryData={categoryData?.category} />
                    <TextBox name="course" type="text" label="course" />
                    <TextBox name="description" type="text" label="description" />
                    <TextBox name="fees" type="text" label="description" />
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
                                <TableCell align="right">{ }</TableCell>
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
                                        <IconButton aria-label="delete">
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