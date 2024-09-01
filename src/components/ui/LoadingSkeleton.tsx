import { cn } from "@/lib/utils";

interface props {
	model: number;
}

export default function LoadingSkeleton({ model }: props) {
	return (
		<>
			{model === 1 && (
				<div className="flex flex-col relative mt-30 items-center justify-center">
					<div
						className={cn(
							"text-blue-500 inline-block h-8 w-8 animate-spin rounded-full",
							"border-4 border-solid border-current border-r-transparent align-[-0.125em]",
							"motion-reduce:animate-[spin_1.5s_linear_infinite]",
						)}
					/>
					<div className="flex justify-center mt-3">
						<span className="text-blue-400 text-sm">Carregando...</span>
					</div>
				</div>
			)}
			{model === 2 && (
				<div
					className={cn(
						"text-red-500 inline-block h-5 w-5 animate-spin rounded-full border-4",
						"border-solid border-current border-r-transparent align-[-0.125em]",
						"motion-reduce:animate-[spin_1.5s_linear_infinite]",
					)}
				/>
			)}
		</>
	);
}
