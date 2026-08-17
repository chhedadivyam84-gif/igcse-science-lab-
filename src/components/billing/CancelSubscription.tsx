'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, ErrorState, Notice } from '@/components/ui';

/**
 * Cancels at period end.
 *
 * Two-step so it cannot be hit by accident, and the copy states plainly that
 * access continues until the paid period ends — no dark patterns.
 */
export function CancelSubscription() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function cancel() {
    setPending(true);
    setError(null);

    try {
      const response = await fetch('/api/billing/status', { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not cancel the subscription.');
        return;
      }
      setDone(data.message);
      router.refresh();
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setPending(false);
    }
  }

  if (done) return <Notice tone="neutral">{done}</Notice>;

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-sm text-ink-faint underline-offset-4 hover:text-ink-muted hover:underline"
      >
        Cancel subscription
      </button>
    );
  }

  return (
    <div>
      <p className="text-sm text-ink">
        Cancel your subscription? You will keep full access until the end of the period you have
        already paid for, and nothing you have created will be deleted.
      </p>
      {error && <ErrorState description={error} className="mt-3" />}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="danger" size="sm" loading={pending} onClick={cancel}>
          Yes, cancel at period end
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
          Keep my subscription
        </Button>
      </div>
    </div>
  );
}
