// ============================================================
// COURSE DATA — Full UIU BSc CSE Curriculum
// ============================================================
const GRADE_SCALE = [
  { letter: 'A', point: 4.00, marks: '90-100' },
  { letter: 'A-', point: 3.67, marks: '86-89' },
  { letter: 'B+', point: 3.33, marks: '82-85' },
  { letter: 'B', point: 3.00, marks: '78-81' },
  { letter: 'B-', point: 2.67, marks: '74-77' },
  { letter: 'C+', point: 2.33, marks: '70-73' },
  { letter: 'C', point: 2.00, marks: '66-69' },
  { letter: 'C-', point: 1.67, marks: '62-65' },
  { letter: 'D+', point: 1.33, marks: '58-61' },
  { letter: 'D', point: 1.00, marks: '55-57' }
];
const GRADES = Object.fromEntries(GRADE_SCALE.map(g => [g.letter, g.point]));
const GRADE_POINTS = GRADE_SCALE.map(g => g.point).sort((a, b) => a - b);

const AUTH_USERS_KEY = 'uiu_cse_planner_students';
const AUTH_SESSION_KEY = 'uiu_cse_planner_session';
const AUTH_REMEMBERED_KEY = 'uiu_cse_planner_remembered_accounts';
const LEGACY_PLANNER_KEY = 'uiu_cse_planner_v2';
const REQUIRED_COURSE_COUNT = 58;
const DEFAULT_TRIMESTER_COUNT = 12;
const API_BASE_URL = window.location.protocol === 'http:' || window.location.protocol === 'https:' ? '' : null;

const COURSE_DATA = [
  // TRIMESTER 1
  { id:'ENG1011', code:'ENG 1011', title:'Intensive English I', credits:3, trimester:1, cat:'language', type:'theory', prereq:'' },
  { id:'BDS1201', code:'BDS 1201', title:'History of the Emergence of Bangladesh', credits:2, trimester:1, cat:'general', type:'theory', prereq:'' },
  { id:'CSE1110', code:'CSE 1110', title:'Introduction to Computer Systems', credits:1, trimester:1, cat:'core', type:'theory', prereq:'' },
  { id:'MATH1151', code:'MATH 1151', title:'Fundamental Calculus', credits:3, trimester:1, cat:'math', type:'theory', prereq:'' },
  // TRIMESTER 2
  { id:'ENG1013', code:'ENG 1013', title:'Intensive English II', credits:3, trimester:2, cat:'language', type:'theory', prereq:'ENG 1011' },
  { id:'CSE1111', code:'CSE 1111', title:'Structured Programming Language', credits:3, trimester:2, cat:'core', type:'theory', prereq:'CSE 1110' },
  { id:'CSE1112', code:'CSE 1112', title:'Structured Programming Language Laboratory', credits:1, trimester:2, cat:'core', type:'lab', prereq:'CSE 1110' },
  { id:'CSE2213', code:'CSE 2213', title:'Discrete Mathematics', credits:3, trimester:2, cat:'math', type:'theory', prereq:'' },
  // TRIMESTER 3
  { id:'CSE1115', code:'CSE 1115', title:'Object Oriented Programming', credits:3, trimester:3, cat:'core', type:'theory', prereq:'CSE 1111' },
  { id:'CSE1116', code:'CSE 1116', title:'Object Oriented Programming Laboratory', credits:1, trimester:3, cat:'core', type:'lab', prereq:'CSE 1112' },
  { id:'MATH2183', code:'MATH 2183', title:'Calculus and Linear Algebra', credits:3, trimester:3, cat:'math', type:'theory', prereq:'MATH 1151' },
  { id:'PHY2105', code:'PHY 2105', title:'Physics', credits:3, trimester:3, cat:'science', type:'theory', prereq:'' },
  { id:'PHY2106', code:'PHY 2106', title:'Physics Laboratory', credits:1, trimester:3, cat:'science', type:'lab', prereq:'' },
  // TRIMESTER 4
  { id:'CSE1325', code:'CSE 1325', title:'Digital Logic Design', credits:3, trimester:4, cat:'core', type:'theory', prereq:'' },
  { id:'CSE1326', code:'CSE 1326', title:'Digital Logic Design Laboratory', credits:1, trimester:4, cat:'core', type:'lab', prereq:'' },
  { id:'CSE2215', code:'CSE 2215', title:'Data Structure and Algorithms I', credits:3, trimester:4, cat:'core', type:'theory', prereq:'CSE 1115' },
  { id:'CSE2216', code:'CSE 2216', title:'Data Structure and Algorithms I Laboratory', credits:1, trimester:4, cat:'core', type:'lab', prereq:'CSE 1116' },
  { id:'MATH2201', code:'MATH 2201', title:'Coordinate Geometry and Vector Analysis', credits:3, trimester:4, cat:'math', type:'theory', prereq:'MATH 1151' },
  // TRIMESTER 5
  { id:'MATH2205', code:'MATH 2205', title:'Probability and Statistics', credits:3, trimester:5, cat:'math', type:'theory', prereq:'MATH 1151' },
  { id:'SOC2101', code:'SOC 2101', title:'Society, Environment and Engineering Ethics', credits:3, trimester:5, cat:'general', type:'theory', prereq:'' },
  { id:'CSE2217', code:'CSE 2217', title:'Data Structure and Algorithms II', credits:3, trimester:5, cat:'core', type:'theory', prereq:'CSE 2215' },
  { id:'CSE2218', code:'CSE 2218', title:'Data Structure and Algorithms II Laboratory', credits:1, trimester:5, cat:'core', type:'lab', prereq:'CSE 2216' },
  { id:'EEE2113', code:'EEE 2113', title:'Electrical Circuits', credits:3, trimester:5, cat:'engineering', type:'theory', prereq:'' },
  // TRIMESTER 6
  { id:'CSE3521', code:'CSE 3521', title:'Database Management Systems', credits:3, trimester:6, cat:'core', type:'theory', prereq:'' },
  { id:'CSE3522', code:'CSE 3522', title:'Database Management Systems Laboratory', credits:1, trimester:6, cat:'core', type:'lab', prereq:'' },
  { id:'EEE2123', code:'EEE 2123', title:'Electronics', credits:3, trimester:6, cat:'engineering', type:'theory', prereq:'EEE 2113' },
  { id:'EEE2124', code:'EEE 2124', title:'Electronics Laboratory', credits:1, trimester:6, cat:'engineering', type:'lab', prereq:'' },
  { id:'CSE4165', code:'CSE 4165', title:'Web Programming', credits:3, trimester:6, cat:'core', type:'theory', prereq:'CSE 1115, CSE 1116' },
  // TRIMESTER 7
  { id:'CSE3313', code:'CSE 3313', title:'Computer Architecture', credits:3, trimester:7, cat:'core', type:'theory', prereq:'CSE 1325' },
  { id:'CSE2118', code:'CSE 2118', title:'Advanced Object Oriented Programming Lab', credits:1, trimester:7, cat:'core', type:'lab', prereq:'CSE 1116' },
  { id:'BIO3105', code:'BIO 3105', title:'Biology for Engineers', credits:3, trimester:7, cat:'science', type:'theory', prereq:'' },
  { id:'CSE3411', code:'CSE 3411', title:'System Analysis and Design', credits:3, trimester:7, cat:'core', type:'theory', prereq:'' },
  { id:'CSE3412', code:'CSE 3412', title:'System Analysis and Design Laboratory', credits:1, trimester:7, cat:'core', type:'lab', prereq:'' },
  // TRIMESTER 8
  { id:'CSE4325', code:'CSE 4325', title:'Microprocessors and Microcontrollers', credits:3, trimester:8, cat:'core', type:'theory', prereq:'CSE 3313' },
  { id:'CSE4326', code:'CSE 4326', title:'Microprocessors and Microcontrollers Laboratory', credits:1, trimester:8, cat:'core', type:'lab', prereq:'' },
  { id:'CSE3421', code:'CSE 3421', title:'Software Engineering', credits:3, trimester:8, cat:'core', type:'theory', prereq:'CSE 3411' },
  { id:'CSE3422', code:'CSE 3422', title:'Software Engineering Laboratory', credits:1, trimester:8, cat:'core', type:'lab', prereq:'CSE 3412' },
  { id:'CSE3811', code:'CSE 3811', title:'Artificial Intelligence', credits:3, trimester:8, cat:'core', type:'theory', prereq:'MATH 2205' },
  { id:'CSE3812', code:'CSE 3812', title:'Artificial Intelligence Laboratory', credits:1, trimester:8, cat:'core', type:'lab', prereq:'' },
  // TRIMESTER 9
  { id:'CSE2233', code:'CSE 2233', title:'Theory of Computation', credits:3, trimester:9, cat:'core', type:'theory', prereq:'' },
  { id:'GEDOPT1', code:'GED OPT1', title:'General Education Optional I', credits:3, trimester:9, cat:'ged', type:'theory', prereq:'', isOptional:true },
  { id:'PMG4101', code:'PMG 4101', title:'Project Management', credits:3, trimester:9, cat:'general', type:'theory', prereq:'CSE 3411' },
  { id:'CSE3711', code:'CSE 3711', title:'Computer Networks', credits:3, trimester:9, cat:'core', type:'theory', prereq:'' },
  { id:'CSE3712', code:'CSE 3712', title:'Computer Networks Laboratory', credits:1, trimester:9, cat:'core', type:'lab', prereq:'' },
  // TRIMESTER 10
  { id:'GEDOPT2', code:'GED OPT2', title:'General Education Optional II', credits:3, trimester:10, cat:'ged', type:'theory', prereq:'', isOptional:true },
  { id:'CSE4000A', code:'CSE 4000A', title:'Final Year Design Project I', credits:2, trimester:10, cat:'fydp', type:'fydp', prereq:'' },
  { id:'ELEC1', code:'CSE ELEC-1', title:'Elective I', credits:3, trimester:10, cat:'elective', type:'theory', prereq:'', isElective:true },
  { id:'CSE4509', code:'CSE 4509', title:'Operating Systems', credits:3, trimester:10, cat:'core', type:'theory', prereq:'' },
  { id:'CSE4510', code:'CSE 4510', title:'Operating Systems Laboratory', credits:1, trimester:10, cat:'core', type:'lab', prereq:'' },
  // TRIMESTER 11
  { id:'GEDOPT3', code:'GED OPT3', title:'General Education Optional III', credits:3, trimester:11, cat:'ged', type:'theory', prereq:'', isOptional:true },
  { id:'ELEC2', code:'CSE ELEC-2', title:'Elective II', credits:3, trimester:11, cat:'elective', type:'theory', prereq:'', isElective:true },
  { id:'ELEC3', code:'CSE ELEC-3', title:'Elective III', credits:3, trimester:11, cat:'elective', type:'theory', prereq:'', isElective:true },
  { id:'CSE4000B', code:'CSE 4000B', title:'Final Year Design Project II', credits:2, trimester:11, cat:'fydp', type:'fydp', prereq:'CSE 4000A' },
  { id:'CSE4531', code:'CSE 4531', title:'Computer Security', credits:3, trimester:11, cat:'core', type:'theory', prereq:'CSE 3711' },
  // TRIMESTER 12
  { id:'CSE4000C', code:'CSE 4000C', title:'Final Year Design Project III', credits:2, trimester:12, cat:'fydp', type:'fydp', prereq:'CSE 4000A, CSE 4000B' },
  { id:'EEE4261', code:'EEE 4261', title:'Green Computing', credits:3, trimester:12, cat:'engineering', type:'theory', prereq:'' },
  { id:'ELEC4', code:'CSE ELEC-4', title:'Elective IV', credits:3, trimester:12, cat:'elective', type:'theory', prereq:'', isElective:true },
  { id:'ELEC5', code:'CSE ELEC-5', title:'Elective V', credits:3, trimester:12, cat:'elective', type:'theory', prereq:'', isElective:true },
];

