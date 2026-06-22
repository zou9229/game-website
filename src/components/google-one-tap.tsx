'use client';

import { useEffect, useRef } from 'react';

import { getAuthClient, useSession } from '@/core/auth/client';

// Mounts the Google One Tap prompt for signed-out visitors when the
// admin has enabled it. The server layout gates this component before
// hydration, so disabled sites avoid the extra public-config request.
export function GoogleOneTap({ configs }: { configs: Record<string, string> }) {
  const { data: session, isPending } = useSession();
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current) return;
    if (isPending) return;
    if (session?.user) return;
    if (
      configs.google_one_tap_enabled !== 'true' ||
      !configs.google_client_id
    ) {
      return;
    }

    triggered.current = true;
    const client = getAuthClient(configs);
    (client as any)
      .oneTap?.({
        callbackURL: '/',
        onPromptNotification: () => {
          // Silently ignore dismissals / FedCM hiccups — the user can still
          // sign in via the normal /sign-in page.
        },
      })
      .catch(() => {
        // Same — One Tap cancellations throw NetworkError/AbortError that
        // aren't actionable.
      });
  }, [configs, session, isPending]);

  return null;
}
