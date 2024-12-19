
# Online Course Dashboard  

The **Online Course Dashboard** is a comprehensive full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform enables students to enroll in courses, view course content, and monitor their progress. Teachers can manage course materials, while administrators oversee user and course management.  

---

## Features  
- **Students**: Enroll in courses, view content, and attend the course.  
- **Teachers**: Create, delete, and manage courses.  
- **Administrators**: Manage users and courses with advanced control.  

---

## Installation  

### 1. Clone the Repository  
```bash  
git clone https://github.com/zainchohan/onlinecourse.git  
```  

### 2. Backend Setup  
1. Navigate to the `backend` directory:  
   ```bash  
   cd backend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  

### 3. Frontend Setup  
1. Navigate to the `frontend` directory:  
   ```bash  
   cd frontend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  

---

## Environment Variables  

Create a `.env` file in the `backend` directory and include the following variables:  
```env  
MONGO_DB=mongodb://localhost:27017/lms  
PORT=5000  
JWT_KEY=my_super_secret_key_123456  
```  

---

## Usage  

### Running the Backend Server  
1. Start the server:  
   ```bash  
   cd backend  
   node index.js  
   ```  
2. The server will run on `http://localhost:5000`.  

### Running the Frontend   
1. Start the client:  
   ```bash  
   cd frontend  
   npm start  
   ```  
2. The client will run on `http://localhost:3000` by default.  

---

## Contributing  

Feel free to submit a pull request or open an issue for suggestions and improvements.  

---

**Happy Coding!**  
