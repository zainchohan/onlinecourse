import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./AxiosInstance";
import { Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const AllCourses = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [allCourses, setAllCourses] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showModalIndex, setShowModalIndex] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardholdername: "",
    cardnumber: "",
    cvvcode: "",
    expmonthyear: "",
  });

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardnumber") {
      // Automatically format the card number
      formattedValue = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  // Fetch all courses
  const getAllCoursesUser = async () => {
    try {
      const res = await axiosInstance.get("api/user/getallcourses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAllCourses(res.data.data);
      }
    } catch (error) {
      console.error("An error occurred while fetching courses:", error);
    }
  };

  useEffect(() => {
    getAllCoursesUser();
  }, []);

  const isPaidCourse = (course) => /\d/.test(course.C_price);

  // Show modal
  const handleShowModal = (index, coursePrice, courseId, courseTitle) => {
    if (coursePrice === "free") {
      handleEnroll(courseId, courseTitle);
    } else {
      setShowModalIndex(index);
    }
  };

  // Close modal
  const handleCloseModal = () => setShowModalIndex(null);

  // Enroll in course
  const handleEnroll = async (courseId, courseTitle) => {
    try {
      const res = await axiosInstance.post(
        `api/user/enrolledcourse/${courseId}`,
        cardDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
      } else {
        alert(res.data.message);
        navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
      }
    } catch (error) {
      console.error("An error occurred while enrolling:", error);
    }
  };

  return (
    <>
      <div className="mt-4 filter-container text-center">
        <p className="mt-3">Search By: </p>
        <input
          type="text"
          placeholder="Search by title..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Courses</option>
          <option value="Paid">Paid</option>
          <option value="Free">Free</option>
        </select>
      </div>

      <div className="p-2 course-container">
        {allCourses?.length > 0 ? (
          allCourses
            .filter(
              (course) =>
                filterTitle === "" ||
                course.C_title?.toLowerCase().includes(filterTitle.toLowerCase())
            )
            .filter((course) => {
              if (filterType === "Free") return !isPaidCourse(course);
              if (filterType === "Paid") return isPaidCourse(course);
              return true;
            })
            .map((course, index) => (
              <div key={course._id} className="course">
                <div className="card1">
                  <div className="desc">
                    <h3>{course.C_title}</h3>
                    {course.sections.length > 0 ? (
                      course.sections.slice(0, 2).map((section, i) => (
                        <div key={i}>
                          <p>
                            <b>Title:</b> {section.S_title}
                          </p>
                          <div className="description-container">
                            <div className="description">
                              <b>Description:</b> {section.S_description}
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <p>No Modules</p>
                    )}

                    <p style={{ fontSize: 16 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className="details">
                    <div className="center">
                      <h1>
                        {course.C_title}
                        <br />
                        <span>{course.C_categories}</span>
                        <br />
                        <span style={{ fontSize: 10 }}>by: &nbsp;{course.C_educator}</span>
                      </h1>

                      <p>Sections: {course.sections.length}</p>
                      <p>Price (SAR): {course.C_price}</p>
                      <p>Enrolled students: {course.enrolled}</p>
                      {user.userLoggedIn ? (
                        <>
                          <Button
                            className=""
                            variant="outline-dark"
                            size="sm"
                            onClick={() =>
                              handleShowModal(index, course.C_price, course._id, course.C_title)
                            }
                          >
                            Start Course
                          </Button>
                          <Modal
                            show={showModalIndex === index}
                            onHide={handleCloseModal}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Payment for {course.C_title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <p style={{ fontSize: 15 }}>Educator: {course.C_educator}</p>
                              <p style={{ fontSize: 15 }}>Price: {course.C_price}</p>
                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleEnroll(course._id, course.C_title);
                                }}
                              >
                                <label>Card Holder Name<img src="https://stuffeez.pk/wp-content/plugins/woocommerce-paypro-payment/images/master-visa.png" alt="Credit/Debit Card"></img></label>
                                <MDBInput
                                  className="mb-2"
                                  name="cardholdername"
                                  value={cardDetails.cardholdername}
                                  onChange={handleChange}
                                  type="text"
                                  size="md"
                                  placeholder="Cardholder's Name"
                                  required
                                />
                                <label>Card Number</label>
                                <MDBInput
                                  className="mb-2"
                                  name="cardnumber"
                                  value={cardDetails.cardnumber}
                                  onChange={handleChange}
                                  type="text"
                                  size="md"
                                  placeholder="1234 5678 9012 3457"
                                  maxLength="19"
                                  required
                                />
                                <MDBRow className="mb-4">
                                  <MDBCol md="6">
                                    <label>Expiration</label>
                                    <MDBInput
                                      name="expmonthyear"
                                      value={cardDetails.expmonthyear}
                                      onChange={handleChange}
                                      className="mb-2"
                                      type="text"
                                      size="md"
                                      placeholder="MM/YYYY"
                                      required
                                    />
                                  </MDBCol>
                                  <MDBCol md="6">
                                    <label>CVV</label>
                                    <MDBInput
                                      name="cvvcode"
                                      value={cardDetails.cvvcode}
                                      onChange={handleChange}
                                      className="mb-2"
                                      type="text"
                                      size="md"
                                      maxLength="3"
                                      placeholder="***"
                                      required
                                    />
                                  </MDBCol>
                                </MDBRow>
                                <div className="d-flex justify-content-end">
                                  <Button
                                    className="mx-2"
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                  >
                                    Close
                                  </Button>
                                  <Button variant="primary" type="submit">
                                    Pay Now
                                  </Button>
                                </div>
                              </Form>
                            </Modal.Body>
                          </Modal>
                        </>
                      ) : (
                        <Link to="/login">
                          <Button className="py-2 px-4 my-2" variant="outline-dark" size="sm">
                            Start Course
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No courses at the moment</p>
        )}
      </div>
    </>
  );
};

export default AllCourses;
