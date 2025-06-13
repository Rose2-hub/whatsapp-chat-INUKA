const input = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('chat-messages');

const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(text, type = 'sent') {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', type);
  messageDiv.textContent = text;
  messagesContainer.appendChild(messageDiv);
  scrollToBottom();
}

function botReply() {
  const replies = [
    "👍 Super !",
    "Je vois ça 😎",
    "Merci pour ton message 😊",
    "Je suis là pour toi 🙏",
    "Haha, c'est drôle 😂",
    "On se parle bientôt ? 🎉"
  ];
  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  setTimeout(() => addMessage(randomReply, 'received'), 1200);
}

function sendMessage() {
  const message = input.value.trim();
  if (message === '') return;
  addMessage(message, 'sent');
  input.value = '';
  botReply();
}

sendButton.addEventListener('click', sendMessage);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Emoji picker toggle
emojiBtn.addEventListener('click', () => {
  emojiPicker.classList.toggle('hidden');
});

// Ajouter emoji au clic
emojiPicker.addEventListener('click', e => {
  if (!e.target.classList.contains('emoji')) return;
  input.value += e.target.textContent;
  input.focus();
});

// Fermer emoji picker si clic à l'extérieur
document.addEventListener('click', (e) => {
  if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
    emojiPicker.classList.add('hidden');
  }
});

scrollToBottom();


