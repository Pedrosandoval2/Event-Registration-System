'use client'

import { QrScanner } from "@/components/generateQR/QrScanner";
import { API_DATA } from "@/components/shared/apiGlobal";
import { useGetDataForApi } from "@/hooks/useGetDataForApi";
import { useEffect, useState } from "react";

export default function NamePage() {
    const [scannedResult, setScannedResult] = useState('');
    const { items, fetchData, isLoading } = useGetDataForApi();

    // Evitar múltiples peticiones con el mismo valor
    useEffect(() => {
        if (scannedResult) {
            fetchData(`${API_DATA}/users`, scannedResult);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scannedResult]);

    // Evitar escaneo repetido con el mismo valor
    const onNewScanResult = (decodedText: string, result: any) => {
        setScannedResult(decodedText);
    };

    const renderResult = () => {
        return (
            <div>
                {items && items.length > 0 && !isLoading ? (
                    <div className="text-black text-center space-y-2">
                        <h2 className="text-xl font-bold">Resultado Escaneado:</h2>
                        {items.map((item) => (
                            <div key={item.id} className="bg-zinc-800 p-4 rounded shadow">
                                <p><strong>Nombre:</strong> {item.username} {item.lastname}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Registrado:</strong> {new Date(item.createdAT).toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-black text-center">Usuario no registrado</div>
                )}
            </div>
        )
    };

    return (
        <div className="min-h-screen bg-white py-10 text-black">
            <h1 className="text-2xl font-bold text-center text-white mb-6">Escanear QR</h1>

            {isLoading && (
                <div className="text-center text-white">Cargando...</div>
            )}


            <div className="flex justify-center items-center h-[60vh]">
                <QrScanner
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    verbose={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </div>

            <div className="flex flex-col items-center space-y-4">
                {renderResult()}
            </div>

        </div>
    );
}
