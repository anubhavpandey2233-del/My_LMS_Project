import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { object, string } from 'yup';
import { useFormik } from 'formik';
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


function Category(props) {

    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(null);
    const [search, setSearch] = useState()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const categoryData = useSelector((state) => state.category)

    console.log(categoryData);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    let categorySchema = object({
        name: string().required("Please enter name..."),
        description: string().required("Please enter descrtiption...")
    })


    // const columns = [
    //     { field: 'name', headerName: 'Name', width: 130 },
    //     { field: 'description', headerName: 'Description', width: 130 },
    //     {
    //         headerName: 'Action',
    //         renderCell: (params) => (
    //             <>
    //                 <IconButton aria-label="delete" onClick={() => dispatch(deleteCategory(params.row._id))}>
    //                     <DeleteIcon />
    //                 </IconButton>

    //                 <IconButton aria-label="delete" onClick={() => dispatch(updateCategory(params.row._id))}>
    //                     <EditIcon />
    //                 </IconButton>
    //             </>
    //         )
    //     }

    // ]


    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            if (update === null) {
                dispatch(addCategory(values));
            } else {
                dispatch(updateCategory(values))
                setUpdate(null)
            }
            handleClose()

            resetForm()


        },
    });
    console.log(formik.errors);

    //Destructuring
    const { handleSubmit, touched, handleChange, handleBlur, errors, setValues, values } = formik

    const handleEdit = (row) => {
        handleClickOpen()
        setValues(row)

        setUpdate(row._id)
    }

    console.log(update);

    const searchByName = () => {

        if(search){

        
        dispatch(searchCategory(search))

        }else{
            dispatch(fetchCategory())
        }


    }

    // const paginationModel = { page: 0, pageSize: 5 };

    return (

        <Box>
            <h2>Category Admin</h2>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} sx={{ mr: 2 }}>
                    Add Category
                </Button>

                {/* <input type="text"
                    placeholder='Search Name'
                    

                /> */}

                                    

                <TextField
                    id="outlined-multiline-flexible"
                    label="Search"
                    multiline
                    maxRows={4}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button variant="outlined" sx={{ ml: 2 }} onClick={searchByName}>
                    Search
                </Button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent>

                        <form onSubmit={handleSubmit} id="subscription-form">
                            <TextField
                                error={errors.name && touched.name}
                                margin="normal"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                value={values.name}
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                helperText={errors.name && touched.name ? errors.name : ''}
                            />
                            <TextField
                                error={errors.description && touched.description}
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
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
                <Table sx={{ minWidth: 650,mt:5 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoryData.category.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="right">
                                    <>
                                        <IconButton aria-label="delete" onClick={() => dispatch(deleteCategory(row))}>
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


            {/* <DataGrid
                rows={categoryData.category}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowId={(row) => row._id}
                sx={{ border: 0 }}
            /> */}
        </Box>
    );
}

export default Category;