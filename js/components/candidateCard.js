function CandidateCard(candidate) {
  return `
    <div class="candidate-card glass fade-in" onclick="Router.navigate('candidate-detail/${candidate.id}')" style="cursor: pointer; transition: var(--transition); border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border);">
      <div class="card-image" style="height: 200px; overflow: hidden;">
        <img src="${candidate.image}" alt="${candidate.name}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition);">
      </div>
      <div class="card-body" style="padding: 1.5rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--secondary); text-transform: uppercase;">${candidate.party}</span>
        <h3 style="margin: 0.5rem 0;">${candidate.name}</h3>
        <p style="font-size: 0.875rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${candidate.bio}</p>
        
        <div class="card-footer" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: var(--primary); font-size: 0.875rem;">View Profile</span>
          <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--secondary);"></i>
        </div>
      </div>
    </div>
  `;
}
