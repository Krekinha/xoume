import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import {ErrorBoundary} from "react-error-boundary"
import { TransportesList } from "./TransportesList";


export const TransportesCompononent = () => {

  return (
    <div>
    <ErrorBoundary fallback={<div>algo deu errado</div>}>
        <Suspense fallback={<LoadingSkeleton model={1}/>}>
        
          <TransportesList /> 
          </Suspense> 
          </ErrorBoundary>
       
       
    </div>
  );
}





