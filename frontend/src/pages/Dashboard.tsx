import { Header } from "../components/header";

export function Dashboard() {
  return (
    <div className="h-sreen w-full">
      <Header />
      <main className='mt-32 h-[calc(100vh-130px)] rounded-2xl p-8'>
        <div className='h-full w-full flex flex-col gap-8'>
          <div className="flex min-h-[40%] min-w-full gap-8">
            <div className='flex items-center justify-center bg-[#1A1D23] w-[30%] rounded-2xl'>
              Juiz de Fora
            </div>

            <div className="flex flex-1 bg-[#1A1D23] rounded-2xl items-center justify-center">seg</div>
            <div className="flex flex-1 bg-[#1A1D23] rounded-2xl items-center justify-center">ter</div>
            <div className="flex flex-1 bg-[#1A1D23] rounded-2xl items-center justify-center">qua</div>
            <div className="flex flex-1 bg-[#1A1D23] rounded-2xl items-center justify-center">qui</div>
            <div className="flex flex-1 bg-[#1A1D23] rounded-2xl items-center justify-center">sex</div>
          </div>
          <div className='flex items-center justify-center h-full bg-[#1A1D23]  w-full rounded-2xl'>
            Juiz de Fora
          </div>
        </div>
      </main>
    </div>
  );
}