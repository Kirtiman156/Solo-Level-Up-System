// =========================================
// SOLO LEVELING SYSTEM - MAIN APP
// =========================================

// =========================================
// AUDIO SYSTEM - Cinematic Solo Leveling Sound Effects
// =========================================
class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.5;
        this.masterGain = null;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = this.volume;
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    setVolume(vol) {
        this.volume = vol;
        if (this.masterGain) {
            this.masterGain.gain.value = vol;
        }
    }

    // Create a reverb-like delay effect
    createReverb(duration = 0.3) {
        const delay = this.audioContext.createDelay();
        const feedback = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        delay.delayTime.value = 0.05;
        feedback.gain.value = 0.3;
        filter.type = 'lowpass';
        filter.frequency.value = 2000;

        delay.connect(feedback);
        feedback.connect(filter);
        filter.connect(delay);

        return { delay, feedback, filter };
    }

    // SYSTEM OPEN - Deep atmospheric whoosh with digital harmonics
    playSystemOpen() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;
        const duration = 1.2;

        // Deep bass sweep (the "whoosh")
        const bass = this.audioContext.createOscillator();
        const bassGain = this.audioContext.createGain();
        bass.type = 'sine';
        bass.frequency.setValueAtTime(60, now);
        bass.frequency.exponentialRampToValueAtTime(120, now + 0.3);
        bass.frequency.exponentialRampToValueAtTime(40, now + duration);
        bassGain.gain.setValueAtTime(0, now);
        bassGain.gain.linearRampToValueAtTime(this.volume * 0.5, now + 0.1);
        bassGain.gain.linearRampToValueAtTime(0, now + duration);
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        bass.start(now);
        bass.stop(now + duration);

        // Digital harmonic sweep (the "system" sound)
        const harmonics = [200, 400, 600, 800];
        harmonics.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.2);
            osc.frequency.linearRampToValueAtTime(freq * 0.8, now + 0.6);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(this.volume * 0.15 / (i + 1), now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.8);
        });

        // High-frequency shimmer (crystalline effect)
        for (let i = 0; i < 8; i++) {
            const shimmer = this.audioContext.createOscillator();
            const shimmerGain = this.audioContext.createGain();
            shimmer.type = 'sine';
            shimmer.frequency.setValueAtTime(1500 + i * 300, now + i * 0.03);
            shimmerGain.gain.setValueAtTime(0, now + i * 0.03);
            shimmerGain.gain.linearRampToValueAtTime(this.volume * 0.08, now + i * 0.03 + 0.02);
            shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.3);
            shimmer.connect(shimmerGain);
            shimmerGain.connect(this.masterGain);
            shimmer.start(now + i * 0.03);
            shimmer.stop(now + i * 0.03 + 0.3);
        }

        // Final "ding" confirmation
        setTimeout(() => {
            const ding = this.audioContext.createOscillator();
            const dingGain = this.audioContext.createGain();
            const dingTime = this.audioContext.currentTime;
            ding.type = 'sine';
            ding.frequency.setValueAtTime(1200, dingTime);
            dingGain.gain.setValueAtTime(this.volume * 0.3, dingTime);
            dingGain.gain.exponentialRampToValueAtTime(0.001, dingTime + 0.5);
            ding.connect(dingGain);
            dingGain.connect(this.masterGain);
            ding.start(dingTime);
            ding.stop(dingTime + 0.5);
        }, 400);
    }

    // TAB SWITCH - Quick digital blip with echo
    playTabSwitch() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;

        // Main blip
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);
        gain.gain.setValueAtTime(this.volume * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.12);

        // Echo
        const echo = this.audioContext.createOscillator();
        const echoGain = this.audioContext.createGain();
        echo.type = 'sine';
        echo.frequency.setValueAtTime(1000, now + 0.06);
        echoGain.gain.setValueAtTime(this.volume * 0.1, now + 0.06);
        echoGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        echo.connect(echoGain);
        echoGain.connect(this.masterGain);
        echo.start(now + 0.06);
        echo.stop(now + 0.2);
    }

    // QUEST COMPLETE - Triumphant synth chord with sparkle
    playQuestComplete() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;

        // Success chord (C major with harmonics)
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.type = i === 3 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.05);
            osc.frequency.linearRampToValueAtTime(freq * 1.02, now + i * 0.05 + 0.1);
            osc.frequency.linearRampToValueAtTime(freq, now + i * 0.05 + 0.3);
            gain.gain.setValueAtTime(0, now + i * 0.05);
            gain.gain.linearRampToValueAtTime(this.volume * 0.2, now + i * 0.05 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.5);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.5);
        });

        // Sparkle effect
        for (let i = 0; i < 6; i++) {
            const sparkle = this.audioContext.createOscillator();
            const sparkleGain = this.audioContext.createGain();
            sparkle.type = 'sine';
            sparkle.frequency.setValueAtTime(2000 + Math.random() * 1000, now + 0.15 + i * 0.04);
            sparkleGain.gain.setValueAtTime(0, now + 0.15 + i * 0.04);
            sparkleGain.gain.linearRampToValueAtTime(this.volume * 0.12, now + 0.15 + i * 0.04 + 0.01);
            sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + i * 0.04 + 0.15);
            sparkle.connect(sparkleGain);
            sparkleGain.connect(this.masterGain);
            sparkle.start(now + 0.15 + i * 0.04);
            sparkle.stop(now + 0.15 + i * 0.04 + 0.15);
        }
    }

    // LEVEL UP - Epic cinematic fanfare with bass drop and choir
    playLevelUp() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;

        // Initial impact bass
        const impact = this.audioContext.createOscillator();
        const impactGain = this.audioContext.createGain();
        impact.type = 'sine';
        impact.frequency.setValueAtTime(80, now);
        impact.frequency.exponentialRampToValueAtTime(30, now + 0.5);
        impactGain.gain.setValueAtTime(this.volume * 0.7, now);
        impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        impact.connect(impactGain);
        impactGain.connect(this.masterGain);
        impact.start(now);
        impact.stop(now + 0.8);

        // Rising sweep
        const sweep = this.audioContext.createOscillator();
        const sweepGain = this.audioContext.createGain();
        sweep.type = 'sawtooth';
        sweep.frequency.setValueAtTime(100, now);
        sweep.frequency.exponentialRampToValueAtTime(800, now + 0.4);
        sweepGain.gain.setValueAtTime(0, now);
        sweepGain.gain.linearRampToValueAtTime(this.volume * 0.15, now + 0.2);
        sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        sweep.connect(sweepGain);
        sweepGain.connect(this.masterGain);
        sweep.start(now);
        sweep.stop(now + 0.5);

        // Fanfare melody
        const fanfare = [
            { note: 523.25, start: 0.3, dur: 0.15 },  // C5
            { note: 659.25, start: 0.4, dur: 0.15 },  // E5
            { note: 783.99, start: 0.5, dur: 0.15 },  // G5
            { note: 1046.50, start: 0.6, dur: 0.6 },  // C6 (held)
        ];

        fanfare.forEach(n => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(n.note, now + n.start);
            gain.gain.setValueAtTime(0, now + n.start);
            gain.gain.linearRampToValueAtTime(this.volume * 0.35, now + n.start + 0.02);
            gain.gain.setValueAtTime(this.volume * 0.35, now + n.start + n.dur * 0.7);
            gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + n.start);
            osc.stop(now + n.start + n.dur);

            // Harmony
            const harm = this.audioContext.createOscillator();
            const harmGain = this.audioContext.createGain();
            harm.type = 'sine';
            harm.frequency.setValueAtTime(n.note * 1.5, now + n.start);
            harmGain.gain.setValueAtTime(0, now + n.start);
            harmGain.gain.linearRampToValueAtTime(this.volume * 0.1, now + n.start + 0.02);
            harmGain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur * 0.8);
            harm.connect(harmGain);
            harmGain.connect(this.masterGain);
            harm.start(now + n.start);
            harm.stop(now + n.start + n.dur);
        });

        // Choir-like pad
        const chordNotes = [261.63, 329.63, 392.00, 523.25];
        chordNotes.forEach(freq => {
            const pad = this.audioContext.createOscillator();
            const padGain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            pad.type = 'sawtooth';
            pad.frequency.setValueAtTime(freq, now + 0.5);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, now + 0.5);
            filter.frequency.linearRampToValueAtTime(2000, now + 1.0);
            filter.frequency.linearRampToValueAtTime(500, now + 2.0);
            padGain.gain.setValueAtTime(0, now + 0.5);
            padGain.gain.linearRampToValueAtTime(this.volume * 0.08, now + 0.8);
            padGain.gain.setValueAtTime(this.volume * 0.08, now + 1.5);
            padGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
            pad.connect(filter);
            filter.connect(padGain);
            padGain.connect(this.masterGain);
            pad.start(now + 0.5);
            pad.stop(now + 2.5);
        });

        // Crystalline shimmer cascade
        for (let i = 0; i < 12; i++) {
            const shimmer = this.audioContext.createOscillator();
            const shimmerGain = this.audioContext.createGain();
            shimmer.type = 'sine';
            shimmer.frequency.setValueAtTime(1500 + i * 200 + Math.random() * 100, now + 0.8 + i * 0.05);
            shimmerGain.gain.setValueAtTime(0, now + 0.8 + i * 0.05);
            shimmerGain.gain.linearRampToValueAtTime(this.volume * 0.1, now + 0.8 + i * 0.05 + 0.01);
            shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + i * 0.05 + 0.4);
            shimmer.connect(shimmerGain);
            shimmerGain.connect(this.masterGain);
            shimmer.start(now + 0.8 + i * 0.05);
            shimmer.stop(now + 0.8 + i * 0.05 + 0.4);
        }
    }

    // NOTIFICATION - Atmospheric alert with resonance
    playNotification() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;

        // Low hum foundation
        const hum = this.audioContext.createOscillator();
        const humGain = this.audioContext.createGain();
        hum.type = 'sine';
        hum.frequency.setValueAtTime(100, now);
        humGain.gain.setValueAtTime(0, now);
        humGain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.05);
        humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        hum.connect(humGain);
        humGain.connect(this.masterGain);
        hum.start(now);
        hum.stop(now + 0.5);

        // Two-tone alert (higher pitched, more dramatic)
        const tones = [
            { freq: 600, start: 0, endFreq: 900 },
            { freq: 900, start: 0.12, endFreq: 1200 }
        ];

        tones.forEach(t => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(t.freq, now + t.start);
            osc.frequency.exponentialRampToValueAtTime(t.endFreq, now + t.start + 0.08);
            osc.frequency.exponentialRampToValueAtTime(t.freq * 0.9, now + t.start + 0.25);
            gain.gain.setValueAtTime(0, now + t.start);
            gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + t.start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + t.start + 0.35);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + t.start);
            osc.stop(now + t.start + 0.35);

            // Add harmonic
            const harm = this.audioContext.createOscillator();
            const harmGain = this.audioContext.createGain();
            harm.type = 'sine';
            harm.frequency.setValueAtTime(t.freq * 2, now + t.start);
            harmGain.gain.setValueAtTime(0, now + t.start);
            harmGain.gain.linearRampToValueAtTime(this.volume * 0.1, now + t.start + 0.02);
            harmGain.gain.exponentialRampToValueAtTime(0.001, now + t.start + 0.2);
            harm.connect(harmGain);
            harmGain.connect(this.masterGain);
            harm.start(now + t.start);
            harm.stop(now + t.start + 0.2);
        });
    }

    // CLICK - Soft digital click with subtle resonance
    playClick() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
        gain.gain.setValueAtTime(this.volume * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.08);

        // Subtle resonance
        const res = this.audioContext.createOscillator();
        const resGain = this.audioContext.createGain();
        res.type = 'sine';
        res.frequency.setValueAtTime(400, now + 0.02);
        resGain.gain.setValueAtTime(this.volume * 0.05, now + 0.02);
        resGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        res.connect(resGain);
        resGain.connect(this.masterGain);
        res.start(now + 0.02);
        res.stop(now + 0.1);
    }

    // STAT UP - Ascending power-up sound with sparkle
    playStatUp() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;

        // Rising tone
        const rise = this.audioContext.createOscillator();
        const riseGain = this.audioContext.createGain();
        rise.type = 'sine';
        rise.frequency.setValueAtTime(300, now);
        rise.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
        riseGain.gain.setValueAtTime(0, now);
        riseGain.gain.linearRampToValueAtTime(this.volume * 0.25, now + 0.05);
        riseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        rise.connect(riseGain);
        riseGain.connect(this.masterGain);
        rise.start(now);
        rise.stop(now + 0.3);

        // Confirmation ding
        const ding = this.audioContext.createOscillator();
        const dingGain = this.audioContext.createGain();
        ding.type = 'sine';
        ding.frequency.setValueAtTime(1400, now + 0.15);
        dingGain.gain.setValueAtTime(0, now + 0.15);
        dingGain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.16);
        dingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        ding.connect(dingGain);
        dingGain.connect(this.masterGain);
        ding.start(now + 0.15);
        ding.stop(now + 0.4);

        // Sparkle
        for (let i = 0; i < 3; i++) {
            const spark = this.audioContext.createOscillator();
            const sparkGain = this.audioContext.createGain();
            spark.type = 'sine';
            spark.frequency.setValueAtTime(2000 + i * 300, now + 0.2 + i * 0.03);
            sparkGain.gain.setValueAtTime(this.volume * 0.08, now + 0.2 + i * 0.03);
            sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + i * 0.03);
            spark.connect(sparkGain);
            sparkGain.connect(this.masterGain);
            spark.start(now + 0.2 + i * 0.03);
            spark.stop(now + 0.35 + i * 0.03);
        }
    }

    // ERROR - Warning buzz
    playError() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const now = this.audioContext.currentTime;

        // Low warning buzz
        const buzz = this.audioContext.createOscillator();
        const buzzGain = this.audioContext.createGain();
        buzz.type = 'sawtooth';
        buzz.frequency.setValueAtTime(150, now);
        buzzGain.gain.setValueAtTime(this.volume * 0.15, now);
        buzzGain.gain.linearRampToValueAtTime(0, now + 0.15);
        buzz.connect(buzzGain);
        buzzGain.connect(this.masterGain);
        buzz.start(now);
        buzz.stop(now + 0.15);

        // Second buzz
        const buzz2 = this.audioContext.createOscillator();
        const buzz2Gain = this.audioContext.createGain();
        buzz2.type = 'sawtooth';
        buzz2.frequency.setValueAtTime(120, now + 0.12);
        buzz2Gain.gain.setValueAtTime(this.volume * 0.15, now + 0.12);
        buzz2Gain.gain.linearRampToValueAtTime(0, now + 0.27);
        buzz2.connect(buzz2Gain);
        buzz2Gain.connect(this.masterGain);
        buzz2.start(now + 0.12);
        buzz2.stop(now + 0.27);
    }
}

