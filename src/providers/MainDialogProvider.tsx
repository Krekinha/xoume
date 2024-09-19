"use client";
import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
	useState,
} from "react";

interface MainDialogProps {
	open: boolean;
	title?: string;
	content?: React.ReactNode;
	onClose?: () => void;
}
interface MainDialogContexProps {
	mainDialog: MainDialogProps;
	setMainDialog: Dispatch<SetStateAction<MainDialogProps>>;
}

const MainDialogContext = createContext<MainDialogContexProps>({
	mainDialog: { open: false, content: null, onClose: () => {} },

	setMainDialog: (): MainDialogProps => {
		return { open: false, content: null, onClose: () => {} };
	},
});

export const MainDialogContextProvider = ({ children }: any) => {
	const [mainDialog, setMainDialog] = useState<MainDialogProps>({
		open: false,
		content: null,
		onClose: () => {},
	});

	return (
		<MainDialogContext.Provider
			value={{
				mainDialog,
				setMainDialog,
			}}
		>
			{children}
		</MainDialogContext.Provider>
	);
};

export const useMainDialogContext = () => useContext(MainDialogContext);
