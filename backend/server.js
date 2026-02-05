const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../'));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '15h16h17h18h19h20j',
    database: 'learnlink_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// 1. Register user
app.post('/api/register', (req, res) => {
    const { fullname, email, password, course } = req.body;
    
    const sql = 'INSERT INTO users (full_name, email, password_hash, user_type) VALUES (?, ?, ?, ?)';
    db.execute(sql, [fullname, email, password, 'student'], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Registration failed' });
        }
        res.json({ message: 'Registration successful!', userId: result.insertId });
    });
});

// 2. Get all courses
app.get('/api/courses', (req, res) => {
    const sql = 'SELECT id, title, description, level FROM courses';
    db.execute(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch courses' });
        }
        res.json(results);
    });
});

// 3. Get all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT id, full_name, email, user_type, created_at FROM users';
    db.execute(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json(results);
    });
});

// 4. User Login - DEBUG VERSION
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        
        console.log('Login attempt for:', email);
        console.log('Password submitted:', password);
        
        const sql = 'SELECT id, full_name, email, user_type, password_hash FROM users WHERE email = ?';
        
        db.execute(sql, [email], (err, results) => {
            if (err) {
                console.error('Login database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            
            if (results.length === 0) {
                console.log('User not found:', email);
                return res.status(401).json({ error: 'User not found' });
            }
            
            const user = results[0];
            
            console.log('User found:', user.email);
            console.log('Database password_hash:', user.password_hash);
            console.log('Submitted password:', password);
            
            if (user.password_hash !== password) {
                console.log('PASSWORD MISMATCH!');
                console.log('DB has:', user.password_hash);
                console.log('User sent:', password);
                return res.status(401).json({ error: 'Invalid password' });
            }
            
            console.log('Login SUCCESS for user:', user.full_name);
            
            res.json({
                message: 'Login successful!',
                user: {
                    id: user.id,
                    name: user.full_name,
                    email: user.email,
                    type: user.user_type
                }
            });
        });
    } catch (error) {
        console.error('Login server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// 5. Enroll in course
app.post('/api/enroll', (req, res) => {
    try {
        const { student_id, course_id } = req.body;
        
        if (!student_id || !course_id) {
            return res.status(400).json({ error: 'Student ID and Course ID required' });
        }
        
        const sql = 'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)';
        
        db.execute(sql, [student_id, course_id], (err, result) => {
            if (err) {
                console.error('Enrollment error:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Already enrolled in this course' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            
            res.json({
                message: 'Successfully enrolled in course!',
                enrollmentId: result.insertId
            });
        });
    } catch (error) {
        console.error('Enrollment server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// 6. Mark attendance
app.post('/api/attendance', (req, res) => {
    try {
        const { student_id, course_id, status } = req.body;
        
        if (!student_id || !course_id || !status) {
            return res.status(400).json({ error: 'All fields required' });
        }
        
        const sql = 'INSERT INTO attendance (student_id, course_id, session_date, status) VALUES (?, ?, CURDATE(), ?)';
        
        db.execute(sql, [student_id, course_id, status], (err, result) => {
            if (err) {
                console.error('Attendance error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            
            res.json({
                message: 'Attendance recorded!',
                attendanceId: result.insertId
            });
        });
    } catch (error) {
        console.error('Attendance server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Add this to server.js after other routes
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    console.log('📧 New contact message:');
    console.log('From:', name, `<${email}>`);
    console.log('Message:', message);
    
    // In a real app, you would:
    // 1. Save to database
    // 2. Send email using nodemailer
    // 3. Log to a file
    
    res.json({
        message: 'Contact message received!',
        received: {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        }
    });
});