const ELECTIVE_OPTIONS = [
  'CSE 4889 — Machine Learning','CSE 4891 — Data Mining','CSE 4883 — Digital Image Processing',
  'CSE 4817 — Big Data Analytics','CSE 4893 — Intro to Bioinformatics',
  'CSE 4587 — Cloud Computing','CSE 4519 — Distributed Systems','CSE 4523 — Simulation & Modeling',
  'CSE 4567 — Advanced DBMS','CSE 4547 — Multimedia Systems Design',
  'CSE 4777 — Network Security','CSE 4783 — Cryptography','CSE 4759 — Wireless & Cellular Comm.',
  'CSE 4793 — Advanced Network Services','CSE 4763 — Electronic Business',
  'CSE 4451 — Human Computer Interaction','CSE 4435 — Software Architecture',
  'CSE 4495 — Software Testing & QA','CSE 4485 — Game Design and Development',
  'CSE 4181 — Mobile Application Development',
  'CSE 4329 — Digital System Design','CSE 4379 — Real-time Embedded Systems',
  'CSE 4327 — VLSI Design','CSE 4337 — Robotics','CSE 4397 — Interfacing',
  'CSE 4601 — Mathematical Analysis for CS','CSE 4633 — Basic Graph Theory',
  'CSE 4655 — Algorithm Engineering','CSE 4611 — Compiler Design',
  'CSE 4621 — Computer Graphics',
  'CSE 4941 — Enterprise Systems','CSE 4943 — Web Application Security',
  'CSE 4945 — UI: Concepts and Design','CSE 4949 — IT Audit'
];

const GED_OPTIONS = [
  'ECO 4101 — Economics','SOC 4101 — Introduction to Sociology',
  'ACT 2111 — Financial & Managerial Accounting','IPE 3401 — Industrial & Operational Management',
  'TEC 2499 — Technology Entrepreneurship','PSY 2101 — Psychology',
  'BDS 2201 — Bangladesh Studies','BAN 2501 — Bangla'
];

const MAJOR_OPTIONS = [
  'Major: Artificial Intelligence',
  'Major: Data Science',
  'Major: Software Engineering',
  'Major: Cyber Security',
  'Major: Computer Networks',
  'Major: Embedded Systems and Robotics',
  'Major: Human Computer Interaction',
  'Major: Game Development'
];

const CAT_LABELS = {
  language:'Language', general:'General Education', ged:'GED Optional',
  science:'Basic Science', math:'Mathematics', engineering:'Other Engineering',
  core:'Core Course', elective:'Elective', major:'Major', fydp:'FYDP'
};
const CAT_DOTS = {
  language:'dot-language', general:'dot-general', ged:'dot-ged',
  science:'dot-science', math:'dot-math', engineering:'dot-engineering',
  core:'dot-core', elective:'dot-elective', major:'dot-major', fydp:'dot-fydp'
};

const DEFAULT_CAT_ORDER = {
  core: 0,
  fydp: 1,
  elective: 2,
  major: 2,
  ged: 3,
  math: 4,
  science: 5,
  engineering: 6,
  language: 7,
  general: 8
};

// ============================================================
// STATE MANAGEMENT
// ============================================================
let state = {
  courses: JSON.parse(JSON.stringify(COURSE_DATA)), // deep copy
  completion: {},  // { courseId: bool }
  grades: {},      // { courseId: gradeStr }
  electiveNames: {}, // { courseId: name }
  electiveTypes: {}, // { courseId: elective|major|ged|custom }
  currentView: 'dashboard',
  currentTrimester: null,
  dashboardCategory: null,
  viewMode: 'list', // list or grid
  filterCat: 'all',
  searchQuery: '',
  editingId: null,
  theme: 'dark',
  activeStudent: null,
  assigningRemovedCourse: false,
  assigningRemovedCourseId: null,
  removedCourseIds: {},
  trimesterCount: DEFAULT_TRIMESTER_COUNT,
  cgpaError: ''
};
let pendingRememberAccount = null;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getStudentInitial(student = state.activeStudent) {
  return (student?.name || 'Student').charAt(0).toUpperCase();
}

function renderStudentAvatar(student = state.activeStudent, className = 'top-user-avatar') {
  const photo = student?.profilePhoto;
  if (photo) {
    return `<img class="${className}" src="${photo}" alt="${escapeHtml(student?.name || 'Student')} profile photo">`;
  }
  return `<span class="${className}">${getStudentInitial(student)}</span>`;
}

function getDefaultPlannerState() {
  return {
    courses: JSON.parse(JSON.stringify(COURSE_DATA)),
    completion: {},
    grades: {},
    electiveNames: {},
    electiveTypes: {},
    currentView: 'dashboard',
    currentTrimester: null,
    dashboardCategory: null,
    viewMode: 'list',
    filterCat: 'all',
    searchQuery: '',
    editingId: null,
    theme: state.theme || 'dark',
    activeStudent: state.activeStudent,
    assigningRemovedCourse: false,
    assigningRemovedCourseId: null,
    removedCourseIds: {},
    trimesterCount: DEFAULT_TRIMESTER_COUNT,
    cgpaError: ''
  };
}

function getPlannerStorageKey() {
  return state.activeStudent ? `${LEGACY_PLANNER_KEY}_${state.activeStudent.id}` : LEGACY_PLANNER_KEY;
}

function loadState() {
  try {
    const saved = localStorage.getItem(getPlannerStorageKey());
    if (saved) {
      const data = JSON.parse(saved);
      state.completion = data.completion || {};
      state.grades = data.grades || {};
      state.electiveNames = data.electiveNames || {};
      state.electiveTypes = data.electiveTypes || {};
      state.removedCourseIds = data.removedCourseIds || {};
      state.trimesterCount = Math.max(DEFAULT_TRIMESTER_COUNT, Number(data.trimesterCount) || DEFAULT_TRIMESTER_COUNT);
      state.viewMode = data.viewMode || 'list';
      state.theme = data.theme || 'dark';
      // Merge custom courses
      if (data.customCourses && data.customCourses.length > 0) {
        state.courses = [...JSON.parse(JSON.stringify(COURSE_DATA)), ...data.customCourses];
      }
    }
  } catch(e) { console.warn('Could not load state:', e); }
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeBtn').textContent = state.theme === 'dark' ? '🌙' : '☀️';
}

function saveState() {
  const customCourses = state.courses.filter(c => c.isCustom);
  localStorage.setItem(getPlannerStorageKey(), JSON.stringify({
    completion: state.completion,
    grades: state.grades,
    electiveNames: state.electiveNames,
    electiveTypes: state.electiveTypes,
    removedCourseIds: state.removedCourseIds,
    trimesterCount: state.trimesterCount,
    viewMode: state.viewMode,
    theme: state.theme,
    customCourses
  }));
}

// ============================================================
// AUTH
// ============================================================
function getStudents() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || {};
  } catch(e) {
    return {};
  }
}

function saveStudents(students) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(students));
}

function getRememberedAccounts() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_REMEMBERED_KEY)) || {};
  } catch(e) {
    return {};
  }
}

function saveRememberedAccounts(accounts) {
  localStorage.setItem(AUTH_REMEMBERED_KEY, JSON.stringify(accounts));
}

function rememberAccount(student, password) {
  if (!student?.id || !password) return;
  const accounts = getRememberedAccounts();
  accounts[student.id] = {
    id: student.id,
    name: student.name,
    profilePhoto: student.profilePhoto || '',
    password,
    savedAt: Date.now()
  };
  saveRememberedAccounts(accounts);
}

function refreshRememberedAccountProfile(student, password = null) {
  if (!student?.id) return;
  const accounts = getRememberedAccounts();
  if (!accounts[student.id]) return;
  accounts[student.id] = {
    ...accounts[student.id],
    name: student.name,
    profilePhoto: student.profilePhoto || accounts[student.id].profilePhoto || ''
  };
  if (password) accounts[student.id].password = password;
  saveRememberedAccounts(accounts);
}

function forgetRememberedAccount(studentId) {
  const accounts = getRememberedAccounts();
  delete accounts[studentId];
  saveRememberedAccounts(accounts);
}

function normalizeStudentId(id) {
  return String(id || '').replace(/\D/g, '');
}

function isValidUIUStudentId(id) {
  return /^\d{10}$/.test(id);
}

function keepStudentIdNumeric(input) {
  input.value = normalizeStudentId(input.value).slice(0, 10);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

async function postAuthApi(path, payload) {
  if (!API_BASE_URL) return { unavailable: true };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), path === '/api/profile' ? 5000 : 1500);
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 404 && !data.detail && !data.error) return { unavailable: true };
    return {
      ok: response.ok,
      status: response.status,
      data,
      error: data.detail || data.error || 'Request failed'
    };
  } catch (error) {
    return { unavailable: true };
  } finally {
    clearTimeout(timeout);
  }
}

