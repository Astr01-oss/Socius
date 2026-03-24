import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api";

function UsersList(){
  const [users, setUsers] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() =>{
    fetchUsers()
    .then(data => setUsers(data))
    .catch(err => setError(err.message))
  }, [])

  if (error) console.log('Ошибка')
  
  return(
    <div>
      {users.map(user =>(
        <div key={user.id}>{user.name}</div>
      ))

      }
    </div>
  )
}

export default UsersList