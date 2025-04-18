"use client";
import { cn } from "@/lib/utils";
import { notifyService } from "@/services/notifyService";
import { Copy, type LucideProps } from "lucide-react";

interface CopyToClipboardProps extends LucideProps {
	textToCopy: string | undefined;
}

const CopyToClipboard = ({
	textToCopy,
	className,
	...props
}: CopyToClipboardProps) => {
	function copyToClipboard() {
		console.log("textToCopy", textToCopy);
		if (!textToCopy) {
			notifyService.error("Não há texto para ser copiado");
		} else {
			navigator.clipboard.writeText(textToCopy);
			notifyService.success("Copiado para área de transferência!");
		}
	}

	return (
		<button
			onClick={copyToClipboard}
			className="p-1 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
		>
			<Copy
				{...props}
				className={cn("h-[18px] w-[18px] text-blue-600 dark:text-blue-400", className)}
			/>
		</button>
	);
};

export default CopyToClipboard;
