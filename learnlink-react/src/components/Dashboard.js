import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Get user from localStorage
    const savedUser = localStorage.getItem('learnlink_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Fetch user's courses (mock data for now)
      // In Week 9, you'll create a real API endpoint
      fetch(`http://localhost:3001/api/users/${userData.id}/courses`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(() => {
          // Mock data if API not ready
          setCourses([
            { id: 1, title: 'Web Development 101', progress: 65 },
            { id: 2, title: 'Python Programming', progress: 30 }
          ]);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('learnlink_user');
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="form-container">
        <h2>Please Login</h2>
        <p>You need to be logged in to view the dashboard.</p>
        <a href="/login" className="btn">Go to Login</a>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header">
        <div className="user-welcome">
          <div className="user-avatar">👤</div>
          <div>
            <h2>Welcome, {user.name}!</h2>
            <p>{user.email} | {user.type}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📖 Enrolled Courses</h3>
          <div id="enrolled-courses">
            {courses.length === 0 ? (
              <p>No courses enrolled yet. <a href="/courses">Browse courses</a></p>
            ) : (
              <ul>
                {courses.map(course => (
                  <li key={course.id}>
                    {course.title} 
                    {course.progress && ` - ${course.progress}% complete`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>📈 Learning Progress</h3>
          <div className="progress-container">
            <p>Overall Completion</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '65%'}}></div>
            </div>
            <p>65% Complete</p>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>⏰ Recent Activity</h3>
          <ul id="recent-activity">
            <li>Completed Web Development Module 3</li>
            <li>Joined Python Programming Course</li>
            <li>Submitted Database Design Assignment</li>
          </ul>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <button onClick={handleLogout} className="btn">🚪 Logout</button>
      </div>
    </>
  );
}

export default Dashboard;