function getCurrentLocalStudent() {
  if (!state.activeStudent?.id) return null;
  return getStudents()[state.activeStudent.id] || state.activeStudent;
}

function saveLocalProfile(profile, password) {
  const students = getStudents();
  const existing = students[profile.id] || { id: profile.id };
  students[profile.id] = {
    ...existing,
    id: profile.id,
    name: profile.name,
    phone: profile.phone || '',
    profilePhoto: profile.profilePhoto || ''
  };
  if (password) students[profile.id].password = password;
  saveStudents(students);
}

function updateActiveStudentProfile(student, password = null) {
  const session = {
    id: student.id,
    name: student.name,
    phone: student.phone || '',
    profilePhoto: student.profilePhoto || ''
  };
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  state.activeStudent = session;
  refreshRememberedAccountProfile(session, password);
  updateAuthUI();
  renderSidebar();
  if (state.currentView === 'dashboard') {
    renderDashboard();
  }
}

function resizeImageFile(file, maxSize = 360) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read image'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Could not load image'));
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function previewProfilePhoto(input) {
  const file = input.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Choose an image file', 'error');
    input.value = '';
    return;
  }
  if (file.size > 4 * 1024 * 1024) {
    showToast('Profile photo must be under 4 MB', 'error');
    input.value = '';
    return;
  }

  try {
    const dataUrl = await resizeImageFile(file);
    document.getElementById('profilePhotoData').value = dataUrl;
    document.getElementById('profilePhotoPreview').innerHTML = `<img src="${dataUrl}" alt="Profile photo preview">`;
  } catch (error) {
    showToast('Could not prepare this image', 'error');
  }
}

function removeProfilePhoto() {
  document.getElementById('profilePhotoData').value = '';
  document.getElementById('profilePhotoInput').value = '';
  document.getElementById('profilePhotoPreview').innerHTML = `<span>${getStudentInitial()}</span>`;
}

function openProfileModal() {
  if (!state.activeStudent) return;
  const profile = { ...getCurrentLocalStudent(), ...state.activeStudent };
  document.getElementById('addCourseModal').classList.add('open');
  document.querySelector('.modal').innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Edit Profile</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="profile-photo-row">
      <div class="profile-photo-preview" id="profilePhotoPreview">
        ${profile.profilePhoto ? `<img src="${profile.profilePhoto}" alt="Profile photo preview">` : `<span>${getStudentInitial(profile)}</span>`}
      </div>
      <div class="profile-photo-actions">
        <label class="btn btn-secondary" for="profilePhotoInput">Choose Photo</label>
        <button class="btn btn-ghost" type="button" onclick="removeProfilePhoto()">Remove</button>
        <input id="profilePhotoInput" class="sr-only" type="file" accept="image/*" onchange="previewProfilePhoto(this)">
        <input id="profilePhotoData" type="hidden" value="${escapeHtml(profile.profilePhoto || '')}">
      </div>
    </div>
    <div class="form-row">
      <label class="form-label">Full Name</label>
      <input class="form-input" id="profileName" value="${escapeHtml(profile.name || '')}" autocomplete="name" required>
    </div>
    <div class="form-row">
      <label class="form-label">Phone Number</label>
      <input class="form-input" id="profilePhone" value="${escapeHtml(profile.phone || '')}" inputmode="tel" placeholder="+880 1XXXXXXXXX" autocomplete="tel">
    </div>
    <div class="form-row">
      <label class="form-label">UIU Student ID</label>
      <input class="form-input" value="${escapeHtml(profile.id)}" disabled>
    </div>
    <div class="form-row">
      <label class="form-label">New Password</label>
      <input class="form-input" id="profilePassword" type="password" placeholder="Leave blank to keep current password" autocomplete="new-password">
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveProfile()">Save Profile</button>
    </div>
  `;
}

async function saveProfile() {
  const id = state.activeStudent?.id;
  const name = document.getElementById('profileName').value.trim();
  const phone = document.getElementById('profilePhone').value.trim();
  const password = document.getElementById('profilePassword').value;
  const profilePhoto = document.getElementById('profilePhotoData').value;

  if (!id || !name) {
    showToast('Name is required', 'error');
    return;
  }
  if (password && password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }
  if (phone && !/^[\d\s()+-]{7,20}$/.test(phone)) {
    showToast('Enter a valid phone number', 'error');
    return;
  }

  const payload = { studentId: id, name, phone, password, profilePhoto };
  const apiResult = await postAuthApi('/api/profile', payload);
  if (apiResult.ok) {
    updateActiveStudentProfile(apiResult.data.student, password || null);
    closeModal();
    showToast('Profile updated', 'success');
    return;
  }
  if (apiResult.status && !apiResult.unavailable) {
    showToast(apiResult.error, 'error');
    return;
  }

  const profile = { id, name, phone, profilePhoto };
  saveLocalProfile(profile, password);
  updateActiveStudentProfile(profile, password || null);
  closeModal();
  showToast('Profile updated', 'success');
}

function showLoginPage() {
  document.getElementById('loginPage').hidden = false;
  document.getElementById('signupPage').hidden = true;
  document.getElementById('loginTab').classList.add('active');
  document.getElementById('signupTab').classList.remove('active');
}

function showSignupPage() {
  document.getElementById('loginPage').hidden = true;
  document.getElementById('signupPage').hidden = false;
  document.getElementById('loginTab').classList.remove('active');
  document.getElementById('signupTab').classList.add('active');
}

async function signupStudent(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const id = normalizeStudentId(document.getElementById('signupStudentId').value);
  const password = document.getElementById('signupPassword').value;

  if (!name || !email || !id || !password) {
    showToast('Please fill all sign up fields', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showToast('Enter a valid email address', 'error');
    return;
  }
  if (!isValidUIUStudentId(id)) {
    showToast('Student ID must be exactly 10 digits', 'error');
    return;
  }
  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }

  const apiResult = await postAuthApi('/api/signup', { name, email, studentId: id, password });
  if (apiResult.ok) {
    setActiveStudent(apiResult.data.student);
    openRememberAccountPrompt(apiResult.data.student, password);
    showToast('Account created and logged in', 'success');
    return;
  }
  if (apiResult.status === 409) {
    showToast('This student ID already has an account', 'error');
    document.getElementById('loginStudentId').value = id;
    showLoginPage();
    return;
  }
  if (apiResult.status && !apiResult.unavailable) {
    showToast(apiResult.error, 'error');
    return;
  }

  const students = getStudents();
  if (students[id]) {
    showToast('This student ID already has an account', 'error');
    document.getElementById('loginStudentId').value = id;
    showLoginPage();
    return;
  }

  students[id] = { id, name, email, password };
  saveStudents(students);
  document.getElementById('loginStudentId').value = id;
  document.getElementById('loginPassword').value = password;
  setActiveStudent(students[id]);
  openRememberAccountPrompt(students[id], password);
  showToast('Account created and logged in', 'success');
}

async function loginStudent(event) {
  event.preventDefault();
  const id = normalizeStudentId(document.getElementById('loginStudentId').value);
  const password = document.getElementById('loginPassword').value;

  if (!id || !password) {
    showToast('Enter your student ID and password', 'error');
    return;
  }
  if (!isValidUIUStudentId(id)) {
    showToast('Student ID must be exactly 10 digits', 'error');
    return;
  }

  const apiResult = await postAuthApi('/api/login', { studentId: id, password });
  if (apiResult.ok) {
    setActiveStudent(apiResult.data.student);
    openRememberAccountPrompt(apiResult.data.student, password);
    showToast('Logged in', 'success');
    return;
  }
  if (apiResult.status === 401) {
    showToast('Student ID or password does not match', 'error');
    return;
  }
  if (apiResult.status && !apiResult.unavailable) {
    showToast(apiResult.error, 'error');
    return;
  }

  const students = getStudents();
  const student = students[id];
  if (!student) {
    showToast('No account found. Please sign up first.', 'error');
    document.getElementById('signupStudentId').value = id;
    showSignupPage();
    return;
  }
  if (student.password !== password) {
    showToast('Student ID or password does not match', 'error');
    return;
  }

  setActiveStudent(student);
  openRememberAccountPrompt(student, password);
  showToast('Logged in', 'success');
}

function setActiveStudent(student) {
  const session = {
    id: student.id,
    name: student.name,
    phone: student.phone || '',
    profilePhoto: student.profilePhoto || ''
  };
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  state.activeStudent = session;
  state = { ...getDefaultPlannerState(), activeStudent: session };
  try {
    startPlanner();
  } catch (error) {
    console.error('Could not open dashboard:', error);
    forceOpenDashboardShell(session);
    showToast('Logged in, but some dashboard data could not load', 'error');
  }
}

function openRememberAccountPrompt(student, password) {
  pendingRememberAccount = {
    student: { id: student.id, name: student.name, profilePhoto: student.profilePhoto || '' },
    password
  };
  document.getElementById('addCourseModal').classList.add('open');
  document.querySelector('.modal').innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Save Login?</h3>
      <button class="modal-close" onclick="declineRememberAccount('${student.id}')">✕</button>
    </div>
    <div class="remember-account-box">
      ${renderStudentAvatar(student, 'remember-account-avatar')}
      <div>
        <strong>${escapeHtml(student.name)}</strong>
        <span>${escapeHtml(student.id)}</span>
      </div>
    </div>
    <div class="cgpa-help">
      Save this ID and password on this browser so you can switch back to this account from the top name button. Only save it on your own device.
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="declineRememberAccount('${student.id}')">Don't Save</button>
      <button class="btn btn-primary" onclick="confirmRememberAccount()">Save Login</button>
    </div>
  `;
}

function confirmRememberAccount() {
  if (!pendingRememberAccount) return;
  rememberAccount(pendingRememberAccount.student, pendingRememberAccount.password);
  pendingRememberAccount = null;
  closeModal();
  updateAuthUI();
  showToast('Login saved for switching', 'success');
}

function declineRememberAccount(studentId) {
  forgetRememberedAccount(studentId);
  pendingRememberAccount = null;
  closeModal();
  updateAuthUI();
  showToast('Login not saved', 'info');
}

