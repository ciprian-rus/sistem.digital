'use client';

import { useEffect, useRef, useState } from 'react';

import {
  accessibilityProfiles,
  treeTestRoles,
  treeTestSections,
  treeTestTasks,
  type AccessibilityProfile,
  type TreeTestAnswer,
  type TreeTestRole,
  type TreeTestSubmission,
} from '../lib/tree-test';

const completedStorageKey = 'sd:m3-tree-test:completed';

const roleLabels: Record<TreeTestRole, string> = {
  'design-ux': 'Design sau cercetare UX',
  development: 'Dezvoltare software',
  content: 'Conținut sau comunicare instituțională',
  'public-service': 'Serviciu public sau administrație',
  'procurement-decision': 'Achiziții, furnizare sau decizie instituțională',
};

const accessibilityLabels: Record<AccessibilityProfile, string> = {
  yes: 'Da',
  no: 'Nu',
  'prefer-not-to-say': 'Prefer să nu răspund',
};

type Stage = 'intro' | 'profile' | 'tasks' | 'complete';
type SubmissionStatus = 'idle' | 'sending' | 'sent' | 'error';

function shuffledTaskIds(): number[] {
  const taskIds = treeTestTasks.map((task) => task.id);
  for (let index = taskIds.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [taskIds[index], taskIds[randomIndex]] = [taskIds[randomIndex]!, taskIds[index]!];
  }
  return taskIds;
}

function elapsedSince(startedAt: number): number {
  return Math.max(0, Math.min(3_600_000, Math.round(performance.now() - startedAt)));
}

