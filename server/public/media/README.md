# TalkItOut Static Media Directory

This directory serves static audio files directly to the TalkItOut frontend via Express:
`http://localhost:5000/media/...`

## 🎵 Royalty-Free Audio Files Guide

To test the audio streaming features in your browser or frontend player, download royalty-free MP3 files from trusted sources:
- **Pixabay Music & Effects**: https://pixabay.com/music/
- **Free Music Archive (FMA)**: https://freemusicarchive.org/
- **Bensound**: https://www.bensound.com/
- **YouTube Audio Library**: https://studio.youtube.com/

Rename and drop your downloaded `.mp3` files into the respective subdirectories using the **exact filenames** listed below:

### 1. Audiobooks Directory (`/server/public/media/audiobooks/`)
| Category | Filename | Topic |
|---|---|---|
| `stress` | `exam-stress-relief.mp3` | Mind Over Exam Stress |
| `stress` | `quiet-the-mind.mp3` | Quiet The Student Mind |
| `motivation` | `beat-procrastination.mp3` | The Focused Scholar: Beat Procrastination |
| `motivation` | `college-resilience.mp3` | Resilience in College: Turning Setbacks into Fuel |
| `self-help` | `imposter-syndrome.mp3` | Overcoming Imposter Syndrome |
| `self-help` | `social-confidence.mp3` | Social Anxiety to Social Confidence |

### 2. Music Directory (`/server/public/media/music/`)
| Category | Filename | Topic |
|---|---|---|
| `sleep` | `deep-delta-sleep.mp3` | Deep Delta Sleep Soundscape |
| `sleep` | `midnight-rain-piano.mp3` | Midnight Rain & Soft Piano |
| `focus` | `lofi-study-beats.mp3` | Lo-Fi Study Beats for Late Nights |
| `focus` | `alpha-waves-focus.mp3` | Alpha Waves Deep Concentration |
| `anxiety` | `breath-of-serenity.mp3` | Breath of Serenity (432Hz) |
| `anxiety` | `panic-deescalation.mp3` | Panic De-escalation Ambient Pad |
| `calm` | `morning-sunlight.mp3` | Gentle Morning Sunlight |
| `calm` | `ocean-forest-ambient.mp3` | Ocean Waves & Forest Whispers |

> **Note:** Until you drop real MP3 files into these folders, placeholder placeholder markers exist in each subfolder. Express will serve any `.mp3` file placed here with standard HTTP Range / streaming headers.
