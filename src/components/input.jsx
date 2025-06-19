import React, { forwardRef } from "react";
import { cn } from "../lib/utils";


const Input = forwardRef((props, ref) => {
    const { className, type = "text", ...rest } = props;

    return (
        <input
            ref={ref}
            type={type}
            className={cn(
                "flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...rest}
        />
    );
});

Input.displayName = "Input";

export { Input };