// Initialize Audio System
const audio = new AudioSystem();

// =========================================
// BACKGROUND MUSIC SYSTEM - Ambient Solo Leveling Atmosphere
// =========================================
class BackgroundMusic {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.isPlaying = false;
        this.volume = 0.3;
        this.oscillators = [];
        this.intervals = [];
        this.customAudio = null;
        this.useCustomMusic = false;
    }

    init() {
        if (this.audioContext) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.volume;
            this.masterGain.connect(this.audioContext.destination);
        } catch (e) {
            console.warn('Background music not supported');
        }
    }

    setVolume(vol) {
        this.volume = vol;
        if (this.masterGain) {
            this.masterGain.gain.value = vol;
        }
        if (this.customAudio) {
            this.customAudio.volume = vol;
        }
    }

    // Load custom music file
    loadCustomMusic(file) {
        if (this.customAudio) {
            this.customAudio.pause();
            this.customAudio = null;
        }

        const url = URL.createObjectURL(file);
        this.customAudio = new Audio(url);
        this.customAudio.loop = true;
        this.customAudio.volume = this.volume;
        this.useCustomMusic = true;

        if (this.isPlaying) {
            this.stopAmbient();
            this.customAudio.play();
        }
    }

    // Start playing
    play() {
        this.init();
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.isPlaying = true;

        if (this.useCustomMusic && this.customAudio) {
            this.customAudio.play();
        } else {
            this.startAmbient();
        }
    }

    // Stop playing
    stop() {
        this.isPlaying = false;

        if (this.customAudio) {
            this.customAudio.pause();
        }

        this.stopAmbient();
    }

    // Toggle play/pause
    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    // Stop ambient music
    stopAmbient() {
        this.oscillators.forEach(osc => {
            try { osc.stop(); } catch (e) { }
        });
        this.oscillators = [];

        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }

    // Start procedural ambient music
    startAmbient() {
        if (!this.audioContext) return;

        this.stopAmbient();

        // Deep drone layer (foundation)
        this.createDrone();

        // Mysterious pad layer
        this.createPad();

        // Subtle arpeggio layer
        this.createArpeggio();

        // Atmospheric texture
        this.createTexture();
    }

    // Deep continuous drone
    createDrone() {
        const createDroneOsc = (freq) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.value = freq;

            filter.type = 'lowpass';
            filter.frequency.value = 200;

            gain.gain.value = this.volume * 0.15;

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            this.oscillators.push(osc);

            // Slow frequency modulation
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();
            lfo.frequency.value = 0.1;
            lfoGain.gain.value = 2;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();
            this.oscillators.push(lfo);
        };

        createDroneOsc(55); // A1
        createDroneOsc(82.5); // E2 (fifth)
    }

    // Evolving pad sounds
    createPad() {
        const chords = [
            [130.81, 164.81, 196.00], // C minor
            [146.83, 174.61, 220.00], // D minor
            [164.81, 196.00, 246.94], // E minor
            [130.81, 155.56, 196.00], // C minor variation
        ];

        let chordIndex = 0;

        const playChord = () => {
            if (!this.isPlaying || this.useCustomMusic) return;

            const chord = chords[chordIndex];
            chordIndex = (chordIndex + 1) % chords.length;

            chord.forEach((freq, i) => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                const filter = this.audioContext.createBiquadFilter();

                osc.type = 'sawtooth';
                osc.frequency.value = freq;

                filter.type = 'lowpass';
                filter.frequency.value = 800;
                filter.Q.value = 2;

                const now = this.audioContext.currentTime;
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(this.volume * 0.06, now + 2);
                gain.gain.setValueAtTime(this.volume * 0.06, now + 6);
                gain.gain.linearRampToValueAtTime(0, now + 8);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);

                osc.start(now);
                osc.stop(now + 8);
            });
        };

        playChord();
        const interval = setInterval(playChord, 8000);
        this.intervals.push(interval);
    }

    // Subtle mysterious arpeggios
    createArpeggio() {
        const notes = [196.00, 233.08, 261.63, 293.66, 329.63, 293.66, 261.63, 233.08]; // G minor scale
        let noteIndex = 0;

        const playNote = () => {
            if (!this.isPlaying || this.useCustomMusic) return;

            const freq = notes[noteIndex];
            noteIndex = (noteIndex + 1) % notes.length;

            // Random chance to skip (creates mystery)
            if (Math.random() > 0.6) return;

            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq * 2; // One octave up

            const now = this.audioContext.currentTime;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(this.volume * 0.08, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 2);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 2);
        };

        const interval = setInterval(playNote, 800);
        this.intervals.push(interval);
    }

    // Atmospheric shimmer texture
    createTexture() {
        const createShimmer = () => {
            if (!this.isPlaying || this.useCustomMusic) return;

            const freq = 1000 + Math.random() * 2000;

            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.value = freq;

            filter.type = 'bandpass';
            filter.frequency.value = freq;
            filter.Q.value = 10;

            const now = this.audioContext.currentTime;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(this.volume * 0.03, now + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 3);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 3);
        };

        const interval = setInterval(createShimmer, 2000 + Math.random() * 3000);
        this.intervals.push(interval);
    }
}

