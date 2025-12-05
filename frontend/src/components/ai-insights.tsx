import { AlertCircleIcon, Megaphone, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { WeatherAlertsSkeleton } from "./weather-alerts-skeleton";

export function AiInsights() {
  const { data, isLoading } = useQuery<{
    tendencias: string[];
    alertas: string[];
    recomendacoes: string[];
  }>({
    queryKey: ["insights"],
    queryFn: async () =>
      await api.get("weather/insights").then((res) => res.data),
  });

  return (
    <main className="flex flex-col w-full max-w-[50%] h-full px-8 gap-4">
      <div className="flex gap-2 mb-8 w-full justify-between">
        <div className="flex gap-2 items-center ">
          <Sparkles />
          <strong>AI Insights</strong>
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
