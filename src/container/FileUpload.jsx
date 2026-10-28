import { Button } from '@mui/material';
import { useField } from 'formik';
import React, { useEffect } from 'react';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IMAGE_URL } from '../utills/url';




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


function FileUpload({ multiple, ...props }) {

    const [field, meta, helper] = useField(props);

    const { setValue } = helper

  
    useEffect(() => {
        console.log("ddddd", field);
        
    }, [])
    

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    {...field}
                    type="file"
                    value={""}
                    onChange={(event) => {
                        const files = Array.from(event.target.files)
                        setValue(files)

                    }
                    }
                    multiple={multiple}
                />
            </Button>
            <p className='error'>
                {
                    meta.error && meta.touched ? meta.error : ''
                }
            </p>
            {
                field?.value ?
                field?.value?.map((v, i) => (
                    typeof v=="object" ?
                    <img src={URL.createObjectURL(v)} alt="" width={"100px"} height={"100px"} />
                    :
                    <img src={IMAGE_URL + v} width={'50px'} height={'50px'} />
                    
                )):null
            }
        </>
    );
}

export default FileUpload;