import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import {ErrorBoundary} from "react-error-boundary"
import { TransportesList } from "./TransportesList";
import { FallbackFetch } from "./Fallback";


export const TransportesCompononent = () => {

  return (
    <div>
    <ErrorBoundary FallbackComponent={FallbackFetch}>
        <Suspense fallback={<LoadingSkeleton model={1}/>}>
        
          <TransportesList /> 
          </Suspense> 
      </ErrorBoundary>
       
       
    </div>
  );
}





