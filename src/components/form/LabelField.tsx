interface FieldLabelProps {
	label: string;
}
export function LabelField({ label }: FieldLabelProps) {
	return (
		<label className="text-sm truncate dark:text-gray-300 font-medium ml-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
			{label}
		</label>
	);
}
