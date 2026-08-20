'use client';

import { useState } from 'react';
import { Button, Input, Label, Notice } from '@/components/ui';

/**
 * Asks for an email and nothing else.
 *
 * On success it shows the same confirmation regardless of whether the address
 * is registered — the server deliberately does not say, and the UI must not
 * undo that by wording the two cases differently.
 */
export function ForgotForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not send the reset link.');
        return;
      }
      setSent(true);
    } catch {
      setError('Could not reach the server. Check your connection.');
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="mt-8">
        <Notice tone="positive" title="Check your email">
          If an account exists for <strong>{email}</strong>, a reset link is on its way. It works
          once and expires in an hour.
        </Notice>
        <p className="mt-4 text-sm text-ink-muted">
          Nothing arrived after a few minutes? Check your spam folder, then try again.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-negative/30 bg-negative/5 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" loading={pending}>
        Send reset link
      </Button>
    </form>
  );
}