function getActiveStudent() {
  try {
    const session = JSON.parse(localStorage.getItem(AUTH_SESSION_KEY));
    return session && session.id ? session : null;
  } catch(e) {
    return null;
  }
}

function logoutStudent() {
  localStorage.removeItem(AUTH_SESSION_KEY);
  state.activeStudent = null;
  document.getElementById('appWrapper').hidden = true;
  document.getElementById('authView').hidden = false;
  document.getElementById('appWrapper').style.display = 'none';
  document.getElementById('authView').style.display = '';
  showLoginPage();
  showToast('Logged out', 'info');
}

function openAccountSwitcher() {
  if (!state.activeStudent) return;

  const accounts = getRememberedAccounts();
  const remembered = Object.values(accounts);
  const currentSaved = !!accounts[state.activeStudent.id];

  if (!currentSaved) {
    document.getElementById('addCourseModal').classList.add('open');
    document.querySelector('.modal').innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Account Switching Disabled</h3>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="cgpa-help">
        This login was not saved, so account switching is unavailable for this session. Log out and log in again, then choose Save Login to enable switching.
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="closeModal()">OK</button>
      </div>
    `;
    return;
  }

  const otherAccounts = remembered.filter(account => account.id !== state.activeStudent.id);
  const accountRows = otherAccounts.length ? otherAccounts.map(account => `
    <div class="switch-account-row">
      <button class="switch-account-main" type="button" onclick="switchRememberedAccount('${account.id}')">
        ${renderStudentAvatar(account, 'switch-account-avatar')}
        <span>
          <strong>${escapeHtml(account.name)}</strong>
          <small>${escapeHtml(account.id)}</small>
        </span>
      </button>
      <button class="switch-account-forget" type="button" onclick="removeSavedAccountFromSwitcher('${account.id}')" title="Forget saved login">✕</button>
    </div>
  `).join('') : `
    <div class="empty-switcher-state">
      No other saved accounts yet.
    </div>
  `;

  document.getElementById('addCourseModal').classList.add('open');
  document.querySelector('.modal').innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Switch Account</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="remember-account-box">
      ${renderStudentAvatar(state.activeStudent, 'remember-account-avatar')}
      <div>
        <strong>${escapeHtml(state.activeStudent.name)}</strong>
        <span>Current account</span>
      </div>
    </div>
    <div class="switch-account-list">${accountRows}</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
    </div>
  `;
}

async function switchRememberedAccount(studentId) {
  const account = getRememberedAccounts()[studentId];
  if (!account) {
    showToast('Saved login was not found', 'error');
    openAccountSwitcher();
    return;
  }

  const apiResult = await postAuthApi('/api/login', { studentId: account.id, password: account.password });
  if (apiResult.ok) {
    closeModal();
    setActiveStudent(apiResult.data.student);
    showToast(`Switched to ${apiResult.data.student.name}`, 'success');
    return;
  }
  const apiError = apiResult.status && !apiResult.unavailable ? apiResult.error : null;

  const localStudent = getStudents()[account.id];
  if (!localStudent || localStudent.password !== account.password) {
    showToast(apiError || 'Saved login no longer works', 'error');
    return;
  }

  closeModal();
  setActiveStudent(localStudent);
  showToast(`Switched to ${localStudent.name}`, 'success');
}

function removeSavedAccountFromSwitcher(studentId) {
  forgetRememberedAccount(studentId);
  if (state.activeStudent?.id === studentId) updateAuthUI();
  openAccountSwitcher();
  showToast('Saved login removed', 'info');
}

function updateAuthUI() {
  const isLoggedIn = !!state.activeStudent;
  document.getElementById('authView').hidden = isLoggedIn;
  document.getElementById('appWrapper').hidden = !isLoggedIn;
  document.getElementById('authView').style.display = isLoggedIn ? 'none' : '';
  document.getElementById('appWrapper').style.display = isLoggedIn ? 'grid' : 'none';
  if (isLoggedIn) {
    const savedCount = Object.keys(getRememberedAccounts()).length;
    document.getElementById('studentBadge').innerHTML = `${renderStudentAvatar()}<span>${escapeHtml(state.activeStudent.name)}</span>${savedCount ? `<span class="switch-count">${savedCount}</span>` : ''}`;
  }
}

function forceOpenDashboardShell(session) {
  document.getElementById('authView').hidden = true;
  document.getElementById('authView').style.display = 'none';
  document.getElementById('appWrapper').hidden = false;
  document.getElementById('appWrapper').style.display = 'grid';
  document.getElementById('studentBadge').innerHTML = `${renderStudentAvatar(session)}<span>${escapeHtml(session.name)}</span>`;
  const main = document.getElementById('mainContent');
  if (main && !main.innerHTML.trim()) {
    main.innerHTML = `
      <div class="empty-state">
        <h3>Dashboard opened</h3>
        <p>Please refresh once if the course list does not appear.</p>
      </div>
    `;
  }
}

// ============================================================
// COMPUTED HELPERS
// ============================================================
function getTrimesterCount() {
  const maxCourseTrimester = state.courses.reduce((max, course) => Math.max(max, course.trimester || 0), 0);
  return Math.max(DEFAULT_TRIMESTER_COUNT, state.trimesterCount || DEFAULT_TRIMESTER_COUNT, maxCourseTrimester);
}

function getStudentStartTrimesterCode() {
  const id = normalizeStudentId(state.activeStudent?.id || '');
  const code = id.slice(3, 6);
  return /^\d{3}$/.test(code) ? code : null;
}

function getTrimesterCode(trimesterNumber) {
  const startCode = getStudentStartTrimesterCode();
  if (!startCode) return null;

  let year = Number(startCode.slice(0, 2));
  let term = Number(startCode.slice(2));
  if (!Number.isFinite(year) || ![1, 2, 3].includes(term)) return null;

  for (let i = 1; i < trimesterNumber; i++) {
    term += 1;
    if (term > 3) {
      term = 1;
      year += 1;
    }
  }
  return `${String(year).padStart(2, '0')}${term}`;
}

function getTrimesterLabel(t) {
  const code = getTrimesterCode(t);
  return `Trimester ${t}${code ? ` (${code})` : ''}`;
}

function getCoursesForTrimester(t) {
  return state.courses.filter(c => c.trimester === t && !state.removedCourseIds[c.id]);
}
function getActiveCourses() {
  return state.courses.filter(c => !state.removedCourseIds[c.id]);
}
function getTrimesterStats(t) {
  const courses = getCoursesForTrimester(t);
  const total = courses.length;
  const totalCredits = courses.reduce((s,c) => s + c.credits, 0);
  const done = courses.filter(c => state.completion[c.id]).length;
  const doneCredits = courses.filter(c => state.completion[c.id]).reduce((s,c) => s + c.credits, 0);
  return { total, totalCredits, done, doneCredits, pct: total ? Math.round((done/total)*100) : 0 };
}
function getOverallStats() {
  const all = getActiveCourses();
  const total = all.length;
  const totalCredits = all.reduce((s,c) => s + c.credits, 0);
  const done = all.filter(c => state.completion[c.id]).length;
  const doneCredits = all.filter(c => state.completion[c.id]).reduce((s,c) => s + c.credits, 0);
  const pct = total ? Math.round((done/total)*100) : 0;
  return { total, totalCredits, done, doneCredits, pct, remaining: total - done };
}
function getGradePoint(grade) {
  if (!grade || grade === 'none') return null;
  if (GRADES[grade] !== undefined) return GRADES[grade];
  const numeric = Number(grade);
  return Number.isFinite(numeric) ? numeric : null;
}
function calcGPA() {
  let totalPoints = 0, totalCredits = 0;
  getActiveCourses().forEach(c => {
    if (state.completion[c.id] && state.grades[c.id] && state.grades[c.id] !== 'none') {
      const gp = getGradePoint(state.grades[c.id]);
      if (gp !== null) {
        totalPoints += gp * c.credits;
        totalCredits += c.credits;
      }
    }
  });
  if (totalCredits === 0) return null;
  return (totalPoints / totalCredits).toFixed(2);
}
function calcTrimesterGPA(t) {
  let tp = 0, tc = 0;
  getCoursesForTrimester(t).forEach(c => {
    if (state.completion[c.id] && state.grades[c.id] && state.grades[c.id] !== 'none') {
      const gp = getGradePoint(state.grades[c.id]);
      if (gp !== null) { tp += gp * c.credits; tc += c.credits; }
    }
  });
  return tc > 0 ? (tp/tc).toFixed(2) : null;
}
function getRemovedCourseIds() {
  return Object.keys(state.removedCourseIds || {}).filter(id => state.removedCourseIds[id]);
}
function getRemovedCourses() {
  return getRemovedCourseIds()
    .map(id => state.courses.find(c => c.id === id))
    .filter(Boolean);
}
function getRemovedCourseCountForTrimester(t) {
  return getRemovedCourses().filter(c => c.trimester === t).length;
}
function isRemovedCourseAssigned(removedCourse) {
  return state.courses.some(c =>
    c.isCustom &&
    c.replacesRemovedCourse &&
    !state.removedCourseIds[c.id] &&
    (
      c.replacesRemovedCourseId === removedCourse.id ||
      (!c.replacesRemovedCourseId && c.code === removedCourse.code)
    )
  );
}
function getAssignedRemovedCourseCount() {
  return getRemovedCourses().filter(isRemovedCourseAssigned).length;
}
function getAssignedRemovedCourseCountForTrimester(t) {
  return getRemovedCourses().filter(c => c.trimester === t && isRemovedCourseAssigned(c)).length;
}
function getRemovedAssignmentStatus() {
  const removed = getRemovedCourseIds().length;
  const assigned = getAssignedRemovedCourseCount();
  return {
    removed,
    assigned,
    remaining: Math.max(0, removed - assigned),
    isAssigned: removed > 0 && assigned >= removed
  };
}
function getUnassignedRemovedCourseCountForTrimester(t) {
  const removed = getRemovedCourseCountForTrimester(t);
  const assigned = getAssignedRemovedCourseCountForTrimester(t);
  return Math.max(0, removed - assigned);
}
function renderRemovedAssignmentNotice(compact=false) {
  const status = getRemovedAssignmentStatus();
  if (!status.removed || status.isAssigned) return '';
  const label = status.removed === 1 ? 'Add removed course' : 'Add removed courses';
  return `
    <button class="removed-assignment-label needs-work ${compact ? 'compact' : ''}" onclick="openAddModal(${state.currentTrimester || 1}, true)">
      ${label}
    </button>
  `;
}

// ============================================================
// SIDEBAR RENDERING
// ============================================================
function renderSidebar() {
  const nav = document.getElementById('trimNav');
  let html = '';
  for (let t = 1; t <= getTrimesterCount(); t++) {
    const s = getTrimesterStats(t);
    const isActive = state.currentView === 'trimester' && state.currentTrimester === t;
    const removedCount = getUnassignedRemovedCourseCountForTrimester(t);
    html += `
      <div>
        <button class="trim-btn ${isActive ? 'active' : ''}" onclick="showTrimester(${t})">
          <span class="trim-label">
            <span class="trim-num">${t}</span>
            ${getTrimesterLabel(t)}
          </span>
          <span class="trim-status">
            ${removedCount ? `<span class="trim-removed-badge" title="${removedCount} removed course${removedCount === 1 ? '' : 's'}">${removedCount}</span>` : ''}
            <span class="trim-badge">${s.done}/${s.total}</span>
          </span>
        </button>
        <div class="trim-progress-mini">
          <div class="trim-progress-mini-fill" style="width:${s.pct}%"></div>
        </div>
      </div>
    `;
  }
  nav.innerHTML = html;

  // Active dash btn
  const dashBtn = document.getElementById('dashBtn');
  dashBtn.classList.toggle('active', state.currentView === 'dashboard');

  // Overview stats
  const ov = getOverallStats();
  document.getElementById('ov_total').textContent = ov.total;
  document.getElementById('ov_done').textContent = ov.done;
  document.getElementById('ov_remaining').textContent = ov.remaining;
  document.getElementById('ov_credits').textContent = ov.totalCredits;
  document.getElementById('ov_cdone').textContent = ov.doneCredits;
  const gpa = calcGPA();
  document.getElementById('ov_gpa').textContent = gpa || '—';
  document.getElementById('topbarGpa').textContent = gpa || '—';
  updateCgpaErrorBadge();
}

// ============================================================
// DASHBOARD VIEW
// ============================================================
function showDashboard() {
  state.currentView = 'dashboard';
  state.currentTrimester = null;
  state.dashboardCategory = null;
  renderSidebar();
  renderDashboard();
  closeSidebar();
}

function getCategoryStats(cat) {
  const courses = getActiveCourses().filter(c => c.cat === cat);
  const done = courses.filter(c => state.completion[c.id]).length;
  const credits = courses.reduce((sum, course) => sum + course.credits, 0);
  const doneCredits = courses
    .filter(c => state.completion[c.id])
    .reduce((sum, course) => sum + course.credits, 0);
  const pct = courses.length ? Math.round((done / courses.length) * 100) : 0;
  return { courses, done, credits, doneCredits, pct };
}

function renderCategoryOverview(cat) {
  const label = CAT_LABELS[cat] || cat;
  const stats = getCategoryStats(cat);
  const cards = stats.courses.map(course => {
    const isCompleted = !!state.completion[course.id];
    const grade = state.grades[course.id];
    const gradePoint = getGradePoint(grade);
    return `
      <button class="category-course-card" type="button" onclick="showTrimester(${course.trimester})">
        <div class="category-course-top">
          <span class="course-code">${course.code}</span>
          <span class="course-tag tag-cat">${getTrimesterLabel(course.trimester)}</span>
        </div>
        <div class="category-course-title">${getDisplayName(course)}</div>
        <div class="category-course-meta">
          <span>${course.credits} cr</span>
          <span class="${isCompleted ? 'done' : ''}">${isCompleted ? 'Completed' : 'Pending'}</span>
          <span>${gradePoint !== null ? gradePoint.toFixed(2) : 'No CGPA'}</span>
        </div>
      </button>
    `;
  }).join('');

  return `
    <div class="dashboard-header" style="margin-bottom:14px">
      <h3 style="font-size:16px;font-weight:700">${label} Overview</h3>
      <p>${stats.done}/${stats.courses.length} courses completed · ${stats.doneCredits}/${stats.credits} credits earned</p>
    </div>
    <div class="category-course-grid">${cards}</div>
  `;
}

function renderDashboard() {
  const ov = getOverallStats();
  const gpa = calcGPA();
  const studentName = state.activeStudent?.name || 'Student';
  const studentPhone = state.activeStudent?.phone || '';
  const missingCount = Math.max(0, REQUIRED_COURSE_COUNT - ov.total);
  const removedAssignmentNotice = renderRemovedAssignmentNotice();
  const courseCountNotice = missingCount > 0 ? `
    <div class="course-count-alert">
      <strong>${missingCount} course${missingCount === 1 ? '' : 's'} still not added.</strong>
      Your plan currently has ${ov.total}/${REQUIRED_COURSE_COUNT} courses.
    </div>
  ` : '';

  let triCardsHtml = '';
  for (let t = 1; t <= getTrimesterCount(); t++) {
    const s = getTrimesterStats(t);
    triCardsHtml += `
      <div class="tri-card" onclick="showTrimester(${t})">
        <div class="tri-card-header">
          <span class="tri-card-num">${getTrimesterLabel(t)}</span>
          <span class="tri-card-credits">${s.totalCredits} cr</span>
        </div>
        <div class="tri-card-bar">
          <div class="tri-card-bar-fill" style="width:${s.pct}%"></div>
        </div>
        <div class="tri-card-stats">
          <span class="${s.done === s.total && s.total > 0 ? 'done' : ''}">${s.done}/${s.total} done</span>
          <span>${s.pct}%</span>
        </div>
      </div>
    `;
  }
  const overviewHtml = state.dashboardCategory ? renderCategoryOverview(state.dashboardCategory) : `
    <div class="dashboard-header" style="margin-bottom:14px">
      <h3 style="font-size:16px;font-weight:700">Trimester Overview</h3>
      <p>Click any trimester to view and manage courses</p>
    </div>
    <div class="tri-grid">
      ${triCardsHtml}
      <button class="tri-card add-trimester-card" onclick="addTrimester()" title="Add empty trimester">
        <span>＋</span>
        <strong>Add Trimester</strong>
      </button>
    </div>
  `;

  document.getElementById('mainContent').innerHTML = `
    <div class="fade-in">
      <div class="dashboard-hero">
        <div class="dashboard-hero-copy">
          <div class="dashboard-kicker">Academic Dashboard</div>
          <h2>Welcome ${escapeHtml(studentName)}!</h2>
          <p>B.Sc. in Computer Science & Engineering · United International University</p>
        </div>
        <button class="dashboard-user-card" type="button" onclick="openProfileModal()" title="Edit profile">
          ${renderStudentAvatar(state.activeStudent, 'dashboard-user-icon')}
          <div>
            <div class="dashboard-user-name">${escapeHtml(studentName)}</div>
            <div class="dashboard-user-id">${state.activeStudent?.id || 'UIU Student'}</div>
            ${studentPhone ? `<div class="dashboard-user-phone">${escapeHtml(studentPhone)}</div>` : ''}
          </div>
        </button>
      </div>
      ${courseCountNotice}
      ${removedAssignmentNotice}

      <div class="stats-grid">
        <div class="stat-card blue">
          <div class="stat-icon">📚</div>
          <div class="stat-value">${ov.total}</div>
          <div class="stat-label">Total Courses</div>
        </div>
        <div class="stat-card green">
          <div class="stat-icon">✅</div>
          <div class="stat-value">${ov.done}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-card orange">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">${ov.doneCredits}</div>
          <div class="stat-label">Credits Earned</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-icon">🏆</div>
          <div class="stat-value">${gpa || '—'}</div>
          <div class="stat-label">Current CGPA</div>
        </div>
      </div>

      <div class="overall-progress-card">
        <div class="opc-header">
          <div>
            <h3>Overall Progress</h3>
            <div style="font-size:12px;color:var(--text2);margin-top:2px">${ov.doneCredits} of ${ov.totalCredits} credits completed</div>
          </div>
          <div class="opc-pct">${ov.pct}%</div>
        </div>
        <div class="progress-bar-outer">
          <div class="progress-bar-fill" style="width:${ov.pct}%"></div>
        </div>
        <div class="progress-segments">
          ${Object.entries(CAT_LABELS).map(([k,v]) => {
            const catStats = getCategoryStats(k);
            if (!catStats.courses.length) return '';
            return `<button class="seg-item ${state.dashboardCategory === k ? 'active' : ''}" type="button" onclick="toggleDashboardCategory('${k}')">
              <span class="seg-dot ${CAT_DOTS[k]}"></span>
              <span>${v}: ${catStats.done}/${catStats.courses.length}</span>
            </button>`;
          }).join('')}
        </div>
      </div>

      ${overviewHtml}
    </div>
  `;
}

function toggleDashboardCategory(cat) {
  state.dashboardCategory = state.dashboardCategory === cat ? null : cat;
  renderDashboard();
}

function addTrimester() {
  state.trimesterCount = getTrimesterCount() + 1;
  saveState();
  renderSidebar();
  renderDashboard();
  showToast(`${getTrimesterLabel(state.trimesterCount)} added`, 'success');
}

// ============================================================
// TRIMESTER VIEW
// ============================================================
function showTrimester(t) {
  state.currentView = 'trimester';
  state.currentTrimester = t;
  state.filterCat = 'all';
  state.searchQuery = '';
  renderSidebar();
  renderTrimesterView(t);
  closeSidebar();
}

function renderTrimesterView(t) {
  const s = getTrimesterStats(t);
  const tGpa = calcTrimesterGPA(t);
  const courses = getFilteredCourses(t);
  const ov = getOverallStats();
  const missingCount = Math.max(0, REQUIRED_COURSE_COUNT - ov.total);
  const removedAssignmentNotice = renderRemovedAssignmentNotice(true);
  const courseCountNotice = missingCount > 0 ? `
    <div class="course-count-alert compact">
      <strong>${missingCount} course${missingCount === 1 ? '' : 's'} still not added.</strong>
      Total plan count is ${ov.total}/${REQUIRED_COURSE_COUNT}.
    </div>
  ` : '';

  const cats = [...new Set(getCoursesForTrimester(t).map(c => c.cat))];
  const catPillsHtml = ['all', ...cats].map(cat => `
    <div class="cat-pill ${state.filterCat === cat ? 'active' : ''}" onclick="setFilter('${cat}')">
      ${cat !== 'all' ? `<span class="seg-dot ${CAT_DOTS[cat] || ''}"></span>` : ''}
      ${cat === 'all' ? 'All Courses' : CAT_LABELS[cat] || cat}
    </div>
  `).join('');

  document.getElementById('mainContent').innerHTML = `
    <div class="fade-in">
      <div class="trimester-header">
        <div class="trimester-heading">
          <button class="icon-action-btn dashboard-return" onclick="showDashboard()" title="Back to Dashboard">⌂</button>
          <div>
            <div class="trimester-title">${getTrimesterLabel(t)}</div>
            <div class="trimester-subtitle">${s.total} courses · ${s.totalCredits} credit hours</div>
          </div>
        </div>
        <div class="trimester-actions">
          <div class="view-toggle">
            <button class="view-btn ${state.viewMode==='list'?'active':''}" onclick="setViewMode('list')" title="List View">☰</button>
            <button class="view-btn ${state.viewMode==='grid'?'active':''}" onclick="setViewMode('grid')" title="Grid View">⊞</button>
          </div>
          <button class="icon-action-btn add" onclick="openAddModal(${t})" title="Add course to trimester">＋</button>
          <button class="icon-action-btn remove" onclick="openRemoveCourseModal(${t})" title="Remove courses from trimester">−</button>
          <button class="btn btn-ghost btn-sm" onclick="markAllTrimester(${t}, true)">✓ All</button>
          <button class="btn btn-ghost btn-sm" onclick="markAllTrimester(${t}, false)">✕ Clear</button>
        </div>
      </div>
      ${courseCountNotice}
      ${removedAssignmentNotice}

      <div class="tri-stats-row">
        <div class="tri-stat-box">
          <div class="tri-stat-num" style="color:var(--accent)">${s.totalCredits}</div>
          <div class="tri-stat-lbl">Total Credits</div>
        </div>
        <div class="tri-stat-box">
          <div class="tri-stat-num" style="color:var(--green)">${s.doneCredits}</div>
          <div class="tri-stat-lbl">Completed</div>
        </div>
        <button class="tri-stat-box tri-stat-btn" onclick="openTermCgpaModal(${t})" title="Set Trimester ${t} CGPA">
          <div class="tri-stat-num" style="color:var(--orange)">${tGpa || '—'}</div>
          <div class="tri-stat-lbl">Term CGPA</div>
        </button>
      </div>

      <div class="tri-progress-section">
        <div class="tps-header">
          <span>${s.done} of ${s.total} courses completed</span>
          <span class="tps-pct">${s.pct}%</span>
        </div>
        <div class="progress-bar-outer">
          <div class="progress-bar-fill" style="width:${s.pct}%"></div>
        </div>
      </div>

      <div class="cat-legend">${catPillsHtml}</div>

      <div class="filter-bar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input class="search-input" id="searchInput" placeholder="Search courses..." value="${state.searchQuery}" oninput="onSearch(this.value)">
        </div>
        <select class="filter-select" id="sortSelect" onchange="renderTrimesterView(${t})">
          <option value="default">Default Order</option>
          <option value="alpha">Alphabetical</option>
          <option value="credits">By Credits</option>
          <option value="done">Completed First</option>
          <option value="pending">Pending First</option>
        </select>
      </div>

      <div id="courseContainer">
        ${renderCourseList(courses)}
      </div>
    </div>
  `;
}

function getFilteredCourses(t) {
  let courses = getCoursesForTrimester(t).map((course, index) => ({ course, index }));
  if (state.filterCat !== 'all') courses = courses.filter(({ course }) => course.cat === state.filterCat);
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    courses = courses.filter(({ course }) => {
      const chosen = state.electiveNames[course.id] || '';
      return course.title.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        chosen.toLowerCase().includes(q);
    });
  }
  const sortEl = document.getElementById('sortSelect');
  const sort = sortEl ? sortEl.value : 'default';
  if (sort === 'alpha') courses.sort((a,b) => getDisplayName(a.course).localeCompare(getDisplayName(b.course)));
  else if (sort === 'credits') courses.sort((a,b) => b.course.credits - a.course.credits || a.index - b.index);
  else if (sort === 'done') courses.sort((a,b) => (state.completion[b.course.id]?1:0) - (state.completion[a.course.id]?1:0) || getDefaultCourseOrder(a, b));
  else if (sort === 'pending') courses.sort((a,b) => (state.completion[a.course.id]?1:0) - (state.completion[b.course.id]?1:0) || getDefaultCourseOrder(a, b));
  else courses.sort(getDefaultCourseOrder);
  return courses.map(({ course }) => course);
}

