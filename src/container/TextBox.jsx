import React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import { MenuItem} from '@mui/material';

function TextBox({ label,type,categoryData=[], ...props }) {
     const [field, meta] = useField(props);
     console.log(categoryData)
    return (
        <div>
            <TextField
                 {...field}
                {...props}
                error={meta.error && meta.touched}
                margin="normal"
                id="name"
                label={label}
                type={type}
                fullWidth
                helperText={meta.error && meta.touched ? meta.error : ''}
            >

             {
                categoryData?.map((v, i) => (
                    <MenuItem key={v._id} value={v._id}>
                        {v.name}
                    </MenuItem>
                ))}


              
            </TextField>
        </div>
    );
}

export default TextBox;