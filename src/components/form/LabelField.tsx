import React from "react";

interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	label: string;
}
const LabelField = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
	({ label, htmlFor, ...props }, ref) => {
		return (
			<label
				{...props}
				ref={ref}
				htmlFor={htmlFor}
				className="text-sm truncate dark:text-gray-300 font-medium ml-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
			</label>
		);
	},
);

LabelField.displayName = "LabelField";
export { LabelField };
