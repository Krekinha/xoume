import { GrStatusGood } from "react-icons/gr";
import { CgHashtag } from "react-icons/cg";
import { FaRegHandshake } from "react-icons/fa6";
import { RiCalendar2Line } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Transporte } from "@/utils/types";
import FetchFailedError from "@/utils/apiErrors";

interface ErrorCustom {
    message?: string;
    statusCode?: number;
    statusText?: string;
}

export const TransportesList = async () => {

  let transportes: Transporte[] = [];
  let err: ErrorCustom = {}

    // "https://transmanager-node.vercel.app/transportes"
    // "http://localhost:3333/transportes"
    const res = await fetch("https://transmanager-node.vercel.app/transportess");
    console.log(res);
    // if (res.status != 200) throw new FetchFailedError('Falha ao buscar transportes', res.status, res.statusText);
    if (res.status != 200) throw new FetchFailedError(`{"message": "Erro ao buscar transportes", "statusCode": ${res.status}, "statusText": "${res.statusText}"}`);

    const responseObj = await res.json();


    transportes = responseObj.transportes
    console.log(transportes)


  return (
    <div>
      
      {//res ? 
        transportes.map((transporte: Transporte) => (
          <ul key={transporte.id}>
            <div
              role="transporte"
              className="grid grid-flow-row auto-rows-auto w-full my-3 rounded-lg border border-gray-200 bg-violet-50/30 p-1.5 shadow-sm-light shadow-gray-100"
            >
              {/* Título/Menu */}
              <div
                role="titulo-menu"
                className="grid grid-flow-col items-center"
              >
                <div className="flex gap-2 items-center">
                  <GrStatusGood className="text-green-600" />
                  <div
                    role="titulo"
                    className="text-[0.790rem] "
                  >
                    {transporte.id}
                  </div>
                </div>

                <div role="menu-dropdown" className="justify-self-end">
                </div>
              </div>

              {/* Descrição */}
              <div
                role="descricao"
                className=" text-xs truncate text-gray-500/75 ml-6 mr-1"
              >
                {transporte.empresa?.razaoNome}
              </div>

              <div
                role="tags"
                className="flex flex-row gap-2.5 items-center mt-3 text-gray-700/85"
              >
                {/* TAG - Ordem */}
                <div role="ordem" title="Ordem" className="flex items-center">
                  <CgHashtag className="text-sky-600 w-3 h-3" />
                  <div role="ordem" className="text-[0.70rem] font-medium">
                    {transporte.empresa?.cnpjCpf}
                  </div>
                </div>

                {/* TAG - Evolucao */}
                {transporte.val_frete && (
                  <>
                    <Separator orientation="vertical" className="bg-gray-200" />
                    <div
                      role="evolucao"
                      title="Evolução do transporte"
                      className="flex items-center gap-1 "
                    >
                      <FaListCheck className="text-sky-600 w-3 h-3" />
                      <div role="eventos" className="text-[0.70rem]">
                        {transporte.motorista}
                      </div>
                    </div>
                  </>
                )}

                {/* TAG - Prazo */}
                {transporte.val_frete && (
                  <>
                    <Separator orientation="vertical" className="bg-gray-200" />
                    <div
                      role="prazo"
                      title={
                        "Data de vencimento: "
                      }
                      className="flex items-center gap-1 "
                    >
                      <RiCalendar2Line className="text-sky-600 w-3 h-3" />
                      <div role="ordem" className="text-[0.70rem]">
                        {transporte.motorista}
                      </div>
                    </div>
                  </>
                )}

                {/* TAG - Cliente */}
                {transporte.empresa && (
                  <>
                    <Separator orientation="vertical" className="bg-gray-200" />
                    <div
                      role="cliente"
                      title="Cliente"
                      className="flex items-center gap-1"
                    >
                      <FaRegHandshake className="text-sky-600 w-3 h-3" />
                      <div role="razao" className="text-[0.65rem]">
                        {transporte.empresa.id}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </ul>
        )
        )}
        
    </div>
  )
}