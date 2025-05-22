import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

interface InputAdditionalPropsType {
    containerClassName?: string;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    status?: "default" | "error" | "success" | "warning";
    isLoading?: boolean;
  }
   
  const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputAdditionalPropsType>(
    (
        {

    className,
    status,
    iconPosition,
    icon,
    containerClassName,
    type,
    isLoading,
    ...props


  },
  ref
)=> {
    const statusHandler = (status :InputAdditionalPropsType["status"])=>{
        switch (status){
            case "error":
                return "!border-red-500 text-red-500";
        }
    };

    return(
        <div
        className={cn(
            "flex h-10 overflo-hidden rounded-main border border-neutral-200 bg-white text-base ring-offset-white file:border-0 file:bg-transparent items-center justify-start",
       containerClassName,
       iconPosition == "end" && "flex-row-reverse",
       statusHandler(status)
        )}
        >
            {icon && (
                <span className="h-full px-2 flex justify-center items-center">
                    {icon}
                    </span>
            )}
            <input
            type={type}
            className={cn("flex h-full flex-1 outline-none px-2 ",className)}
            ref={ref}
            {...props}
            />

            {isLoading && (
                <span className="h-full px-2  flex justify-center items-center">
                  <Icon icon={"line-md:loading-twotone-loop"} className="size-6" />
              </span>
            )}
        </div>
    )
})
Input.displayName = "Input";

export { Input };
