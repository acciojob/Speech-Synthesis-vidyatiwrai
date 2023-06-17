// Your script here.
 // Get the necessary elements
    const voiceSelect = document.getElementById('voice-select');
    const textInput = document.getElementById('text-input');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const rateInput = document.getElementById('rate-input');
    const pitchInput = document.getElementById('pitch-input');
  
    // Initialize the speech synthesis API
    const synth = window.speechSynthesis;
  
    // Function to populate the voices dropdown
    function populateVoices() {
      const voices = synth.getVoices();
  
      voiceSelect.innerHTML = '';
  
      voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
      });
    }
  
    // Populate voices on page load
    populateVoices();
  
    // Listen for voiceschanged event
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoices;
    }
  
    // Function to start speaking
    function startSpeaking() {
      if (synth.speaking) {
        console.log('Speech synthesis already in progress.');
        return;
      }
  
      const selectedVoice = voiceSelect.value;
      const text = textInput.value;
  
      if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
  
        // Set the voice
        const voices = synth.getVoices();
        const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
        utterance.voice = selectedVoiceObj;
  
        // Set the rate and pitch
        utterance.rate = parseFloat(rateInput.value);
        utterance.pitch = parseFloat(pitchInput.value);
  
        // Start speaking
        synth.speak(utterance);
      }
    }
  
    // Function to stop speaking
    function stopSpeaking() {
      if (synth.speaking) {
        synth.cancel();
      }
    }
  
    // Attach event listeners
    startButton.addEventListener('click', startSpeaking);
    stopButton.addEventListener('click', stopSpeaking);
