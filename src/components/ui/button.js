import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:shadow-lg",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primary/90 font-medium tracking-wide uppercase",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 font-medium tracking-wide uppercase",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white font-medium tracking-wide uppercase",
        secondary:
          "bg-secondary text-white hover:bg-secondary/90 font-medium tracking-wide uppercase",
        ghost:
          "hover:bg-gray-100 text-gray-700 font-medium tracking-wide uppercase",
        link: "text-primary underline-offset-4 hover:underline font-medium",
        gradient:
          "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 font-medium tracking-wide uppercase",
        success:
          "bg-success text-white hover:bg-success/90 font-medium tracking-wide uppercase",
        warning:
          "bg-warning text-foreground hover:bg-warning/90 font-medium tracking-wide uppercase",
        accent:
          "bg-accent text-foreground hover:bg-accent/90 font-medium tracking-wide uppercase",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-xl px-8",
        xl: "h-12 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
