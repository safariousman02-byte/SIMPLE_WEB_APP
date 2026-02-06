import React from 'react';

function Home() {
  return (
    <>
      <header>
        <h1>Welcome to LearnLink</h1>
        <p>Your virtual classroom platform</p>
      </header>
      
      <section>
        <h2>Test Navigation</h2>
        <p>Click these links to test:</p>
        <a href="/courses" className="btn">Test Courses Page</a>
        <a href="/login" className="btn">Test Login Page</a>
        <a href="/register" className="btn">Test Register Page</a>
      </section>

      <section className="features">
        <h2 style={{textAlign: 'center', margin: '3rem 0 2rem'}}>Why Choose LearnLink?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Learning</h3>
            <p>Custom learning paths tailored to your goals and pace.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Track Progress</h3>
            <p>Monitor your learning journey with detailed analytics.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Community Support</h3>
            <p>Join discussions and collaborate with fellow learners.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;