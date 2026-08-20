'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button, ErrorState, Input, Label, Notice, Select } from '@/components/ui';

type Mode = 'signin' | 'signup';

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Middleware records where the student was heading; send them back there.
  // A brand-new account has nowhere in mind, so signing up goes to the subject
  // picker first: the dashboard is far more useful once it knows which of the
  // seven subjects this student actually sits.
  const nextPath = searchParams.get('next');
  const fallback = mode === 'signup' ? '/onboarding/subjects' : '/dashboard';
  const destination = nextPath?.startsWith('/') && !nextPath.startsWith('//') ? nextPath : fallback;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setFields({});

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch(`/api/auth/${mode === 'signin' ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong.');
        setFields(data.fields ?? {});
        return;
      }

      router.push(destination);
      router.refresh();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {error && <ErrorState title="Could not continue" description={error} />}

      {mode === 'signup' && (
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" autoComplete="name" required error={fields.name} />
        </div>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required error={fields.email} />
      </div>

      <div>
        <Label htmlFor="password" hint={mode === 'signup' ? 'at least 10 characters' : undefined}>
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          required
          minLength={mode === 'signup' ? 10 : undefined}
          error={fields.password}
        />
      </div>

      {mode === 'signup' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="targetGrade" hint="optional">
              Target grade
            </Label>
            <Select id="targetGrade" name="targetGrade" defaultValue="">
              <option value="">Not sure yet</option>
              {['A*', 'A', 'B', 'C'].map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="examSeries" hint="optional">
              Exam series
            </Label>
            <Input id="examSeries" name="examSeries" placeholder="May/June 2026" />
          </div>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" loading={pending} className="w-full">
        {mode === 'signin' ? 'Sign in' : 'Create account'}
      </Button>

      {mode === 'signin' && (
        <Notice tone="neutral">
          <p className="text-xs">
            Seeded development account:{' '}
            <span className="font-mono text-ink">student@example.com</span> /{' '}
            <span className="font-mono text-ink">student1234</span>. Change or remove these before
            deploying anywhere public.
          </p>
        </Notice>
      )}
    </form>
  );
}
