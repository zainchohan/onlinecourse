import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import AllCourses from './AllCourses';
import { Menu } from './Menu';

const Home = () => {
   return (
      <>
         <Menu/>

         <div id='home-container' className='first-container'>
            <div className="container content-home">
               <p>"Empowering Education Training: <br></br>Your Path to Success Online"</p>
               <Link to={'/register'}><Button variant='warning' className='m-2' size='md'>Explore Courses</Button></Link>
            </div>
         </div>

         <Container className="second-container my-4">
            <h2 className="text-center">Trending Courses</h2>
            <AllCourses />
         </Container>
      </>
   )
}

export default Home


