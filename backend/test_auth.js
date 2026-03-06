const http = require('http');

const request = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body || '{}') }));
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

(async () => {
    try {
        const randomNum = Math.floor(Math.random() * 10000);
        const email = `testuser${randomNum}@example.com`;
        console.log(`Testing with email: ${email}`);

        // 1. Register
        const regRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { username: `user${randomNum}`, email, password: 'password123' });

        console.log('Register Response:', regRes.statusCode, regRes.body);

        if (regRes.statusCode !== 201) throw new Error('Registration failed');

        // 2. Login
        const loginRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { email, password: 'password123' });

        console.log('Login Response:', loginRes.statusCode, loginRes.body);

        if (loginRes.statusCode !== 200) throw new Error('Login failed');

        const token = loginRes.body.token;

        // 3. Access Protected Route (/api/payments)
        const protectedRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/payments',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Protected Route Response:', protectedRes.statusCode);
        if (protectedRes.statusCode !== 200) throw new Error('Protected route failed');

        // 4. Access Protected Route WITHOUT Token
        const unauthRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/payments',
            method: 'GET'
        });

        console.log('Unauthenticated Route Response:', unauthRes.statusCode);
        if (unauthRes.statusCode !== 401) throw new Error('Unauth route did not return 401');

        console.log('✅ ALL VERIFICATIONS PASSED');
    } catch (err) {
        console.error('❌ VERIFICATION FAILED:', err.message);
    }
})();
