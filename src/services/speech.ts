export function speakKannada(text: string): boolean {
  if (!('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel(); // Cancel any ongoing speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85; // slightly slower for language learning
  utterance.pitch = 1.0;

  // Try to find Kannada voice if available, or fallback to default
  const voices = window.speechSynthesis.getVoices();
  const knVoice = voices.find(
    (v) => v.lang.startsWith('kn') || v.name.toLowerCase().includes('kannada')
  );

  if (knVoice) {
    utterance.voice = knVoice;
    utterance.lang = 'kn-IN';
  } else {
    utterance.lang = 'en-IN'; // Fallback to Indian English accent for transliterations
  }

  window.speechSynthesis.speak(utterance);
  return true;
}
