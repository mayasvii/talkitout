import os
import math
import numpy as np
import lameenc

SAMPLE_RATE = 44100
BIT_RATE = 128
DURATION_SEC = 150  # 2.5 minutes (between 2 and 3 minutes)
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'public', 'media', 'music')

os.makedirs(OUTPUT_DIR, exist_ok=True)

def apply_envelope(signal, fade_in_sec=5.0, fade_out_sec=6.0):
    total_samples = len(signal)
    in_samples = int(fade_in_sec * SAMPLE_RATE)
    out_samples = int(fade_out_sec * SAMPLE_RATE)
    
    # Fade in
    fade_in = 0.5 * (1.0 - np.cos(np.linspace(0, np.pi, in_samples)))
    signal[:in_samples] *= fade_in
    
    # Fade out
    fade_out = 0.5 * (1.0 + np.cos(np.linspace(0, np.pi, out_samples)))
    signal[-out_samples:] *= fade_out
    
    return signal

def encode_mp3(left, right, output_path):
    # Normalize to prevent any clipping, leave -1dB headroom
    peak = max(np.max(np.abs(left)), np.max(np.abs(right)), 1e-6)
    target_peak = 0.89  # -1 dB
    if peak > target_peak:
        left = left * (target_peak / peak)
        right = right * (target_peak / peak)
    else:
        left = left * 0.85
        right = right * 0.85
        
    left_i16 = (np.clip(left, -1.0, 1.0) * 32767).astype(np.int16)
    right_i16 = (np.clip(right, -1.0, 1.0) * 32767).astype(np.int16)
    
    stereo = np.column_stack((left_i16, right_i16)).tobytes()
    
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(BIT_RATE)
    encoder.set_in_sample_rate(SAMPLE_RATE)
    encoder.set_channels(2)
    encoder.set_quality(2)
    
    mp3_bytes = encoder.encode(stereo) + encoder.flush()
    
    with open(output_path, 'wb') as f:
        f.write(mp3_bytes)
    
    file_size_mb = len(mp3_bytes) / (1024 * 1024)
    print(f"Saved: {os.path.basename(output_path)} ({file_size_mb:.2f} MB, {DURATION_SEC/60:.1f} mins)")

def gen_deep_delta_sleep():
    """Mood: sleep (very low and slow). Deep binaural delta drone (2Hz difference)."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    # Very slow breath cycle (12 seconds)
    breath_mod = 0.75 + 0.25 * np.sin(2 * np.pi * t / 12.0)
    
    # Left channel: 55Hz (A1) + 82.5Hz (E2) + 110Hz (A2)
    l1 = np.sin(2 * np.pi * 55.0 * t) * 0.5
    l2 = np.sin(2 * np.pi * 82.5 * t) * 0.35
    l3 = np.sin(2 * np.pi * 110.0 * t) * 0.25
    left = (l1 + l2 + l3) * breath_mod
    
    # Right channel: 2Hz binaural difference (112Hz, 84.5Hz, 57Hz)
    r1 = np.sin(2 * np.pi * 57.0 * t) * 0.5
    r2 = np.sin(2 * np.pi * 84.5 * t) * 0.35
    r3 = np.sin(2 * np.pi * 112.0 * t) * 0.25
    right = (r1 + r2 + r3) * breath_mod
    
    # Warm low-pass filtered night air noise
    noise = np.random.normal(0, 0.04, len(t))
    # Soft simple moving average as lowpass
    kernel = np.ones(25) / 25
    soft_noise = np.convolve(noise, kernel, mode='same')
    
    left = apply_envelope(left + soft_noise * 0.4, 6.0, 7.0)
    right = apply_envelope(right + soft_noise * 0.4, 6.0, 7.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'deep-delta-sleep.mp3'))

def gen_midnight_rain_piano():
    """Mood: sleep (very low and slow). Soft acoustic piano chimes over gentle midnight rain."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    # Rain texture: filtered noise with slow amplitude breathing
    rain_noise = np.random.normal(0, 0.08, len(t))
    kernel = np.ones(35) / 35
    filtered_rain = np.convolve(rain_noise, kernel, mode='same')
    rain_swell = 0.7 + 0.3 * np.sin(2 * np.pi * t / 18.0)
    rain_left = filtered_rain * rain_swell
    
    rain_noise_r = np.random.normal(0, 0.08, len(t))
    rain_right = np.convolve(rain_noise_r, kernel, mode='same') * rain_swell
    
    # Soft piano notes in low-mid pentatonic scale (C3, E3, G3, B3, C4)
    # Played every 6-10 seconds
    piano_left = np.zeros_like(t)
    piano_right = np.zeros_like(t)
    
    notes = [130.81, 164.81, 196.00, 246.94, 261.63, 196.00, 164.81, 130.81]
    step_duration = 9.0  # seconds per chord note
    num_events = int(DURATION_SEC / step_duration)
    
    for i in range(num_events):
        idx = i % len(notes)
        freq = notes[idx]
        start_t = i * step_duration + (i % 3) * 0.4
        start_idx = int(start_t * SAMPLE_RATE)
        event_len = int(step_duration * 1.5 * SAMPLE_RATE)
        
        if start_idx + event_len > len(t):
            event_len = len(t) - start_idx
        if event_len <= 0:
            break
            
        sub_t = np.linspace(0, event_len / SAMPLE_RATE, event_len, False)
        # Piano decay envelope: fast attack, slow exponential decay
        decay = np.exp(-sub_t / 3.0)
        # Fundamental + gentle 2nd harmonic
        tone = (np.sin(2 * np.pi * freq * sub_t) * 0.7 + np.sin(2 * np.pi * freq * 2 * sub_t) * 0.25) * decay
        
        pan = 0.4 + 0.2 * (i % 3)  # subtle stereo placement
        piano_left[start_idx:start_idx + event_len] += tone * (1.0 - pan) * 0.6
        piano_right[start_idx:start_idx + event_len] += tone * pan * 0.6
        
    left = apply_envelope(rain_left * 0.5 + piano_left, 5.0, 7.0)
    right = apply_envelope(rain_right * 0.5 + piano_right, 5.0, 7.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'midnight-rain-piano.mp3'))

