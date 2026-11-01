import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PomodoroTimer from '../components/exam/PomodoroTimer';
import {
  ClockIcon,
  BookOpenIcon,
  SparklesIcon,
  WindIcon,
  MusicIcon,
  HeadphonesIcon,
  CheckIcon,
  HeartIcon,
  ShieldAlertIcon,
  ArrowRightIcon,
  LeafIcon,
} from '../components/common/Icons';

const TECHNIQUES = [
  {
    id: 'feynman',
    badge: 'Deep Comprehension',
    badgeColor: 'badge-teal',
    title: 'The Feynman Technique',
    tagline: 'Explain it like you are teaching a 10-year-old.',
    summary:
      'Named after Nobel physicist Richard Feynman. True mastery is the ability to explain complex equations or theories in crystal-clear plain language without relying on jargon or memorized phrases.',
    steps: [
      'Choose the concept you are studying (e.g., Recursion, Osmosis, Opportunity Cost).',
      'Grab a blank sheet of paper. Write down an explanation using simple words and everyday analogies.',
      'Notice exactly where you get stuck, use complicated buzzwords, or say "you know what I mean".',
      'Go back to your textbook specifically to clarify that weak point. Repeat until your explanation is effortless.',
    ],
    whyItWorks:
      'Destroys the "illusion of explanatory depth" where students mistake passive recognition for true understanding.',
  },
  {
    id: 'active-recall',
    badge: 'Memory Retention',
    badgeColor: 'badge-amber',
    title: 'Active Recall & The Testing Effect',
    tagline: 'Stop highlighting. Start retrieving.',
    summary:
      'Re-reading notes and highlighting text are passive activities that produce almost zero long-term retention. Active retrieval forces your brain to generate answers from scratch, building resilient neural highways.',
    steps: [
      'The Blurting Method: Read a chapter or section for 15 minutes with complete focus.',
      'Close your notebook and laptop completely. Do not peek.',
      'Grab a blank sheet of paper and write down everything you can remember from memory in 3 minutes.',
      'Open your notes: in a different color pen, write down the critical points you missed. Repeat 24 hours later.',
    ],
    whyItWorks:
      'Cognitive psychological trials prove students who practice active testing score up to 50% higher than those who spend equal time re-reading.',
  },
  {
    id: 'spaced-repetition',
    badge: 'Long-Term Storage',
    badgeColor: 'badge-sky',
    title: 'Spaced Repetition (Defeat the Forgetting Curve)',
    tagline: 'Review just before your brain is about to forget.',
    summary:
      'Hermann Ebbinghaus discovered that humans lose over 70% of newly learned information within 24 hours unless it is reviewed at mathematically spaced intervals.',
    steps: [
      'Day 1: Learn the core lecture or topic thoroughly in your first study sprint.',
      'Day 2 (+24h): Spend 10 minutes doing a quick active recall quiz of Day 1 material.',
      'Day 4 (+3 days): Solve 2-3 practice problems or past exam questions on the topic.',
      'Day 7 (+1 week): Quick self-test; flashcard review of difficult edge cases.',
      'Day 14 (+2 weeks): Final consolidation test before the examination.',
    ],
    whyItWorks:
      'Each spaced review resets the exponential forgetting curve, transferring data from fragile working memory into durable long-term cerebral storage.',
  },
  {
    id: 'interleaving',
    badge: 'Problem Solving',
    badgeColor: 'badge-sage',
    title: 'Interleaved Practice vs. Blocked Practice',
    tagline: 'Mix up your subjects instead of 8 hours of one topic.',
    summary:
      'Instead of "blocked studying" (doing 50 problems of the same math type in a row), mix related problem types and subjects together during your revision sessions.',
    steps: [
      'Divide your revision block into two or three complementary subjects or problem types.',
      'Spend 45 minutes on Problem Type A, then switch to Problem Type B or a different subject.',
      'Notice that switching feels slightly harder initially — this "desirable difficulty" is what forces real learning.',
      'Practice identifying WHICH rule, theorem, or formula applies to a question before solving it.',
    ],
    whyItWorks:
      'Real exam papers do not come categorized by chapter. Interleaving trains your brain to discriminate between problem structures under pressure.',
  },
  {
    id: 'sq3r',
    badge: 'Textbook Mastery',
    badgeColor: 'badge-teal',
    title: 'The SQ3R Reading Framework',
    tagline: 'Survey, Question, Read, Retrieve, Review.',
    summary:
      'A structured 5-step framework developed specifically for dense university textbooks, research papers, and technical lecture slides.',
    steps: [
      'Survey: Skim chapter headings, diagrams, bold terms, and the summary for 2 minutes.',
      'Question: Turn each major heading into an interrogative question (e.g., "What causes inflation?").',
      'Read: Read through the section with the active objective of finding the direct answer to your question.',
      'Retrieve: Immediately close the book and recite or jot down the answer in your own words.',
      'Review: At the end of the chapter, do a rapid 5-minute recap of all your generated answers.',
    ],
    whyItWorks:
      'Transforms reading from a passive visual scan into an active, goal-driven interrogation of the text.',
  },
  {
    id: 'timeboxing',
    badge: 'Procrastination Buster',
    badgeColor: 'badge-amber',
    title: "Parkinson's Law & Timeboxing",
    tagline: 'Work expands to fill the time allotted for its completion.',
    summary:
      'If you give yourself an entire Sunday to study one topic, you will spend 6 hours procrastinating and 2 hours studying. Setting artificial, strict time limits eliminates cognitive drift.',
    steps: [
      'Break your syllabus down into concrete 30-minute deliverables (e.g., "Summarize Chapter 4 theorems").',
      'Set your Pomodoro timer for exactly 25 or 50 minutes.',
      'Treat the timer like an unchangeable flight departure time — race to complete the deliverable before the chime.',
      'When the timer rings, stop completely, log your progress, and take your mandated 5-minute cognitive rest.',
    ],
    whyItWorks:
      'Leverages healthy urgency to bypass decision fatigue and eliminate endless social media tab-switching.',
  },
];

