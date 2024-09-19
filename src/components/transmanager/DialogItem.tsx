import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Cross2Icon } from "@radix-ui/react-icons";
// import * as Dialog from "@radix-ui/react-dialog";

interface DialogItemProps {
	triggerChildren: React.ReactNode;
	children: React.ReactNode;
	onSelect?: () => void;
	onOpenChange?: (open: boolean) => void;
	[key: string]: any;
}

const DialogItem = React.forwardRef<HTMLDivElement, DialogItemProps>(
	(props, forwardedRef) => {
		const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
			props;
		return (
			<Dialog onOpenChange={onOpenChange}>
				<DialogTrigger asChild>
					<DropdownMenuItem
						{...itemProps}
						ref={forwardedRef}
						onSelect={(event) => {
							event.preventDefault();
							onSelect?.();
						}}
					>
						{triggerChildren}
					</DropdownMenuItem>
				</DialogTrigger>
				<DialogPortal>
					<DialogOverlay />
					<DialogContent>
						{children}
						<DialogClose asChild>
							<button className="IconButton" aria-label="Close">
								<Cross2Icon />
							</button>
						</DialogClose>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		);
	},
);

export default DialogItem;

// const DialogItem = React.forwardRef<HTMLDivElement, DialogItemProps>(
// 	(props, forwardedRef) => {
// 		const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
// 			props;
// 		return (
// 			<Dialog.Root onOpenChange={onOpenChange}>
// 				<Dialog.Trigger asChild>
// 					<DropdownMenu.Item
// 						{...itemProps}
// 						ref={forwardedRef}
// 						className="DropdownMenuItem"
// 						onSelect={(event) => {
// 							event.preventDefault();
// 							onSelect?.();
// 						}}
// 					>
// 						{triggerChildren}
// 					</DropdownMenu.Item>
// 				</Dialog.Trigger>
// 				<Dialog.Portal>
// 					<Dialog.Overlay />
// 					<Dialog.Content className="DialogContent">
// 						{children}
// 						<Dialog.Close asChild>
// 							<button className="IconButton" aria-label="Close">
// 								<Cross2Icon />
// 							</button>
// 						</Dialog.Close>
// 					</Dialog.Content>
// 				</Dialog.Portal>
// 			</Dialog.Root>
// 		);
// 	},
// );

// export default DialogItem;
