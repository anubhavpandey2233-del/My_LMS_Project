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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { IMAGE_URL } from '../../../utills/url';
import { fetchCatToCou } from '../../../redux/slice/section.slice';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';


// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//     {
//         id: 'category_ic',
//         numeric: false,
//         disablePadding: true,
//         label: 'Category',
//     },
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: true,
//         label: 'Name',
//     },
//     {
//         id: 'description',
//         numeric: false,
//         disablePadding: true,
//         label: 'Description',
//     },
//     {
//         id: 'file',
//         numeric: false,
//         disablePadding: true,
//         label: 'File',
//     },
//     {
//         id: 'Action',
//         numeric: false,
//         disablePadding: true,
//         label: 'Action',
//     },
// ];

// function EnhancedTableHead(props) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//         props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };

//     return (
//         <TableHead>
//             <TableRow>
//                 {/* <TableCell padding="checkbox">
//                     <Checkbox
//                         color="primary"
//                         indeterminate={numSelected > 0 && numSelected < rowCount}
//                         checked={rowCount > 0 && numSelected === rowCount}
//                         onChange={onSelectAllClick}
//                         slotProps={{
//                             input: { 'aria-label': 'select all desserts' },
//                         }}
//                     />
//                 </TableCell> */}
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={headCell.numeric ? 'right' : 'left'}
//                         padding={headCell.disablePadding ? 'none' : 'normal'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }

// EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

// EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//     const { numSelected } = props;
//     return (
//         <Toolbar
//             sx={[
//                 {
//                     pl: { sm: 2 },
//                     pr: { xs: 1, sm: 1 },
//                 },
//                 numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 },
//             ]}
//         >
//             {numSelected > 0 ? (
//                 <Typography
//                     variant="subtitle1"
//                     component="div"
//                     sx={{
//                         color: 'inherit',
//                         flex: '1 1 100%',
//                     }}
//                 >
//                     {numSelected} selected
//                 </Typography>
//             ) : (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     variant="h6"
//                     id="tableTitle"
//                     component="div"
//                 >
//                     Nutrition
//                 </Typography>
//             )}
//             {numSelected > 0 ? (
//                 <Tooltip title="Delete">
//                     <IconButton>
//                         <DeleteIcon />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Tooltip title="Filter list">
//                     <IconButton>
//                         <FilterListIcon />
//                     </IconButton>
//                 </Tooltip>
//             )}
//         </Toolbar>
//     );
// }

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };


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

    const handleCategory = (a) => {
        console.log("aaaaaaaaaaaaaaaaa", a);


        dispatch(fetchCatToCou(a))
    }


    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    let categorySchema = object({
        name: string().required("Please enter name..."),
        description: string().required("Please enter descrtiption..."),
        category_img: mixed()
            .test("profileImg", "Plese select only .png,.jpg,jpeg files", function (val) {
                const fileType = ["image/jpg", "image/jpeg", "image/png"]

                console.log(val.type);


                return val?.every((v) => fileType.includes(v.type))

                // return fileType?.includes(val?.type)
                // console.log(val);

            })
            .test("profileImg", "Plese select files under 2MB", function (val) {
                return val?.every((v) => v.size < 2 * 1024 * 1024)
            }),
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
            category_id: null,
            name: '',
            description: '',
            category_img: []
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            if (update === null) {
                dispatch(addCategory(values));
                console.log("updateupdateupdateupdateupdateupdate");

            } else {
                dispatch(updateCategory(values))
                setUpdate(null)
            }
            handleClose()

            resetForm()


        },
    });
    console.log(formik.errors);


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


    //Destructuring
    const { handleSubmit, touched, handleChange, handleBlur, errors, setValues, setFieldValue, values, setFieldTouched } = formik

    const handleEdit = (row) => {
        handleClickOpen()
        setValues(row)

        setUpdate(row._id)
    }

    console.log(update);

    const searchByName = () => {

        if (search) {

            dispatch(searchCategory(search))

        } else {
            dispatch(fetchCategory())
        }


    }


    const paginationModel = { page: 0, pageSize: 5 };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //         const newSelected = categoryData?.category?.map((n) => n.id);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };

    // const handleClick = (event, id) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }
    //     setSelected(newSelected);
    // };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    // const handleChangeDense = (event) => {
    //     setDense(event.target.checked);
    // };

    // // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryData?.category?.length) : 0;

    // const visibleRows = React.useMemo(
    //     () =>
    //         [...categoryData?.category]
    //             .sort(getComparator(order, orderBy))
    //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    //     [order, orderBy, page, rowsPerPage],
    // );


    const columns = [
        {
            field: 'parent_category_id', headerName: 'Parent Category', width: 200,
            renderCell: (params) => (
                categoryData?.category?.find((v) => v?._id === params?.row?.parent_category_id)?.name
            )
            // valueGetter: (value, row) => categoryData?.category?.find((v) => v?._id === row?.parent_category_id)?.name,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 350,
            editable: true,
        },
        {
            field: 'category_img',
            headerName: 'Images',
            width: 110,
            renderCell: (params) => (
                <img src={IMAGE_URL + params.row.category_img} width="50px" height="50px" />
            )
            // valueGetter: (value, row) => {
            //     row?.category_img?.map((v, index) => (
            //         <img
            //             key={index}
            //             src={IMAGE_URL + v}
            //             width="50px"
            //              
            //             alt={row?.name}
            //         />
            //     ))
            // },
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-label="delete"
                        onClick={() => dispatch(deleteCategory(params?.row))}
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

                        <form onSubmit={handleSubmit} id="subscription-form" enctype="multipart/form-data">

                            <TextField
                                // error={errors.category_id && touched.category_id}
                                margin="normal"
                                id="category_id"
                                name="category_id"
                                label="--Select Category--"
                                select
                                value={values.category_id}
                                fullWidth
                                defaultValue="null"
                                onChange={(e) => { handleChange(e); handleCategory(e.target.value) }}
                                onBlur={handleBlur}
                                variant="standard"
                            // helperText={errors.category_id && touched.category_id ? errors.category_id : ''}
                            >
                                <MenuItem value='null'>
                                    --Select Category--
                                </MenuItem>

                                {categoryData?.category?.map((v) => (
                                    <MenuItem key={v?._id} value={v?._id}>
                                        {v?.name}
                                    </MenuItem>
                                ))}
                            </TextField>

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

                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    name='category_img'
                                    type="file"
                                    onChange={(event) => {
                                        const files = Array.from(event.target.files)
                                        setFieldValue("category_img", files)
                                        console.log(event.target.files);

                                        setFieldTouched("category_img", true, false)

                                    }
                                    }
                                    multiple
                                />
                            </Button>
                            <p className='error'>
                                {
                                    errors.category_img && touched.category_img ? errors.category_img : ''
                                }
                            </p>

                            {/* {
                                <img src={values?.category_img ? URL.createObjectURL(values?.category_img[0]) : ''} alt="" width={"100px"} height={"100px"} />

                            } */}

                            {
                                values?.category_img ?

                                    values?.category_img.map((v) => (
                                        typeof v == 'object' ?
                                            <img src={URL.createObjectURL(v)} width={'50px'} height={'50px'} />
                                            :
                                            <img src={IMAGE_URL + v} width={'50px'} height={'50px'} />

                                    ))
                                    : null
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


            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, mt: 5 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Parent Category</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">File</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={categoryData?.category?.length}
                    />
                    <TableBody>
                        {visibleRows?.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                
                                <TableCell align="left">
                                    {
                                        categoryData?.category?.find((v) => v?._id === row?.parent_category_id)?.name
                                    }
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {row?.name}
                                </TableCell>

                                <TableCell align="left">
                                    {row?.description}
                                </TableCell>

                                <TableCell align="left">
                                    {row?.category_img?.map((v, index) => (
                                        <img
                                            key={index}
                                            src={IMAGE_URL + v}
                                            width="50px"
                                            height="50px"
                                            alt={row?.name}
                                        />
                                    ))}
                                </TableCell>

                                <TableCell align="left">
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => dispatch(deleteCategory(row))}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => handleEdit(row)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={categoryData.category.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}



            <DataGrid
                rows={categoryData.category}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}

                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowId={(row) => row._id}
                sx={{ border: 0 }}
            />
        </Box>
    );
}

export default Category;