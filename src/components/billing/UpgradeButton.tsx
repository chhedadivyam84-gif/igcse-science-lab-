'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, ErrorState } from '@/components/ui';
import type { Interval } from '@/lib/billing/plans';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

/**
 * Opens Razorpay checkout.
 *
 * The script is loaded on demand rather than on every page, so students who
 * never open the pricing page never download it. If the inline widget is
 * blocked, the hosted `short_url` is used instead so payment is still possible.
 */
export function UpgradeButton({
  interval,
  children,
  variant = 'primary',
  className,
}: {
  interval: Interval;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadScript(): Promise<boolean> {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function start() {
    setPending(true);
    setError(null);

    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interval }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push('/signup');
        return;
      }
      if (!response.ok) {
        setError(data.error ?? 'Could not start checkout.');
        return;
      }

      const ready = await loadScript();
      if (!ready) {
        // Fall back to Razorpay's hosted page.
        if (data.shortUrl) {
          window.location.href = data.shortUrl;
          return;
        }
        setError('Could not load the payment window. Check your connection or any ad blocker.');
        return;
      }

      const checkout = new window.Razorpay!({
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: 'IGCSE Science Lab',
        description: interval === 'YEARLY' ? 'Pro — yearly' : 'Pro — monthly',
        prefill: data.prefill,
        theme: { color: '#38bdf8' },
        handler: async (result: Record<string, string>) => {
          const verify = await fetch('/api/billing/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result),
          });
          if (verify.ok) {
            router.push('/account?upgraded=1');
            router.refresh();
          } else {
            const problem = await verify.json();
            setError(problem.error ?? 'Payment taken but not confirmed. Contact support.');
          }
        },
        modal: { ondismiss: () => setPending(false) },
      });

      checkout.open();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={className}>
      <Button variant={variant} size="lg" loading={pending} onClick={start} className="w-full">
        {children}
      </Button>
      {error && <ErrorState description={error} className="mt-3" />}
    </div>
  );
}
