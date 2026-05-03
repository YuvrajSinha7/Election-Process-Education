const Quiz = {
  questions: [
    {
      id: 1,
      text: "How should the government handle economic growth?",
      options: [
        { text: "Focus on deregulation and corporate tax cuts.", stance: "economy_liberal" },
        { text: "Increase labor protections and support small businesses.", stance: "economy_welfare" }
      ]
    },
    {
      id: 2,
      text: "What is the best approach to healthcare?",
      options: [
        { text: "Universal healthcare funded by the state.", stance: "healthcare_public" },
        { text: "A mix of private insurance and public safety nets.", stance: "healthcare_mix" }
      ]
    }
  ],

  calculateResult(answers) {
    // In a real app, this would use a weighted algorithm against candidate data
    // For the demo, we'll map simple stances to our two candidates
    const score = { c1: 0, c2: 0 };
    
    answers.forEach(a => {
      if (a === 'economy_liberal') score.c1 += 1;
      if (a === 'economy_welfare') score.c2 += 1;
      if (a === 'healthcare_mix') score.c1 += 1;
      if (a === 'healthcare_public') score.c2 += 1;
    });

    return score.c1 >= score.c2 ? 'c1' : 'c2';
  }
};

function renderQuiz() {
  let currentStep = 0;
  const answers = [];

  const container = document.createElement('div');
  container.className = 'quiz-container fade-in';
  container.style.maxWidth = '600px';
  container.style.margin = '2rem auto';
  container.style.padding = '2rem';
  container.style.background = 'var(--surface)';
  container.style.borderRadius = 'var(--radius-lg)';
  container.style.boxShadow = 'var(--shadow-lg)';

  function showQuestion() {
    const q = Quiz.questions[currentStep];
    container.innerHTML = `
      <div class="quiz-header" style="margin-bottom: 2rem;">
        <span style="font-weight: 600; color: var(--secondary);">Question ${currentStep + 1} of ${Quiz.questions.length}</span>
        <h2 style="margin-top: 0.5rem;">${q.text}</h2>
      </div>
      <div class="quiz-options" style="display: flex; flex-direction: column; gap: 1rem;">
        ${q.options.map((opt, idx) => `
          <button class="btn-secondary quiz-opt" style="text-align: left; padding: 1.25rem;" data-stance="${opt.stance}">
            ${opt.text}
          </button>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.onclick = () => {
        answers.push(btn.dataset.stance);
        currentStep++;
        if (currentStep < Quiz.questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      };
    });
  }

  async function showResult() {
    const resultId = Quiz.calculateResult(answers);
    const candidate = await API.getCandidateById(resultId);
    
    container.innerHTML = `
      <div class="quiz-result fade-in" style="text-align: center;">
        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
        <h2>Your Best Match</h2>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">Based on your policy preferences, you align most closely with:</p>
        
        <div class="match-result-card" style="padding: 2rem; border: 2px solid var(--primary); border-radius: var(--radius-lg); margin-bottom: 2rem;">
          <img src="${candidate.image}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;">
          <h3>${candidate.name}</h3>
          <p style="color: var(--primary); font-weight: 600;">${candidate.party}</p>
        </div>

        <button class="btn-primary" onclick="Router.navigate('candidate-detail/${candidate.id}')">View Full Profile</button>
        <button class="btn-secondary" style="margin-top: 1rem;" onclick="location.hash = 'match'">Restart Quiz</button>
      </div>
    `;
  }

  showQuestion();
  return container;
}
