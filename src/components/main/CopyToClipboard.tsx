"use client";
import { cn } from "@/lib/utils";
import { notifyService } from "@/services/notifyService";
import { ClipboardCopy, type LucideProps } from "lucide-react";

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
			className="border rounded-md p-1 dark:border-zinc-800"
		>
			<ClipboardCopy
				{...props}
				className={cn("h-[15px] w-[15px]", className)}
			/>
		</button>
	);
};

export default CopyToClipboard;
