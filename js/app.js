// 1. COURSE FILTERING (Keep this part - it works)
document.addEventListener('DOMContentLoaded', function() {
    // Course filtering code - KEEP AS IS
    const courseCards = document.querySelectorAll('.course-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterLevel = this.getAttribute('data-level');
            courseCards.forEach(card => {
                const cardLevel = card.querySelector('.level').textContent.toLowerCase();
                if (filterLevel === 'all' || cardLevel === filterLevel) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            courseCards.forEach(card => {
                const courseTitle = card.querySelector('h3').textContent.toLowerCase();
                const courseDesc = card.querySelector('p').textContent.toLowerCase();
                if (courseTitle.includes(searchTerm) || courseDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// 2. FORM HANDLING - SIMPLE VERSION
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        // Password strength - KEEP OLD VERSION (it works)
        const passwordInput = document.getElementById('password');
        const strengthFill = document.getElementById('strength-fill');
        const strengthText = document.getElementById('strength-text');
        
        if (passwordInput && strengthFill && strengthText) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                if (password.length >= 8) strength += 25;
                if (password.length >= 12) strength += 25;
                if (/[A-Z]/.test(password)) strength += 25;
                if (/[0-9]/.test(password)) strength += 25;
                if (/[^A-Za-z0-9]/.test(password)) strength += 25;
                strength = Math.min(strength, 100);
                strengthFill.style.width = strength + '%';
                
                if (strength < 40) {
                    strengthFill.style.background = '#ff4444';
                    strengthText.textContent = 'Password strength: Weak';
                } else if (strength < 70) {
                    strengthFill.style.background = '#ffa700';
                    strengthText.textContent = 'Password strength: Medium';
                } else {
                    strengthFill.style.background = '#00C851';
                    strengthText.textContent = 'Password strength: Strong';
                }
            });
        }
        
        
        // FORM SUBMISSION - REAL API VERSION
registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("Form submitted - REAL API VERSION");
    
    // Get form data
    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        course: document.getElementById('course-interest').value
    };
    
    console.log("Sending to API:", formData);
    
    // Send to backend API
    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        console.log("API Response:", result);
        
        if (response.ok) {
            alert('✅ Registration successful! User ID: ' + result.userId);
            // Redirect to courses page
            window.location.href = 'courses.html';
        } else {
            alert('❌ Error: ' + result.error);
        }
    } catch (error) {
        console.error('❌ Fetch Error:', error);
        alert('⚠️ Registration failed. Please check:\n1. Server is running\n2. Console for errors (F12)');
    }
});

    }
});

// Add to app.js or create contact.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    document.getElementById('contact-response').textContent = 
                        '✅ Message sent successfully! We\'ll respond to ' + formData.email;
                    document.getElementById('contact-response').style.display = 'block';
                    contactForm.reset();
                } else {
                    document.getElementById('contact-response').textContent = 
                        '❌ Error: ' + result.error;
                    document.getElementById('contact-response').style.display = 'block';
                }
            } catch (error) {
                console.error('Contact form error:', error);
                alert('⚠️ Could not send message. Please try again later.');
            }
        });
    }
});