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
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from "react-toastify"; 
import { Menu } from './Menu';


const Register = () => {
   const navigate = useNavigate()
   const [selectedOption, setSelectedOption] = useState('Select User');
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      type: "",
   })

   const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      setData({ ...data, type: eventKey });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
   
      if (!data?.name || !data?.email || !data?.password || !data?.type) {
         return toast.error("Please fill all fields", { position: "top-right" });
      } else {
         axiosInstance.post('/api/user/register', data)
            .then((response) => {
               if (response.data.success) {
                  // Show success toast
                  toast.success("User registered successfully!", { position: "top-right" });
   
                  // Redirect to login page after a short delay
                  setTimeout(() => {
                     navigate('/login');
                  }, 2000); // Delay before redirect (2 seconds)
   
               } else {
                  // Handle any other responses (e.g., failure)
                  toast.error(response.data.message || "Registration failed", { position: "top-right" });
               }
            })
            .catch((error) => {
               console.log("Error", error);
               toast.error("An error occurred during registration.", { position: "top-right" });
            });
      }
   };
   


   return (
      <>
         <div className='container'>
         <Menu/>
         </div>
         <div className="first-container">
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
                     {/* <LockOutlinedIcon /> */}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Register
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                     <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        autoComplete="name"
                        autoFocus
                     />
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
                     <Dropdown className='my-3'>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                           {selectedOption}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                           {/* <Dropdown.Item onClick={() => handleSelect("Admin")}>Admin</Dropdown.Item> */}
                           <Dropdown.Item onClick={() => handleSelect("Student")}>Student</Dropdown.Item>
                           {/* <Dropdown.Item onClick={() => handleSelect("Teacher")}>Teacher</Dropdown.Item> */}
                        </Dropdown.Menu>
                     </Dropdown>
                     <Box mt={2}>
                        <Button
                           type="submit"
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           style={{ width: '200px' }}
                        >
                           Sign Up
                        </Button>
                     </Box>
                     <Grid container>
                        <Grid item>Have an account?
                           <Link style={{ color: "blue" }} to={'/login'} variant="body2">
                              {" Sign In"}
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

export default Register


