import RegisteredUsers from '../registeredUsers/RegisteredUsers';
export const Section = () => {
  return (
    <div className='grid grid-cols-3 cell-phone:grid-cols-1 mx-2 text-center mt-20'>
    <RegisteredUsers />
    </div>
  )
}