// Initialize Background Music
const bgMusic = new BackgroundMusic();

// =========================================
// GAME STATE
// =========================================
const DEFAULT_STATE = {
    player: {
        name: 'Player',
        job: 'B.Tech CSE Student',
        title: 'The Beginner',
        level: 1,
        xp: 0,
        xpToLevel: 100,
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        fatigue: 0
    },
    stats: {
        str: 10, // Physical fitness
        vit: 10, // Health & wellness
        agi: 10, // Speed & efficiency
        int: 10, // Knowledge & skills
        per: 10  // Awareness & focus
    },
    bonusStats: {
        str: 0,
        vit: 0,
        agi: 0,
        int: 0,
        per: 0
    },
    availablePoints: 0,
    dailyQuests: [
        { id: 'dq1', name: 'Physical Training', desc: 'Exercise for 30 minutes', stat: 'str', xp: 15, completed: false, icon: '🏃' },
        { id: 'dq2', name: 'Study Session', desc: 'Study for 2 hours', stat: 'int', xp: 20, completed: false, icon: '📚' },
        { id: 'dq3', name: 'Stay Hydrated', desc: 'Drink 8 glasses of water', stat: 'vit', xp: 10, completed: false, icon: '💧' },
        { id: 'dq4', name: 'Meditation', desc: 'Meditate for 10 minutes', stat: 'per', xp: 10, completed: false, icon: '🧘' },
        { id: 'dq5', name: 'Code Practice', desc: 'Solve 1 coding problem', stat: 'int', xp: 15, completed: false, icon: '💻' },
        { id: 'dq6', name: 'Early Bird', desc: 'Wake up before 7 AM', stat: 'agi', xp: 10, completed: false, icon: '🌅' }
    ],
    weeklyQuests: [
        { id: 'wq1', name: 'Consistency Master', desc: 'Complete all daily quests for 7 days', stat: 'all', xp: 100, progress: 0, target: 7, completed: false, icon: '🏆' },
        { id: 'wq2', name: 'Tech Explorer', desc: 'Learn a new technology', stat: 'int', xp: 50, completed: false, icon: '🔬' },
        { id: 'wq3', name: 'Project Milestone', desc: 'Complete a project milestone', stat: 'int', xp: 75, completed: false, icon: '🎯' }
    ],
    customQuests: [],
    skills: [
        { id: 's1', name: 'Early Bird', desc: 'Gain 10% bonus XP for tasks completed before 8 AM', icon: '🌅', reqLevel: 5, unlocked: false },
        { id: 's2', name: 'Focus Mode', desc: 'Enter deep work state - 2 hour uninterrupted sessions give 25% bonus XP', icon: '🎯', reqLevel: 10, unlocked: false },
        { id: 's3', name: 'Code Warrior', desc: 'Coding practice gives double INT XP', icon: '⚔️', reqLevel: 15, unlocked: false },
        { id: 's4', name: 'Night Owl', desc: 'Gain XP for productive late-night work (after 10 PM)', icon: '🦉', reqLevel: 20, unlocked: false },
        { id: 's5', name: 'Iron Will', desc: 'Fatigue accumulates 50% slower', icon: '🛡️', reqLevel: 25, unlocked: false },
        { id: 's6', name: 'Multitasker', desc: 'Can complete parallel quests for bonus rewards', icon: '🔄', reqLevel: 30, unlocked: false },
        { id: 's7', name: 'Knowledge Seeker', desc: 'Books and courses give triple XP', icon: '📖', reqLevel: 40, unlocked: false },
        { id: 's8', name: 'Shadow Monarch', desc: 'All stats permanently boosted by 10%', icon: '👑', reqLevel: 50, unlocked: false }
    ],
    inventory: {
        achievements: [
            { id: 'a1', name: 'First Steps', icon: '👣' }
        ],
        projects: [],
        certifications: [],
        books: []
    },
    settings: {
        soundEnabled: true,
        volume: 50,
        musicVolume: 30
    },
    lastLogin: null,
    lastDailyReset: null,
    lastWeeklyReset: null,
    totalDaysCompleted: 0,
    streak: 0,
    // Analytics data
    dailyLogs: {}, // Format: { "2024-12-25": { xp: 50, quests: ["dq1", "dq2"], stats: {str: 1, int: 2} } }
    totalXPEarned: 0,
    totalQuestsCompleted: 0
};