function getDisplayName(course) {
  return state.electiveNames[course.id] || course.title;
}

function getDefaultCourseOrder(a, b) {
  const aCat = DEFAULT_CAT_ORDER[a.course.cat] ?? 99;
  const bCat = DEFAULT_CAT_ORDER[b.course.cat] ?? 99;
  return aCat - bCat || a.index - b.index;
}

function getChoiceType(course) {
  if (state.electiveTypes[course.id]) return state.electiveTypes[course.id];
  if (course.isElective) return 'elective';
  if (course.isOptional) return 'ged';
  return '';
}

function isChoiceCourse(course) {
  return course.isElective || course.isOptional || course.cat === 'major';
}

function renderCourseList(courses) {
  if (!courses.length) return `
    <div class="empty-state">
      <div class="icon">🔍</div>
      <h3>No courses found</h3>
      <p>Try changing your search or filter.</p>
    </div>
  `;

  const isGrid = state.viewMode === 'grid';
  const containerClass = isGrid ? 'courses-grid' : 'courses-list';

  const cardsHtml = courses.map((c, idx) => {
    const isCompleted = !!state.completion[c.id];
    const grade = state.grades[c.id] || 'none';
    const displayName = getDisplayName(c);
    const choiceType = getChoiceType(c);

    let typeTag = '';
    if (c.type === 'lab') typeTag = '<span class="course-tag tag-lab">Lab</span>';
    else if (c.type === 'fydp') typeTag = '<span class="course-tag tag-fydp">FYDP</span>';
    else if (choiceType === 'major') typeTag = '<span class="course-tag tag-major">Major</span>';
    else if (isChoiceCourse(c)) typeTag = '<span class="course-tag tag-elective">Optional</span>';
    else typeTag = '<span class="course-tag tag-theory">Theory</span>';

    const gradeOpts = [
      '<option value="none" ' + (grade === 'none' ? 'selected' : '') + '>— CGPA —</option>',
      ...GRADE_SCALE.map(g =>
        `<option value="${g.point}" ${String(grade)===String(g.point)?'selected':''}>${g.letter} (${g.point.toFixed(2)})</option>`
      )
    ].join('');

    const animDelay = `animation-delay:${idx * 0.04}s`;

    const infoHtml = `
      <div class="course-info">
        <div class="course-code">${c.code}</div>
        <div class="course-title">${displayName}</div>
        <div class="course-tags">
          <span class="course-tag tag-cat">${CAT_LABELS[c.cat] || c.cat}</span>
          ${typeTag}
        </div>
        ${c.prereq ? `<div class="prereq-text">Pre: ${c.prereq}</div>` : ''}
      </div>
    `;
    const bottomHtml = `
      <div class="course-bottom">
        <div class="course-credit">${c.credits}<span class="credit-label">cr</span></div>
        <div class="course-grade-wrap">
          <select class="grade-select ${grade !== 'none' ? 'graded' : ''}" onchange="setGrade('${c.id}', this.value)">
            ${gradeOpts}
          </select>
        </div>
        <div class="course-actions">
          ${isChoiceCourse(c) ? `<button class="choice-btn" onclick="openCourseChooser('${c.id}')" title="Choose course">Choose</button>` : ''}
          ${c.isCustom ? `<button class="course-action-btn del" onclick="deleteCourse('${c.id}')" title="Delete">🗑️</button>` : ''}
        </div>
      </div>
    `;

    if (isGrid) {
      return `
        <div class="course-card ${isCompleted ? 'completed' : ''}" data-cat="${c.cat}" data-id="${c.id}" style="${animDelay}">
          <div style="display:flex;align-items:flex-start;gap:10px;width:100%">
            <div class="course-check ${isCompleted ? 'checked' : ''}" onclick="toggleCompletion('${c.id}')">
              ${isCompleted ? '✓' : ''}
            </div>
            ${infoHtml}
          </div>
          ${bottomHtml}
        </div>
      `;
    } else {
      return `
        <div class="course-card ${isCompleted ? 'completed' : ''}" data-cat="${c.cat}" data-id="${c.id}" style="${animDelay}">
          <div class="course-check ${isCompleted ? 'checked' : ''}" onclick="toggleCompletion('${c.id}')">
            ${isCompleted ? '✓' : ''}
          </div>
          ${infoHtml}
          ${bottomHtml}
        </div>
      `;
    }
  }).join('');

  return `<div class="${containerClass}">${cardsHtml}</div>`;
}