const Exam = () => {
  const [selectedTechniqueId, setSelectedTechniqueId] = useState('feynman');
  const activeTechnique = TECHNIQUES.find((t) => t.id === selectedTechniqueId) || TECHNIQUES[0];

  return (
    <div className="exam-page">
      {/* 1. Hero Section */}
      <section className="exam-hero-band">
        <div className="page-container">
          <div className="exam-hero-content">
            <div className="hero-badge badge-amber">
              <SparklesIcon size={16} />
              <span>Evidence-Based Academic Mastery</span>
            </div>
            <h1 className="exam-title">
              Exam Mode: Study Smarter, <br />
              <span className="hero-highlight">Retain More, Stress Less.</span>
            </h1>
            <p className="exam-subtitle">
              Cramming and all-nighters trigger anxiety and mental blanking. Use proven cognitive learning
              frameworks, interactive Pomodoro focus sprints, and acute panic grounding to perform at your peak.
            </p>
            <div className="exam-hero-actions">
              <a href="#pomodoro-section" className="btn btn-accent btn-lg">
                <ClockIcon size={20} />
                <span>Launch Pomodoro Timer</span>
              </a>
              <a href="#techniques-section" className="btn btn-primary btn-lg">
                <BookOpenIcon size={20} />
                <span>Explore Study Techniques</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Pomodoro Study Timer Section */}
      <section id="pomodoro-section" className="section-band-sage section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <div className="section-tag-badge">
              <ClockIcon size={16} />
              <span>Deep Work Sprint Engine</span>
            </div>
            <h2 className="section-title">The Interactive Pomodoro Timer</h2>
            <p className="section-subtitle">
              Work with the grain of your brain. 25 minutes of high-intensity single-task focus followed by
              a mandatory 5-minute screen-free rest prevents cognitive exhaustion and sustains peak recall.
            </p>
          </div>

          <PomodoroTimer />
        </div>
      </section>

      {/* 3. Evidence-Based Learning Techniques */}
      <section id="techniques-section" className="section-band-sky section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <div className="section-tag-badge">
              <BookOpenIcon size={16} />
              <span>Cognitive Science & Memory Frameworks</span>
            </div>
            <h2 className="section-title">Master the 6 Proven Study Techniques</h2>
            <p className="section-subtitle">
              Ditch passive re-reading and highlighters. These 6 methods are validated by cognitive
              psychology to maximize retention and eliminate exam hall blanking.
            </p>
          </div>

          {/* Technique Selector Pills */}
          <div className="technique-tabs-bar">
            {TECHNIQUES.map((tech) => {
              const isSelected = tech.id === selectedTechniqueId;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTechniqueId(tech.id)}
                  className={`technique-pill ${isSelected ? 'active' : ''}`}
                >
                  <span>{tech.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Technique Interactive Detail Card */}
          <div className="technique-showcase-card">
            <div className="technique-card-header">
              <div className="technique-card-meta">
                <span className={`card-badge ${activeTechnique.badgeColor}`}>
                  {activeTechnique.badge}
                </span>
                <h3 className="technique-card-title">{activeTechnique.title}</h3>
                <p className="technique-tagline">“{activeTechnique.tagline}”</p>
              </div>
            </div>

            <p className="technique-summary">{activeTechnique.summary}</p>

            <div className="technique-steps-box">
              <h4 className="steps-heading">Step-by-Step Implementation Guide:</h4>
              <div className="steps-list">
                {activeTechnique.steps.map((step, idx) => (
                  <div key={idx} className="step-row">
                    <span className="step-num-badge">{idx + 1}</span>
                    <p className="step-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="technique-why-box">
              <SparklesIcon size={18} />
              <div>
                <strong>Why Cognitive Science Proves It Works:</strong> {activeTechnique.whyItWorks}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Acute Exam Hall Triage: Why Breathing Exercises Belong Here */}
      <section className="section-band-offwhite section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <div className="section-tag-badge" style={{ backgroundColor: 'var(--color-crisis-soft)', color: 'var(--color-crisis)' }}>
              <ShieldAlertIcon size={16} />
              <span>The Biology of Exam Panic</span>
            </div>
            <h2 className="section-title">Why Breathing Exercises Matter in Exam Mode</h2>
            <p className="section-subtitle">
              Have you ever studied for days, only to open the exam paper and your mind goes completely blank?
              That is not a memory failure — it is a biological fight-or-flight freeze.
            </p>
          </div>

          <div className="exam-biology-grid">
            <div className="bio-card">
              <div className="bio-card-icon icon-bg-coral">
                <ShieldAlertIcon size={26} />
              </div>
              <h4 className="bio-card-heading">1. The Amygdala Hijack</h4>
              <p className="bio-card-text">
                Under acute stress, your brain's amygdala interprets the exam paper as a physical threat, flooding your
                bloodstream with cortisol and adrenaline.
              </p>
            </div>

            <div className="bio-card">
              <div className="bio-card-icon icon-bg-amber">
                <ClockIcon size={26} />
              </div>
              <h4 className="bio-card-heading">2. Prefrontal Cortex Shutdown</h4>
              <p className="bio-card-text">
                High cortisol temporarily restricts blood flow to your prefrontal cortex — the exact brain region
                responsible for logic, problem-solving, and fact retrieval.
              </p>
            </div>

            <div className="bio-card">
              <div className="bio-card-icon icon-bg-teal">
                <WindIcon size={26} />
              </div>
              <h4 className="bio-card-heading">3. The Physiological Reset</h4>
              <p className="bio-card-text">
                Taking 60 seconds of diaphragmatic box breathing stimulates the vagus nerve, rapidly slowing your heart
                rate and instantly restoring neurological access to your stored memory.
              </p>
            </div>
          </div>

          {/* Grounding & Calming Tools Row */}
          <div className="exam-triage-row">
            <div className="triage-card">
              <div className="triage-icon">
                <WindIcon size={24} />
              </div>
              <div>
                <h5>Box Breathing (4-4-4-4)</h5>
                <p>60-second pacer used by pilots to stop rapid heartbeats and acute test anxiety.</p>
                <Link to="/breathe?routine=box-breathing" className="btn btn-sm btn-primary">
                  <span>Start Box Breathing</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>

            <div className="triage-card">
              <div className="triage-icon">
                <MusicIcon size={24} />
              </div>
              <div>
                <h5>Alpha Waves & Lo-Fi Soundscapes</h5>
                <p>Continuous 432Hz ambient soundscapes that drown out noisy dorms and study halls.</p>
                <Link to="/music" className="btn btn-sm btn-secondary">
                  <span>Open Audio Library</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>

            <div className="triage-card">
              <div className="triage-icon">
                <BookOpenIcon size={24} />
              </div>
              <div>
                <h5>Pre-Exam Worry Dump Journal</h5>
                <p>Writing specific test fears for 5 minutes before entering the hall unloads cognitive memory.</p>
                <Link to="/journal" className="btn btn-sm btn-accent">
                  <span>Write in Journal</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-Exam Hall 24-Hour Checklist */}
      <section className="section-band-sage section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <h2 className="section-title">Pre-Exam Day 24-Hour Checklist</h2>
            <p className="section-subtitle">
              Small behavioral habits in the final 24 hours produce a 15–20% swing in cognitive output.
            </p>
          </div>

          <div className="exam-checklist-grid">
            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">The 12-Hour No-New-Material Rule</h4>
                <p className="checklist-desc">
                  Do not attempt to learn entirely new chapters on the night before an exam. Focus exclusively on
                  retrieving and consolidating what you already know.
                </p>
              </div>
            </div>

            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">Sleep Is When Memory Consolidates</h4>
                <p className="checklist-desc">
                  Pulling an all-nighter impairs cognitive retrieval by up to 40%. During slow-wave and REM sleep,
                  your hippocampus permanently transfers facts to your neocortex.
                </p>
              </div>
            </div>

            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">Hydration & Brain Metabolism</h4>
                <p className="checklist-desc">
                  Even a 2% drop in hydration levels causes a noticeable dip in attention span and working memory. Drink
                  water regularly, and avoid sugar and caffeine spikes right before testing.
                </p>
              </div>
            </div>

            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">Start With the Easiest Question First</h4>
                <p className="checklist-desc">
                  In the exam hall, flip through and solve the easiest 2 questions first. Successfully writing down
                  accurate answers releases dopamine and dissolves acute test paralysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Severe Academic Distress Sanctuary */}
      <section className="section-band-teal section-padding text-center">
        <div className="page-container">
          <div className="teal-cta-content">
            <div className="teal-cta-badge">
              <HeartIcon size={16} />
              <span>Confidential Student Support</span>
            </div>
            <h2 className="teal-cta-title">Facing Severe Academic Overwhelm?</h2>
            <p className="teal-cta-desc">
              Your worth as a human being is not defined by a GPA or examination percentage. If academic stress is
              affecting your sleep, appetite, or emotional safety, our student counsellors and Tele-MANAS are available
              with zero judgment.
            </p>
            <div className="teal-cta-buttons">
              <Link to="/counselling" className="btn btn-accent btn-lg">
                <HeartIcon size={20} />
                <span>Book Confidential Student Chat</span>
              </Link>
              <Link to="/help-now" className="btn btn-outline-white btn-lg">
                <ShieldAlertIcon size={20} />
                <span>24x7 Tele-MANAS (14416)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exam;