let gameState = JSON.parse(JSON.stringify(DEFAULT_STATE));

// =========================================
// UTILITY FUNCTIONS
// =========================================

function saveGame() {
    localStorage.setItem('soloLevelUpSystem', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('soloLevelUpSystem');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to handle new properties
        gameState = deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), parsed);
    }
    checkDailyReset();
    checkWeeklyReset();
}

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

function checkDailyReset() {
    const now = new Date();
    const today = now.toDateString();

    if (gameState.lastDailyReset !== today) {
        // Reset daily quests
        gameState.dailyQuests.forEach(q => q.completed = false);
        gameState.customQuests.forEach(q => q.completed = false);

        // Check if player logged in yesterday for streak
        if (gameState.lastLogin) {
            const lastLogin = new Date(gameState.lastLogin);
            const diffDays = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                gameState.streak++;
            } else if (diffDays > 1) {
                gameState.streak = 0;
            }
        }

        // Restore some HP/MP on new day
        gameState.player.hp = Math.min(gameState.player.hp + 30, gameState.player.maxHp);
        gameState.player.mp = Math.min(gameState.player.mp + 20, gameState.player.maxMp);
        gameState.player.fatigue = Math.max(0, gameState.player.fatigue - 20);

        gameState.lastDailyReset = today;
        saveGame();
    }

    gameState.lastLogin = now.toISOString();
}

function checkWeeklyReset() {
    const now = new Date();
    const weekNumber = getWeekNumber(now);

    if (gameState.lastWeeklyReset !== weekNumber) {
        // Reset weekly quests
        gameState.weeklyQuests.forEach(q => {
            q.completed = false;
            if (q.progress !== undefined) q.progress = 0;
        });
        gameState.lastWeeklyReset = weekNumber;
        saveGame();
    }
}

function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return `${d.getUTCFullYear()}-W${Math.ceil((((d - yearStart) / 86400000) + 1) / 7)}`;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showNotification(content) {
    const overlay = document.getElementById('notificationOverlay');
    const contentEl = document.getElementById('notificationContent');
    contentEl.innerHTML = content;
    overlay.classList.add('active');
    audio.playNotification();
}

function closeNotification() {
    const overlay = document.getElementById('notificationOverlay');
    overlay.classList.remove('active');
    audio.playClick();
}

function showLevelUp(newLevel) {
    const overlay = document.getElementById('levelupOverlay');
    const levelSpan = document.getElementById('newLevel');
    levelSpan.textContent = newLevel;
    overlay.classList.add('active');
    audio.playLevelUp();

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 2500);
}

// =========================================
// XP & LEVELING SYSTEM
// =========================================

function calculateXPToLevel(level) {
    // XP curve: each level requires more XP
    return Math.floor(100 * Math.pow(1.2, level - 1));
}

function gainXP(amount, stat = null) {
    gameState.player.xp += amount;

    // Also give stat-specific bonus
    if (stat && gameState.bonusStats[stat] !== undefined) {
        gameState.bonusStats[stat] += Math.floor(amount / 10);
    }

    // Track daily activity
    logDailyActivity('xp', amount, stat);
    gameState.totalXPEarned += amount;

    // Check for level up
    while (gameState.player.xp >= gameState.player.xpToLevel) {
        gameState.player.xp -= gameState.player.xpToLevel;
        levelUp();
    }

    updateUI();
    saveGame();
}

function levelUp() {
    gameState.player.level++;
    gameState.player.xpToLevel = calculateXPToLevel(gameState.player.level);

    // Increase max HP/MP
    gameState.player.maxHp += 20;
    gameState.player.maxMp += 10;
    gameState.player.hp = gameState.player.maxHp;
    gameState.player.mp = gameState.player.maxMp;

    // Grant ability points (3 per level)
    gameState.availablePoints += 3;

    // Check for skill unlocks
    checkSkillUnlocks();

    // Check for title updates
    updateTitle();

    // Show level up animation
    showLevelUp(gameState.player.level);

    showToast(`Level Up! You are now Level ${gameState.player.level}!`, 'success');
}

function checkSkillUnlocks() {
    let newUnlocks = [];

    gameState.skills.forEach(skill => {
        if (!skill.unlocked && gameState.player.level >= skill.reqLevel) {
            skill.unlocked = true;
            newUnlocks.push(skill);
        }
    });

    if (newUnlocks.length > 0) {
        setTimeout(() => {
            showNotification(`
                <p style="color: var(--neon-green); font-size: 1.3rem; margin-bottom: 15px;">NEW SKILL UNLOCKED!</p>
                ${newUnlocks.map(s => `<p>${s.icon} <strong>${s.name}</strong><br><span style="color: var(--text-secondary)">${s.desc}</span></p>`).join('')}
            `);
        }, 2700);
    }
}

