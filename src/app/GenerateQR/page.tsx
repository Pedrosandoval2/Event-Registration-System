import { GenerateQR } from "@/components/generateQR/GenerateQR";

export default function NamePage() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="font-semibold text-5xl mb-10">QR GENERADO</h1>
      <div>
      <GenerateQR />
      </div>
    </div>
  );
}