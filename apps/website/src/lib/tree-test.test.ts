import { describe, expect, it } from 'vitest';

import { parseTreeTestSubmission, treeTestTasks } from './tree-test';

function validSubmission() {
  return {
    schemaVersion: 1,
    studyId: 'm3-tree-test',
    responseId: '93d77de8-c091-4303-a230-8e41f89dc367',
    role: 'design-ux',
    accessibilityProfile: 'no',
    taskOrder: treeTestTasks.map((task) => task.id),
    answers: treeTestTasks.map((task) => ({
      taskId: task.id,
      selectedPath: task.expectedPath,
      firstSection: task.expectedPath.split('/').slice(0, 2).join('/'),
      visitedPaths: [task.expectedPath],
      durationMs: 1200,
      confidence: 4,
      comment: '',
    })),
    totalDurationMs: 12_000,
    completedAt: '2026-07-23T10:00:00.000Z',
  };
}

describe('tree testing payload', () => {
  it('accepts one complete, anonymous response', () => {
    expect(parseTreeTestSubmission(validSubmission())).toBeDefined();
  });

  it('rejects duplicate tasks, unknown paths and oversized comments', () => {
    const duplicate = validSubmission();
    duplicate.taskOrder[1] = 1;
    expect(parseTreeTestSubmission(duplicate)).toBeUndefined();

    const unknownPath = validSubmission();
    unknownPath.answers[0]!.selectedPath = '/administrare';
    expect(parseTreeTestSubmission(unknownPath)).toBeUndefined();

    const oversized = validSubmission();
    oversized.answers[0]!.comment = 'x'.repeat(501);
    expect(parseTreeTestSubmission(oversized)).toBeUndefined();
  });
});
