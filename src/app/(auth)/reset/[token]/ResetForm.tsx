'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Label } from '@/components/ui';

/**
 * Sets the new password.
 *
 * The two-box confirmation is checked here rather than server-side because it
 * exists to catch a typo, not to enforce anything — the server only needs the
 * password it is being asked to store.
 */
export function ResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;

    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not reset the password.');
        return;
      }
      // The server signs them in, so go straight to the dashboard.
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Could not reach the server. Check your connection.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <div>
        <Label htmlFor="password" hint="At least 10 characters">
          New password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={10}
          required
        />
      </div>

      <div>
        <Label htmlFor="confirm">Confirm new password</Label>
        <Input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          minLength={10}
          required
        />
      </div>

      {error && (
        <p className="rounded-lg border border-negative/30 bg-negative/5 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" loading={pending}>
        Set new password
      </Button>
    </form>
  );
}
