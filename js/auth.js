// SIMPLE LOGIN - DEBUG VERSION
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            // STOP everything
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('=== LOGIN ATTEMPT START ===');
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Credentials:', { email, password });
            
            try {
                console.log('Sending to API...');
                
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                console.log('Response status:', response.status);
                console.log('Response ok?', response.ok);
                
                const result = await response.json();
                console.log('API result:', result);
                
                if (response.ok) {
                    alert('✅ LOGIN SUCCESS! Welcome ' + result.user.name);
                    // Store user
                    localStorage.setItem('learnlink_user', JSON.stringify(result.user));
                    // Redirect
                    window.location.href = '../index.html';
                } else {
                    alert('❌ Login failed: ' + result.error);
                    // DON'T clear fields on error
                    document.getElementById('password').value = password; // Restore password
                }
                
            } catch (error) {
                console.error('CATCH ERROR:', error);
                alert('⚠️ Network error. Is server running?');
                // Restore password
                document.getElementById('password').value = password;
            }
            
            console.log('=== LOGIN ATTEMPT END ===');
            return false;
        });
    }
    
    // Show current user if logged in
    const user = JSON.parse(localStorage.getItem('learnlink_user') || 'null');
    if (user) {
        console.log('Already logged in as:', user.name);
    }
});