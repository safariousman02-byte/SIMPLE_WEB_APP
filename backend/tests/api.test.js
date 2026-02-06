const request = require('supertest');

// Test against your running backend on port 3001
const API_URL = 'http://localhost:3001';

describe('LearnLink Backend API Tests', () => {
  
  // Test 1: Courses endpoint
  describe('GET /api/courses', () => {
    it('should return array of courses with correct structure', async () => {
      const response = await request(API_URL)
        .get('/api/courses')
        .expect(200)
        .expect('Content-Type', /json/);
      
      console.log('Courses received:', response.body.length);
      
      // Verify response is an array
      expect(Array.isArray(response.body)).toBe(true);
      
      // If there are courses, check their structure
      if (response.body.length > 0) {
        const course = response.body[0];
        expect(course).toHaveProperty('id');
        expect(course).toHaveProperty('title');
        expect(course).toHaveProperty('description');
        expect(course).toHaveProperty('level');
        expect(['beginner', 'intermediate', 'advanced']).toContain(course.level);
      }
    });
  });

  // Test 2: Registration endpoint
  describe('POST /api/register', () => {
    it('should successfully register a new user', async () => {
      const uniqueEmail = `testuser${Date.now()}@example.com`;
      
      const userData = {
        fullname: 'Test User',
        email: uniqueEmail,
        password: 'TestPassword123!',
        course: 'web'
      };

      const response = await request(API_URL)
        .post('/api/register')
        .send(userData)
        .expect(200);
      
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('userId');
      expect(typeof response.body.userId).toBe('number');
      expect(response.body.message).toContain('successful');
    });

    it('should fail with missing required fields', async () => {
      const incompleteData = {
        fullname: 'Incomplete User'
        // Missing email, password, course
      };

      const response = await request(API_URL)
        .post('/api/register')
        .send(incompleteData);
      
      // Your API might return 400 or 500 for missing fields
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  // Test 3: Login endpoint
  describe('POST /api/login', () => {
    // First, register a test user
    let testUser = {
      email: `logintest${Date.now()}@example.com`,
      password: 'LoginTest123!'
    };

    beforeAll(async () => {
      // Register a user for login tests
      await request(API_URL)
        .post('/api/register')
        .send({
          fullname: 'Login Test User',
          email: testUser.email,
          password: testUser.password,
          course: 'python'
        });
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(API_URL)
        .post('/api/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);
      
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.type).toBe('student');
    });

    it('should fail with wrong password', async () => {
      const response = await request(API_URL)
        .post('/api/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword123!'
        })
        .expect(401);
      
      expect(response.body).toHaveProperty('error');
    });

    it('should fail with non-existent email', async () => {
      const response = await request(API_URL)
        .post('/api/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'SomePassword123!'
        })
        .expect(401);
      
      expect(response.body).toHaveProperty('error');
    });
  });

  // Test 4: Users endpoint
  describe('GET /api/users', () => {
    it('should return array of users', async () => {
      const response = await request(API_URL)
        .get('/api/users')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        const user = response.body[0];
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('full_name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('user_type');
        expect(user).toHaveProperty('created_at');
      }
    });
  });
});