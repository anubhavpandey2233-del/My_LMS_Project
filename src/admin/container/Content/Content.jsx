import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../../redux/slice/category.slice';
import { Form, Formik } from 'formik';
import { fetchSection } from '../../../redux/slice/section.slice';
import { mixed, number, object, string } from 'yup';
import TextBox from '../../../container/TextBox';
import { useGetAllCourseQuery } from '../../../redux/api/course.api';
import FileUpload from '../../../container/FileUpload';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useAddContentMutation, useDeleteContentMutation, useEditContentMutation, useGetAllContentQuery } from '../../../redux/api/content.api';
import { IMAGE_URL } from '../../../utills/url';

function Content(props) {

    const [rtkUpdate, setRtkUpdate] = useState({})

    const categoryData = useSelector((state) => state.category)
    console.log(categoryData);

    const sectionData = useSelector(state => state.section)
    console.log(sectionData);

    // -------------------------------------------- RTK Query Start -----------------------------------

    let { data, isError, isLoading } = useGetAllCourseQuery()
    console.log("RTK Query", data?.data);

    const {
        data: contentData,
        isError: contentError,
        isLoading: contentLoading
    } = useGetAllContentQuery();


    console.log("FULL CONTENT QUERY:", contentData);
    console.log("RTK Content Query:", contentData?.data);
    console.log("CONTENT ERROR:", contentError);
    console.log("CONTENT LOADING:", contentLoading);

    const [addContentData] = useAddContentMutation()
    const [deleteContentData] = useDeleteContentMutation()
    const [updateContentData]=useEditContentMutation()



    // -------------------------------------------- RTK Query End -----------------------------------

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategory())
        dispatch(fetchSection())
    }, [])

    let contentSchema = object({
        category_id: string().required("Please select category"),
        course_id: string().required("Please select course"),
        section_id: string().required("Please select section"),
        type: string().required("Please select type"),
        name: string().required("Please enter name..."),
        order: number().required("Please enter order..."),
        description: string().required("Please enter descrtiption..."),

        content_file: mixed()
            .required("Please select image")

    })


    const columns = [
        {
            field: 'category_id',
            headerName: 'Category',
            width: 90,
            renderCell: (params) => (
                categoryData?.category?.find(
                    (v) => v?._id === params?.row?.category_id
                )?.name
            )
        },

        {
            field: 'course_id',
            headerName: 'Course',
            width: 90,
            renderCell: (params) => (
                data?.data?.find(
                    (v) => v?._id === params?.row?.course_id
                )?.name
            )
        },

        {
            field: 'section_id',
            headerName: 'Section',
            width: 90,
            renderCell: (params) => (
                sectionData?.section?.find(
                    (v) => v?._id === params?.row?.section_id
                )?.name
            )
        },

        {
            field: 'type',
            headerName: 'Type',
            width: 150,
        },

        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },

        {
            field: 'order',
            headerName: 'Order',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150
        },

        {
            field: 'content_file',
            headerName: 'File',
            width: 160,
            renderCell: (params) => (
                <img
                    src={IMAGE_URL + params?.row?.content_file}
                    width='50px'
                    height='50px'
                    alt="content"
                />
            )
        },

        {
            field: 'Action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteContentData(params?.row)}
                    >
                        <DeleteIcon />
                    </IconButton>

                    <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(params?.row)}
                    >
                        <EditIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const handleEdit = (data) => (

        setRtkUpdate(data)


    )

    const Type = [
        { value: '', label: 'Select Type' },
        { value: 'Free', label: 'Free' },
        { value: 'Paid', label: 'Paid' },

    ]

    return (
        <Formik
            initialValues={Object.keys(rtkUpdate).length > 0 ? rtkUpdate : {
                category_id: "",
                course_id: "",
                section_id: "",
                type: "",
                name: "",
                order: "",
                description: "",
                content_file: null,
            }}
            enableReinitialize={true}
            validationSchema={contentSchema}

            onSubmit={(values, { resetForm }) => {

                console.log("ppppppp", values);

                if (Object.keys(rtkUpdate).length == 0) {

                    addContentData(values)

                } else {

                    updateContentData(values)
                    setRtkUpdate({})
                }

                resetForm();
            }}
        >

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

                            <TextBox
                                name="course_id"
                                label="Course"
                                select
                                categoryData={data?.data}
                            />

                            <TextBox
                                name="section_id"
                                label="Section"
                                select
                                categoryData={sectionData?.section}
                            />

                            <TextBox
                                name="type"
                                Type={Type}
                                type="text"
                                select label="Type"
                            />

                            <TextBox
                                name="name"
                                type="text"
                                label="Course"
                            />

                            <TextBox
                                name="order"
                                type="number"
                                label="Order"
                            />

                            <TextBox
                                name="description"
                                type="text"
                                label="description"
                            />

                            <FileUpload
                                name="content_file"
                                type="file"
                                multiple={false}
                            />

                            <button type="submit">
                                Submit
                            </button>

                        </Form>

                        <DataGrid
                            rows={contentData?.data}
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
    );
}

export default Content;