function updateTitle() {
    const level = gameState.player.level;
    let newTitle = gameState.player.title;

    if (level >= 50) newTitle = 'Shadow Monarch';
    else if (level >= 40) newTitle = 'The Enlightened One';
    else if (level >= 30) newTitle = 'Master of Discipline';
    else if (level >= 25) newTitle = 'The Unstoppable';
    else if (level >= 20) newTitle = 'Knowledge Seeker';
    else if (level >= 15) newTitle = 'Rising Star';
    else if (level >= 10) newTitle = 'The Dedicated';
    else if (level >= 5) newTitle = 'The Persistent';
    else if (level >= 3) newTitle = 'Apprentice';

    if (newTitle !== gameState.player.title) {
        gameState.player.title = newTitle;
        showToast(`New Title Acquired: ${newTitle}`, 'success');
    }
}

// =========================================
// QUEST SYSTEM
// =========================================

function completeQuest(questId, questType = 'daily') {
    let quest;

    if (questType === 'daily') {
        quest = gameState.dailyQuests.find(q => q.id === questId);
    } else if (questType === 'weekly') {
        quest = gameState.weeklyQuests.find(q => q.id === questId);
    } else if (questType === 'custom') {
        quest = gameState.customQuests.find(q => q.id === questId);
    }

    if (!quest || quest.completed) return;

    quest.completed = true;

    // Grant XP
    gainXP(quest.xp, quest.stat);

    // Use MP for completing quests
    gameState.player.mp = Math.max(0, gameState.player.mp - 5);

    // Add slight fatigue
    gameState.player.fatigue = Math.min(100, gameState.player.fatigue + 2);

    // Track quest completion for analytics
    logDailyActivity('quest', questId);
    gameState.totalQuestsCompleted++;

    // Update weekly progress if all daily quests completed
    if (questType === 'daily') {
        const allDailyComplete = gameState.dailyQuests.every(q => q.completed);
        if (allDailyComplete) {
            gameState.totalDaysCompleted++;
            const weeklyConsistency = gameState.weeklyQuests.find(q => q.id === 'wq1');
            if (weeklyConsistency && !weeklyConsistency.completed) {
                weeklyConsistency.progress = (weeklyConsistency.progress || 0) + 1;
                if (weeklyConsistency.progress >= weeklyConsistency.target) {
                    completeQuest('wq1', 'weekly');
                }
            }
        }
    }

    audio.playQuestComplete();
    showToast(`Quest Complete: ${quest.name} (+${quest.xp} XP)`, 'success');

    updateUI();
    saveGame();
}

function uncompleteQuest(questId, questType = 'daily') {
    let quest;

    if (questType === 'daily') {
        quest = gameState.dailyQuests.find(q => q.id === questId);
    } else if (questType === 'weekly') {
        quest = gameState.weeklyQuests.find(q => q.id === questId);
    } else if (questType === 'custom') {
        quest = gameState.customQuests.find(q => q.id === questId);
    }

    if (!quest || !quest.completed) return;

    quest.completed = false;
    audio.playClick();
    updateUI();
    saveGame();
}

function addCustomQuest() {
    const nameInput = document.getElementById('customQuestName');
    const statSelect = document.getElementById('customQuestStat');
    const xpInput = document.getElementById('customQuestXP');

    const name = nameInput.value.trim();
    const stat = statSelect.value;
    const xp = parseInt(xpInput.value) || 10;

    if (!name) {
        audio.playError();
        showToast('Please enter a quest name', 'error');
        return;
    }

    const quest = {
        id: 'cq_' + Date.now(),
        name: name,
        desc: `Custom quest (+${xp} ${stat.toUpperCase()} XP)`,
        stat: stat,
        xp: xp,
        completed: false,
        icon: '⭐',
        custom: true
    };

    gameState.customQuests.push(quest);

    nameInput.value = '';
    xpInput.value = '10';

    audio.playClick();
    showToast('Custom quest added!', 'success');

    updateUI();
    saveGame();
}

function deleteQuest(questId) {
    const index = gameState.customQuests.findIndex(q => q.id === questId);
    if (index !== -1) {
        gameState.customQuests.splice(index, 1);
        audio.playClick();
        updateUI();
        saveGame();
    }
}

// =========================================
// STATS SYSTEM
// =========================================

function addStatPoint(stat) {
    if (gameState.availablePoints <= 0) {
        audio.playError();
        showToast('No ability points available!', 'warning');
        return;
    }

    gameState.stats[stat]++;
    gameState.availablePoints--;

    // Update derived stats
    if (stat === 'vit') {
        gameState.player.maxHp += 5;
        gameState.player.hp = Math.min(gameState.player.hp + 5, gameState.player.maxHp);
    } else if (stat === 'int') {
        gameState.player.maxMp += 3;
        gameState.player.mp = Math.min(gameState.player.mp + 3, gameState.player.maxMp);
    }

    audio.playStatUp();
    updateUI();
    saveGame();
}

// =========================================
// INVENTORY SYSTEM
// =========================================

let currentInventoryTab = 'achievements';

