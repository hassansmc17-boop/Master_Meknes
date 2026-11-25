/**
 * Master PINEP - ENS Meknès
 * Application Logic, Authentication & Ultra-Dynamic UI
 */

const STORAGE_KEY = 'ens_meknes_master_pinep_v5';
const THEME_KEY = 'ens_theme_mode';
const AUTH_STORAGE_KEY = 'ens_pinep_auth_user_v4';

/**
 * ========================================================
 * IDENTIFIANTS SÉCURISÉS & CONFIDENTIELS (PERSONNALISABLES)
 * ========================================================
 */
const SECURITY_ACCOUNTS = [
  {
    username: "HASSAN",
    password: "HASSAN2026",
    displayName: "Professeur Hassan Mansouri",
    role: "Organisateur Master PINEP"
  },
  {
    username: "HASSAN.MANSOURI",
    password: "Hassan@ENS",
    displayName: "Hassan Mansouri",
    role: "Étudiant Master PINEP"
  }
];

let appData = null;
let currentUser = null;
let currentFilter = 'all'; // 'all', 'in-person', 'online'
let searchQuery = '';
let activeTab = 'schedule';
let selectedCityFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadData();
  setupEventListeners();
  renderAll();
  initAuth();
});

// Load data from LocalStorage or fallback to defaultMasterData
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appData = JSON.parse(saved);
      if (!appData.exams) appData.exams = defaultMasterData.exams;
      if (!appData.exposes) appData.exposes = defaultMasterData.exposes;
      if (!appData.students) appData.students = defaultMasterData.students;
    } catch (e) {
      console.error('Erreur chargement localStorage:', e);
      appData = JSON.parse(JSON.stringify(defaultMasterData));
    }
  } else {
    appData = JSON.parse(JSON.stringify(defaultMasterData));
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// Dark/Light Theme
function initTheme() {
  const isDark = localStorage.getItem(THEME_KEY) === 'dark' || 
    (!localStorage.getItem(THEME_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcon(false);
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
  showToast(isDark ? 'Mode sombre activé' : 'Mode clair activé', isDark ? 'moon' : 'sun');
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
  }
}

// Toast notification
function showToast(message, iconName = 'check-circle') {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  if (toastIcon && iconName) {
    toastIcon.setAttribute('data-lucide', iconName);
  }

  lucide.createIcons();
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById('btn-theme')?.addEventListener('click', toggleTheme);
  document.getElementById('btn-print')?.addEventListener('click', () => window.print());

  const handleSearch = (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderAll();
  };
  document.getElementById('global-search')?.addEventListener('input', handleSearch);
  document.getElementById('global-search-mobile')?.addEventListener('input', handleSearch);

  // Tabs
  const tabConfigs = [
    { id: 'tab-schedule', view: 'schedule' },
    { id: 'tab-modules', view: 'modules' },
    { id: 'tab-exams', view: 'exams' },
    { id: 'tab-exposes', view: 'exposes' },
    { id: 'tab-students', view: 'students' },
    { id: 'tab-professors', view: 'professors' }
  ];

  tabConfigs.forEach(tab => {
    document.getElementById(tab.id)?.addEventListener('click', () => {
      activeTab = tab.view;
      switchTab(tab.view);
    });
  });

  // Filter chips (Schedule view)
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(b => {
        b.className = 'filter-chip px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5';
      });
      btn.className = 'filter-chip px-3.5 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 text-white shadow-xs transition flex items-center gap-1.5';
      currentFilter = btn.dataset.filter;
      renderSchedule();
    });
  });

  setupModals();

  // Auth Listeners
  document.getElementById('form-login')?.addEventListener('submit', handleLogin);
  document.getElementById('btn-logout')?.addEventListener('click', handleLogout);
  document.getElementById('btn-toggle-pwd')?.addEventListener('click', togglePasswordVisibility);
}

// Authentication Logic
function initAuth() {
  const savedUser = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      applyAuthenticatedState(currentUser);
      return;
    } catch (e) {
      console.error(e);
    }
  }
  showAuthOverlay();
}

function showAuthOverlay() {
  const overlay = document.getElementById('auth-overlay');
  const userBadge = document.getElementById('user-badge');
  if (overlay) overlay.classList.remove('hidden');
  if (userBadge) {
    userBadge.classList.add('hidden');
    userBadge.classList.remove('flex');
  }
  lucide.createIcons();
}

function applyAuthenticatedState(user) {
  const overlay = document.getElementById('auth-overlay');
  const userBadge = document.getElementById('user-badge');
  const userName = document.getElementById('user-name');
  const userAvatar = document.getElementById('user-avatar');

  if (overlay) overlay.classList.add('hidden');
  if (userBadge) {
    userBadge.classList.remove('hidden');
    userBadge.classList.add('flex');
  }
  if (userName) userName.textContent = user.fullName;
  if (userAvatar) {
    userAvatar.textContent = user.fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }
  lucide.createIcons();
}

