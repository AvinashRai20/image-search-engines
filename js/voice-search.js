// Voice Search Functionality
const voiceBtn = document.querySelector('.voice-btn');

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        voiceBtn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
    });

    recognition.onstart = () => {
        console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('Search-box').value = transcript;
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        // Trigger search
        document.getElementById("Search-form").dispatchEvent(new Event('submit'));
    };

    recognition.onend = () => {
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        voiceBtn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
    };
} else {
    voiceBtn.style.display = 'none';
    console.log('Speech recognition not supported');
}