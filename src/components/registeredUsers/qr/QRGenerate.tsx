'use client'
import { addGenerateQRStore } from '@/store/addUsersGenerateQR';
import Link from 'next/link';
export const QRGenerate = ({values}: any) => {

  const { addValueBtnQR} = addGenerateQRStore()

  const tryss = () =>{
    addValueBtnQR(values)
  }
  
  return (
    <td className="border border-gray-300 p-2"><Link href="/GenerateQR"><button onClick={tryss} className="border border-gray-300 text-black bg-slate-200 px-2 py-1 rounded-md">QR</button></Link></td>
  )
}