function handleLogin(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('login-username').value.trim();
  const passwordInput = document.getElementById('login-password').value.trim();
  const remember = document.getElementById('login-remember')?.checked;
  const errorBox = document.getElementById('login-error');
  const errorText = document.getElementById('login-error-text');

  if (!usernameInput || !passwordInput) return;

  const uClean = usernameInput.toLowerCase().replace(/[^a-z0-9]/g, '');
  const pClean = passwordInput.trim();

  let matchedAccount = null;

  // 1. Organisateur prioritaire : HASSAN / HASSAN2026
  if (uClean === 'hassan' && pClean.toUpperCase() === 'HASSAN2026') {
    matchedAccount = {
      fullName: 'Professeur Hassan Mansouri',
      role: 'Organisateur Master PINEP'
    };
  }

  // 2. Modèle Étudiant : HASSAN.MANSOURI / Hassan@ENS
  if (!matchedAccount && (uClean === 'hassanmansouri' || uClean === 'mansourihassan')) {
    if (pClean.toLowerCase() === 'hassan@ens' || pClean.toUpperCase() === 'HASSAN2026') {
      matchedAccount = {
        fullName: 'Hassan Mansouri',
        role: 'Étudiant Master PINEP'
      };
    }
  }

  // 3. Comptes préconfigurés
  if (!matchedAccount) {
    for (const acc of SECURITY_ACCOUNTS) {
      const accU = acc.username.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (uClean === accU && pClean.toLowerCase() === acc.password.toLowerCase()) {
        matchedAccount = {
          fullName: acc.displayName,
          role: acc.role
        };
        break;
      }
    }
  }

  // 4. Vérification dynamique parmi les 33 étudiants de la promo PINEP
  if (!matchedAccount) {
    const studentsList = (appData && Array.isArray(appData.students) && appData.students.length > 0)
      ? appData.students
      : (typeof defaultMasterData !== 'undefined' ? defaultMasterData.students : []);

    for (const st of studentsList) {
      const stClean = st.fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const parts = st.fullName.toLowerCase().split(/\s+/).filter(Boolean);
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join('') || '';

      const isUserMatch = (uClean === stClean) ||
                          (uClean === (firstName + lastName)) ||
                          (uClean === (lastName + firstName));

      if (isUserMatch) {
        // Mot de passe accepté : "Hassan@ENS" (clé promo globale), "<Prénom>@ENS", ou "HASSAN2026"
        const allowedPasswords = [
          'hassan@ens',
          `${firstName}@ens`,
          'hassan2026'
        ];
        if (allowedPasswords.includes(pClean.toLowerCase())) {
          matchedAccount = {
            fullName: st.fullName,
            role: `Étudiant Master PINEP (${st.city || 'Promo S1'})`
          };
          break;
        }
      }
    }
  }

  // 5. Tolérance de format pour tout étudiant respectant le format PRENOM.NOM avec le mot de passe promo "Hassan@ENS"
  if (!matchedAccount && pClean.toLowerCase() === 'hassan@ens' && usernameInput.length >= 3) {
    const formattedName = usernameInput
      .replace(/[._-]+/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

    matchedAccount = {
      fullName: formattedName || 'Étudiant Master PINEP',
      role: 'Étudiant Master PINEP'
    };
  }

  if (matchedAccount) {
    currentUser = matchedAccount;
    if (errorBox) errorBox.classList.add('hidden');

    if (remember) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    }

    applyAuthenticatedState(currentUser);
    showToast(`Connexion réussie. Bienvenue, ${currentUser.fullName} !`, 'check-circle');
  } else {
    if (errorBox) {
      errorBox.classList.remove('hidden');
      if (errorText) {
        errorText.textContent = 'Identifiant ou mot de passe incorrect. Exemple d\'accès : HASSAN.MANSOURI / Hassan@ENS';
      }
      lucide.createIcons();
    }
  }
}

function handleLogout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  currentUser = null;
  showAuthOverlay();
  const pwd = document.getElementById('login-password');
  if (pwd) pwd.value = '';
  showToast('Déconnexion réussie', 'log-out');
}

function togglePasswordVisibility() {
  const pwdInput = document.getElementById('login-password');
  const icon = document.getElementById('pwd-icon');
  if (!pwdInput || !icon) return;
  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    icon.setAttribute('data-lucide', 'eye-off');
  } else {
    pwdInput.type = 'password';
    icon.setAttribute('data-lucide', 'eye');
  }
  lucide.createIcons();
}

