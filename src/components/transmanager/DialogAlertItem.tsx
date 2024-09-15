import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface DialogItemProps {
	triggerChildren: React.ReactNode;
	children: React.ReactNode;
	onSelect?: () => void;
	onOpenChange?: (open: boolean) => void;
	[key: string]: any;
}

const DialogAlertItem = React.forwardRef<HTMLDivElement, DialogItemProps>(
	(props, forwardedRef) => {
		const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
			props;
		return (
			<AlertDialog.Root onOpenChange={onOpenChange}>
				<AlertDialog.Trigger asChild>
					<DropdownMenu.Item
						{...itemProps}
						ref={forwardedRef}
						className="hover:bg-zinc-600/70 cursor-pointer rounded gap-2 flex items-center pl-2 border-0 outline-none py-1"
						// className={cn(
						// 	"text-sm text-violet-600 border rounded-[3px]",
						// 	"flex items-center h-[25px] px-[5px] relative pl-[25px]",
						// 	"user-select: none outline-none",
						// )}
						onSelect={(event) => {
							event.preventDefault();
							onSelect?.();
						}}
					>
						<Trash2 className="text-red-600 w-4 h-4" />
						{triggerChildren}
					</DropdownMenu.Item>
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
					{/* background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1); */}
					<AlertDialog.Content
						className={cn(
							"bg-white rounded-md shadow-md fixed top-1/2 left-1/2",
							"transform -translate-x-1/2 -translate-y-1/2 w-[90vw]",
							"max-w-[450px] max-h-[85vh] p-5 z-50",
						)}
					>
						{children}
						<AlertDialog.Cancel asChild>
							<button
								className={cn(
									"font-inherit border-radius-full h-[35px] w-[35px] inline-flex items-center justify-center",
									"text-violet-11 bg-red-500 shadow-[0_2px_10px_var(--gray-dark7)]",
								)}
								aria-label="Close"
							>
								<Cross2Icon />
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button className="bg-red-500 text-white px-4 py-2 rounded-md">
								Delete
							</button>
						</AlertDialog.Action>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		);
	},
);

export default DialogAlertItem;
