import { afterEach, describe, expect, it, vi } from 'vitest';

import { treeTestTasks } from '../../../lib/tree-test';
import { POST } from './route';

function payload() {
  return {
    schemaVersion: 1,
    studyId: 'm3-tree-test',
    responseId: '93d77de8-c091-4303-a230-8e41f89dc367',
    role: 'development',
    accessibilityProfile: 'prefer-not-to-say',
    taskOrder: treeTestTasks.map((task) => task.id),
    answers: treeTestTasks.map((task) => ({
      taskId: task.id,
      selectedPath: task.expectedPath,
      firstSection: task.expectedPath.split('/').slice(0, 2).join('/'),
      visitedPaths: [task.expectedPath],
      durationMs: 1000,
      confidence: 5,
      comment: '',
    })),
    totalDurationMs: 10_000,
    completedAt: '2026-07-23T10:00:00.000Z',
  };
}

function request(body: string, host = 'sistem.digital') {
  return new Request(`https://${host}/api/tree-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}

afterEach(() => vi.restoreAllMocks());

describe('tree testing endpoint', () => {
  it('logs a validated response only in Production', async () => {
    const log = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    expect((await POST(request(JSON.stringify(payload())))).status).toBe(204);
    expect(JSON.parse(String(log.mock.calls[0]?.[0]))).toMatchObject({
      message: 'm3_tree_test_completed',
      role: 'development',
      studyId: 'm3-tree-test',
    });
  });

  it('does not collect preview responses', async () => {
    const log = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    expect((await POST(request(JSON.stringify(payload()), 'preview.example'))).status).toBe(204);
    expect(log).not.toHaveBeenCalled();
  });

  it('rejects malformed and oversized responses', async () => {
    expect((await POST(request('{invalid'))).status).toBe(400);
    expect((await POST(request(JSON.stringify({ ...payload(), role: 'unknown' })))).status).toBe(
      400,
    );
    expect((await POST(request(JSON.stringify({ padding: 'x'.repeat(25_000) })))).status).toBe(413);
  });
});
