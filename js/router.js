const Router = {
  routes: {
    'home': renderHome,
    'candidates': renderCandidates,
    'elections': renderElections,
    'issues': renderIssues,
    'match': renderMatch,
    'learning': renderLearning,
    'candidate-detail': renderCandidateDetail,
    'dashboard': renderDashboard
  },

  init() {
    console.log('Router initializing...');
    window.addEventListener('hashchange', () => {
      console.log('Hash changed to:', window.location.hash);
      this.handleRoute();
    });
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    console.log('Handling route for hash:', hash);
    
    // Support nested paths like candidate-detail/c1
    const parts = hash.split('/');
    const path = parts[0];
    const id = parts[1];
    
    console.log('Path:', path, 'ID:', id);

    // Update active state in sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${path}`);
    });

    const routeAction = this.routes[path];
    if (routeAction) {
      console.log('Executing route action for:', path);
      routeAction(id).catch(err => {
        console.error(`Error rendering route ${path}:`, err);
        renderError(err);
      });
    } else {
      console.warn('No route found for:', path, '- Defaulting to home');
      renderHome();
    }
    
    window.scrollTo(0, 0);
  },

  navigate(path) {
    console.log('Navigating to:', path);
    window.location.hash = path;
  }
};

function renderError(err) {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="error-state fade-in" style="padding: 4rem; text-align: center;">
      <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
      <h2>Something went wrong</h2>
      <p style="color: var(--text-muted); margin-top: 1rem;">${err.message || 'An unexpected error occurred.'}</p>
      <button class="btn-primary" style="margin-top: 2rem;" onclick="location.reload()">Reload Page</button>
    </div>
  `;
}

async function renderHome() {
  console.log('Rendering Home');
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <section class="hero-section fade-in">
      <h1>Election Information <br><span style="color: var(--primary-light)">Simplified.</span></h1>
      <p style="color: var(--text-muted); font-size: 1.25rem; max-width: 600px; margin: 0 auto;">
        Your nonpartisan encyclopedia for elections, candidates, and policies. Powered by AI, built for citizens.
      </p>
      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
        <button class="btn-primary" onclick="Router.navigate('candidates')">Explore Candidates</button>
        <button class="btn-secondary" onclick="Router.navigate('learning')">How to Vote</button>
      </div>
    </section>

    <div class="grid-layout" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 4rem;">
      <div class="feature-card glass fade-in" style="padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <i class="fas fa-search-location" style="font-size: 2rem; color: var(--primary); margin-bottom: 1rem;"></i>
        <h3>Find Your Election</h3>
        <p>Track upcoming elections in your region with interactive timelines.</p>
      </div>
      <div class="feature-card glass fade-in" style="padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); animation-delay: 0.1s;">
        <i class="fas fa-balance-scale" style="font-size: 2rem; color: var(--primary); margin-bottom: 1rem;"></i>
        <h3>Compare Stances</h3>
        <p>Analyze candidate positions on key issues like economy and healthcare.</p>
      </div>
      <div class="feature-card glass fade-in" style="padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); animation-delay: 0.2s;">
        <i class="fas fa-robot" style="font-size: 2rem; color: var(--primary); margin-bottom: 1rem;"></i>
        <h3>AI Insights</h3>
        <p>Get instant summaries and "Explain Like I'm 10" answers from our assistant.</p>
      </div>
    </div>
  `;
}