export function TreeTestRunner() {
  const [stage, setStage] = useState<Stage>('intro');
  const [role, setRole] = useState<TreeTestRole | ''>('');
  const [accessibilityProfile, setAccessibilityProfile] = useState<AccessibilityProfile | ''>('');
  const [taskOrder, setTaskOrder] = useState<number[]>([]);
  const [taskIndex, setTaskIndex] = useState(0);
  const [openSection, setOpenSection] = useState<string>();
  const [firstSection, setFirstSection] = useState('');
  const [visitedPaths, setVisitedPaths] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState('');
  const [confidence, setConfidence] = useState(4);
  const [comment, setComment] = useState('');
  const [answers, setAnswers] = useState<TreeTestAnswer[]>([]);
  const [submission, setSubmission] = useState<TreeTestSubmission>();
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const taskStartedAt = useRef(0);
  const studyStartedAt = useRef(0);

  const currentTask = treeTestTasks.find((task) => task.id === taskOrder[taskIndex]);

  useEffect(() => {
    setAlreadyCompleted(localStorage.getItem(completedStorageKey) === 'true');
  }, []);

  function beginProfile() {
    if (alreadyCompleted) return;
    setStage('profile');
  }

  function beginTasks() {
    if (!role || !accessibilityProfile) return;
    const order = shuffledTaskIds();
    setTaskOrder(order);
    setTaskIndex(0);
    setAnswers([]);
    setStage('tasks');
    studyStartedAt.current = performance.now();
    taskStartedAt.current = performance.now();
  }

  function chooseSection(path: string) {
    if (!firstSection) setFirstSection(path);
    setOpenSection(path);
    setSelectedPath('');
    setVisitedPaths((paths) => [...paths, path]);
  }

  function chooseDestination(path: string) {
    setSelectedPath(path);
    setVisitedPaths((paths) => [...paths, path]);
  }

  async function sendSubmission(result: TreeTestSubmission) {
    setSubmissionStatus('sending');
    try {
      const response = await fetch('/api/tree-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
        keepalive: true,
      });
      if (!response.ok) throw new Error('Submission failed');
      localStorage.setItem(completedStorageKey, 'true');
      setAlreadyCompleted(true);
      setSubmissionStatus('sent');
    } catch {
      setSubmissionStatus('error');
    }
  }

  function finishTask() {
    if (!currentTask || !selectedPath || !firstSection) return;
    const answer: TreeTestAnswer = {
      taskId: currentTask.id,
      selectedPath,
      firstSection,
      visitedPaths,
      durationMs: elapsedSince(taskStartedAt.current),
      confidence,
      comment: comment.trim(),
    };
    const nextAnswers = [...answers, answer];

    if (taskIndex < taskOrder.length - 1) {
      setAnswers(nextAnswers);
      setTaskIndex((index) => index + 1);
      setOpenSection(undefined);
      setFirstSection('');
      setVisitedPaths([]);
      setSelectedPath('');
      setConfidence(4);
      setComment('');
      taskStartedAt.current = performance.now();
      document.querySelector<HTMLElement>('#tree-test-task-title')?.focus();
      return;
    }

    if (!role || !accessibilityProfile) return;
    const result: TreeTestSubmission = {
      schemaVersion: 1,
      studyId: 'm3-tree-test',
      responseId: crypto.randomUUID(),
      role,
      accessibilityProfile,
      taskOrder,
      answers: nextAnswers,
      totalDurationMs: elapsedSince(studyStartedAt.current),
      completedAt: new Date().toISOString(),
    };
    setAnswers(nextAnswers);
    setSubmission(result);
    setStage('complete');
    void sendSubmission(result);
  }

  function downloadResult() {
    if (!submission) return;
    const blob = new Blob([`${JSON.stringify(submission, null, 2)}\n`], {
      type: 'application/json',
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `sistem-digital-tree-test-${submission.responseId}.json`;
    link.click();
    URL.revokeObjectURL(href);
  }

  if (stage === 'intro') {
    return (
      <section className="sd-tree-test-card" aria-labelledby="tree-test-start-title">
        <p className="section-kicker">Cercetare publică</p>
        <h2 id="tree-test-start-title">Ajută-ne să facem informația mai ușor de găsit.</h2>
        <p>
          Vei primi 10 situații și un arbore textual. Pentru fiecare, alegi locul în care te-ai
          aștepta să găsești răspunsul. Nu testăm cunoștințele tale, ci denumirile și structura
          platformei.
        </p>
        <ul className="sd-tree-test-facts">
          <li>Durează aproximativ 7–10 minute.</li>
          <li>Nu cerem nume, e-mail sau cont.</li>
          <li>Nu folosi căutarea și nu deschide platforma în altă filă.</li>
          <li>Poți opri testul în orice moment înainte de trimitere.</li>
        </ul>
        {alreadyCompleted ? (
          <div className="sd-tree-test-notice" role="status">
            <strong>Ai trimis deja un răspuns de pe acest dispozitiv.</strong>
            <span>Pentru a proteja calitatea studiului, nu acceptăm o a doua trimitere.</span>
          </div>
        ) : (
          <button className="sd-button sd-button--primary" type="button" onClick={beginProfile}>
            Începe testul
          </button>
        )}
      </section>
    );
  }

  if (stage === 'profile') {
    return (
      <section className="sd-tree-test-card" aria-labelledby="tree-test-profile-title">
        <p className="section-kicker">Înainte de test</p>
        <h2 id="tree-test-profile-title">Două informații pentru o analiză corectă</h2>
        <p>
          Le folosim numai pentru a compara rezultatele între tipurile de participanți. Nu permit
          identificarea ta.
        </p>
        <fieldset className="sd-tree-test-fieldset">
          <legend>Care este rolul cel mai apropiat de activitatea ta?</legend>
          {treeTestRoles.map((value) => (
            <label key={value}>
              <input
                checked={role === value}
                name="role"
                onChange={() => setRole(value)}
                type="radio"
                value={value}
              />
              <span>{roleLabels[value]}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="sd-tree-test-fieldset">
          <legend>
            Folosești tehnologii asistive sau ai o nevoie de accesibilitate relevantă?
          </legend>
          {accessibilityProfiles.map((value) => (
            <label key={value}>
              <input
                checked={accessibilityProfile === value}
                name="accessibility"
                onChange={() => setAccessibilityProfile(value)}
                type="radio"
                value={value}
              />
              <span>{accessibilityLabels[value]}</span>
            </label>
          ))}
        </fieldset>
        <div className="sd-button-group">
          <button
            className="sd-button sd-button--primary"
            disabled={!role || !accessibilityProfile}
            type="button"
            onClick={beginTasks}
          >
            Continuă la sarcini
          </button>
          <button
            className="sd-button sd-button--secondary"
            type="button"
            onClick={() => setStage('intro')}
          >
            Înapoi
          </button>
        </div>
      </section>
    );
  }

  if (stage === 'complete') {
    return (
      <section className="sd-tree-test-card" aria-labelledby="tree-test-complete-title">
        <p className="section-kicker">Test finalizat</p>
        <h2 id="tree-test-complete-title">Mulțumim. Răspunsul tău contează.</h2>
        {submissionStatus === 'sending' ? <p role="status">Trimitem răspunsul…</p> : null}
        {submissionStatus === 'sent' ? (
          <div className="sd-tree-test-notice sd-tree-test-notice--success" role="status">
            <strong>Răspunsul a fost înregistrat.</strong>
            <span>Îl vom include anonim în analiza publică a arhitecturii informației.</span>
          </div>
        ) : null}
        {submissionStatus === 'error' ? (
          <div className="sd-tree-test-notice sd-tree-test-notice--error" role="alert">
            <strong>Răspunsul nu a putut fi trimis.</strong>
            <span>Îl poți descărca și ni-l poți transmite ulterior.</span>
          </div>
        ) : null}
        <p>
          Publicăm rezultatele agregate și deciziile rezultate în proiectul open-source. Nu publicăm
          răspunsuri care ar putea identifica participanții.
        </p>
        <div className="sd-button-group">
          {submissionStatus === 'error' && submission ? (
            <button
              className="sd-button sd-button--primary"
              type="button"
              onClick={() => void sendSubmission(submission)}
            >
              Încearcă din nou
            </button>
          ) : null}
          <button className="sd-button sd-button--secondary" type="button" onClick={downloadResult}>
            Descarcă o copie
          </button>
          <a className="sd-link" href="/">
            Înapoi la Sistem Digital
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="sd-tree-test-card" aria-labelledby="tree-test-task-title">
      <div className="sd-tree-test-progress">
        <span>
          Sarcina {taskIndex + 1} din {taskOrder.length}
        </span>
        <progress value={taskIndex + 1} max={taskOrder.length}>
          {taskIndex + 1} din {taskOrder.length}
        </progress>
      </div>
      <p className="section-kicker">Unde ai căuta?</p>
      <h2 id="tree-test-task-title" tabIndex={-1}>
        {currentTask?.prompt}
      </h2>
      <p>Alege categoria, apoi destinația care ți se pare cea mai potrivită.</p>

      <div className="sd-tree-test-tree" aria-label="Arborele Sistem Digital">
        {treeTestSections.map((section) => {
          const isOpen = openSection === section.href;
          return (
            <div className="sd-tree-test-branch" key={section.href}>
              <button
                aria-expanded={isOpen}
                className={isOpen ? 'is-open' : undefined}
                type="button"
                onClick={() => chooseSection(section.href)}
              >
                {section.label}
              </button>
              {isOpen ? (
                <div className="sd-tree-test-leaves">
                  {section.children.map((child) => (
                    <label key={child.href}>
                      <input
                        checked={selectedPath === child.href}
                        name="destination"
                        onChange={() => chooseDestination(child.href)}
                        type="radio"
                        value={child.href}
                      />
                      <span>{child.label}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <fieldset className="sd-tree-test-confidence">
        <legend>Câtă încredere ai în alegerea făcută?</legend>
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value}>
              <input
                checked={confidence === value}
                name="confidence"
                onChange={() => setConfidence(value)}
                type="radio"
                value={value}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
        <p>
          <span>Deloc sigur</span>
          <span>Foarte sigur</span>
        </p>
      </fieldset>

      <div className="sd-tree-test-comment">
        <label htmlFor="tree-test-comment">
          Ce denumire ți s-a părut neclară? (opțional, fără date personale)
        </label>
        <textarea
          id="tree-test-comment"
          maxLength={500}
          rows={3}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>

      <button
        className="sd-button sd-button--primary"
        disabled={!selectedPath}
        type="button"
        onClick={finishTask}
      >
        {taskIndex === taskOrder.length - 1 ? 'Trimite răspunsul' : 'Următoarea sarcină'}
      </button>
    </section>
  );
}
