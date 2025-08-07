'use client'
import { UserNameAndLastName } from '@/interfaces/users/users';
import Link from 'next/link';

interface Props {
  values: UserNameAndLastName;
}

export const QRGenerate = ({ values }: Props) => {

  return (
    <td
      className="border border-gray-300 p-2"
    >
      <Link href={{
        pathname: '/GenerateQR',
        query: { username: values.username, lastname: values.lastname }
      }}>
        <button
          className="border border-gray-300 text-black bg-slate-200 px-2 py-1 rounded-md"
        >
          QR
        </button>
      </Link>
    </td>
  )
}

