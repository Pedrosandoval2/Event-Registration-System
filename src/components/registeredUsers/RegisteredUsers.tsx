'use client'

import { useEffect, useState } from "react";
import { useGetDataForApi } from "../../hooks/useGetDataForApi";
import { QRGenerate } from "./qr/QRGenerate";
import { API_DATA } from "../shared/apiGlobal";
import { SearchUsers } from '../searchUsersRegistered/SearchUsers';
import { useDebounce } from "@/hooks/useDebounce";
import { UserNameAndLastName } from "@/interfaces/users/users";

export default function RegisteredUsers() {
  const { items, isLoading, fetchData } = useGetDataForApi();
  const [searchUsers, setSearchUsers] = useState('');
  const debouncedSearchTerm = useDebounce(searchUsers, 500);

  useEffect(() => {
    fetchData(`${API_DATA}/users`, debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  return (
    <div>
      <SearchUsers searchUsers={searchUsers} setSearchUsers={setSearchUsers} />
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
            {items.length > 0
              ? items.map((item, i) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2">{i + 1}</td>
                  <td className="border border-gray-300 p-2">{item.username} {item.lastname}</td>
                  <td className="border border-gray-300 p-2">{item.email}</td>
                  <td className="border border-gray-300 p-2">{new Date(item.createdAT).toLocaleString('es-PE', { timeZone: 'America/Lima' })}</td>
                  <QRGenerate values={{ username: item.username, lastname: item.lastname } as UserNameAndLastName} />
                </tr>
              ))
              : isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">Loading...</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4">No registered users found</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
