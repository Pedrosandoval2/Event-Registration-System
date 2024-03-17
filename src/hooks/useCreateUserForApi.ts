import { API_DATA } from "@/components/shared/apiGlobal"

export const useCreateUserForApi = () => {

    const addUsers = async (user:any) => {
        try {
          const resp = await fetch(`${API_DATA}`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          });
          const data = await resp.json();
        } catch (err) {
          console.log(err);
        }
      }
      return {
        addUsers
      }
}
