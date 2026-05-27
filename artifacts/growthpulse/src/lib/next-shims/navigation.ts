import { useLocation, useRouter as useWouterRouter } from "wouter";
import { useMemo } from "react";

export function usePathname(): string {
  const [location] = useLocation();
  return location;
}

export function useRouter() {
  const [, setLocation] = useLocation();
  const router = useWouterRouter();
  return useMemo(
    () => ({
      push: (href: string) => setLocation(href),
      replace: (href: string) => setLocation(href, { replace: true }),
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      refresh: () => {
        // no-op for client-side router
      },
      prefetch: (_href: string) => {
        // no-op
      },
    }),
    [setLocation, router],
  );
}

export function useSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export function useParams<T = Record<string, string>>(): T {
  return {} as T;
}