def gen_lofi_study_beats():
    """Mood: focus (steady and light). Chill 75 BPM lo-fi chord progression and gentle pulse."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    bpm = 75.0
    beat_sec = 60.0 / bpm
    bar_sec = beat_sec * 4
    
    # Vinyl tape warmth hiss
    tape_noise = np.random.normal(0, 0.02, len(t))
    kernel = np.ones(40) / 40
    tape_hiss = np.convolve(tape_noise, kernel, mode='same')
    
    # 4-chord progression: Dm9 (D3, F3, A3, C4, E4), G13 (G2, F3, B3, E4), Cmaj9 (C3, E3, G3, B3, D4), Am9 (A2, G3, C4, E4)
    chords = [
        [146.83, 174.61, 220.00, 261.63, 329.63], # Dm9
        [98.00, 174.61, 246.94, 329.63],          # G13
        [130.81, 164.81, 196.00, 246.94, 293.66], # Cmaj9
        [110.00, 196.00, 261.63, 329.63]          # Am9
    ]
    
    music_l = np.zeros_like(t)
    music_r = np.zeros_like(t)
    
    num_bars = int(DURATION_SEC / bar_sec) + 1
    for b in range(num_bars):
        chord_idx = b % len(chords)
        chord_freqs = chords[chord_idx]
        bar_start = b * bar_sec
        bar_samples = int(bar_sec * SAMPLE_RATE)
        start_idx = int(bar_start * SAMPLE_RATE)
        
        if start_idx >= len(t):
            break
        actual_len = min(bar_samples, len(t) - start_idx)
        sub_t = np.linspace(0, actual_len / SAMPLE_RATE, actual_len, False)
        
        # Soft electric piano swell and decay
        swell = np.sin(np.pi * (sub_t / bar_sec)) ** 0.8
        
        chord_sig = np.zeros(actual_len)
        for f in chord_freqs:
            # Warm rhodes with subtle detuning
            chord_sig += np.sin(2 * np.pi * f * sub_t) * 0.2
            chord_sig += np.sin(2 * np.pi * (f * 1.002) * sub_t) * 0.08
            
        chord_sig *= swell
        music_l[start_idx:start_idx + actual_len] += chord_sig * 0.45
        music_r[start_idx:start_idx + actual_len] += chord_sig * 0.45
        
        # Steady soft lo-fi kick on beat 1 and 3, soft rim click on beat 2 and 4
        for beat in range(4):
            beat_start_idx = start_idx + int(beat * beat_sec * SAMPLE_RATE)
            if beat_start_idx >= len(t):
                break
            if beat in [0, 2]: # soft kick
                kick_len = int(0.18 * SAMPLE_RATE)
                if beat_start_idx + kick_len <= len(t):
                    kt = np.linspace(0, 0.18, kick_len, False)
                    # pitch drop from 90Hz to 45Hz
                    k_freq = 45.0 + 45.0 * np.exp(-kt / 0.04)
                    kick = np.sin(2 * np.pi * k_freq * kt) * np.exp(-kt / 0.05) * 0.35
                    music_l[beat_start_idx:beat_start_idx + kick_len] += kick
                    music_r[beat_start_idx:beat_start_idx + kick_len] += kick
                    
    left = apply_envelope(music_l + tape_hiss * 0.5, 4.0, 5.0)
    right = apply_envelope(music_r + tape_hiss * 0.5, 4.0, 5.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'lofi-study-beats.mp3'))

def gen_alpha_waves_focus():
    """Mood: focus (steady and light). 10Hz binaural alpha frequency + transparent light pad."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    # 10Hz binaural alpha tone (216Hz left, 226Hz right)
    alpha_l = np.sin(2 * np.pi * 216.0 * t) * 0.35
    alpha_r = np.sin(2 * np.pi * 226.0 * t) * 0.35
    
    # Ethereal Fmaj9 ambient pad (174.61Hz F3, 220Hz A3, 261.63Hz C4, 329.63Hz E4, 392Hz G4)
    pad_freqs = [174.61, 220.00, 261.63, 329.63, 392.00]
    pad_l = np.zeros_like(t)
    pad_r = np.zeros_like(t)
    
    for i, f in enumerate(pad_freqs):
        # subtle chorusing
        pad_l += np.sin(2 * np.pi * f * t + i * 0.5) * (0.12 / len(pad_freqs))
        pad_r += np.sin(2 * np.pi * (f + 0.3) * t + i * 0.5) * (0.12 / len(pad_freqs))
        
    # Gentle crystalline sparkle (880Hz, 1320Hz)
    shimmer = (np.sin(2 * np.pi * 880.0 * t) * 0.03 + np.sin(2 * np.pi * 1320.0 * t) * 0.02)
    shimmer_mod = 0.5 + 0.5 * np.sin(2 * np.pi * t / 6.0)
    shimmer *= shimmer_mod
    
    left = apply_envelope(alpha_l + pad_l * 2.5 + shimmer, 4.0, 6.0)
    right = apply_envelope(alpha_r + pad_r * 2.5 + shimmer, 4.0, 6.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'alpha-waves-focus.mp3'))

