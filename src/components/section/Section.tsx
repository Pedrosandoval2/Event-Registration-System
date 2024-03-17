import RegisteredUsers from '../registeredUsers/RegisteredUsers';
import { SearchUsers } from '../searchUsersRegistered/SearchUsers';
export const Section = () => {
  return (
    <div>
      <div className=' mx-2 text-center mt-24'>
        <SearchUsers />
        <RegisteredUsers />
      </div>
    </div>

  )
}
