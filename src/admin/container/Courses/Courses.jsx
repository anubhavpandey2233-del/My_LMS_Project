import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { array, object, string } from 'yup';
import { useFormik } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Form from 'react-bootstrap/Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../../redux/slice/category.slice';




const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


function Course(props) {

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
        name: string()
            .required("Please enter name...")
            .matches(/^[a-zA-Z ]+$/, "Please enter valid name"),

        duration: string()
            .required("Please enter duration..."),

        fees: string()
            .required("Please enter fees"),

        description: string()
            .required("Please enter descrtiption..."),

        // .min(5,"Minimu 5 letter required")
        // .max(20,"Maximum 20 letter you can write")

        profileImg: array()
            .test("profileImg", "Plese select only .png,.jpg,jpeg files", function (val) {
                const fileType = ["image/jpg", "image/jpeg", "image/png"]

                return val.every((v) => fileType.includes(v.type))
                console.log(val);

            })
            .test("profileImg", "Plese select files under 2MB", function (val) {
                return val.every((v) => v.size < 2 * 1024 * 1024)
            }),
        cat: string()
            .required("Please select any category")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            duration: '',
            fees: '',
            description: '',
            profileImg: [],
        },
        validationSchema: categorySchema,
        onSubmit: values => {
            console.log(values);

        },
    });
    console.log(formik.errors);

    //Destructuring
    const { handleSubmit, touched, handleChange, handleBlur, errors, values, setFieldValue, setFieldTouched } = formik

    return (

        <Box>
            <h2 className='my-4'>Formik Yup Validation</h2>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Course
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Formik</DialogTitle>
                    <DialogContent>

                        <TextField
                            error={errors.cat && touched.cat}
                            id="standard-select-currency-native"
                            select
                            name="cat"
                            label="select"
                            type="text"
                            defaultValue="EUR"
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.cat && touched.cat ? errors.cat : ''}
                            variant="standard"
                        >
                            <option value="">--Select Category--</option>
                            {categoryData.category.map((option, _id) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>


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
                                error={errors.duration && touched.duration}
                                margin="normal"
                                id="duration"
                                name="duration"
                                label="duration"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                helperText={errors.duration && touched.duration ? errors.duration : ''}
                            />

                            <TextField
                                error={errors.fees && touched.fees}
                                margin="normal"
                                id="fees"
                                name="fees"
                                label="fees"
                                type="number"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                helperText={errors.fees && touched.fees ? errors.fees : ''}
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





                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    name='profileImg'
                                    type="file"
                                    onChange={(event) => {
                                        const files = Array.from(event.target.files)
                                        setFieldValue("profileImg", files)
                                        console.log(files);

                                        setFieldTouched("profileImg", true, false)

                                    }
                                    }
                                    multiple
                                />
                            </Button>
                            <p className='error'>
                                {
                                    errors.profileImg && touched.profileImg ? errors.profileImg : ''
                                }
                            </p>
                            {
                                values.profileImg?.map((v) => (
                                    <img src={URL.createObjectURL(v)} alt="" width={"100px"} height={"100px"} />
                                ))
                            }



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
        </Box>
    );
}

export default Course;