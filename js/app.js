document.addEventListener('DOMContentLoaded', () => {
  // Initialize Router
  Router.init();

  // Initialize AI Chat
  const chatBubble = document.getElementById('ai-chat-bubble');
  const openChatBtn = document.getElementById('open-ai-chat');
  
  const toggleChat = () => {
    const chatWindow = document.getElementById('ai-chat-window');
    if (chatWindow) {
      chatWindow.classList.toggle('active');
      // Ensure existing window is initialized if it wasn't
      if (!chatWindow.dataset.initialized) {
        setupChatListeners(chatWindow);
      }
    } else {
      createChatWindow();
    }
  };

  chatBubble.addEventListener('click', toggleChat);
  if (openChatBtn) openChatBtn.addEventListener('click', toggleChat);

  // Auth Redirects
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.onclick = () => window.location.href = '/api/auth/signin';
  }

  // Global Search Logic
  const searchInput = document.querySelector('.search-bar input');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    if (term.length > 2) {
      const cards = document.querySelectorAll('.candidate-card, .issue-card');
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? 'block' : 'none';
      });
    } else {
      document.querySelectorAll('.candidate-card, .issue-card').forEach(c => c.style.display = 'block');
    }
  });

  console.log('VoteWise App Initialized Successfully');
});

function setupChatListeners(chatWindow) {
  const input = chatWindow.querySelector('#chat-input');
  const sendBtn = chatWindow.querySelector('#send-chat');
  const messages = chatWindow.querySelector('#chat-messages');

  if (!input || !sendBtn || !messages) return;

  const sendMessage = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    messages.innerHTML += `<div class="message user">${text}</div>`;
    messages.scrollTop = messages.scrollHeight;

    const loadingId = 'msg-' + Date.now();
    messages.innerHTML += `<div class="message bot" id="${loadingId}"><i class="fas fa-spinner fa-spin"></i> Thinking...</div>`;

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      document.getElementById(loadingId).innerText = data.reply;
    } catch (e) {
      document.getElementById(loadingId).innerText = "Error: Could not connect to AI service.";
    }
    messages.scrollTop = messages.scrollHeight;
  };

  sendBtn.onclick = sendMessage;
  input.onkeypress = (e) => e.key === 'Enter' && sendMessage();
  
  const closeBtn = chatWindow.querySelector('.close-chat');
  if (closeBtn) closeBtn.onclick = () => chatWindow.classList.remove('active');
  
  chatWindow.dataset.initialized = "true";
}

function createChatWindow() {
  const window = document.createElement('div');
  window.id = 'ai-chat-window';
  window.className = 'ai-chat-window glass active fade-in';
  window.innerHTML = `
    <div class="chat-header">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-robot"></i>
        <span>VoteWise AI</span>
      </div>
      <i class="fas fa-times close-chat" style="cursor: pointer;"></i>
    </div>
    <div id="chat-messages" class="chat-messages">
      <div class="message bot">Hello! I'm your nonpartisan election assistant. How can I help you today?</div>
    </div>
    <div class="chat-input-area">
      <input type="text" placeholder="Ask a question..." id="chat-input">
      <button id="send-chat"><i class="fas fa-paper-plane"></i></button>
    </div>
  `;
  document.body.appendChild(window);
  setupChatListeners(window);
}
