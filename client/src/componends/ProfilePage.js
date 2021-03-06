import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import UploadPost from './UploadPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from './Home';
import '../CSS/ProfilePage.css';
import fs from 'fs';

const url = "https://captone-project.herokuapp.com/";


export default function MediaControlCard()
{
    const theme = useTheme();
    const [image, setImage] = useState();
    const [name, setName] = useState([]);
    const [imagemsg, setImageMsg] = useState()
    const history = useHistory();

    const token = localStorage.getItem('jwtoken');

    const url = "https://captone-project.herokuapp.com/";


    const handleChange = (e) =>
    {
        setImage(e.target.files[0])
    }

    const onSubmit = (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("imagemsg", imagemsg)
        // let files = image;
        // let filess = Object.entries(files)
        // console.log(filess)
        // console.log(files)

        // if (!files) return res.status(400).json({ message: "Please Select a File" });

        // let imgPhoto = filess.map((file) =>
        // {
        //     let img = fs.readFileSync(file.path)
        //     return img.toString('base64')
        // });
        // console.log(imgPhoto)

        const congir = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(`${url}uploadpost`, formData, congir)
            .then((re) => toast(re.data.message))
            .catch((err) => toast(err.response.data.message));

    }
    useEffect(() =>
    {
        if ((token === "undefined") || (token === null))
        {
            history.push("/sign-in");

        } else
        {
            history.push("/profile");
        }
    }, []);

    useEffect(() =>
    {
        fetch(`${url}u`)
            .then((result) => result.json())
            .then(result => setName(result))
    }, [])

    return (
        <div>
            {/* {name.map((data) =>
            {
                const { fullname } = data;
                return (
                    <>
                        <Card className="card" sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {fullname}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                    </IconButton>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="image/SM.png"
                                alt="Live from space album cover"
                            />
                        </Card>

                    </>
                )
            })
            } */}
            <Card className="card" sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            User Name
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">

                        </Typography>
                    </CardContent>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                    </IconButton>
                                </Box> */}
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image=""
                    alt="User Picture"
                />
            </Card>
            <UploadPost>
                <form className="post-form" onSubmit={onSubmit} >
                    <div className="comment" >
                        <label>What's in Your Mind</label>
                        <input style={{ width: "40%", margin: "5px 0 0 30%", borderRadius: "5px" }} type="text" name="imagemsg" onChange={(e) => setImageMsg(e.target.value)} placeholder="Comment..." ></input>
                    </div>
                    <div className="post-image">
                        <label>Select Image</label>
                        <input type="file" name="image" onChange={handleChange} ></input>
                    </div>
                    <button className="button" onSubmit={onSubmit} >Submit</button>
                </form>
                <ToastContainer />
            </UploadPost>
        </div >
    );
}

