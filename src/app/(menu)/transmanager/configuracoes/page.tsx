import { FormAddTransporte } from "../transportes/FormAddTransporte";

export default async function Page() {
	/**
	 * etc
	 * @author Krekinha
	 * @version 1.0
	 */

	return (
		<div className="p-4 sm:ml-64">
			<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
				<FormAddTransporte />
				Configurações
			</div>
		</div>
	);
}
