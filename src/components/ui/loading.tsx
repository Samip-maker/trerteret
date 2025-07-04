
import { cn } from "@/lib/utils";
import { LoaderCircle, Mountain } from "lucide-react";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
  variant?: "default" | "page" | "inline";
}

export function Loading({ 
  className, 
  size = "md", 
  text = "Loading...", 
  variant = "default" 
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  if (variant === "page") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-green-950 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mountain className="h-8 w-8 text-green-600 dark:text-green-400 animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sikkim Trails</h1>
          </div>
          <LoaderCircle className="h-12 w-12 mx-auto text-green-600 dark:text-green-400 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">{text}</p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <LoaderCircle className={cn("animate-spin text-green-600 dark:text-green-400", sizeClasses[size])} />
        {text && <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-4", className)}>
      <LoaderCircle className={cn("animate-spin text-green-600 dark:text-green-400", sizeClasses[size])} />
      {text && <p className="text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
}
