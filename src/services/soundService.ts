/**
 * Audio service providing synthesized soft spiritual chimes and athan call tones
 * without relying on broken external links. Uses Web Audio API for 100% reliability offline and online.
 */

class SoundService {
  private audioCtx: AudioContext | null = null;

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Plays a harmonious, gentle acoustic spiritual chime sequence (Pentatonic peaceful tone)
   */
  public playChime(volume: number = 0.7) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      // Peaceful modal chime frequencies: F4, A4, C5, F5
      const notes = [349.23, 440.0, 523.25, 698.46];

      notes.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.28);

        gain.gain.setValueAtTime(0, now + idx * 0.28);
        gain.gain.linearRampToValueAtTime(0.18 * volume, now + idx * 0.28 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.28 + 1.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.28);
        osc.stop(now + idx * 0.28 + 1.85);
      });
    } catch (err) {
      console.warn('Audio chime playback failed:', err);
    }
  }

  /**
   * Plays melodic spiritual recitation cadence (Athan motif) synthesized cleanly
   */
  public playAthanSample(volume: number = 0.7) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      // Traditional Hijaz / Bayati maqam notes: D4, Eb4, F#4, G4, A4
      const sequence = [
        { freq: 293.66, dur: 0.6, delay: 0 },
        { freq: 311.13, dur: 0.8, delay: 0.6 },
        { freq: 369.99, dur: 1.0, delay: 1.4 },
        { freq: 392.0, dur: 1.2, delay: 2.4 },
        { freq: 440.0, dur: 1.4, delay: 3.6 },
        { freq: 369.99, dur: 0.8, delay: 5.0 },
        { freq: 293.66, dur: 1.6, delay: 5.8 },
      ];

      sequence.forEach((note) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, now + note.delay);

        gain.gain.setValueAtTime(0, now + note.delay);
        gain.gain.linearRampToValueAtTime(0.22 * volume, now + note.delay + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.delay + note.dur);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + note.delay);
        osc.stop(now + note.delay + note.dur + 0.05);
      });
    } catch (err) {
      console.warn('Athan preview error:', err);
    }
  }

  public playTasbihClick() {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore
    }
  }

  public playClick(volume: number = 0.5) {
    this.playTasbihClick();
  }
}

export const soundService = new SoundService();
