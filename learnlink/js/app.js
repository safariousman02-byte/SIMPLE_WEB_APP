document.addEventListener('DOMContentLoaded', function() {
    // Get all course cards
    const courseCards = document.querySelectorAll('.course-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Filter courses by level
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
    
    // Add search functionality
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

const registerForm = document.getElementById('register-form');
if (registerForm) {
    const passwordInput = document.getElementById('password');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        
        // Cap at 100
        strength = Math.min(strength, 100);
        
        // Update strength bar
        strengthFill.style.width = strength + '%';
        
        // Color and text
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
    
    // Form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            course: document.getElementById('course-interest').value
        };
        
        // Store in localStorage (simulating database)
        localStorage.setItem('learnlink_user', JSON.stringify(formData));
        
        // Show success message
        alert('Registration successful! Welcome to LearnLink.');
        
        // Redirect to courses page
        window.location.href = 'courses.html';
    });
}