import { DialogAddTransporte } from "./transportes/DialogAddTransporte";
import { TransportesCompononent } from "./transportes/TransportesCompononent";

export default function Page() {
  return (
    <>
      <nav className="navbar p-4 sm:ml-64 fixed top-0 w-full mt-11 py-2 shadow-sm bg-white">
        <DialogAddTransporte />
        <span className="ml-2 text-sm text-black">Novo transporte</span>
      </nav>
      <div className="p-4 sm:ml-64 mt-8">
        <div className="mt-12">
          <div className="container mx-auto">
            <div className="relative w-full overflow-auto">
              <TransportesCompononent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
