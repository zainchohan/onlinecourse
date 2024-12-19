import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axiosInstance from './AxiosInstance';
import { toast } from "react-toastify"; 
import { Menu } from './Menu';


const Login = () => {
   const navigate = useNavigate()
   const [data, setData] = useState({
      email: "",
      password: "",
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!data?.email || !data?.password) {
         return toast.error("Please fill all fields" , { position: "top-center" });
      } else {
         axiosInstance.post('/api/user/login', data)
            .then((res) => {
               if (res.data.success) {
                  toast.success(res.data.message, { position: "top-center" });

                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.userData));
                  navigate('/dashboard')
                  setTimeout(() => {
                     window.location.reload()
                  }, 1000)
               } else {
                  toast.error(res.data.message, { position: "top-center" });
               }
            })
            .catch((err) => {
               if (err.response && err.response.status === 401) {
                  toast.error("User doesn't exist", { position: "top-center" });
               }
               navigate("/login");
            });
      }
   };

   return (
      <>
      <div className='container'><Menu/></div>
         

         <div className='first-container'>
            <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
               <Box
                  sx={{
                     marginTop: 8,
                     marginBottom: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     padding: '10px',
                     background: '#dddde8db',
                     border: '1px solid lightblue',
                     borderRadius: '5px'
                  }}
               >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign In
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate>

                     <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     <Box mt={2}>
                        <Button
                           type="submit"
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           style={{ width: '200px' }}
                        >
                           Sign In
                        </Button>
                     </Box>
                     <Grid container>
                        <Grid item>Have an account?
                           <Link style={{ color: "blue" }} to={'/register'} variant="body2">
                              {" Sign Up"}
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Container>
         </div>

      </>
   )
}

export default Login



