import { AlertCircleIcon, Megaphone, Sparkles } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { WeatherAlertsSkeleton } from "./weather-alerts-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AiInsights() {
  const { data, isLoading } = useQuery<{
    tendencias: string[];
    alertas: string[];
    recomendacoes: string[];
  }>({
    queryKey: ["insights"],
    queryFn: async () =>
      await api.get("weather/insights").then((res) => {
        console.log(res.data)
        return res.data
      }),
      refetchInterval: 60 * 1000 * 60 * 12,
      staleTime: 60 * 1000 * 60 * 12,
  });

  return (
    <main className="flex flex-1 flex-col justify-around w-full h-full px-4 md:px-8 gap-4">
      <div className="flex gap-2 flex-col sm:flex-row mb-8 w-full justify-around">
        <div className="flex gap-2 items-center ">
          <Sparkles />
          <strong className="text-md md:text-xl">AI Insights</strong>
        </div>
       
        <p className="text-sm text-gray-400">Alertas e dicas gerados por inteligência artificial.</p>
  
      </div>
    
      {isLoading ? (
        <WeatherAlertsSkeleton />
      ) : (
        <>
          <Alert variant="destructive" className=" bg-black/20">
            <AlertCircleIcon />
            <AlertTitle className="text-gray-200">Alertas Metereológicos.</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc text-sm text-gray-200">
                <li>{data?.tendencias[0]}</li>
                <li>{data?.alertas[0]}</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert className="bg-translucent border-0">
            <Megaphone />
            <AlertTitle>Dica do dia</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc text-sm">
                <li>{data?.recomendacoes[0]}</li>
              </ul>
            </AlertDescription>
          </Alert>
        </>
      )}
    </main>
  );
}
