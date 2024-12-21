import LAUGH from '../sounds/laugh.mp3';
import WON from '../sounds/won.mp3';

export const SOUND_EFFECTS = {
  match: 'https://cdn.freesound.org/previews/240/240777_4107740-lq.mp3',
  flip: "https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3",
  laugh: LAUGH,
  won: WON,
};

// Audio utility function
export const playSound = (soundEffect) => {
  const audio = new Audio(soundEffect);
  audio.volume = 0.4; // Reduce volume to 60%
  
  // Only play if the audio can be played
  audio.play().catch(error => {
    console.log("Audio playback prevented:", error);
  });
};