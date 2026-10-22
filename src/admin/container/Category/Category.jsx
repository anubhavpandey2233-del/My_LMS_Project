import React, { useEffect } from 'react';
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
import { addCategory, deleteCategory, fetchCategory, updateCategory } from '../../../redux/slice/category.slice';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Category(props) {

    const [open, setOpen] = React.useState(false);

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

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            headerName: 'Action',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={()=>dispatch(deleteCategory(params.row._id))}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={()=>dispatch(updateCategory(params.row._id))}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }

    ]

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: values => {
            console.log(values);

            dispatch(addCategory(values));

            handleClose()

        },
    });
    console.log(formik.errors);

    //Destructuring
    const { handleSubmit, touched, handleChange, handleBlur, errors } = formik

    const paginationModel = { page: 0, pageSize: 5 };

    return (

        <Box>
            <h2>Category Admin</h2>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category
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


            <DataGrid
                rows={categoryData.category}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                  getRowId={(row) => row._id} 
                sx={{ border: 0 }}
            />
        </Box>
    );
}

export default Category;