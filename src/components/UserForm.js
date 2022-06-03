import Button from './Button'
import Input from './Input'
import { useState } from 'react'

const UserForms = () =>{
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [message, setMessage] = useState("");
    const handleChange = async (e) =>{
        e.preventDefault()
        try{
            let res = await fetch('http://localhost:5000/createUser',
            {
                method: "POST",
                body:JSON.stringify({
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
                alert("Usuario Creado pulsa actualizar tabla para ver reflejados los cambios")
            } else {
                setMessage("Some error occured");
            }
            
        }catch(err){
            console.log(err)
        }
    }
    return(
        <form onSubmit={handleChange}>
            <Input label="Nombre" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <Input label="LastName" name="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <Button>Enviar</Button>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    )
}

export default UserForms