def gen_morning_sunlight():
    """Mood: calm (gentle and warm). Warm acoustic harmonic pad with gentle swell."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    # D major to G major gentle alternating harmonies every 15 seconds
    chord_A = [146.83, 220.00, 277.18, 370.00, 440.00] # D, A, C#, F#, A
    chord_B = [196.00, 246.94, 293.66, 392.00, 493.88] # G, B, D, G, B
    
    left = np.zeros_like(t)
    right = np.zeros_like(t)
    
    period = 15.0
    num_cycles = int(DURATION_SEC / period) + 1
    
    for c in range(num_cycles):
        active_chord = chord_A if c % 2 == 0 else chord_B
        c_start = c * period
        c_samples = int(period * SAMPLE_RATE)
        start_idx = int(c_start * SAMPLE_RATE)
        
        if start_idx >= len(t):
            break
        actual_len = min(c_samples, len(t) - start_idx)
        sub_t = np.linspace(0, actual_len / SAMPLE_RATE, actual_len, False)
        
        # Soft warm sinusoidal crossfade envelope
        envelope = np.sin(np.pi * (sub_t / period)) ** 1.2
        
        for f in active_chord:
            # Warm analog saw/sine blend
            tone = (np.sin(2 * np.pi * f * sub_t) * 0.15 + np.sin(2 * np.pi * 2 * f * sub_t) * 0.04) * envelope
            left[start_idx:start_idx + actual_len] += tone * 0.95
            right[start_idx:start_idx + actual_len] += tone * 1.05
            
    # Add gentle warm cello drone in background (73.4Hz D2)
    warm_drone = np.sin(2 * np.pi * 73.41 * t) * 0.18
    left += warm_drone
    right += warm_drone
    
    left = apply_envelope(left, 5.0, 6.0)
    right = apply_envelope(right, 5.0, 6.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'morning-sunlight.mp3'))

def gen_ocean_forest_ambient():
    """Mood: calm (gentle and warm). Rolling coastal waves and gentle resonant wind chimes."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    # Ocean waves: shaped filtered noise with ~11-second periodic surges
    noise_l = np.random.normal(0, 0.25, len(t))
    noise_r = np.random.normal(0, 0.25, len(t))
    kernel = np.ones(60) / 60
    surf_l = np.convolve(noise_l, kernel, mode='same')
    surf_r = np.convolve(noise_r, kernel, mode='same')
    
    # Wave period: 11 seconds
    wave_cycle = (0.5 + 0.5 * np.sin(2 * np.pi * t / 11.0)) ** 2.5
    surf_l = surf_l * wave_cycle * 0.6
    surf_r = surf_r * (0.5 + 0.5 * np.sin(2 * np.pi * (t - 0.5) / 11.0)) ** 2.5 * 0.6
    
    # Resonant harmonic chimes (528Hz Solfeggio, 660Hz, 792Hz)
    chimes_l = np.zeros_like(t)
    chimes_r = np.zeros_like(t)
    
    chime_freqs = [528.0, 660.0, 792.0, 1056.0]
    chime_interval = 12.0
    num_chimes = int(DURATION_SEC / chime_interval)
    
    for i in range(num_chimes):
        cf = chime_freqs[i % len(chime_freqs)]
        start_t = i * chime_interval + 3.0
        start_idx = int(start_t * SAMPLE_RATE)
        chime_len = int(8.0 * SAMPLE_RATE)
        
        if start_idx + chime_len > len(t):
            chime_len = len(t) - start_idx
        if chime_len <= 0:
            break
            
        sub_t = np.linspace(0, chime_len / SAMPLE_RATE, chime_len, False)
        chime_decay = np.exp(-sub_t / 2.2)
        chime_sig = np.sin(2 * np.pi * cf * sub_t) * chime_decay * 0.25
        
        chimes_l[start_idx:start_idx + chime_len] += chime_sig * (0.4 + 0.2 * (i % 2))
        chimes_r[start_idx:start_idx + chime_len] += chime_sig * (0.6 - 0.2 * (i % 2))
        
    left = apply_envelope(surf_l + chimes_l, 5.0, 6.0)
    right = apply_envelope(surf_r + chimes_r, 5.0, 6.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'ocean-forest-ambient.mp3'))

