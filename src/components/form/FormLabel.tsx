import { cn } from "@/lib/utils";
import type { ResponseAction } from "@/utils/types";
import type * as LabelPrimitive from "@radix-ui/react-label";
import React from "react";
import { Label } from "../ui/label";

export const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
	return (
		<Label ref={ref} className={cn("text-destructive", className)} {...props} />
	);
});
