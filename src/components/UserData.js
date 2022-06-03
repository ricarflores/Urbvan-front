import {useState, useEffect} from 'react'
import Button from './Button'
import Input from './Input'
import './UserData.css'


const UserData = () =>{
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [refreshData, setRefreshData] = useState(true);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [userData, setUserData] = useState({})

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [message, setMessage] = useState("");

    const getData = async () =>{
        try{
            const response = await fetch('http://localhost:5000/getUsers?page=1&limit=10')
            let responseJson = await response.json();
            console.log(response)
            if(response.status === 200)
            {
                setIsLoaded(true)
                setItems(responseJson.data)
            }else{
                setIsLoaded(true)
                setError("NetWork error")
            }
           
        }catch(err){
            console.log(err)
            setIsLoaded(true)
            setError(err.toString())
        }
    }
    const deleteUser = async ({_id}) =>{
        try{
            let id = _id
            let response = await fetch(`http://localhost:5000/deleteUser?id=${id}`, { method: 'DELETE' })
            let responseJson = await response.json();
            if(responseJson.sucess)
            {
                alert("Usuario Eliminado")
            }
            else{
                alert("Ocurrio un error eliminando el usuario")
            }
            setRefreshData(!refreshData)
        }catch(err){
            console.log(err)
            setIsLoaded(true)
            setError(err.toString())
        }
    }
    const visibleUpdate= (user) => {
        setUserData(user)
        setName(user.name)
        setLastName(user.last_name)
        setUpdateVisible(!updateVisible)
    }
    const updateUser = async (e) =>{
        try{
            e.preventDefault()
            try{
                let res = await fetch('http://localhost:5000/modifyUser',
                {
                    method: "PATCH",
                    body:JSON.stringify({
                        "id": userData._id,
                        "name": name,
                        "last_name": lastName
                    }),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                if(res.status === 200){
                    setName("");
                    setLastName("");
                } else {
                    setMessage("Some error occured");
                }
                setUpdateVisible(!updateVisible)
                setRefreshData(!refreshData)
            }catch(err){
                console.log(err.toString())
            }
        }catch(err){
            console.log(err.toString())
        }
    }
    useEffect(()=>{
        getData()
    },[refreshData])
    if(error){
        return <div>Error {error}</div>
    } else if (!isLoaded){
        return <div>Loading...</div>;
    }else{
        return(
            <div className='table'>
                {updateVisible 
                    ? 
                        <div>
                            <form onSubmit={updateUser}>
                                <Input label="Nombre" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                <Input label="LastName" name="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                                <Button>Actualizar Usuario</Button>
                                <div className="message">{message ? <p>{message}</p> : null}</div>
                            </form>
                        </div>
                    : 
                    null
                }
                <hr></hr>
                <table>
                    <thead>
                        <tr>
                            <th>Numero de Empleado</th>
                            <th>Nombre(s)</th>
                            <th>Apellidos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(user=>{
                            return(
                                <tr key={user._id}>
                                    <td>{user.uniqueId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.last_name}</td>
                                    <td>
                                        <button onClick={()=>{
                                            if(window.confirm(`Desea eliminar el usuario ${user.name}`)){
                                                deleteUser(user)
                                            }
                                        }}>Eliminar</button>
                                        <button onClick={()=>{
                                            visibleUpdate(user)
                                        }}>Editar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={() => setRefreshData(!refreshData)}>Actualizar Tabla</button>
            </div>
        )
    }
}

export default UserData