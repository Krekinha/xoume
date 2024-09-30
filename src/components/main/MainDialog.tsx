"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	MainDialogContextProvider,
	useMainDialogContext,
} from "@/providers/MainDialogProvider";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export function MainDialog() {
	const { mainDialog: modalDialog, setMainDialog: setModalDialog } =
		useMainDialogContext();

	return (
		<MainDialogContextProvider>
			{modalDialog.open ? (
				<Dialog
					aria-modal
					open={modalDialog.open}
					onOpenChange={() => {
						setModalDialog({ open: false });
						modalDialog.onClose ? modalDialog.onClose() : "";
					}}
				>
					<DialogTrigger />
					<DialogContent className="flex flex-col bg-zinc-950 border border-zinc-900 gap-3 max-h-fit">
						<DialogHeader>
							<DialogTitle />
							<DialogDescription />
						</DialogHeader>
						{modalDialog.content}
						<DialogFooter className="sm:justify-center">
							<DialogClose asChild>
								<Button
									// onClick={() => setModalDialog({ open: false })}
									variant="outline"
								>
									Fechar
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			) : null}
		</MainDialogContextProvider>
	);
}
