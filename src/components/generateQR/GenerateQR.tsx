'use client'

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
export const GenerateQR = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const userName = searchParams.get('username');
    const userLastName = searchParams.get('lastname');

    const [saveQr, setSaveQr] = useState();

    const getImageQR = async () => {
        setIsLoading(true);
        try {
            const resp = await fetch(`http://localhost:3001/qr-codes?data=${userName + ' ' + userLastName}`);
            const data = await resp.json();
            setSaveQr(data.QrGenerated)
        } catch (error) {
            console.error('Error fetching QR code:', error);
            throw new Error('Failed to fetch QR code');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getImageQR();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {isLoading
                ? <p className="text-center mt-10">Loading QR Code...</p>
                // eslint-disable-next-line @next/next/no-img-element
                : <img src={saveQr} alt="QR Code" className="mx-auto mt-10 w-[400px] h-[400px]" />}
        </div>
    );
};
