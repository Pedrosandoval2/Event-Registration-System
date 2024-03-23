'use client'
import { addGenerateQRStore } from '@/store/addUsersGenerateQR';
import { useState, useEffect } from 'react';
export const GenerateQR = () => {

    const { user } = addGenerateQRStore();
    console.log("🚀 ~ GenerateQR ~ user:", user)
    const [saveQr, setSaveQr] = useState();

    const getImageQR = async () => {
        const resp = await fetch(`http://localhost:3001/qr-codes?data=${user}`);
        const data = await resp.json();
        setSaveQr(data.QrGenerated)
    };

    useEffect(() => {
        getImageQR();
    }, []);

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img className='w-80' src={saveQr} alt="GeneratedQR" />
    );
};
