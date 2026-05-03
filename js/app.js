document.addEventListener('DOMContentLoaded', () => {
  // Initialize Router
  Router.init();

  // Initialize AI Chat Bubble
  const chatBubble = document.getElementById('ai-chat-bubble');
  chatBubble.addEventListener('click', () => {
    alert("AI Assistant Initializing...\n\nIn a production environment, this would open a streaming chat window powered by Gemini.");
  });

  // Global Search Logic
  const searchInput = document.querySelector('.search-bar input');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    if (term.length > 2) {
      console.log('Searching for:', term);
      // Implementation for real-time search suggestions would go here
    }
  });

  console.log('VoteWise App Initialized Successfully');
});