def gen_breath_of_serenity():
    """Mood: anxiety relief (slow and rising). 432Hz harmonic acoustic track with slow rising chords."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    # 10-second diaphragmatic breathing cycle (4s in, 6s out)
    breath_cycle = (0.5 + 0.5 * np.sin(2 * np.pi * t / 10.0)) ** 1.5
    
    # Progression rises every 25 seconds: 432Hz -> 486Hz (9/8) -> 540Hz (5/4) -> 576Hz (4/3) -> 648Hz (3/2)
    scale_steps = [432.0, 486.0, 540.0, 576.0, 648.0, 576.0]
    step_duration = DURATION_SEC / len(scale_steps)
    
    left = np.zeros_like(t)
    right = np.zeros_like(t)
    
    for idx, base_f in enumerate(scale_steps):
        start_idx = int(idx * step_duration * SAMPLE_RATE)
        step_len = int(step_duration * SAMPLE_RATE)
        if start_idx >= len(t):
            break
        actual_len = min(step_len, len(t) - start_idx)
        sub_t = np.linspace(0, actual_len / SAMPLE_RATE, actual_len, False)
        
        # Smooth crossfade
        env = np.sin(np.pi * (sub_t / (actual_len / SAMPLE_RATE))) ** 1.1
        
        # Fundamental (432Hz), Sub-octave (216Hz), and Perfect Fifth
        tone_l = (
            np.sin(2 * np.pi * base_f * sub_t) * 0.35 +
            np.sin(2 * np.pi * (base_f / 2) * sub_t) * 0.30 +
            np.sin(2 * np.pi * (base_f * 1.5) * sub_t) * 0.18
        ) * env
        
        tone_r = (
            np.sin(2 * np.pi * (base_f * 1.002) * sub_t) * 0.35 +
            np.sin(2 * np.pi * (base_f / 2) * sub_t) * 0.30 +
            np.sin(2 * np.pi * (base_f * 1.5 * 0.998) * sub_t) * 0.18
        ) * env
        
        left[start_idx:start_idx + actual_len] += tone_l
        right[start_idx:start_idx + actual_len] += tone_r
        
    left = apply_envelope(left * (0.7 + 0.3 * breath_cycle), 5.0, 6.0)
    right = apply_envelope(right * (0.7 + 0.3 * breath_cycle), 5.0, 6.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'breath-of-serenity.mp3'))

def gen_panic_deescalation():
    """Mood: anxiety relief (slow and rising). Grounding warm analog pads slowly blooming upward."""
    t = np.linspace(0, DURATION_SEC, int(SAMPLE_RATE * DURATION_SEC), False)
    
    # Begins very grounded at low register and progressively rises in frequency and brightness
    # Progression: C3 -> F3 -> G3 -> C4
    chords = [
        [130.81, 164.81, 196.00], # C major
        [174.61, 220.00, 261.63], # F major (rising)
        [196.00, 246.94, 293.66], # G major (rising)
        [261.63, 329.63, 392.00]  # C4 major (open, serene)
    ]
    
    left = np.zeros_like(t)
    right = np.zeros_like(t)
    
    step_duration = DURATION_SEC / len(chords)
    
    for idx, chord in enumerate(chords):
        start_idx = int(idx * step_duration * SAMPLE_RATE)
        step_len = int(step_duration * 1.2 * SAMPLE_RATE) # slight overlap
        if start_idx >= len(t):
            break
        actual_len = min(step_len, len(t) - start_idx)
        sub_t = np.linspace(0, actual_len / SAMPLE_RATE, actual_len, False)
        
        # Soft swell
        env = np.sin(np.pi * (sub_t / (actual_len / SAMPLE_RATE))) ** 1.3
        
        # Layer chord notes with warm analog detuning
        chord_sig_l = np.zeros(actual_len)
        chord_sig_r = np.zeros(actual_len)
        
        for f in chord:
            chord_sig_l += np.sin(2 * np.pi * f * sub_t) * 0.22
            chord_sig_r += np.sin(2 * np.pi * (f * 1.003) * sub_t) * 0.22
            # warm sub
            chord_sig_l += np.sin(2 * np.pi * (f / 2) * sub_t) * 0.15
            chord_sig_r += np.sin(2 * np.pi * (f / 2) * sub_t) * 0.15
            
        left[start_idx:start_idx + actual_len] += chord_sig_l * env
        right[start_idx:start_idx + actual_len] += chord_sig_r * env
        
    # Gentle heartbeat grounding pulse (60 BPM, steady resting pulse)
    pulse_bpm = 60.0
    pulse_sec = 60.0 / pulse_bpm
    num_pulses = int(DURATION_SEC / pulse_sec)
    
    pulse_signal = np.zeros_like(t)
    for p in range(num_pulses):
        p_start_idx = int(p * pulse_sec * SAMPLE_RATE)
        p_len = int(0.2 * SAMPLE_RATE)
        if p_start_idx + p_len <= len(t):
            pt = np.linspace(0, 0.2, p_len, False)
            p_sig = np.sin(2 * np.pi * 50.0 * pt) * np.exp(-pt / 0.04) * 0.12
            pulse_signal[p_start_idx:p_start_idx + p_len] += p_sig
            
    left = apply_envelope(left + pulse_signal, 5.0, 7.0)
    right = apply_envelope(right + pulse_signal, 5.0, 7.0)
    
    encode_mp3(left, right, os.path.join(OUTPUT_DIR, 'panic-deescalation.mp3'))

if __name__ == '__main__':
    print("Starting generation of 8 calm ambient MP3 files (2.5 mins each)...")
    gen_deep_delta_sleep()
    gen_midnight_rain_piano()
    gen_lofi_study_beats()
    gen_alpha_waves_focus()
    gen_morning_sunlight()
    gen_ocean_forest_ambient()
    gen_breath_of_serenity()
    gen_panic_deescalation()
    print("All 8 ambient music files generated successfully in server/public/media/music!")
