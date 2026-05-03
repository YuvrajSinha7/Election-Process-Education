const API = {
  async getCandidates() {
    const res = await fetch('data/candidates.json');
    return res.json();
  },
  async getElections() {
    const res = await fetch('data/elections.json');
    return res.json();
  },
  async getIssues() {
    const res = await fetch('data/issues.json');
    return res.json();
  },
  async getCandidateById(id) {
    const candidates = await this.getCandidates();
    return candidates.find(c => c.id === id);
  }
};
