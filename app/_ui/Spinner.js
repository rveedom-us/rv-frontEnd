import { LoaderCircle } from "lucide-react";

export function SpinnerMini({ size = "sm" }) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-18 w-18",
    lg: "h-32 w-32",
  };

  return (
    <div className="flex justify-center items-center animate-spin">
      <LoaderCircle
        className={`${sizeClasses[size] || sizeClasses.sm}`}
        color="black"
      />
    </div>
  );
}
