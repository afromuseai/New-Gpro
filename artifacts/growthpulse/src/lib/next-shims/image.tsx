import * as React from "react";

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
  src: string | { src: string };
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  loading?: "lazy" | "eager";
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  sizes?: string;
  loader?: any;
  className?: string;
  style?: React.CSSProperties;
  "data-ai-hint"?: string;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    width,
    height,
    fill,
    priority,
    quality,
    loading,
    placeholder,
    blurDataURL,
    unoptimized,
    sizes,
    loader,
    className,
    style,
    ...rest
  },
  ref,
) {
  const resolvedSrc = typeof src === "string" ? src : src.src;
  const fillStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: 0,
        objectFit: "cover",
        ...style,
      }
    : style ?? {};

  return (
    <img
      ref={ref}
      src={resolvedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={loading ?? (priority ? "eager" : "lazy")}
      sizes={sizes}
      className={className}
      style={fillStyle}
      {...rest}
    />
  );
});

export default Image;
