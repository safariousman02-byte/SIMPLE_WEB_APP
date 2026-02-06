import React, { useState, useEffect } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Courses component mounted - fetching data...');
    
    fetch('http://localhost:3001/api/courses')
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Courses data received:', data);
        console.log('Number of courses:', data.length);
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  console.log('Courses component rendering. Loading:', loading, 'Courses count:', courses.length);

  if (loading) {
    console.log('Showing loading message...');
    return <p>Loading courses...</p>;
  }

  console.log('Rendering courses grid with', courses.length, 'courses');

  return (
    <>
      <header>
        <h1>Available Courses</h1>
        <p>Browse and enroll in courses</p>
      </header>
      
      <div className="controls">
        <input type="text" placeholder="Search courses..." className="search-box" />
        <div className="filter-buttons">
          <button className="filter-btn">All Courses</button>
          <button className="filter-btn">Beginner</button>
          <button className="filter-btn">Intermediate</button>
          <button className="filter-btn">Advanced</button>
        </div>
      </div>

      <div className="course-grid">
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          courses.map(course => (
            <div className="course-card" key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <span className={`level ${course.level}`}>{course.level}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Courses;