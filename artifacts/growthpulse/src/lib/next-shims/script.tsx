import * as React from "react";

type ScriptProps = React.ScriptHTMLAttributes<HTMLScriptElement> & {
  strategy?: "afterInteractive" | "beforeInteractive" | "lazyOnload" | "worker";
  onLoad?: () => void;
  onReady?: () => void;
  onError?: (e: any) => void;
  children?: React.ReactNode;
};

const loaded = new Set<string>();

const Script: React.FC<ScriptProps> = ({
  src,
  strategy: _strategy,
  onLoad,
  onReady,
  onError,
  children,
  id,
  ...rest
}) => {
  React.useEffect(() => {
    if (!src) {
      if (children) {
        const el = document.createElement("script");
        if (id) el.id = id;
        el.textContent = String(children);
        document.head.appendChild(el);
        return () => {
          el.remove();
        };
      }
      return;
    }
    if (loaded.has(src)) {
      onReady?.();
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    if (id) el.id = id;
    Object.entries(rest).forEach(([k, v]) => {
      if (v === true) el.setAttribute(k, "");
      else if (v != null && v !== false) el.setAttribute(k, String(v));
    });
    el.onload = () => {
      loaded.add(src);
      onLoad?.();
      onReady?.();
    };
    el.onerror = (e) => onError?.(e);
    document.head.appendChild(el);
  }, [src, id]);

  return null;
};

export default Script;
