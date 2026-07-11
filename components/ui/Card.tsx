import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        shadow-lg
        transition
        hover:border-emerald-500
        hover:shadow-emerald-500/10
        ${className}
      `}
    >
      {children}
    </div>
  );
}