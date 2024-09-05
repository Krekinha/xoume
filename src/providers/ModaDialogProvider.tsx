"use client";
import ModalDialog from "@/components/transmanager/ModalDialog";
import type { ErrorResponse, Sidemenu } from "@/utils/types";
import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
	useState,
} from "react";

interface ModalDialogProps {
	open: boolean;
	data?: unknown;
	error?: ErrorResponse;
	onClose?: () => void;
}
interface ModaDialogContexProps {
	modalDialog: ModalDialogProps;
	setModalDialog: Dispatch<SetStateAction<ModalDialogProps>>;
}

const ModalDialogContext = createContext<ModaDialogContexProps>({
	modalDialog: { open: false, data: null, error: {}, onClose: () => {} },

	setModalDialog: (): ModalDialogProps => {
		return { open: false, data: null, error: {}, onClose: () => {} };
	},
});

export const ModalDialogContextProvider = ({ children }: any) => {
	const [modalDialog, setModalDialog] = useState<ModalDialogProps>({
		open: false,
		data: null,
		error: {},
		onClose: () => {},
	});

	return (
		<ModalDialogContext.Provider
			value={{
				modalDialog,

				setModalDialog,
			}}
		>
			{modalDialog.open && <ModalDialog />}
			{children}
		</ModalDialogContext.Provider>
	);
};

export const useModalDialogContext = () => useContext(ModalDialogContext);
