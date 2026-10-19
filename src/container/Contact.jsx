import React, { useEffect } from 'react';

function Contact(props) {

    const fetcategory = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/category/getCategory/6ad5c67826cafa70e878821a")

            const data = await response.json()

            console.log(data);
        } catch (error) {
            console.log(error);
            
        }

    }

    useEffect(()=>{
        fetcategory()
    },[])

    return (
        <div>
            <h2>Contact ...</h2>
        </div>
    );
}

export default Contact;