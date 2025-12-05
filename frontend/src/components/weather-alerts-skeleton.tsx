import { Skeleton } from "./ui/skeleton";


export function WeatherAlertsSkeleton() {
  return (
    <>  
      <div className="flex space-x-2 items-center w-full">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-54" />
      </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-36" />
      </div>  
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
    </>
  );
}
