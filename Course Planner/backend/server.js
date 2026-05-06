const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STUDENTS_FILE)) fs.writeFileSync(STUDENTS_FILE, '{}');
}

function readStudents() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
}

function writeStudents(students) {
  ensureDataFile();
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function sendHtml(res, status, html) {
  res.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(html);
}

function sendApiInfo(res) {
  sendJson(res, 200, {
    name: 'UIU Course Planner API',
    status: 'running',
    endpoints: {
      signup: 'POST /api/signup',
      login: 'POST /api/login',
      profile: 'POST /api/profile'
    }
  });
}

function sendApiDashboard(res) {
  sendHtml(res, 200, `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>UIU Course Planner API</title>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #f6f8fa; color: #1f2937; }
    main { max-width: 880px; margin: 0 auto; padding: 40px 18px; }
    .hero, .card { background: #fff; border: 1px solid #d8dee4; border-radius: 14px; padding: 22px; box-shadow: 0 12px 34px rgba(31,41,55,.08); }
    h1 { margin: 0 0 8px; font-size: 30px; }
    p { color: #57606a; line-height: 1.6; }
    .status { display: inline-flex; align-items: center; gap: 8px; margin: 12px 0 18px; padding: 7px 12px; border-radius: 999px; background: #dafbe1; color: #116329; font-weight: 700; }
    .dot { width: 9px; height: 9px; border-radius: 50%; background: #1a7f37; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 18px; }
    code { display: inline-block; margin-bottom: 7px; padding: 4px 7px; border-radius: 6px; background: #f0f3f6; color: #24292f; }
    a { color: #0969da; font-weight: 700; }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <h1>UIU Course Planner Backend</h1>
      <p>This optional Node backend handles signup, login, and profile updates.</p>
      <div class="status"><span class="dot"></span> Backend is running</div>
      <p><a href="/api/info">View JSON Info</a></p>
    </section>
    <section class="grid">
      <div class="card"><code>POST /api/signup</code><p>Create a student account.</p></div>
      <div class="card"><code>POST /api/login</code><p>Log in with student ID and password.</p></div>
      <div class="card"><code>POST /api/profile</code><p>Update profile details and photo.</p></div>
    </section>
  </main>
</body>
</html>`);
}

function isValidUIUStudentId(id) {
  return /^\d{10}$/.test(String(id || '').trim());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function isValidPhone(phone) {
  return !phone || /^[\d\s()+-]{7,20}$/.test(String(phone).trim());
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, savedHash) {
  const [salt, hash] = savedHash.split(':');
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(candidate, 'hex'));
}

async function handleSignup(req, res) {
  const { name, email, studentId, password } = await readBody(req);
  const id = String(studentId || '').trim();
  if (!name || !isValidEmail(email) || !isValidUIUStudentId(id) || !password || password.length < 6) {
    sendJson(res, 400, { error: 'Valid name, email, 10 digit UIU student ID, and password are required.' });
    return;
  }

  const students = readStudents();
  if (students[id]) {
    sendJson(res, 409, { error: 'Student ID already exists.' });
    return;
  }

  students[id] = { id, name: String(name).trim(), email: String(email).trim(), passwordHash: hashPassword(password) };
  writeStudents(students);
  sendJson(res, 201, { student: { id, name: students[id].name } });
}

async function handleLogin(req, res) {
  const { studentId, password } = await readBody(req);
  const id = String(studentId || '').trim();
  const student = readStudents()[id];
  if (!student || !verifyPassword(password || '', student.passwordHash)) {
    sendJson(res, 401, { error: 'Student ID or password does not match.' });
    return;
  }
  sendJson(res, 200, { student: publicStudent(student) });
}

function publicStudent(student) {
  return {
    id: student.id,
    name: student.name,
    phone: student.phone || '',
    profilePhoto: student.profilePhoto || ''
  };
}

async function handleProfileUpdate(req, res) {
  const { studentId, name, phone = '', password = '', profilePhoto = '' } = await readBody(req);
  const id = String(studentId || '').replace(/\D/g, '');
  const students = readStudents();
  const student = students[id];

  if (!student) {
    sendJson(res, 404, { error: 'Student account was not found.' });
    return;
  }
  if (!String(name || '').trim()) {
    sendJson(res, 400, { error: 'Name is required.' });
    return;
  }
  if (password && String(password).length < 6) {
    sendJson(res, 400, { error: 'Password must be at least 6 characters.' });
    return;
  }
  if (!isValidPhone(phone)) {
    sendJson(res, 400, { error: 'Enter a valid phone number.' });
    return;
  }
  if (profilePhoto && !String(profilePhoto).startsWith('data:image/')) {
    sendJson(res, 400, { error: 'Profile photo must be an image.' });
    return;
  }

  student.name = String(name).trim();
  student.phone = String(phone).trim();
  student.profilePhoto = String(profilePhoto);
  if (password) student.passwordHash = hashPassword(String(password));

  writeStudents(students);
  sendJson(res, 200, { student: publicStudent(student) });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  try {
    if (req.method === 'GET' && req.url === '/api') return sendApiDashboard(res);
    if (req.method === 'GET' && req.url === '/api/info') return sendApiInfo(res);
    if (req.method === 'POST' && req.url === '/api/signup') return handleSignup(req, res);
    if (req.method === 'POST' && req.url === '/api/login') return handleLogin(req, res);
    if (req.method === 'POST' && req.url === '/api/profile') return handleProfileUpdate(req, res);
    sendJson(res, 404, { error: 'Not found.' });
  } catch (error) {
    sendJson(res, 500, { error: 'Server error.' });
  }
});

server.listen(PORT, () => {
  console.log(`Course Planner backend running on http://localhost:${PORT}`);
});
