import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem } from '@mui/material';
import { array, mixed, object, string } from 'yup';
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, fetchCategory, searchCategory, updateCategory } from '../../../redux/slice/category.slice';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { fetchCourses } from '../../../redux/slice/course.slice';
import { addSection, deleteSection, fetchCatToCou, fetchSection, updateSection } from '../../../redux/slice/section.slice';

function Section(props) {

    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(null)

    const categoryData = useSelector(state => state.category)
    console.log(categoryData);

    const courseData = useSelector(state => state.course)
    console.log(courseData);

    const sectionData = useSelector(state => state.section)
    console.log(sectionData);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategory())
        dispatch(fetchCourses())
        dispatch(fetchSection())
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let sectionSchema = object({
        category_id: string().required("Please select category"),
        course_id: string().required("Please select course"),
        name: string().required("Please enter name..."),
        description: string().required("Please enter descrtiption..."),

    })

    const formik = useFormik({
        initialValues: {
            category_id: '',
            course_id: '',
            name: '',
            description: ''
        },
        validationSchema: sectionSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            if (edit === null) {
                dispatch(addSection(values))

            } else {

                dispatch(updateSection(values))
                setEdit(null)
            }


            handleClose()
            resetForm()


        },
    });
    console.log(formik.errors);
    const { handleSubmit, touched, handleChange, handleBlur, errors, setValues, setFieldValue, values, setFieldTouched } = formik

    const handleEdit = async (row) => {
        await dispatch(fetchCatToCou(row.category_id))
        handleClickOpen()
        setValues(row)
        // setValues(sectionData?.courseCat?.name)
        setEdit(row._id)

    }

    const handleCategory = (a) => {
        console.log("aaaaaaaaaaaaaaaaa", a);


        dispatch(fetchCatToCou(a))
    }

    console.log("okoko", values, sectionData?.courseCat);

    return (
        <Box>
            <h2>Section</h2>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} sx={{ mr: 2 }}>
                    Add Section
                </Button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent>

                        <form onSubmit={handleSubmit} id="subscription-form">
                            <TextField
                                error={errors.category_id && touched.category_id}
                                margin="normal"
                                id="category_id"
                                name="category_id"
                                label="category_id"
                                select
                                value={values.category_id}
                                fullWidth
                                onChange={(e) => { handleChange(e); handleCategory(e.target.value) }}
                                onBlur={handleBlur}
                                variant="standard"
                                helperText={errors.category_id && touched.category_id ? errors.category_id : ''}
                            >
                                {categoryData.category?.map((v) => (
                                    <MenuItem key={v._id} value={v._id}>
                                        {v.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                error={errors.course_id && touched.course_id}
                                margin="dense"
                                id="course_id"
                                name="course_id"
                                label="course_id"
                                select
                                value={values.course_id}
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                multiline
                                rows={5}
                                helperText={errors.course_id && touched.course_id ? errors.course_id : ''}
                                setValues={sectionData?.courseCat?.name}
                            >
                                {
                                    sectionData?.courseCat?.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>
                                            {v.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                            <TextField
                                error={errors.name && touched.name}
                                margin="dense"
                                id="name"
                                name="name"
                                label="name"
                                type="text"
                                value={values.name}
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                multiline
                                rows={5}
                                helperText={errors.name && touched.name ? errors.name : ''}
                            />

                            <TextField
                                error={errors.description && touched.description}
                                margin="dense"
                                id="description"
                                name="description"
                                label="description"
                                type="text"
                                value={values.description}
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                multiline
                                rows={5}
                                helperText={errors.description && touched.description ? errors.description : ''}
                            />



                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" form="subscription-form">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, mt: 5 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr.No</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Course</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sectionData?.section.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{i + 1}</TableCell>
                                <TableCell align="center">
                                    {categoryData.category?.find((v) => v._id === row.category_id
                                    )?.name}
                                </TableCell>

                                <TableCell align="center">

                                    {
                                        courseData?.course?.find((v) => v._id === row.course_id
                                        )?.name
                                    }

                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.description}</TableCell>

                                <TableCell align="right">
                                    <>
                                        <IconButton aria-label="delete" onClick={() => dispatch(deleteSection(row))}>
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton aria-label="delete" onClick={() => handleEdit(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>




        </Box>
    );
}

export default Section;