function switchInventoryTab(tab) {
    currentInventoryTab = tab;

    document.querySelectorAll('.inv-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.inv-tab[data-inv="${tab}"]`).classList.add('active');

    audio.playClick();
    renderInventory();
}

function renderInventory() {
    const container = document.getElementById('inventoryContent');
    const items = gameState.inventory[currentInventoryTab];

    if (!items || items.length === 0) {
        container.innerHTML = '<div class="empty-state">No items yet. Start completing quests!</div>';
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="inventory-item">
            <span class="item-icon">${item.icon || '📦'}</span>
            <span class="item-name">${item.name}</span>
            <button class="item-delete" onclick="deleteInventoryItem('${item.id}')">×</button>
        </div>
    `).join('');
}

function addInventoryItem() {
    const input = document.getElementById('newItemName');
    const name = input.value.trim();

    if (!name) {
        audio.playError();
        return;
    }

    const icons = {
        achievements: '🏆',
        projects: '💼',
        certifications: '📜',
        books: '📚'
    };

    gameState.inventory[currentInventoryTab].push({
        id: 'inv_' + Date.now(),
        name: name,
        icon: icons[currentInventoryTab] || '📦'
    });

    input.value = '';

    audio.playQuestComplete();
    showToast(`Added to ${currentInventoryTab}: ${name}`, 'success');

    // Grant bonus XP for completing things
    if (currentInventoryTab === 'projects') gainXP(30, 'int');
    if (currentInventoryTab === 'certifications') gainXP(50, 'int');
    if (currentInventoryTab === 'books') gainXP(20, 'int');

    renderInventory();
    saveGame();
}

function deleteInventoryItem(itemId) {
    const index = gameState.inventory[currentInventoryTab].findIndex(i => i.id === itemId);
    if (index !== -1) {
        gameState.inventory[currentInventoryTab].splice(index, 1);
        audio.playClick();
        renderInventory();
        saveGame();
    }
}

// =========================================
// ANALYTICS SYSTEM
// =========================================

let currentCalendarDate = new Date();

// Get today's date string
function getDateString(date = new Date()) {
    return date.toISOString().split('T')[0];
}

// Log daily activity
function logDailyActivity(type, value, stat = null) {
    const today = getDateString();

    if (!gameState.dailyLogs[today]) {
        gameState.dailyLogs[today] = {
            xp: 0,
            quests: [],
            stats: { str: 0, vit: 0, agi: 0, int: 0, per: 0 }
        };
    }

    if (type === 'xp') {
        gameState.dailyLogs[today].xp += value;
        if (stat && gameState.dailyLogs[today].stats[stat] !== undefined) {
            gameState.dailyLogs[today].stats[stat] += Math.floor(value / 10);
        }
    } else if (type === 'quest') {
        if (!gameState.dailyLogs[today].quests.includes(value)) {
            gameState.dailyLogs[today].quests.push(value);
        }
    }
}

// Get activity level for a date (0-4)
function getActivityLevel(dateStr) {
    const log = gameState.dailyLogs[dateStr];
    if (!log) return 0;

    const xp = log.xp;
    if (xp >= 100) return 4;
    if (xp >= 60) return 3;
    if (xp >= 30) return 2;
    if (xp > 0) return 1;
    return 0;
}

// Render contribution calendar
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthYearEl = document.getElementById('calendarMonthYear');

    if (!grid || !monthYearEl) return;

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const today = getDateString();

    let html = '';

    // Empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
        html += '<div class="calendar-day empty"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const level = getActivityLevel(dateStr);
        const isToday = dateStr === today;
        const hasActivity = gameState.dailyLogs[dateStr] && gameState.dailyLogs[dateStr].xp > 0;

        html += `<div class="calendar-day level-${level} ${isToday ? 'today' : ''} ${hasActivity ? 'has-activity' : ''}" 
                     data-date="${dateStr}" 
                     onclick="showDayDetail('${dateStr}')"
                     title="${dateStr}: ${gameState.dailyLogs[dateStr]?.xp || 0} XP">${day}</div>`;
    }

    grid.innerHTML = html;
}

// Show day detail popup
function showDayDetail(dateStr) {
    const overlay = document.getElementById('dayDetailOverlay');
    const dateEl = document.getElementById('dayDetailDate');
    const contentEl = document.getElementById('dayDetailContent');

    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = date.toLocaleDateString('en-US', options);

    const log = gameState.dailyLogs[dateStr];

    if (!log || log.xp === 0) {
        contentEl.innerHTML = '<div class="no-activity">No activity recorded for this day</div>';
    } else {
        let html = `
            <div class="day-stat-row">
                <span class="day-stat-label">⚡ XP Earned</span>
                <span class="day-stat-value">+${log.xp} XP</span>
            </div>
            <div class="day-stat-row">
                <span class="day-stat-label">✅ Quests Completed</span>
                <span class="day-stat-value">${log.quests.length}</span>
            </div>
        `;

        // Stat gains
        const statLabels = { str: '💪 STR', vit: '❤️ VIT', agi: '⚡ AGI', int: '🧠 INT', per: '👁️ PER' };
        for (const [stat, value] of Object.entries(log.stats)) {
            if (value > 0) {
                html += `
                    <div class="day-stat-row">
                        <span class="day-stat-label">${statLabels[stat]} Bonus</span>
                        <span class="day-stat-value">+${value}</span>
                    </div>
                `;
            }
        }

        // Quests list
        if (log.quests.length > 0) {
            html += '<div class="day-quests-list"><h4>COMPLETED QUESTS</h4>';
            log.quests.forEach(questId => {
                const quest = gameState.dailyQuests.find(q => q.id === questId) ||
                    gameState.weeklyQuests.find(q => q.id === questId) ||
                    gameState.customQuests.find(q => q.id === questId);
                if (quest) {
                    html += `<div class="day-quest-item">${quest.icon || '⭐'} ${quest.name}</div>`;
                }
            });
            html += '</div>';
        }

        contentEl.innerHTML = html;
    }

    overlay.classList.add('active');
    audio.playClick();
}

// Close day detail popup
function closeDayDetail() {
    document.getElementById('dayDetailOverlay').classList.remove('active');
}

// Render XP graph
function renderXPGraph() {
    const canvas = document.getElementById('xpCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    // Set canvas size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Get last 30 days data
    const data = [];
    const labels = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = getDateString(date);
        const xp = gameState.dailyLogs[dateStr]?.xp || 0;
        data.push(xp);
        labels.push(date.getDate());
    }

    const maxXP = Math.max(...data, 50);
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    const barWidth = graphWidth / data.length - 2;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(74, 158, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (graphHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw bars
    data.forEach((xp, i) => {
        const x = padding + i * (barWidth + 2);
        const barHeight = (xp / maxXP) * graphHeight;
        const y = height - padding - barHeight;

        // Bar gradient
        const gradient = ctx.createLinearGradient(x, y, x, height - padding);
        gradient.addColorStop(0, 'rgba(176, 68, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(74, 158, 255, 0.6)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Bar glow effect
        if (xp > 0) {
            ctx.shadowColor = 'rgba(176, 68, 255, 0.5)';
            ctx.shadowBlur = 5;
            ctx.fillRect(x, y, barWidth, barHeight);
            ctx.shadowBlur = 0;
        }
    });

    // Draw x-axis labels (every 5 days)
    ctx.fillStyle = '#8892b0';
    ctx.font = '10px Orbitron';
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
        if (i % 5 === 0 || i === labels.length - 1) {
            const x = padding + i * (barWidth + 2) + barWidth / 2;
            ctx.fillText(label, x, height - 10);
        }
    });

    // Draw y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((maxXP / 4) * (4 - i));
        const y = padding + (graphHeight / 4) * i + 4;
        ctx.fillText(value, padding - 5, y);
    }
}

// Update stat distribution bars
function updateStatDistribution() {
    const stats = gameState.stats;
    const bonus = gameState.bonusStats;

    const total = Object.values(stats).reduce((a, b) => a + b, 0) +
        Object.values(bonus).reduce((a, b) => a + b, 0);

    ['str', 'vit', 'agi', 'int', 'per'].forEach(stat => {
        const value = stats[stat] + bonus[stat];
        const percentage = total > 0 ? (value / total) * 100 : 0;

        const bar = document.getElementById(`${stat}DistBar`);
        const valueEl = document.getElementById(`${stat}DistValue`);

        if (bar) bar.style.width = `${percentage}%`;
        if (valueEl) valueEl.textContent = value;
    });
}

// Update analytics summary
function updateAnalyticsSummary() {
    const streakEl = document.getElementById('currentStreak');
    const totalXPEl = document.getElementById('totalXPEarned');
    const questsEl = document.getElementById('totalQuestsCompleted');
    const daysEl = document.getElementById('activeDays');

    if (streakEl) streakEl.textContent = gameState.streak;
    if (totalXPEl) totalXPEl.textContent = gameState.totalXPEarned;
    if (questsEl) questsEl.textContent = gameState.totalQuestsCompleted;
    if (daysEl) daysEl.textContent = Object.keys(gameState.dailyLogs).filter(
        d => gameState.dailyLogs[d]?.xp > 0
    ).length;
}

// Initialize analytics panel
function initAnalytics() {
    // Calendar navigation
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
        audio.playClick();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
        audio.playClick();
    });

    // Day detail close
    document.getElementById('closeDayDetail')?.addEventListener('click', closeDayDetail);
    document.getElementById('dayDetailOverlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'dayDetailOverlay') closeDayDetail();
    });

    // Initial render
    renderCalendar();
    renderXPGraph();
    updateStatDistribution();
    updateAnalyticsSummary();
}

// Make showDayDetail globally available
window.showDayDetail = showDayDetail;

// =========================================
// UI UPDATES
// =========================================

function updateUI() {
    const p = gameState.player;
    const s = gameState.stats;
    const b = gameState.bonusStats;

    // Level & Info
    document.getElementById('playerLevel').textContent = p.level;
    document.getElementById('playerJob').textContent = p.job;
    document.getElementById('playerTitle').textContent = p.title;

    // HP/MP Bars
    const hpPercent = (p.hp / p.maxHp) * 100;
    const mpPercent = (p.mp / p.maxMp) * 100;

    document.getElementById('hpBar').style.width = hpPercent + '%';
    document.getElementById('mpBar').style.width = mpPercent + '%';
    document.getElementById('currentHP').textContent = p.hp;
    document.getElementById('maxHP').textContent = p.maxHp;
    document.getElementById('currentMP').textContent = p.mp;
    document.getElementById('maxMP').textContent = p.maxMp;

    // Fatigue
    const fatigueEl = document.getElementById('fatigueValue');
    fatigueEl.textContent = p.fatigue;
    fatigueEl.className = 'fatigue-value' +
        (p.fatigue >= 80 ? ' danger' : p.fatigue >= 50 ? ' warning' : '');

    // XP Bar
    const xpPercent = (p.xp / p.xpToLevel) * 100;
    document.getElementById('xpBar').style.width = xpPercent + '%';
    document.getElementById('currentXP').textContent = p.xp;
    document.getElementById('xpToLevel').textContent = p.xpToLevel;

    // Stats
    ['str', 'vit', 'agi', 'int', 'per'].forEach(stat => {
        document.getElementById(stat + 'Value').textContent = s[stat];
        document.getElementById(stat + 'Bonus').textContent = `(+${b[stat]})`;
    });

    // Available Points
    document.getElementById('availablePoints').textContent = gameState.availablePoints;

    // Enable/disable stat buttons
    document.querySelectorAll('.stat-add-btn').forEach(btn => {
        btn.disabled = gameState.availablePoints <= 0;
    });

    // Render quests
    renderQuests();

    // Render skills
    renderSkills();

    // Render inventory
    renderInventory();
}

function renderQuests() {
    const dailyContainer = document.getElementById('questList');
    const weeklyContainer = document.getElementById('weeklyQuestList');

    // Daily quests + custom quests
    const allDailyQuests = [...gameState.dailyQuests, ...gameState.customQuests];

    dailyContainer.innerHTML = allDailyQuests.map(quest => `
        <div class="quest-item ${quest.completed ? 'completed' : ''}">
            <input type="checkbox" class="quest-checkbox" 
                ${quest.completed ? 'checked' : ''} 
                onchange="${quest.completed ? `uncompleteQuest('${quest.id}', '${quest.custom ? 'custom' : 'daily'}')` : `completeQuest('${quest.id}', '${quest.custom ? 'custom' : 'daily'}')`}">
            <span style="font-size: 1.5rem">${quest.icon}</span>
            <div class="quest-info">
                <div class="quest-name">${quest.name}</div>
                <div class="quest-desc">${quest.desc}</div>
            </div>
            <span class="quest-reward">+${quest.xp} ${quest.stat.toUpperCase()}</span>
            ${quest.custom ? `<button class="quest-delete" onclick="deleteQuest('${quest.id}')">×</button>` : ''}
        </div>
    `).join('');

    // Weekly quests
    weeklyContainer.innerHTML = gameState.weeklyQuests.map(quest => `
        <div class="quest-item ${quest.completed ? 'completed' : ''}">
            <input type="checkbox" class="quest-checkbox" 
                ${quest.completed ? 'checked' : ''} 
                onchange="${quest.completed ? `uncompleteQuest('${quest.id}', 'weekly')` : `completeQuest('${quest.id}', 'weekly')`}">
            <span style="font-size: 1.5rem">${quest.icon}</span>
            <div class="quest-info">
                <div class="quest-name">${quest.name}</div>
                <div class="quest-desc">${quest.desc}${quest.progress !== undefined ? ` (${quest.progress}/${quest.target})` : ''}</div>
            </div>
            <span class="quest-reward">+${quest.xp} XP</span>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('skillsGrid');

    container.innerHTML = gameState.skills.map(skill => `
        <div class="skill-card ${skill.unlocked ? 'unlocked' : 'locked'}">
            <div class="skill-header">
                <span class="skill-icon">${skill.icon}</span>
                <span class="skill-name">${skill.name}</span>
            </div>
            <div class="skill-desc">${skill.desc}</div>
            <span class="skill-requirement">${skill.unlocked ? '✓ UNLOCKED' : `Requires Level ${skill.reqLevel}`}</span>
        </div>
    `).join('');
}

// =========================================
// NAVIGATION
// =========================================

function switchTab(tabName) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.nav-tab[data-tab="${tabName}"]`).classList.add('active');

    // Update panels
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(`${tabName}-panel`).classList.add('active');

    audio.playTabSwitch();
}

// =========================================
// TIMER & PARTICLES
// =========================================

function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('currentTime').textContent = timeStr;

    // Update reset timer
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('resetTimer').textContent =
        `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';

        // Vary colors
        const colors = ['#00d9ff', '#b500ff', '#ff00ff', '#00ff88'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        container.appendChild(particle);
    }
}

// =========================================
// SETTINGS
// =========================================

function initSettings() {
    // Sound toggle
    const soundToggle = document.getElementById('soundEnabled');
    soundToggle.checked = gameState.settings.soundEnabled;
    soundToggle.addEventListener('change', () => {
        gameState.settings.soundEnabled = soundToggle.checked;
        audio.enabled = soundToggle.checked;
        saveGame();
    });

    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    volumeSlider.value = gameState.settings.volume;
    volumeValue.textContent = gameState.settings.volume + '%';

    volumeSlider.addEventListener('input', () => {
        gameState.settings.volume = volumeSlider.value;
        volumeValue.textContent = volumeSlider.value + '%';
        audio.volume = volumeSlider.value / 100;
        saveGame();
    });

    // Player name
    const playerNameInput = document.getElementById('playerName');
    playerNameInput.value = gameState.player.name;
    playerNameInput.addEventListener('change', () => {
        gameState.player.name = playerNameInput.value || 'Player';
        saveGame();
    });

    // Job title
    const jobInput = document.getElementById('customJob');
    jobInput.value = gameState.player.job;
    jobInput.addEventListener('change', () => {
        gameState.player.job = jobInput.value || 'B.Tech CSE Student';
        updateUI();
        saveGame();
    });

    // Export data
    document.getElementById('exportData').addEventListener('click', () => {
        const data = JSON.stringify(gameState, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `solo-levelup-save-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Data exported successfully!', 'success');
    });

    // Import data
    document.getElementById('importData').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    gameState = deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), data);
                    saveGame();
                    updateUI();
                    initSettings();
                    showToast('Data imported successfully!', 'success');
                } catch (err) {
                    showToast('Error importing data!', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    });

    // Reset data
    document.getElementById('resetData').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data? This cannot be undone!')) {
            gameState = JSON.parse(JSON.stringify(DEFAULT_STATE));
            saveGame();
            updateUI();
            initSettings();
            showToast('All data has been reset.', 'warning');
        }
    });

    // Music toggle
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', () => {
        const isPlaying = bgMusic.toggle();
        musicToggle.textContent = isPlaying ? '⏸ STOP MUSIC' : '▶ PLAY MUSIC';
        musicToggle.classList.toggle('playing', isPlaying);
        if (isPlaying) {
            showToast('Background music started!', 'success');
        }
    });

    // Music volume slider
    const musicVolumeSlider = document.getElementById('musicVolumeSlider');
    const musicVolumeValue = document.getElementById('musicVolumeValue');

    if (gameState.settings.musicVolume !== undefined) {
        musicVolumeSlider.value = gameState.settings.musicVolume;
        musicVolumeValue.textContent = gameState.settings.musicVolume + '%';
        bgMusic.setVolume(gameState.settings.musicVolume / 100);
    }

    musicVolumeSlider.addEventListener('input', () => {
        const vol = musicVolumeSlider.value;
        musicVolumeValue.textContent = vol + '%';
        bgMusic.setVolume(vol / 100);
        gameState.settings.musicVolume = vol;
        saveGame();
    });

    // Custom music file loader
    const customMusicFile = document.getElementById('customMusicFile');
    const loadCustomMusic = document.getElementById('loadCustomMusic');

    loadCustomMusic.addEventListener('click', () => {
        customMusicFile.click();
    });

    customMusicFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            bgMusic.loadCustomMusic(file);
            showToast(`Loaded: ${file.name}`, 'success');

            // Auto-play if not already playing
            if (!bgMusic.isPlaying) {
                bgMusic.play();
                musicToggle.textContent = '⏸ STOP MUSIC';
                musicToggle.classList.add('playing');
            }
        }
    });
}

// =========================================
// INITIALIZATION
// =========================================

function init() {
    // Load saved game
    loadGame();

    // Apply settings
    audio.enabled = gameState.settings.soundEnabled;
    audio.volume = gameState.settings.volume / 100;

    // Create particles
    createParticles();

    // Start time updates
    updateTime();
    setInterval(updateTime, 1000);

    // Setup navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Setup inventory tabs
    document.querySelectorAll('.inv-tab').forEach(tab => {
        tab.addEventListener('click', () => switchInventoryTab(tab.dataset.inv));
    });

    // Setup stat buttons
    document.querySelectorAll('.stat-add-btn').forEach(btn => {
        btn.addEventListener('click', () => addStatPoint(btn.dataset.stat));
    });

    // Setup notification close
    document.getElementById('closeNotification').addEventListener('click', closeNotification);
    document.getElementById('notificationOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'notificationOverlay') closeNotification();
    });

    // Setup custom quest form
    document.getElementById('addCustomQuest').addEventListener('click', addCustomQuest);
    document.getElementById('customQuestName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCustomQuest();
    });

    // Setup inventory form
    document.getElementById('addItemBtn').addEventListener('click', addInventoryItem);
    document.getElementById('newItemName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addInventoryItem();
    });

    // Setup floating music button
    const floatingMusicBtn = document.getElementById('floatingMusicBtn');
    floatingMusicBtn.addEventListener('click', () => {
        const isPlaying = bgMusic.toggle();
        floatingMusicBtn.classList.toggle('playing', isPlaying);

        // Also update the settings panel button
        const settingsMusicBtn = document.getElementById('musicToggle');
        settingsMusicBtn.textContent = isPlaying ? '⏸ STOP MUSIC' : '▶ PLAY MUSIC';
        settingsMusicBtn.classList.toggle('playing', isPlaying);
    });

    // Initialize settings
    initSettings();

    // Initialize analytics
    initAnalytics();

    // Initial UI update
    updateUI();

    // Play system open sound after a short delay
    setTimeout(() => {
        audio.playSystemOpen();
    }, 500);

    // Show welcome message for first-time users
    if (gameState.player.level === 1 && gameState.player.xp === 0) {
        setTimeout(() => {
            showNotification(`
                <p style="color: var(--neon-blue); font-size: 1.5rem; margin-bottom: 20px;">SYSTEM ACTIVATED</p>
                <p style="margin-bottom: 15px;">Welcome, Player.</p>
                <p style="margin-bottom: 15px;">You have been chosen to receive the <strong style="color: var(--neon-purple)">Level-Up System</strong>.</p>
                <p style="color: var(--text-secondary)">Complete daily quests to gain XP, level up, and unlock new skills.</p>
                <p style="color: var(--neon-green); margin-top: 20px;">"I alone level up."</p>
            `);
        }, 1500);
    }

    // HP/MP regeneration over time
    setInterval(() => {
        if (gameState.player.hp < gameState.player.maxHp) {
            gameState.player.hp = Math.min(gameState.player.hp + 1, gameState.player.maxHp);
        }
        if (gameState.player.mp < gameState.player.maxMp) {
            gameState.player.mp = Math.min(gameState.player.mp + 1, gameState.player.maxMp);
        }
        updateUI();
    }, 60000); // Regenerate every minute
}

// Start the system
document.addEventListener('DOMContentLoaded', init);

// Make functions globally available for inline handlers
window.completeQuest = completeQuest;
window.uncompleteQuest = uncompleteQuest;
window.deleteQuest = deleteQuest;
window.deleteInventoryItem = deleteInventoryItem;

// =========================================
// PWA SERVICE WORKER REGISTRATION
// =========================================

// Store the install prompt for later use
let deferredPrompt = null;

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./sw.js');
            console.log('[PWA] Service Worker registered:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('[PWA] New Service Worker installing...');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        showToast('New version available! Refresh to update.', 'info');
                    }
                });
            });
        } catch (error) {
            console.log('[PWA] Service Worker registration failed:', error);
        }
    });
}

// Handle the install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[PWA] Install prompt received');
    e.preventDefault();
    deferredPrompt = e;

    // Show install button after a delay
    setTimeout(() => {
        showInstallPrompt();
    }, 10000); // Show after 10 seconds
});

// Show install prompt notification
function showInstallPrompt() {
    if (deferredPrompt) {
        showNotification(`
            <p style="color: var(--neon-blue); font-size: 1.3rem; margin-bottom: 15px;">📱 INSTALL APP</p>
            <p style="margin-bottom: 15px;">Install Solo Level-Up System on your device for the best experience!</p>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">Features: Offline access, faster loading, native app feel</p>
            <button onclick="installPWA()" style="
                background: linear-gradient(135deg, rgba(74, 158, 255, 0.3), rgba(176, 68, 255, 0.3));
                border: 1px solid var(--neon-blue);
                color: white;
                padding: 12px 30px;
                font-family: var(--font-display);
                font-size: 1rem;
                letter-spacing: 2px;
                cursor: pointer;
                margin-right: 10px;
            ">INSTALL NOW</button>
            <button onclick="closeNotification()" style="
                background: transparent;
                border: 1px solid var(--text-secondary);
                color: var(--text-secondary);
                padding: 12px 20px;
                font-family: var(--font-display);
                font-size: 0.9rem;
                cursor: pointer;
            ">LATER</button>
        `);
    }
}

// Install PWA
async function installPWA() {
    if (deferredPrompt) {
        closeNotification();
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log('[PWA] User choice:', outcome);

        if (outcome === 'accepted') {
            showToast('App installed successfully! 🎉', 'success');
            audio.playQuestComplete();
        }

        deferredPrompt = null;
    }
}

// Make installPWA globally available
window.installPWA = installPWA;

// Handle app installed event
window.addEventListener('appinstalled', () => {
    console.log('[PWA] App was installed');
    deferredPrompt = null;
});

// Detect if running as installed PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('[PWA] Running as installed app');
}

// =========================================
// SERVICE WORKER REGISTRATION
// =========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./sw.js');
            console.log('[SW] Service Worker registered successfully:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('[SW] New Service Worker installing...');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New content available, notify user
                        showToast('New version available! Refresh to update.', 'info');
                    }
                });
            });
        } catch (error) {
            console.error('[SW] Service Worker registration failed:', error);
        }
    });
}