function refreshCourseContainer() {
  if (state.currentView === 'trimester') {
    const courses = getFilteredCourses(state.currentTrimester);
    document.getElementById('courseContainer').innerHTML = renderCourseList(courses);
    // Re-render stats
    const s = getTrimesterStats(state.currentTrimester);
    const tGpa = calcTrimesterGPA(state.currentTrimester);
    const statBoxes = document.querySelectorAll('.tri-stat-num');
    if (statBoxes.length >= 3) {
      statBoxes[0].textContent = s.totalCredits;
      statBoxes[1].textContent = s.doneCredits;
      statBoxes[2].textContent = tGpa || '—';
    }
    const pctEl = document.querySelector('.tps-pct');
    if (pctEl) pctEl.textContent = s.pct + '%';
    const barFill = document.querySelector('.tri-progress-section .progress-bar-fill');
    if (barFill) barFill.style.width = s.pct + '%';
    const doneText = document.querySelector('.tps-header span');
    if (doneText) doneText.textContent = `${s.done} of ${s.total} courses completed`;
  }
}

// ============================================================
// ACTIONS
// ============================================================
function toggleCompletion(id) {
  state.completion[id] = !state.completion[id];
  if (!state.completion[id]) delete state.grades[id];
  saveState();
  renderSidebar();
  refreshCourseContainer();
  if (state.currentView === 'dashboard') renderDashboard();
  const c = state.courses.find(x => x.id === id);
  if (c) showToast(state.completion[id] ? `✅ ${c.code} marked complete` : `↩️ ${c.code} unmarked`, state.completion[id] ? 'success' : 'info');
}