function switchTab(viewName) {
  const allTabs = ['schedule', 'modules', 'exams', 'exposes', 'students', 'professors'];
  const filterControls = document.getElementById('filter-controls');

  allTabs.forEach(name => {
    const btn = document.getElementById(`tab-${name}`);
    const view = document.getElementById(`view-${name}`);
    if (btn) {
      btn.className = 'tab-btn shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition';
    }
    if (view) {
      view.classList.add('hidden');
    }
  });

  const activeBtn = document.getElementById(`tab-${viewName}`);
  const activeView = document.getElementById(`view-${viewName}`);

  if (activeBtn) {
    activeBtn.className = 'tab-btn shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm transition';
  }
  if (activeView) {
    activeView.classList.remove('hidden');
  }

  if (viewName === 'schedule') {
    filterControls?.classList.remove('hidden');
  } else {
    filterControls?.classList.add('hidden');
  }

  renderView(viewName);
  lucide.createIcons();
}

function renderView(viewName) {
  switch (viewName) {
    case 'schedule': renderSchedule(); break;
    case 'modules': renderModules(); break;
    case 'exams': renderExams(); break;
    case 'exposes': renderExposes(); break;
    case 'students': renderStudents(); break;
    case 'professors': renderProfessors(); break;
  }
}

// Master Render
function renderAll() {
  renderUpcomingBanner();
  renderSchedule();
  renderModules();
  renderExams();
  renderExposes();
  renderStudentCityFilters();
  renderStudents();
  renderProfessors();
  populateModuleSelects();
  lucide.createIcons();
}

// 1. Prochain cours / Upcoming banner
function renderUpcomingBanner() {
  const container = document.getElementById('next-session-content');
  if (!container) return;

  const now = new Date();
  const dayOfWeek = now.getDay();
  const mappedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
  const upcomingToday = appData.schedule.find(s => s.dayIndex === mappedDay);
  const nextSession = upcomingToday || appData.schedule[0];

  if (nextSession) {
    const isOnline = nextSession.mode === 'online';
    container.innerHTML = `
      <div class="font-extrabold text-white text-base leading-snug">${nextSession.module}</div>
      <div class="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
        <i data-lucide="graduation-cap" class="w-3.5 h-3.5 text-emerald-400"></i>
        <span>${nextSession.professor}</span>
      </div>
      <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10 text-xs">
        <span class="text-slate-300 flex items-center gap-1 font-mono text-[11px]">
          <i data-lucide="calendar" class="w-3 h-3 text-slate-400"></i> ${nextSession.day} • ${nextSession.time}
        </span>
        <span class="px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
          isOnline 
            ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
        }">
          ${isOnline ? '💻 En Ligne' : '📍 ' + (nextSession.location || 'Salle C6')}
        </span>
      </div>
      ${isOnline && nextSession.meetingLink ? `
        <a href="${nextSession.meetingLink}" target="_blank" class="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-xs transition">
          <i data-lucide="video" class="w-3.5 h-3.5"></i>
          <span>Rejoindre la visio Meet/Teams</span>
        </a>
      ` : ''}
    `;
  }
}

