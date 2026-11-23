import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { mixed, object, string } from 'yup';
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
import { addCourse, deleteCourse, fetchCourses, searchCourse, updateCourse } from '../../../redux/slice/course.slice';
import { IMAGE_URL } from '../../../utills/url';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCategory } from '../../../redux/slice/category.slice';
import { DataGrid } from '@mui/x-data-grid';


function Courses(props) {

    const [search, setSearch] = useState()
    const [edit, setEdit] = useState(null)

    const courseData = useSelector((state) => state.course)
    console.log(courseData);

    const categoryData = useSelector((state) => state.category)
    console.log(categoryData);


    const dispatch = useDispatch()


    let yupSchema = object({
        category_id: string(),
        name: string().required("Please enter course name"),
        description: string().required(),
        fees: string().required(),
        level:string().required(),
        language:string().required(),

        course_img: mixed()
            .test("course_img", "Plese select only .png,.jpg,jpeg files", function (val) {
                const fileType = ["image/jpg", "image/jpeg", "image/png"]

                let flag = true
                val?.map((v) => {
                    if (typeof v === 'string') {
                        flag = false
                    }
                })

                if (flag) {
                    return val?.every((v) => fileType.includes(v.type))
                } else {
                    return true
                }



            })
            .test("course_img", "Plese select files under 2MB", function (val) {


                let flag = true

                val?.map((v) => {
                    if (typeof v === 'string') {
                        flag = false
                    }
                })

                if (flag) {
                    return val?.every((v) => v.size < 2 * 1024 * 1024)
                } else {
                    return true
                }




            })


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

    const handleEdit = (row, fd) => {
        console.log(row);
        console.log(fd);

        let editData = courseData.course.find((v) => v._id === row._id)
        console.log(editData);

        fd.setValues(editData)

        setEdit(row)
    }

    console.log(edit);


    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 90,
            renderCell: (params) => (
                categoryData?.category?.find((v) => v?._id === params?.row?.category_id)?.name
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150
        },
        {
            field: 'fees',
            headerName: 'Fees',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'course_img',
            headerName: 'File',
            width: 160,
            renderCell: (params) => (
                <img src={IMAGE_URL + params?.row?.course_img} width={'50px'} height={'50px'} />
            )
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => dispatch(deleteCourse(params?.row))}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params?.row, fd)}>
                        <EditIcon />
                    </IconButton>
                </>
            )

        },
    ];


     const selectLevel = [
        { value: '', label: 'Select level' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermidiate', label: 'Intermidiate' },
         { value: 'advance', label: 'Advance' }

    ]

    return (
        <div>
            <Formik
                initialValues={{
                    category_id: "",
                    name: "",
                    description: "",
                    fees: "",
                    level:"",
                    language:"",
                    course_img: [],
                }}
                validationSchema={yupSchema}
                onSubmit={(values, { resetForm }) => {
                    // console.log("SUBMIT VALUES:", values);
                    // dispatch(addCourse(values));
                    // resetForm();

                    console.log("ppppppp", values);


                    if (edit === null) {
                        dispatch(addCourse(values));
                    } else {
                        dispatch(updateCourse(values))
                        setEdit(null)
                    }
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

                {
                    (fd) => (
                        <>
                            <Form encType="multipart/form-data">
                                <TextBox
                                    name="category_id"
                                    label="Category"
                                    select
                                    categoryData={categoryData?.category}
                                />
                                <TextBox name="name" type="text" label="Course" />
                                <TextBox name="description" type="text" label="description" />
                                <TextBox name="fees" type="text" label="Fees" />
                                <TextBox name="level" type="text" selectLevel={selectLevel}  select/>
                                <TextBox name="language" type="text" label="Language"  select/>
                                <FileUpload name="course_img" type="file" multiple={true} />
                                <button type="submit">Submit</button>
                            </Form>k


                            {/* <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sr.No</TableCell>
                                            <TableCell align="left">Category</TableCell>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Description</TableCell>
                                            <TableCell align="left">Fees</TableCell>
                                            <TableCell align="center">File</TableCell>
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
                                                <TableCell align="left">
                                                    {
                                                        categoryData?.category?.find((v) => v?._id === row?.category_id)?.name
                                                    }
                                                </TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.description}</TableCell>
                                                <TableCell align="left">{row.fees}</TableCell>
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
                                                        <IconButton aria-label="delete" onClick={() => handleEdit(row, fd)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> */}


                            <DataGrid
                                rows={courseData?.course}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                getRowId={(row) => row._id}
                                disableRowSelectionOnClick
                            />


                        </>
                    )
                }


            </Formik>




        </div>
    );
}

export default Courses;