function setGrade(id, grade) {
  state.grades[id] = grade;
  if (grade !== 'none') state.completion[id] = true;
  state.cgpaError = '';
  saveState();
  renderSidebar(); // update CGPA
  // update grade select style
  const sel = document.querySelector(`[data-id="${id}"] .grade-select`);
  if (sel) { sel.className = 'grade-select' + (grade !== 'none' ? ' graded' : ''); }
  // update topbar gpa
  const gpa = calcGPA();
  document.getElementById('topbarGpa').textContent = gpa || '—';
  updateCgpaErrorBadge();
  refreshCourseContainer();
}

function openCgpaModal() {
  const current = calcGPA() || '';
  document.getElementById('addCourseModal').classList.add('open');
  document.querySelector('.modal').innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Set Overall CGPA</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-row">
      <label class="form-label">Target CGPA</label>
      <input class="form-input" id="targetCgpaInput" inputmode="decimal" placeholder="1.00 to 4.00" value="${current}" oninput="clearCgpaError()">
    </div>
    ${renderGradeScaleTable()}
    <div class="cgpa-help">
      This applies grades to every active course using the grade-point scale above.
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="applyOverallCgpa()">Apply CGPA</button>
    </div>
  `;
}

function openTermCgpaModal(t) {
  const current = calcTrimesterGPA(t) || '';
  document.getElementById('addCourseModal').classList.add('open');
  document.querySelector('.modal').innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Set Trimester ${t} CGPA</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-row">
      <label class="form-label">Target Term CGPA</label>
      <input class="form-input" id="targetCgpaInput" inputmode="decimal" placeholder="1.00 to 4.00" value="${current}" oninput="clearCgpaError()">
    </div>
    ${renderGradeScaleTable()}
    <div class="cgpa-help">
      This applies grades only to Trimester ${t}. The overall CGPA box updates from the new average automatically.
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="applyTermCgpa(${t})">Apply Term CGPA</button>
    </div>
  `;
}

function renderGradeScaleTable() {
  const rows = GRADE_SCALE.map(g => `
    <tr>
      <td>${g.letter}</td>
      <td>${g.point.toFixed(2)}</td>
      <td>${g.marks}</td>
    </tr>
  `).join('');

  return `
    <div class="grade-scale-wrap">
      <table class="grade-scale-table">
        <thead>
          <tr>
            <th>Letter Grade</th>
            <th>Grade Point</th>
            <th>Marks (%)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function clearCgpaError() {
  state.cgpaError = '';
  updateCgpaErrorBadge();
}

function updateCgpaErrorBadge() {
  const badge = document.getElementById('cgpaErrorBadge');
  if (!badge) return;
  const hasError = !!state.cgpaError;
  badge.hidden = !hasError;
  badge.title = state.cgpaError || '';
}

function normalizeCgpaInput(value) {
  const cgpa = Number(String(value || '').trim());
  const minCgpa = Math.min(...GRADE_POINTS);
  const maxCgpa = Math.max(...GRADE_POINTS);
  if (!Number.isFinite(cgpa) || cgpa < minCgpa || cgpa > maxCgpa) return null;
  return Math.round(cgpa * 100);
}

function findCgpaAssignment(courses, targetCgpa100) {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const targetTotal = targetCgpa100 * totalCredits;
  const options = GRADE_POINTS.map(point => ({ value: String(point), points: Math.round(point * 100) }));
  let states = new Map([[0, null]]);
  const layers = [];

  for (let i = 0; i < courses.length; i++) {
    const next = new Map();
    for (const [sum] of states) {
      for (const option of options) {
        const nextSum = sum + option.points * courses[i].credits;
        if (!next.has(nextSum)) next.set(nextSum, { prev: sum, value: option.value });
      }
    }
    states = next;
    layers.push(states);
    if (!states.size) return null;
  }

  let chosenTotal = null;
  for (const sum of states.keys()) {
    if (chosenTotal === null || Math.abs(sum - targetTotal) < Math.abs(chosenTotal - targetTotal)) {
      chosenTotal = sum;
    }
  }
  if (chosenTotal === null) return null;

  const result = Array(courses.length);
  let sum = chosenTotal;
  for (let i = courses.length - 1; i >= 0; i--) {
    const entry = layers[i].get(sum);
    result[i] = entry.value;
    sum = entry.prev;
  }
  return {
    grades: result,
    actualCgpa: (chosenTotal / totalCredits / 100).toFixed(2)
  };
}

function applyOverallCgpa() {
  const input = document.getElementById('targetCgpaInput');
  const targetCgpa100 = normalizeCgpaInput(input.value);
  const courses = getActiveCourses();

  if (targetCgpa100 === null || !courses.length) {
    state.cgpaError = 'Invalid CGPA';
    updateCgpaErrorBadge();
    showToast('Invalid CGPA', 'error');
    return;
  }

  const assignment = findCgpaAssignment(courses, targetCgpa100);
  if (!assignment) {
    state.cgpaError = 'Invalid CGPA';
    updateCgpaErrorBadge();
    showToast('Invalid CGPA', 'error');
    return;
  }

  courses.forEach((course, index) => {
    state.completion[course.id] = true;
    state.grades[course.id] = assignment.grades[index];
  });
  state.cgpaError = '';
  saveState();
  closeModal();
  renderSidebar();
  if (state.currentView === 'trimester') renderTrimesterView(state.currentTrimester);
  else renderDashboard();
  updateCgpaErrorBadge();
  showToast(`CGPA applied: ${assignment.actualCgpa}`, 'success');
}

function applyTermCgpa(t) {
  const input = document.getElementById('targetCgpaInput');
  const targetCgpa100 = normalizeCgpaInput(input.value);
  const courses = getCoursesForTrimester(t);

  if (targetCgpa100 === null || !courses.length) {
    state.cgpaError = 'Invalid CGPA';
    updateCgpaErrorBadge();
    showToast('Invalid CGPA', 'error');
    return;
  }

  const assignment = findCgpaAssignment(courses, targetCgpa100);
  if (!assignment) {
    state.cgpaError = 'Invalid CGPA';
    updateCgpaErrorBadge();
    showToast('Invalid CGPA', 'error');
    return;
  }

  courses.forEach((course, index) => {
    state.completion[course.id] = true;
    state.grades[course.id] = assignment.grades[index];
  });
  state.cgpaError = '';
  saveState();
  closeModal();
  renderSidebar();
  renderTrimesterView(t);
  updateCgpaErrorBadge();
  showToast(`Term CGPA applied: ${assignment.actualCgpa}`, 'success');
}

function markAllTrimester(t, val) {
  getCoursesForTrimester(t).forEach(c => {
    state.completion[c.id] = val;
    if (!val) delete state.grades[c.id];
  });
  saveState();
  renderSidebar();
  refreshCourseContainer();
  showToast(val ? `✅ All T${t} courses marked complete` : `↩️ T${t} cleared`, val ? 'success' : 'info');
}

function setFilter(cat) {
  state.filterCat = cat;
  // Update pills
  document.querySelectorAll('.cat-pill').forEach(p => {
    p.classList.toggle('active', p.textContent.trim() === (cat === 'all' ? 'All Courses' : CAT_LABELS[cat] || cat));
  });
  refreshCourseContainer();
}

function onSearch(val) {
  state.searchQuery = val;
  refreshCourseContainer();
}

function setViewMode(mode) {
  state.viewMode = mode;
  saveState();
  // update buttons
  document.querySelectorAll('.view-btn').forEach((b, i) => {
    b.classList.toggle('active', (i===0 && mode==='list') || (i===1 && mode==='grid'));
  });
  refreshCourseContainer();
}

function openRemoveCourseModal(t) {
  const courses = getCoursesForTrimester(t);
  document.getElementById('addCourseModal').classList.add('open');
  const modal = document.querySelector('.modal');
  modal.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Remove Courses</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-row">
      <label class="form-label">Trimester ${t} Courses</label>
      <div class="remove-course-list">
        ${courses.map(c => `
          <label class="remove-course-option">
            <input type="checkbox" class="remove-course-check" value="${c.id}">
            <span>
              <strong>${c.code}</strong>
              <small>${getDisplayName(c)}</small>
            </span>
          </label>
        `).join('')}
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="removeSelectedCourses(${t})">Remove Selected</button>
    </div>
  `;
}

function removeSelectedCourses(t) {
  const selected = [...document.querySelectorAll('.remove-course-check:checked')].map(input => input.value);
  if (!selected.length) {
    showToast('Select at least one course to remove', 'error');
    return;
  }
  selected.forEach(id => {
    state.removedCourseIds[id] = true;
    delete state.completion[id];
    delete state.grades[id];
    delete state.electiveNames[id];
    delete state.electiveTypes[id];
  });
  saveState();
  closeModal();
  renderSidebar();
  renderTrimesterView(t);
  showToast(`${selected.length} course${selected.length === 1 ? '' : 's'} removed`, 'info');
}

