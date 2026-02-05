document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('learnlink_user') || 'null');
    
    if (!user) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }
    
    // Display user info
    document.getElementById('welcome-name').textContent = `Welcome, ${user.name}!`;
    document.getElementById('user-email').textContent = user.email;
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('learnlink_user');
        alert('Logged out successfully!');
        window.location.href = '../index.html';
    });
    
    // Fetch enrolled courses from API
    fetchEnrolledCourses(user.id);
});

async function fetchEnrolledCourses(userId) {
    try {
        // This endpoint doesn't exist yet - you need to create it in server.js
        const response = await fetch(`http://localhost:3000/api/enrollments/${userId}`);
        
        if (response.ok) {
            const courses = await response.json();
            displayCourses(courses);
        } else {
            document.getElementById('enrolled-courses').innerHTML = 
                '<p>No courses enrolled yet. <a href="courses.html">Browse courses</a></p>';
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
        document.getElementById('enrolled-courses').innerHTML = 
            '<p>Error loading courses. Please try again later.</p>';
    }
}

function displayCourses(courses) {
    const container = document.getElementById('enrolled-courses');
    if (courses.length === 0) {
        container.innerHTML = '<p>No courses enrolled yet. <a href="courses.html">Browse courses</a></p>';
        return;
    }
    
    let html = '<ul>';
    courses.forEach(course => {
        html += `<li>${course.title} - <span class="level ${course.level}">${course.level}</span></li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
}