// 2. Planning & Emploi du Temps
function renderSchedule() {
  const container = document.getElementById('schedule-container');
  if (!container) return;

  let filtered = appData.schedule.filter(s => {
    if (currentFilter !== 'all' && s.mode !== currentFilter) return false;
    if (searchQuery) {
      return s.module.toLowerCase().includes(searchQuery) ||
             s.professor.toLowerCase().includes(searchQuery) ||
             s.day.toLowerCase().includes(searchQuery);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <i data-lucide="calendar-x" class="w-12 h-12 text-slate-400 mx-auto mb-2 opacity-50"></i>
        <p class="font-bold text-slate-700 dark:text-slate-300 text-sm">Aucune séance ne correspond aux critères.</p>
        <p class="text-xs text-slate-400 mt-1">Essayez de sélectionner « Tous les formats ».</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const daysOrder = ['Vendredi', 'Samedi', 'Dimanche'];
  const grouped = {};
  daysOrder.forEach(d => grouped[d] = []);

  filtered.forEach(s => {
    if (!grouped[s.day]) grouped[s.day] = [];
    grouped[s.day].push(s);
  });

  let html = '';
  daysOrder.forEach(dayName => {
    const sessions = grouped[dayName];
    if (!sessions || sessions.length === 0) return;

    html += `
      <div class="card-print bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <!-- Day Section Header -->
        <div class="bg-slate-50/80 dark:bg-slate-800/60 px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
              ${dayName.substring(0, 2).toUpperCase()}
            </span>
            <div>
              <h4 class="font-extrabold text-base text-slate-900 dark:text-white leading-tight">${dayName}</h4>
              <span class="text-xs text-slate-500 dark:text-slate-400">${sessions.length} séance(s) au programme</span>
            </div>
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold">
            Semestre 1 • Session d'Automne
          </span>
        </div>

        <!-- Sessions List -->
        <div class="divide-y divide-slate-100 dark:divide-slate-800/60">
          ${sessions.map(s => renderScheduleItem(s)).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

function renderScheduleItem(s) {
  const isOnline = s.mode === 'online';

  return `
    <div class="p-5 sm:p-6 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-start gap-4">
        <!-- Time slot badge -->
        <div class="text-center min-w-[110px] py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
          <span class="block text-xs font-mono font-extrabold text-slate-900 dark:text-white">${s.time}</span>
          <span class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">${s.code || 'M1'}</span>
        </div>

        <!-- Module & Teacher Info -->
        <div class="space-y-1">
          <h5 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
            ${s.module}
          </h5>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-0.5">
            <span class="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
              <i data-lucide="graduation-cap" class="w-3.5 h-3.5"></i>
              ${s.professor}
            </span>
            <span class="flex items-center gap-1.5 text-slate-500 font-medium">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
              ${s.location || 'Salle C6'}
            </span>
          </div>

          ${s.notes ? `
            <div class="mt-2 text-xs flex items-start gap-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
              <i data-lucide="info" class="w-3.5 h-3.5 shrink-0 mt-0.5"></i>
              <span>${s.notes}</span>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Action & Switch Buttons -->
      <div class="flex items-center gap-2.5 self-end md:self-center shrink-0">
        <!-- Interactive Mode Toggle Pill -->
        <button 
          onclick="toggleSessionMode('${s.id}')" 
          title="Cliquez pour basculer entre Présentiel (C6) et En Ligne"
          class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs border ${
            isOnline 
              ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100' 
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
          }">
          <span class="w-2 h-2 rounded-full ${isOnline ? 'bg-blue-500' : 'bg-emerald-500'}"></span>
          <span>${isOnline ? 'Distanciel' : 'Présentiel (C6)'}</span>
          <i data-lucide="refresh-cw" class="w-3 h-3 opacity-60 ml-0.5"></i>
        </button>

        ${isOnline && s.meetingLink ? `
          <a href="${s.meetingLink}" target="_blank" class="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition" title="Rejoindre visio">
            <i data-lucide="video" class="w-4 h-4"></i>
          </a>
        ` : ''}

        <button onclick="openEditSessionModal('${s.id}')" title="Modifier la séance" class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <i data-lucide="pencil" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;
}

// 3. Modules, Cours & Travaux Dirigés (TD / TP)
function renderModules() {
  const container = document.getElementById('modules-container');
  if (!container) return;

  let modules = appData.modules;
  if (searchQuery) {
    modules = modules.filter(m => 
      m.title.toLowerCase().includes(searchQuery) ||
      m.professor.toLowerCase().includes(searchQuery) ||
      m.code.toLowerCase().includes(searchQuery)
    );
  }

  container.innerHTML = modules.map(m => `
    <div class="card-hover bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 flex flex-col justify-between transition">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs font-mono font-extrabold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
            ${m.code}
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
            <i data-lucide="clock" class="w-3 h-3"></i>
            ${m.daySlot}
          </span>
        </div>

        <h4 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug mb-1.5">
          ${m.title}
        </h4>

        <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-3">
          <i data-lucide="graduation-cap" class="w-4 h-4"></i>
          <span>${m.professor}</span>
        </div>

        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          ${m.description}
        </p>

        <!-- Supports de cours & TD -->
        <div class="border-t border-slate-100 dark:border-slate-800/80 pt-3.5">
          <div class="flex items-center justify-between mb-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Supports & Fiches TD (${m.resources ? m.resources.length : 0})
            </span>
            <button onclick="openAddResourceForModule('${m.id}')" class="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1">
              <i data-lucide="plus" class="w-3 h-3"></i> Ajouter
            </button>
          </div>

          <div class="space-y-2">
            ${(m.resources || []).map(r => `
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-slate-800 transition text-xs group border border-slate-100 dark:border-slate-800/60">
                <span class="flex items-center gap-2 truncate text-slate-700 dark:text-slate-200 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  <i data-lucide="${getResourceIcon(r.type)}" class="w-3.5 h-3.5 shrink-0 text-emerald-600"></i>
                  <span class="truncate">${r.title}</span>
                </span>
                <span class="text-[10px] text-slate-400 shrink-0 ml-2 font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded">${r.size || 'Doc'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span class="text-slate-400 font-medium">📍 Salle C6</span>
        <button onclick="openAddResourceForModule('${m.id}')" class="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
          <i data-lucide="upload" class="w-3.5 h-3.5"></i>
          <span>Déposer un document</span>
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function getResourceIcon(type) {
  switch (type) {
    case 'pdf': return 'file-text';
    case 'video': return 'video';
    case 'code': return 'code-2';
    case 'assignment': return 'clipboard-list';
    case 'archive': return 'archive';
    default: return 'file';
  }
}

// 4. Évaluations & Examens
function renderExams() {
  const container = document.getElementById('exams-container');
  if (!container) return;

  let exams = appData.exams || [];
  if (searchQuery) {
    exams = exams.filter(e => 
      e.module.toLowerCase().includes(searchQuery) ||
      e.professor.toLowerCase().includes(searchQuery) ||
      e.type.toLowerCase().includes(searchQuery)
    );
  }

  container.innerHTML = exams.map(ex => `
    <div class="card-hover bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 flex flex-col justify-between transition">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <span class="text-xs font-mono font-extrabold px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            ${ex.code}
          </span>
          <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            ${ex.status}
          </span>
        </div>

        <h4 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug mb-1">
          ${ex.module}
        </h4>

        <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-3.5 flex items-center gap-1.5">
          <i data-lucide="graduation-cap" class="w-3.5 h-3.5"></i>
          <span>${ex.professor}</span>
        </div>

        <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4 text-rose-500 shrink-0"></i>
            <span class="font-extrabold text-slate-900 dark:text-white">${ex.date}</span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
            <span>Horaire : <b class="font-mono">${ex.time}</b></span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="bookmark" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
            <span>Format : <b>${ex.type}</b></span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="pie-chart" class="w-3.5 h-3.5 text-blue-500 shrink-0"></i>
            <span>Barème : <b class="text-blue-600 dark:text-blue-400">${ex.weight}</b></span>
          </div>
        </div>

        <p class="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          ${ex.description}
        </p>
      </div>

      <div class="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>📍 ${ex.room}</span>
        <span class="font-bold text-rose-600 dark:text-rose-400">Session d'Automne</span>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// 5. Séminaires & Exposés
function renderExposes() {
  const container = document.getElementById('exposes-container');
  if (!container) return;

  let exposes = appData.exposes || [];
  if (searchQuery) {
    exposes = exposes.filter(exp => 
      exp.title.toLowerCase().includes(searchQuery) ||
      exp.module.toLowerCase().includes(searchQuery) ||
      (exp.students || []).some(s => s.toLowerCase().includes(searchQuery))
    );
  }

  container.innerHTML = exposes.map(exp => `
    <div class="card-hover bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            ${exp.presentationDate}
          </span>
          <span class="text-xs text-slate-400 font-semibold">
            ⏱ ${exp.duration}
          </span>
        </div>

        <h4 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug mb-2">
          🎤 ${exp.title}
        </h4>

        <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 mb-4">
          <div class="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <i data-lucide="book-open" class="w-3.5 h-3.5 text-indigo-600"></i>
            <span>${exp.module}</span>
          </div>
          <div class="flex items-center gap-1.5 text-slate-500">
            <i data-lucide="graduation-cap" class="w-3.5 h-3.5"></i>
            <span>Encadrant : ${exp.professor}</span>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
            Membres du Binôme / Étudiants :
          </span>
          <div class="flex flex-wrap gap-2">
            ${(exp.students || []).map(st => `
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-2xs border border-slate-200 dark:border-slate-600">
                <i data-lucide="user" class="w-3 h-3 text-indigo-600 dark:text-indigo-400"></i>
                ${st}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Support : <b>${exp.materials || 'Slides PPT'}</b></span>
        <span class="font-extrabold text-indigo-600 dark:text-indigo-400">Salle C6</span>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// 6. Promotion & Étudiants (33 Inscrits)
function renderStudentCityFilters() {
  const container = document.getElementById('student-city-filters');
  if (!container) return;

  const students = appData.students || [];
  const citiesMap = {};

  students.forEach(s => {
    const c = s.city || 'Meknès';
    citiesMap[c] = (citiesMap[c] || 0) + 1;
  });

  const cities = Object.keys(citiesMap).sort();

  let html = `
    <button 
      onclick="filterStudentsByCity('all')" 
      class="shrink-0 px-3 py-1 rounded-xl font-bold transition ${selectedCityFilter === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}">
      Toutes les Villes (${students.length})
    </button>
  `;

  cities.forEach(city => {
    const count = citiesMap[city];
    const isSelected = selectedCityFilter === city;
    html += `
      <button 
        onclick="filterStudentsByCity('${city}')" 
        class="shrink-0 px-3 py-1 rounded-xl font-semibold transition ${isSelected ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}">
        ${city} (${count})
      </button>
    `;
  });

  container.innerHTML = html;
}

window.filterStudentsByCity = function(city) {
  selectedCityFilter = city;
  renderStudentCityFilters();
  renderStudents();
};

function renderStudents() {
  const tbody = document.getElementById('students-table-body');
  if (!tbody) return;

  let students = appData.students || [];

  if (selectedCityFilter !== 'all') {
    students = students.filter(s => s.city === selectedCityFilter);
  }

  if (searchQuery) {
    students = students.filter(st => 
      st.fullName.toLowerCase().includes(searchQuery) ||
      (st.city || '').toLowerCase().includes(searchQuery) ||
      (st.specialty || '').toLowerCase().includes(searchQuery)
    );
  }

  tbody.innerHTML = students.map((st, idx) => `
    <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition">
      <td class="px-5 py-4 text-center font-mono text-xs text-slate-400 font-extrabold">${idx + 1}</td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
            ${st.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div class="font-extrabold text-slate-900 dark:text-white text-sm">${st.fullName}</div>
            <div class="text-[11px] text-slate-400">Master PINEP (2026-2027)</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-600"></i>
          ${st.city || 'Meknès'}
        </span>
      </td>
      <td class="px-6 py-4">
        <span class="text-xs text-slate-700 dark:text-slate-300 font-medium">
          ${st.specialty || 'Primaire'}
        </span>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

// 7. Équipe Pédagogique & Professeurs
function renderProfessors() {
  const container = document.getElementById('professors-container');
  if (!container) return;

  const profs = appData.modules.map(m => ({
    name: m.professor,
    email: m.email || '',
    module: m.title,
    code: m.code,
    slot: m.daySlot,
    room: m.room || 'Salle C6'
  }));

  container.innerHTML = profs.map(p => `
    <div class="card-hover bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div class="flex items-start gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-base shadow-sm shrink-0">
            ${p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <h4 class="font-extrabold text-slate-900 dark:text-white text-base leading-snug">${p.name}</h4>
            <span class="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Enseignant-Chercheur (ENS Meknès)</span>
          </div>
        </div>

        <div class="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <i data-lucide="book" class="w-4 h-4 text-emerald-600 shrink-0"></i>
            <span class="font-bold text-slate-800 dark:text-slate-200">${p.module} (${p.code})</span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4 text-slate-400 shrink-0"></i>
            <span>${p.slot}</span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 shrink-0"></i>
            <span>${p.room}</span>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span class="text-slate-400 italic flex items-center gap-1.5">
          <i data-lucide="mail" class="w-3.5 h-3.5 opacity-50"></i>
          Email : En attente de communication
        </span>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Interactive Toggle Mode
window.toggleSessionMode = function(sessionId) {
  const session = appData.schedule.find(s => s.id === sessionId);
  if (!session) return;

  if (session.mode === 'in-person') {
    session.mode = 'online';
    session.location = 'En Ligne (Meet / Teams)';
    if (!session.meetingLink) {
      session.meetingLink = 'https://meet.google.com/';
    }
    showToast(`Séance "${session.module}" basculée en Distanciel`, 'video');
  } else {
    session.mode = 'in-person';
    session.location = 'Salle C6';
    showToast(`Séance "${session.module}" basculée en Présentiel (Salle C6)`, 'map-pin');
  }

  saveData();
  renderAll();
};

// Modals Management
function setupModals() {
  // Session Modal
  const modalEdit = document.getElementById('modal-edit');
  document.getElementById('btn-add-modal')?.addEventListener('click', () => openEditSessionModal(null));
  document.getElementById('btn-close-modal')?.addEventListener('click', () => modalEdit?.classList.add('hidden'));
  document.getElementById('btn-cancel-modal')?.addEventListener('click', () => modalEdit?.classList.add('hidden'));
  document.getElementById('form-session')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveSessionForm();
  });

  // Resource Modal
  const modalRes = document.getElementById('modal-resource');
  document.getElementById('btn-add-resource-quick')?.addEventListener('click', () => openAddResourceForModule(null));
  document.getElementById('btn-close-resource-modal')?.addEventListener('click', () => modalRes?.classList.add('hidden'));
  document.getElementById('btn-cancel-resource')?.addEventListener('click', () => modalRes?.classList.add('hidden'));
  document.getElementById('form-resource')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveResourceForm();
  });

  // Exposé Modal
  const modalExp = document.getElementById('modal-expose');
  document.getElementById('btn-add-expose')?.addEventListener('click', () => modalExp?.classList.remove('hidden'));
  document.getElementById('btn-close-expose-modal')?.addEventListener('click', () => modalExp?.classList.add('hidden'));
  document.getElementById('btn-cancel-expose')?.addEventListener('click', () => modalExp?.classList.add('hidden'));
  document.getElementById('form-expose')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveExposeForm();
  });

  // Student Modal
  const modalStd = document.getElementById('modal-student');
  document.getElementById('btn-add-student')?.addEventListener('click', () => modalStd?.classList.remove('hidden'));
  document.getElementById('btn-close-student-modal')?.addEventListener('click', () => modalStd?.classList.add('hidden'));
  document.getElementById('btn-cancel-student')?.addEventListener('click', () => modalStd?.classList.add('hidden'));
  document.getElementById('form-student')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveStudentForm();
  });

  // Exam Modal
  const modalExam = document.getElementById('modal-exam');
  document.getElementById('btn-add-exam')?.addEventListener('click', () => modalExam?.classList.remove('hidden'));
  document.getElementById('btn-close-exam-modal')?.addEventListener('click', () => modalExam?.classList.add('hidden'));
  document.getElementById('btn-cancel-exam')?.addEventListener('click', () => modalExam?.classList.add('hidden'));
  document.getElementById('form-exam')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveExamForm();
  });

  // Sync Modal
  const modalSync = document.getElementById('modal-sync');
  document.getElementById('btn-sync-modal')?.addEventListener('click', () => modalSync?.classList.remove('hidden'));
  document.getElementById('btn-close-sync')?.addEventListener('click', () => modalSync?.classList.add('hidden'));
  document.getElementById('btn-export-json')?.addEventListener('click', exportDataAsJSON);
  document.getElementById('btn-trigger-import')?.addEventListener('click', () => document.getElementById('input-import-json')?.click());
  document.getElementById('input-import-json')?.addEventListener('change', handleImportJSON);

  document.getElementById('btn-reset-data')?.addEventListener('click', () => {
    if (confirm('Voulez-vous réinitialiser le portail avec les données officielles ENS Meknès ?')) {
      appData = JSON.parse(JSON.stringify(defaultMasterData));
      saveData();
      renderAll();
      showToast('Données réinitialisées avec succès', 'refresh-cw');
    }
  });
}

function populateModuleSelects() {
  const sel1 = document.getElementById('edit-session-module');
  const sel2 = document.getElementById('res-module-select');
  const sel3 = document.getElementById('exp-module');
  const sel4 = document.getElementById('exam-module');

  const options = appData.modules.map(m => `
    <option value="${m.id}">${m.code} - ${m.title} (${m.professor})</option>
  `).join('');

  if (sel1) sel1.innerHTML = options;
  if (sel2) sel2.innerHTML = options;
  if (sel3) sel3.innerHTML = options;
  if (sel4) sel4.innerHTML = options;
}

window.openEditSessionModal = function(sessionId) {
  const modal = document.getElementById('modal-edit');
  const idInput = document.getElementById('edit-session-id');
  const modSelect = document.getElementById('edit-session-module');
  const daySelect = document.getElementById('edit-session-day');
  const timeInput = document.getElementById('edit-session-time');
  const locInput = document.getElementById('edit-session-location');
  const linkInput = document.getElementById('edit-session-link');
  const notesInput = document.getElementById('edit-session-notes');

  if (sessionId) {
    const s = appData.schedule.find(item => item.id === sessionId);
    if (!s) return;
    idInput.value = s.id;
    daySelect.value = s.day;
    timeInput.value = s.time;
    locInput.value = s.location || 'Salle C6';
    linkInput.value = s.meetingLink || '';
    notesInput.value = s.notes || '';

    const matchMod = appData.modules.find(m => m.title === s.module);
    if (matchMod) modSelect.value = matchMod.id;

    document.querySelectorAll('input[name="edit-mode"]').forEach(r => {
      r.checked = (r.value === s.mode);
    });
  } else {
    idInput.value = '';
    timeInput.value = '09H00 - 12H30';
    locInput.value = 'Salle C6';
    linkInput.value = '';
    notesInput.value = '';
  }

  modal?.classList.remove('hidden');
};

function saveSessionForm() {
  const id = document.getElementById('edit-session-id').value;
  const moduleId = document.getElementById('edit-session-module').value;
  const day = document.getElementById('edit-session-day').value;
  const time = document.getElementById('edit-session-time').value;
  const location = document.getElementById('edit-session-location').value;
  const meetingLink = document.getElementById('edit-session-link').value;
  const notes = document.getElementById('edit-session-notes').value;
  const mode = document.querySelector('input[name="edit-mode"]:checked')?.value || 'in-person';

  const selectedMod = appData.modules.find(m => m.id === moduleId);
  if (!selectedMod) return;

  const dayIndices = { 'Vendredi': 5, 'Samedi': 6, 'Dimanche': 7 };

  if (id) {
    const session = appData.schedule.find(s => s.id === id);
    if (session) {
      session.module = selectedMod.title;
      session.code = selectedMod.code;
      session.professor = selectedMod.professor;
      session.day = day;
      session.dayIndex = dayIndices[day] || 1;
      session.time = time;
      session.mode = mode;
      session.location = location;
      session.meetingLink = meetingLink;
      session.notes = notes;
    }
  } else {
    appData.schedule.push({
      id: 'sch-' + Date.now(),
      day,
      dayIndex: dayIndices[day] || 1,
      time,
      module: selectedMod.title,
      code: selectedMod.code,
      professor: selectedMod.professor,
      mode,
      location,
      meetingLink,
      notes,
      semester: 'S1'
    });
  }

  saveData();
  renderAll();
  document.getElementById('modal-edit')?.classList.add('hidden');
  showToast('Séance enregistrée avec succès');
}

window.openAddResourceForModule = function(moduleId) {
  const modal = document.getElementById('modal-resource');
  const sel = document.getElementById('res-module-select');
  if (moduleId && sel) sel.value = moduleId;
  document.getElementById('res-title').value = '';
  document.getElementById('res-url').value = '';
  document.getElementById('res-size').value = '';
  modal?.classList.remove('hidden');
};

function saveResourceForm() {
  const moduleId = document.getElementById('res-module-select').value;
  const title = document.getElementById('res-title').value;
  const type = document.getElementById('res-type').value;
  const size = document.getElementById('res-size').value;
  const url = document.getElementById('res-url').value;

  const mod = appData.modules.find(m => m.id === moduleId);
  if (!mod) return;

  if (!mod.resources) mod.resources = [];
  mod.resources.push({
    id: 'res-' + Date.now(),
    title,
    type,
    size: size || (type === 'pdf' ? 'PDF' : 'Lien'),
    url,
    date: new Date().toISOString().split('T')[0]
  });

  saveData();
  renderAll();
  document.getElementById('modal-resource')?.classList.add('hidden');
  showToast('Support pédagogique ajouté');
}

function saveExposeForm() {
  const title = document.getElementById('exp-title').value;
  const moduleId = document.getElementById('exp-module').value;
  const studentsStr = document.getElementById('exp-students').value;
  const date = document.getElementById('exp-date').value;
  const duration = document.getElementById('exp-duration').value;

  const mod = appData.modules.find(m => m.id === moduleId);
  if (!mod) return;

  const students = studentsStr.split(',').map(s => s.trim()).filter(Boolean);

  if (!appData.exposes) appData.exposes = [];
  appData.exposes.push({
    id: 'exp-' + Date.now(),
    title,
    module: mod.title,
    professor: mod.professor,
    students,
    presentationDate: date || 'Date à définir',
    duration: duration || '20 min',
    status: 'À venir',
    materials: 'Slides PPT'
  });

  saveData();
  renderAll();
  document.getElementById('modal-expose')?.classList.add('hidden');
  showToast('Séminaire programmé');
}

function saveStudentForm() {
  const name = document.getElementById('std-name').value;
  const city = document.getElementById('std-city').value;
  const spec = document.getElementById('std-spec')?.value || 'Primaire';

  if (!appData.students) appData.students = [];
  appData.students.push({
    id: 'std-' + Date.now(),
    fullName: name,
    city: city || 'Meknès',
    specialty: spec
  });

  saveData();
  renderAll();
  document.getElementById('modal-student')?.classList.add('hidden');
  showToast('Étudiant ajouté à la promotion');
}

function saveExamForm() {
  const moduleId = document.getElementById('exam-module').value;
  const date = document.getElementById('exam-date').value;
  const time = document.getElementById('exam-time').value;
  const type = document.getElementById('exam-type').value;
  const weight = document.getElementById('exam-weight').value;
  const desc = document.getElementById('exam-desc').value;

  const mod = appData.modules.find(m => m.id === moduleId);
  if (!mod) return;

  if (!appData.exams) appData.exams = [];
  appData.exams.push({
    id: 'ex-' + Date.now(),
    module: mod.title,
    code: mod.code,
    professor: mod.professor,
    date: date || 'Date à fixer',
    time: time || '09H00 - 12H00',
    type: type || 'Épreuve Écrite',
    room: 'Salle C6',
    weight: weight || '100%',
    status: 'À venir',
    description: desc || 'Session d’automne'
  });

  saveData();
  renderAll();
  document.getElementById('modal-exam')?.classList.add('hidden');
  showToast('Épreuve programmée');
}

function exportDataAsJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `master_pinep_ens_meknes_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Fichier JSON téléchargé');
}

function handleImportJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (imported.schedule && imported.modules) {
        appData = imported;
        saveData();
        renderAll();
        showToast('Données importées avec succès !', 'check-circle');
        document.getElementById('modal-sync')?.classList.add('hidden');
      } else {
        alert('Format de fichier JSON non reconnu.');
      }
    } catch (err) {
      alert('Erreur lors de la lecture du fichier JSON.');
    }
  };
  reader.readAsText(file);
}
