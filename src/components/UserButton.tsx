import type { DetailedUser } from "@halo-dev/api-client";
import ky from "ky";
import { useEffect, useState } from "react";

const shellBase =
  "box-border inline-flex h-[34px] w-[112px] flex-shrink-0 items-center gap-[0.55rem] rounded-[8px] px-[0.7rem]";
const shellInteractive =
  "text-[var(--ink-2)] no-underline transition-colors duration-150 ease-in-out hover:bg-[var(--bg-raised)] hover:text-[var(--ink)]";
const avatarBase =
  "inline-flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--bg-raised)] text-[0.72rem] font-bold leading-none text-[var(--ink)]";
const textBase = "min-w-0 truncate text-[0.9rem] leading-none";

export default function UserButton() {
  const [user, setUser] = useState<DetailedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        const nextUser = await ky
          .get<DetailedUser>(`/apis/api.console.halo.run/v1alpha1/users/-`)
          .json();

        if (!cancelled) {
          setUser(nextUser);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const isAnonymous = user?.user.metadata.name === "anonymousUser";
  const displayName =
    user?.user.spec.displayName || user?.user.metadata.name || "Account";
  const avatarSrc = user?.user.spec.avatar || "";
  const avatarLabel = isAnonymous ? "?" : displayName.charAt(0).toUpperCase();

  if (isLoading) {
    return (
      <div
        className={`${shellBase} pointer-events-none`}
        aria-busy="true"
        aria-live="polite"
      >
        <span
          className={`${avatarBase} theme-skeleton`}
          aria-hidden="true"
        ></span>
        <span
          className="theme-skeleton block h-[0.72rem] w-full rounded-full"
          aria-hidden="true"
        ></span>
        <span className="sr-only">Loading user state</span>
      </div>
    );
  }

  if (user && !isAnonymous) {
    return (
      <a
        href="/uc"
        className={`${shellBase} ${shellInteractive}`}
        title={displayName}
      >
        <span className={avatarBase} aria-hidden="true">
          {avatarSrc ? (
            <img
              className="block h-full w-full object-cover"
              src={avatarSrc}
              alt={displayName}
            />
          ) : (
            <span>{avatarLabel}</span>
          )}
        </span>
        <span className={textBase}>{displayName}</span>
      </a>
    );
  }

  return (
    <a href="/login" className={`${shellBase} ${shellInteractive}`}>
      <span className={avatarBase} aria-hidden="true">
        {avatarLabel}
      </span>
      <span className={textBase}>Login</span>
    </a>
  );
}
