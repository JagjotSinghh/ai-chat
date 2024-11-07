// Toggle Light/Dark Mode
document.getElementById('mode-switch').addEventListener('change', () => {
    document.body.classList.toggle('lightMode');
});

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

// Simulated API Endpoints
const apiUrl = 'https://your-api-endpoint.com/messages'; // Replace with actual backend URL

// Function to fetch and display messages
async function loadMessages() {
    try {
        const response = await fetch(apiUrl); // Fetch messages from backend
        const messages = await response.json();
        chatBox.innerHTML = ''; // Clear chat box
        
        messages.forEach(message => {
            const msgElement = document.createElement('div');
            msgElement.classList.add('message');
            msgElement.classList.add(message.isOwnMessage ? 'right' : 'left');
            msgElement.textContent = message.content;
            chatBox.appendChild(msgElement);
        });

        // Scroll to bottom of chat
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Failed to load messages:', error);
    }
}

// Function to send a new message
async function sendMessage(content) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            loadMessages(); // Reload messages after sending
        } else {
            console.error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event listener for sending messages
document.getElementById('send-btn').addEventListener('click', () => {
    const messageContent = messageInput.value.trim();
    if (messageContent) {
        sendMessage(messageContent);
        messageInput.value = ''; // Clear input field
    }
});

// Load messages when page loads
loadMessages();