// ============================================================
// COURSE CHOOSER
// ============================================================
function openCourseChooser(id) {
  const c = state.courses.find(x => x.id === id);
  if (!c) return;
  const canChooseMajor = c.isElective || c.cat === 'major';
  const currentType = getChoiceType(c);

  document.getElementById('addCourseModal').classList.add('open');
  const modal = document.querySelector('.modal');

  modal.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Choose Your Course</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-row">
      <label class="form-label">Slot</label>
      <div class="choice-slot">${c.code} · ${c.title}</div>
    </div>
    <div class="form-row">
      <label class="form-label">Choice Type</label>
      <select class="form-select" id="choiceType" onchange="renderChoiceOptions('${id}')">
        ${c.isOptional ? `<option value="ged" ${currentType === 'ged' ? 'selected' : ''}>GED Optional Course</option>` : ''}
        ${c.isElective ? `<option value="elective" ${currentType === 'elective' ? 'selected' : ''}>CSE Optional Course</option>` : ''}
        ${canChooseMajor ? `<option value="major" ${currentType === 'major' ? 'selected' : ''}>Major / Concentration</option>` : ''}
        <option value="custom" ${currentType === 'custom' ? 'selected' : ''}>Custom Choice</option>
      </select>
    </div>
    <div id="choiceOptionsWrap"></div>
    <div class="form-row">
      <label class="form-label">Custom name</label>
      <input class="form-input" id="choiceCustom" placeholder="Type only if you want a custom choice" value="${currentType === 'custom' ? (state.electiveNames[id] || '') : ''}">
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveCourseChoice('${id}')">Save Choice</button>
    </div>
  `;
  renderChoiceOptions(id);
}

function getOptionsForChoiceType(type) {
  if (type === 'ged') return GED_OPTIONS;
  if (type === 'major') return MAJOR_OPTIONS;
  if (type === 'elective') return ELECTIVE_OPTIONS;
  return [];
}

function renderChoiceOptions(id) {
  const wrap = document.getElementById('choiceOptionsWrap');
  const typeEl = document.getElementById('choiceType');
  if (!wrap || !typeEl) return;

  const type = typeEl.value;
  const opts = getOptionsForChoiceType(type);
  if (!opts.length) {
    wrap.innerHTML = '';
    return;
  }

  const currentName = state.electiveNames[id] || '';
  wrap.innerHTML = `
    <div class="form-row">
      <label class="form-label">${type === 'major' ? 'Major' : 'Course Name'}</label>
      <select class="form-select" id="choiceSelect">
        <option value="">— Choose one —</option>
        ${opts.map(o => `<option value="${o}" ${currentName === o ? 'selected' : ''}>${o}</option>`).join('')}
      </select>
    </div>
  `;
}

function saveCourseChoice(id) {
  const type = document.getElementById('choiceType').value;
  const sel = document.getElementById('choiceSelect');
  const custom = document.getElementById('choiceCustom');
  const name = custom.value.trim() || (sel ? sel.value : '');
  if (name) {
    state.electiveNames[id] = name;
    state.electiveTypes[id] = type;
  } else {
    delete state.electiveNames[id];
    delete state.electiveTypes[id];
  }
  saveState();
  closeModal();
  renderTrimesterView(state.currentTrimester);
  showToast(name ? 'Choice saved' : 'Choice cleared', name ? 'success' : 'info');
}

// ============================================================
// ADD / DELETE CUSTOM COURSE
// ============================================================
function openAddModal(t, assigningRemovedCourse=false) {
  state.editingId = null;
  state.assigningRemovedCourse = assigningRemovedCourse;
  state.assigningRemovedCourseId = null;
  // Rebuild modal in case it was modified
  rebuildAddModal();
  document.getElementById('modalTitle').textContent = assigningRemovedCourse ? 'Assign Removed Course' : 'Add Custom Course';
  document.getElementById('modalSubmitBtn').textContent = assigningRemovedCourse ? 'Assign Course' : 'Add Course';
  if (t) document.getElementById('f_trimester').value = t;
  document.getElementById('addCourseModal').classList.add('open');
  renderRemovedCourseSuggestions(t);
}

function rebuildAddModal() {
  const trimesterOptions = Array.from({length:getTrimesterCount()},(_,i)=> {
    const trimester = i + 1;
    return `<option value="${trimester}">${getTrimesterLabel(trimester)}</option>`;
  }).join('');

  document.querySelector('.modal').innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title" id="modalTitle">Add Custom Course</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div id="removedSuggestionsWrap"></div>
    <div class="form-row">
      <label class="form-label">Course Code *</label>
      <input class="form-input" id="f_code" placeholder="e.g., CSE 4999" maxlength="20">
    </div>
    <div class="form-row">
      <label class="form-label">Course Title *</label>
      <input class="form-input" id="f_title" placeholder="e.g., Advanced Topics in CS">
    </div>
    <div class="form-row-2">
      <div class="form-row" style="margin-bottom:0">
        <label class="form-label">Credit Hours *</label>
        <select class="form-select" id="f_credits">
          <option value="1">1.0</option>
          <option value="2">2.0</option>
          <option value="3" selected>3.0</option>
          <option value="4">4.0</option>
        </select>
      </div>
      <div class="form-row" style="margin-bottom:0">
        <label class="form-label">Trimester *</label>
        <select class="form-select" id="f_trimester">
          ${trimesterOptions}
        </select>
      </div>
    </div>
    <div class="form-row">
      <label class="form-label">Category</label>
      <select class="form-select" id="f_cat">
        <option value="core">Core Course</option>
        <option value="language">Language</option>
        <option value="general">General Education</option>
        <option value="ged">GED Optional</option>
        <option value="science">Basic Science</option>
        <option value="math">Mathematics</option>
        <option value="engineering">Other Engineering</option>
        <option value="elective">Elective</option>
        <option value="major">Major</option>
        <option value="fydp">FYDP</option>
      </select>
    </div>
    <div class="form-row">
      <label class="form-label">Prerequisite (optional)</label>
      <input class="form-input" id="f_prereq" placeholder="e.g., CSE 1115">
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="modalSubmitBtn" onclick="submitCourse()">Add Course</button>
    </div>
  `;
}

function renderRemovedCourseSuggestions(currentTrimester) {
  const wrap = document.getElementById('removedSuggestionsWrap');
  if (!wrap) return;

  const removed = getRemovedCourses().filter(c => !isRemovedCourseAssigned(c));
  if (!removed.length) {
    wrap.innerHTML = '';
    return;
  }

  const trimesterRemoved = removed.filter(c => c.trimester === currentTrimester);
  const suggestions = [...trimesterRemoved, ...removed.filter(c => c.trimester !== currentTrimester)];
  wrap.innerHTML = `
    <div class="form-row removed-suggestion-box">
      <label class="form-label">Removed course suggestions</label>
      <select class="form-select" id="removedSuggestionSelect" onchange="applyRemovedCourseSuggestion(this.value)">
        <option value="">Choose a removed course to assign</option>
        ${suggestions.map(c => `
          <option value="${c.id}">${c.trimester === currentTrimester ? 'This trimester' : getTrimesterLabel(c.trimester)} · ${c.code} — ${getDisplayName(c)}</option>
        `).join('')}
      </select>
    </div>
  `;
}

function applyRemovedCourseSuggestion(id) {
  const c = state.courses.find(course => course.id === id);
  if (!c) return;
  document.getElementById('f_code').value = c.code;
  document.getElementById('f_title').value = getDisplayName(c);
  document.getElementById('f_credits').value = String(c.credits);
  document.getElementById('f_trimester').value = String(c.trimester);
  document.getElementById('f_cat').value = c.cat;
  document.getElementById('f_prereq').value = c.prereq || '';
  state.assigningRemovedCourse = true;
  state.assigningRemovedCourseId = id;
  document.getElementById('modalTitle').textContent = 'Assign Removed Course';
  document.getElementById('modalSubmitBtn').textContent = 'Assign Course';
}

function closeModal() {
  document.getElementById('addCourseModal').classList.remove('open');
  state.assigningRemovedCourse = false;
  state.assigningRemovedCourseId = null;
}

function submitCourse() {
  const code = document.getElementById('f_code').value.trim();
  const title = document.getElementById('f_title').value.trim();
  const credits = parseInt(document.getElementById('f_credits').value);
  const trimester = parseInt(document.getElementById('f_trimester').value);
  const cat = document.getElementById('f_cat').value;
  const prereq = document.getElementById('f_prereq').value.trim();
  const assigningRemovedCourse = state.assigningRemovedCourse;
  const assigningRemovedCourseId = state.assigningRemovedCourseId;

  if (!code || !title) { showToast('Please fill required fields', 'error'); return; }
  const duplicate = state.courses.find(c => c.code === code && !state.editingId && !state.removedCourseIds[c.id]);
  if (duplicate) {
    showToast('Course code already exists', 'error'); return;
  }

  const newCourse = {
    id: 'custom_' + Date.now(),
    code, title, credits, trimester, cat,
    type: cat === 'fydp' ? 'fydp' : (credits === 1 ? 'lab' : 'theory'),
    prereq,
    isCustom: true,
    replacesRemovedCourse: assigningRemovedCourse,
    replacesRemovedCourseId: assigningRemovedCourseId
  };

  state.courses.push(newCourse);
  saveState();
  closeModal();
  renderSidebar();
  renderTrimesterView(trimester);
  showToast(assigningRemovedCourse ? `Assigned ${code}` : `✅ Added ${code}`, 'success');
}

function deleteCourse(id) {
  if (!confirm('Delete this custom course?')) return;
  const c = state.courses.find(x => x.id === id);
  state.courses = state.courses.filter(x => x.id !== id);
  delete state.completion[id];
  delete state.grades[id];
  delete state.electiveNames[id];
  delete state.electiveTypes[id];
  delete state.removedCourseIds[id];
  saveState();
  renderSidebar();
  renderTrimesterView(state.currentTrimester);
  showToast(`🗑️ Deleted ${c?.code || 'course'}`, 'info');
}

// ============================================================
// THEME & MISC
// ============================================================
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeBtn').textContent = state.theme === 'dark' ? '🌙' : '☀️';
  saveState();
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

function exportData() {
  const ov = getOverallStats();
  const gpa = calcGPA();
  const rows = [['Course Code','Course Title','Credits','Trimester','Category','Completed','Grade']];
  getActiveCourses().forEach(c => {
    rows.push([c.code, getDisplayName(c), c.credits, getTrimesterLabel(c.trimester), CAT_LABELS[c.cat]||c.cat, state.completion[c.id]?'Yes':'No', state.grades[c.id]||'—']);
  });
  rows.push([]);
  rows.push(['','','Total Courses',ov.total,'Completed',ov.done,'']);
  rows.push(['','','Total Credits',ov.totalCredits,'Credits Done',ov.doneCredits,'']);
  rows.push(['','','CGPA','',gpa||'—','','']);

  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CSE_Course_Planner_Export.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('📊 Exported to CSV', 'success');
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type='info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'd' && e.ctrlKey) { e.preventDefault(); toggleTheme(); }
});

// ============================================================
// INIT
// ============================================================
function startPlanner() {
  updateAuthUI();
  loadState();
  updateAuthUI();
  renderSidebar();
  showDashboard();
}

function init() {
  const session = getActiveStudent();
  if (!session) {
    updateAuthUI();
    showLoginPage();
    return;
  }
  state.activeStudent = session;
  startPlanner();
}

init();
