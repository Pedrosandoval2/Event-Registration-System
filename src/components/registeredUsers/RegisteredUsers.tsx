'use client'
import { useGetDataForApi } from "../../hooks/useGetDataForApi";
import { QRGenerate } from "./qr/QRGenerate";

export default function RegisteredUsers() {

  const { items } = useGetDataForApi()

  return (
    <div>
      <div className="container mx-auto p-4 ">
        <table className="w-full table-auto border border-gray-300 ">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-300 p-2">Nº</th>
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Registration time</th>
              <th className="border border-gray-300 p-2">Generate QR</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{i + 1}</td>
                <td className="border border-gray-300 p-2">{item.username} {item.lastname}</td>
                <td className="border border-gray-300 p-2">{item.email}</td>
                <td className="border border-gray-300 p-2">{new Date(item.createdAT).toLocaleString('es-PE', { timeZone: 'America/Lima' })}</td>
                <QRGenerate values={item} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
