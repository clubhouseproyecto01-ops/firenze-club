interface StatusBadgeProps {
  estado: "Disponible" | "Completo";
}

export default function StatusBadge({
  estado,
}: StatusBadgeProps) {
  const disponible = estado === "Disponible";

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-sm
        font-semibold
        ${
          disponible
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-red-500/20 text-red-400"
        }
      `}
    >
      <span className="mr-2">
        {disponible ? "🟢" : "🔴"}
      </span>

      {estado}
    </span>
  );
}