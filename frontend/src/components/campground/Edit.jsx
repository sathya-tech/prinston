import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [camp, setCamp] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/campgrounds/${id}`)
            .then((res) => {
                setCamp(res.data);
            })
    },[])


    const onFormSubmit = async (e) => {
        e.preventDefault();
        const campground = {
            title: e.target[0].value,
            location: e.target[1].value
        }
        console.log(campground)
        await axios.put(`http://localhost:3001/campgrounds/${id}/edit`, campground)
            .then((res) => {
                navigate(`/campgrounds/${res.data}`)
            })
    }

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <div>
                    <label htmlFor="title">Enter the Title</label>
                    <input type="text" id='title' name='title' placeholder='enter the title' defaultValue={camp?.title||''} />
                </div>
                <div>
                    <label htmlFor="location">Enter the location</label>
                    <input type="text" id='location' name='location' placeholder='enter the location' defaultValue={camp?.location || ''} />
                </div>
                <button>Submit</button>
            </form>
            <Link to="/campgrounds">All Campgrounds</Link>
        </>
    )
}

export default Edit