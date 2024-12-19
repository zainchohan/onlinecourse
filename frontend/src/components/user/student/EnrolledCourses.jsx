import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/AxiosInstance';
import { Link } from 'react-router-dom';
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

const EnrolledCourses = () => {
   const [allEnrolledCourses, setAllEnrolledCourses] = useState([]); // Fixed the spelling of the state variable

   const allCourses = async () => {
      try {
         const res = await axiosInstance.get('api/user/getallcoursesuser', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
         });
         if (res.data.success) {
            setAllEnrolledCourses(res.data.data || []); // Ensure data is set properly, default to empty array if null
         } else {
            alert(res.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      allCourses();
   }, []);

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
               <TableRow>
                  <StyledTableCell>Course ID</StyledTableCell>
                  <StyledTableCell align="left">Course Name</StyledTableCell>
                  <StyledTableCell align="left">Course Educator</StyledTableCell>
                  <StyledTableCell align="left">Course Category</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {allEnrolledCourses?.length > 0 ? (
                  allEnrolledCourses.map((course) => (
                     course ? ( // Ensure course is not null before rendering
                        <StyledTableRow key={course._id}>
                           <StyledTableCell component="th" scope="row">
                              {course._id || 'N/A'} {/* Check if _id exists */}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              {course.C_title || 'No Title'}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              {course.C_educator || 'Unknown'}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              {course.C_categories || 'Uncategorized'}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              <Link to={`/courseSection/${course._id}/${course.C_title}`}>
                                 <Button size="small" variant="contained" color="success">
                                    Go To
                                 </Button>
                              </Link>
                           </StyledTableCell>
                        </StyledTableRow>
                     ) : null // Avoid rendering if course is null
                  ))
               ) : (
                  <p className="px-2">Yet to be enrolled in courses</p>
               )}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default EnrolledCourses;