async function renderCandidates() {
  console.log('Rendering Candidates');
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header fade-in">
      <h2>Political Candidates</h2>
      <p>Browse detailed profiles and track records of active politicians.</p>
    </div>
    <div id="candidates-list" class="grid-layout" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin-top: 2rem;">
      <div class="skeleton-card"></div><div class="skeleton-card"></div>
    </div>
  `;

  try {
    const candidates = await API.getCandidates();
    const list = document.getElementById('candidates-list');
    list.innerHTML = candidates.map(c => CandidateCard(c)).join('');
  } catch (e) {
    console.error('Failed to load candidates:', e);
    throw new Error('Failed to load candidate data. Please check your connection.');
  }
}

async function renderCandidateDetail(id) {
  console.log('Rendering Candidate Detail for ID:', id);
  const main = document.getElementById('main-content');
  
  if (!id) throw new Error('No candidate ID provided.');

  const candidate = await API.getCandidateById(id);
  
  if (!candidate) {
    main.innerHTML = `<div style="text-align: center; padding: 4rem;"><h2>Candidate Not Found</h2><p>The candidate with ID "${id}" does not exist in our database.</p></div>`;
    return;
  }

  main.innerHTML = `
    <div class="candidate-detail fade-in">
      <div class="detail-header" style="display: flex; gap: 2rem; align-items: flex-start; margin-bottom: 3rem;">
        <img src="${candidate.image}" alt="${candidate.name}" style="width: 200px; height: 200px; border-radius: var(--radius-lg); object-fit: cover; box-shadow: var(--shadow-lg);">
        <div class="header-info">
          <span class="badge" style="background: rgba(30, 58, 138, 0.1); color: var(--primary); padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.875rem; font-weight: 600;">${candidate.party}</span>
          <h1 style="font-size: 2.5rem; margin: 0.5rem 0;">${candidate.name}</h1>
          <p style="font-size: 1.125rem; color: var(--text-muted);">${candidate.role}</p>
        </div>
      </div>

      <div class="tabs" style="display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 2rem;">
        <span class="tab active" style="padding: 1rem 0; border-bottom: 2px solid var(--primary); font-weight: 600; cursor: pointer;">Biography</span>
        <span class="tab" style="padding: 1rem 0; color: var(--text-muted); cursor: pointer;">Issue Stances</span>
        <span class="tab" style="padding: 1rem 0; color: var(--text-muted); cursor: pointer;">Performance</span>
      </div>

      <div class="tab-content">
        <section>
          <h3>About ${candidate.name}</h3>
          <p style="margin-top: 1rem; color: var(--text-main); font-size: 1.1rem;">${candidate.bio}</p>
          
          <h4 style="margin-top: 2rem;">Education</h4>
          <p>${candidate.education}</p>

          <h4 style="margin-top: 2rem;">Career Highlights</h4>
          <ul style="margin-top: 1rem; padding-left: 1.5rem;">
            ${candidate.career.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </section>
      </div>
    </div>
  `;
}

async function renderElections() {
  console.log('Rendering Elections');
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header fade-in">
      <h2>Elections</h2>
      <p>Track upcoming and historical election data with precision timelines.</p>
    </div>
    <div id="elections-list" style="margin-top: 2rem; display: flex; flex-direction: column; gap: 3rem;">
      <!-- Loaded dynamically -->
    </div>
  `;

  try {
    const elections = await API.getElections();
    const list = document.getElementById('elections-list');
    list.innerHTML = elections.map(e => `
      <div class="election-entry glass fade-in" style="padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3>${e.title}</h3>
          <span class="badge" style="background: ${e.status === 'upcoming' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)'}; color: ${e.status === 'upcoming' ? 'var(--accent)' : 'var(--secondary)'}; padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700;">${e.status.toUpperCase()}</span>
        </div>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">${e.description}</p>
        
        ${e.timeline ? ElectionTimeline(e.timeline) : `
          <div class="election-results" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border);">
            <p><strong>Winner:</strong> ${e.results.winner}</p>
            <p><strong>Turnout:</strong> ${e.results.turnout}</p>
          </div>
        `}
      </div>
    `).join('');
  } catch (e) {
    console.error('Failed to load elections:', e);
    throw new Error('Failed to load election data.');
  }
}

