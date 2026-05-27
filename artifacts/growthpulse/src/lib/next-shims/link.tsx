import * as React from "react";
import { useLocation } from "wouter";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
  children?: React.ReactNode;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    href,
    prefetch: _prefetch,
    replace,
    scroll: _scroll,
    shallow: _shallow,
    passHref: _passHref,
    legacyBehavior: _legacyBehavior,
    onClick,
    ...rest
  },
  ref,
) {
  const [, setLocation] = useLocation();
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (isExternal) return;
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setLocation(href, replace ? { replace: true } : undefined);
  };

  return <a ref={ref} href={href} onClick={handleClick} {...rest} />;
});

export default Link;
