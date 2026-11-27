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
import { useAddCourseMutation, useDeleteCourseMutation, useEditCourseMutation, useGetAllCourseQuery } from '../../../redux/api/course.api';


function Courses(props) {

    const [search, setSearch] = useState()
    const [edit, setEdit] = useState(null)
    const [rtkUpdate, setRtkUpdate] = useState({})

    // const courseData = useSelector((state) => state.course)
    // console.log(courseData);

    const categoryData = useSelector((state) => state.category)
    console.log(categoryData);


    const dispatch = useDispatch()


    // -------------------------------------------- RTK Query Start-----------------------------------
    let { data, isError, isLoading } = useGetAllCourseQuery()
    console.log("RTK Query", data?.data);

    const [addCourseData] = useAddCourseMutation()
    console.log("addCourseData", addCourseData);

    const [deleteCourseData] = useDeleteCourseMutation()
    console.log("deleteCourseData", deleteCourseData);

    const [editCourseData] = useEditCourseMutation();
    console.log("editCourseData", editCourseData);


    // --------------------------------------------RTK Query End-----------------------------------
    let yupSchema = object({
        category_id: string(),
        name: string().required("Please enter course name"),
        description: string().required(),
        fees: string().required(),
        level: string().required(),
        language: string().required(),

        content_file: mixed()
            .test("content_file", "Plese select only .png,.jpg,jpeg files", function (val) {

                const fileType = ["image/jpg", "image/jpeg", "image/png"]

                let flag = true

                val?.map((v) => {
                    if (typeof v === 'string') {
                        flag = false
                    }
                })

                if (flag) {
                    if (Array.isArray(val)) {
                        return val?.every((v) => fileType.includes(v.type))
                    } else {
                        return !val || fileType.includes(val.type)
                    }
                } else {
                    return true
                }
            })
            .test("content_file", "Plese select files under 2MB", function (val) {

                let flag = true

                val?.map((v) => {
                    if (typeof v === 'string') {
                        flag = false
                    }
                })

                if (flag) {
                    if (Array.isArray(val)) {
                        return val?.every((v) => v.size < 2 * 1024 * 1024)
                    } else {
                        return !val || val.size < 2 * 1024 * 1024
                    }
                } else {
                    return true
                }
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

    // const handleEdit = (row, fd) => {
    //     console.log(row);
    //     console.log(fd);

    //     let editData = courseData.course.find((v) => v._id === row._id)
    //     console.log(editData);

    //     fd.setValues(editData)

    //     setEdit(row)
    // }




    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 90,
            renderCell: (params) => (
                data?.data?.find((v) => v?._id === params?.row?.category_id)?.name
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
            renderCell: (params) => {
                params?.row?.course_img?.map((v, index) => {

                    if (typeof v === 'object') {
                     return   <img
                            key={index}
                            src={URL.createObjectURL(v)}
                            width="50px"
                            height="50px"
                            alt="course"
                        />
                    } else {
                        return <img
                            key={index}
                            src={IMAGE_URL+v}
                            width="50px"
                            height="50px"
                            alt="course"
                        />
                    }


                })
            }

        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => deleteCourseData(params?.row)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params?.row)}>
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

    const selectLanguage = [
        { value: '', label: 'Select Language' },
        { value: 'English', label: 'English' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Gujarati', label: 'Gujarati' }

    ]

    const handleEdit = (data) => (

        setRtkUpdate(data)


    )

    console.log("rtkUpdate", rtkUpdate, Object.keys(rtkUpdate).length == 0);



    return (
        <div>
            <Formik
                initialValues={Object.keys(rtkUpdate).length > 0 ? rtkUpdate : {
                    category_id: "",
                    name: "",
                    description: "",
                    fees: "",
                    level: "",
                    language: "",
                    course_img: [],
                }}
                enableReinitialize={true}
                validationSchema={yupSchema}
                onSubmit={(values, { resetForm }) => {
                    // console.log("SUBMIT VALUES:", values);
                    // dispatch(addCourse(values));
                    // resetForm();

                    console.log("ppppppp", values);


                    if (Object.keys(rtkUpdate).length == 0) {
                        // dispatch(addCourse(values));
                        addCourseData(values)
                    } else {
                        // dispatch(updateCourse(values))
                        // setEdit(null)

                        editCourseData(values)
                        setRtkUpdate({})
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
                                <TextBox name="level" type="text" selectLevel={selectLevel} select />
                                <TextBox name="language" type="text" selectLanguage={selectLanguage} select />
                                <FileUpload name="course_img" type="file" multiple={true} />
                                <button type="submit">Submit</button>
                            </Form>

                            <DataGrid
                                rows={data?.data}
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