async function renderIssues() {
  console.log('Rendering Issues');
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header fade-in">
      <h2>Issue Explorer</h2>
      <p>Neutral, comprehensive perspectives on the key topics shaping the election.</p>
    </div>
    <div id="issues-list" style="margin-top: 2rem; display: flex; flex-direction: column; gap: 2.5rem;">
      <!-- Loaded dynamically -->
    </div>
  `;

  try {
    const issues = await API.getIssues();
    const list = document.getElementById('issues-list');
    list.innerHTML = issues.map(issue => `
      <div class="issue-card glass fade-in" style="padding: 2.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 48px; height: 48px; background: rgba(30, 58, 138, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary);">
            <i class="fas fa-info-circle"></i>
          </div>
          <h3>${issue.title}</h3>
        </div>
        <p style="color: var(--text-main); font-size: 1.125rem; font-weight: 500;">${issue.summary}</p>
        <p style="color: var(--text-muted); margin-top: 1rem;">${issue.description}</p>
        
        <div class="perspectives-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);">
          ${issue.perspectives.map(p => `
            <div class="perspective-box">
              <h4 style="color: var(--secondary); font-size: 0.875rem; text-transform: uppercase; margin-bottom: 1rem;">${p.view}</h4>
              <ul style="padding-left: 1.25rem;">
                ${p.points.map(point => `<li style="margin-bottom: 0.5rem; font-size: 0.9375rem;">${point}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error('Failed to load issues:', e);
    throw new Error('Failed to load issue data.');
  }
}

async function renderMatch() {
  console.log('Rendering Match Quiz');
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header fade-in">
      <h2>Candidate Match Quiz</h2>
      <p>Discover which candidate aligns with your values on economy, healthcare, and education.</p>
    </div>
    <div id="quiz-mount"></div>
  `;
  
  const mount = document.getElementById('quiz-mount');
  mount.appendChild(renderQuiz());
}

async function renderLearning() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header fade-in">
      <h2>Learning Hub</h2>
      <p>Master the fundamentals of democracy and the voting process.</p>
    </div>
    <div class="learning-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
      <div class="learning-card glass fade-in" style="padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <span class="badge" style="background: rgba(59, 130, 246, 0.1); color: var(--primary-light); margin-bottom: 1rem;">MODULE 1</span>
        <h3>How to Vote</h3>
        <p style="margin: 1rem 0; color: var(--text-muted);">A step-by-step guide to registration, polling locations, and casting your ballot.</p>
        <button class="btn-secondary" style="width: 100%;">Start Module</button>
      </div>
      <div class="learning-card glass fade-in" style="padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); animation-delay: 0.1s;">
        <span class="badge" style="background: rgba(16, 185, 129, 0.1); color: var(--accent); margin-bottom: 1rem;">MODULE 2</span>
        <h3>Structure of Govt</h3>
        <p style="margin: 1rem 0; color: var(--text-muted);">Understanding the branches of government and their specific responsibilities.</p>
        <button class="btn-secondary" style="width: 100%;">Start Module</button>
      </div>
      <div class="learning-card glass fade-in" style="padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); animation-delay: 0.2s;">
        <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; margin-bottom: 1rem;">MODULE 3</span>
        <h3>Election Security</h3>
        <p style="margin: 1rem 0; color: var(--text-muted);">How your vote is protected and the role of independent observers.</p>
        <button class="btn-secondary" style="width: 100%;">Start Module</button>
      </div>
    </div>
  `;
}

async function renderDashboard() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header fade-in">
      <h2>Welcome Back, Citizen</h2>
      <p>Manage your saved candidates, track your learning progress, and see AI insights.</p>
    </div>
    
    <div class="dashboard-stats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem;">
      <div class="stat-card glass" style="padding: 1.5rem; border-radius: var(--radius-md); text-align: center;">
        <span style="font-size: 2rem; font-weight: 700; color: var(--primary);">2</span>
        <p style="font-size: 0.875rem; color: var(--text-muted);">Saved Candidates</p>
      </div>
      <div class="stat-card glass" style="padding: 1.5rem; border-radius: var(--radius-md); text-align: center;">
        <span style="font-size: 2rem; font-weight: 700; color: var(--accent);">35%</span>
        <p style="font-size: 0.875rem; color: var(--text-muted);">Learning Progress</p>
      </div>
      <div class="stat-card glass" style="padding: 1.5rem; border-radius: var(--radius-md); text-align: center;">
        <span style="font-size: 2rem; font-weight: 700; color: var(--primary-light);">12</span>
        <p style="font-size: 0.875rem; color: var(--text-muted);">AI Queries Made</p>
      </div>
    </div>

    <div style="margin-top: 3rem;">
      <h3>Recent Activity</h3>
      <div class="activity-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
        <div class="activity-item glass" style="padding: 1rem; border-radius: var(--radius-md); display: flex; align-items: center; gap: 1rem;">
          <i class="fas fa-search" style="color: var(--secondary);"></i>
          <span>Searched for "Economic Policies"</span>
          <span style="margin-left: auto; font-size: 0.75rem; color: var(--text-muted);">2 hours ago</span>
        </div>
        <div class="activity-item glass" style="padding: 1rem; border-radius: var(--radius-md); display: flex; align-items: center; gap: 1rem;">
          <i class="fas fa-heart" style="color: #ef4444;"></i>
          <span>Saved Candidate: <strong>Arjun Sharma</strong></span>
          <span style="margin-left: auto; font-size: 0.75rem; color: var(--text-muted);">Yesterday</span>
        </div>
      </div>
    </div>
  `;
}
