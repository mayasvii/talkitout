/**
 * Breathing & Yoga Routine Configurations for TalkItOut
 * All durations in seconds; structured for beginner student accessibility.
 */

export const BREATHING_ROUTINES = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    tag: 'Focus & Exam Panic',
    duration: '3 - 5 mins',
    difficulty: 'Beginner',
    benefit: 'Used by high performers and clinicians to rapidly lower adrenaline and regain composure under acute panic.',
    recommendedDurationMinutes: 3,
    colorScheme: 'teal',
    phases: [
      { name: 'Inhale', duration: 4, action: 'expand', cue: 'Breathe in slowly through your nose...' },
      { name: 'Hold', duration: 4, action: 'hold-full', cue: 'Hold your breath gently with lungs full...' },
      { name: 'Exhale', duration: 4, action: 'shrink', cue: 'Release all tension out through your mouth...' },
      { name: 'Hold', duration: 4, action: 'hold-empty', cue: 'Pause calmly before the next breath...' },
    ],
  },
  {
    id: '4-7-8-breathing',
    name: '4-7-8 Deep Sleep Breathing',
    tag: 'Insomnia & Severe Anxiety',
    duration: '2 - 4 mins',
    difficulty: 'Easy',
    benefit: 'Acts as a natural nervous system sedative. Ideal for quieting racing thoughts before bed or after tough study sessions.',
    recommendedDurationMinutes: 3,
    colorScheme: 'lavender',
    phases: [
      { name: 'Inhale', duration: 4, action: 'expand', cue: 'Breathe in quietly through your nose (4s)...' },
      { name: 'Hold', duration: 7, action: 'hold-full', cue: 'Hold breath peacefully, letting oxygen absorb (7s)...' },
      { name: 'Exhale', duration: 8, action: 'shrink', cue: 'Make a soft whoosh sound as you exhale completely (8s)...' },
    ],
  },
  {
    id: 'calm-breathing',
    name: 'Calm Coherence Breathing',
    tag: 'Steady Energy & Viva Prep',
    duration: '3 - 5 mins',
    difficulty: 'Gentle',
    benefit: 'Synchronizes your heart rate with your breath. Steadies shaky hands and racing pulse before project presentations.',
    recommendedDurationMinutes: 3,
    colorScheme: 'mint',
    phases: [
      { name: 'Inhale', duration: 5, action: 'expand', cue: 'Smooth, continuous breath in for 5 seconds...' },
      { name: 'Exhale', duration: 5, action: 'shrink', cue: 'Smooth, uninterrupted breath out for 5 seconds...' },
    ],
  },
];

export const DESK_YOGA_ROUTINE = {
  id: 'desk-yoga-5min',
  name: '5-Minute Student Desk Yoga',
  tag: 'Posture & Tech Neck Relief',
  duration: '5 mins',
  difficulty: 'Gentle Chair Yoga',
  benefit: 'Zero equipment needed. Relieves lower back ache, shoulder knots, and neck stiffness right in your chair.',
  colorScheme: 'warm',
  poses: [
    {
      id: 1,
      title: 'Seated Cat-Cow',
      emoji: '🐈',
      targetDuration: 45,
      instruction: 'Sit on the front edge of your chair with hands on your knees. On inhale, lift your chest, arch your lower back and look gently upward. On exhale, round your spine and drop your chin to your chest.',
      benefit: 'Wakes up spinal fluid and reverses stiffness from slouching over assignments.',
    },
    {
      id: 2,
      title: 'Neck & Upper Trapezius Release',
      emoji: '🦒',
      targetDuration: 45,
      instruction: 'Drop your right ear softly toward your right shoulder without straining. Rest your right hand lightly over your head for gentle weight (do not pull). Let your left shoulder sink down. Switch sides halfway.',
      benefit: 'Releases chronic tension at the base of the skull from laptop screens.',
    },
    {
      id: 3,
      title: 'Seated Spinal Twist',
      emoji: '🌀',
      targetDuration: 45,
      instruction: 'Place your left hand on the outside of your right knee, and your right hand on the back of your chair. Inhale to sit tall, exhale to twist gently toward the right. Keep breathing evenly, then switch sides.',
      benefit: 'Improves digestive comfort and oxygenates tired core muscles.',
    },
    {
      id: 4,
      title: 'Eagle Arms Stretch (Garudasana)',
      emoji: '🦅',
      targetDuration: 45,
      instruction: 'Bring your elbows forward at shoulder height. Wrap your right arm under your left, pressing forearms or palms together. Lift your elbows slightly while drawing your shoulders down away from your ears.',
      benefit: 'Stretches the rhomboids and upper back muscles strained by typing.',
    },
    {
      id: 5,
      title: 'Chair Figure-Four Hip Opener',
      emoji: '🪑',
      targetDuration: 45,
      instruction: 'Cross your right ankle over your left knee, making a figure-4 shape. Keep your right foot flexed. Sit straight, then gently hinge forward from your hips until you feel a pleasant stretch in your glute. Switch sides.',
      benefit: 'Unlocks tight pelvic and hip muscles after sitting in 3-hour lab sessions.',
    },
    {
      id: 6,
      title: 'Wrist, Finger & Forearm Decompress',
      emoji: '✍️',
      targetDuration: 40,
      instruction: 'Extend one arm straight out with palm facing forward, fingers pointing down. Use your other hand to gently pull fingers back toward you. Shake both wrists out and rotate them in circles.',
      benefit: 'Prevents repetitive strain injury (RSI) and mouse fatigue.',
    },
    {
      id: 7,
      title: 'Forward Fold & Decompression Sigh',
      emoji: '🌊',
      targetDuration: 35,
      instruction: 'Step your feet slightly wider than your hips. Fold forward, resting your belly on your thighs and letting your arms and head dangle completely loose. Take a deep nose inhale, and let out a big sigh through your mouth.',
      benefit: 'Sends fresh oxygen to your brain and signals to your body that you are safe.',
    },
  ],
};
