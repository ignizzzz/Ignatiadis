import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "blue" | "honey" | "coral" | "cream" | "outline" | "outline-cream" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  blue: "bg-blue text-cream hover:bg-blue-deep",
  honey: "bg-honey text-blue-ink hover:bg-honey-deep",
  coral: "bg-coral text-cream hover:bg-coral-deep",
  cream: "bg-cream text-blue hover:bg-cream-soft",
  outline:
    "border-2 border-blue text-blue hover:bg-blue hover:text-cream",
  "outline-cream":
    "border-2 border-cream text-cream hover:bg-cream hover:text-blue",
  ghost: "text-blue hover:bg-blue/8",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-full font-display font-bold tracking-tight transition-[background-color,color,transform] duration-200 active:scale-[0.96] motion-reduce:active:scale-100 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant = "blue", size = "md", className, children } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (props.href !== undefined) {
    const { href, target, rel } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  const rest: Partial<ButtonAsButton> = { ...props };
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.children;
  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
