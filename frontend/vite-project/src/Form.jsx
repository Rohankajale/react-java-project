import React from "react"
import { useState, useEffect, useRef } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function Form() {

    const [users, setUsers] = useState([])
    // const [showTable, setShowTable] = useState(false)
    const [firstName, setFirstName] = useState("John")
    const [lastName, setLastName] = useState("Doe")
    const [editing, setEditing] = useState(false)
    const [editingID, setEditingID] = useState()

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [users])

    // const toast = useRef(null)

    function handleSubmit() {
        fetch('http://localhost:8080/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({firstName, lastName})
        })
        // function toaster () {
            // toast.current.show({severity: 'info', summary: 'info', detail: 'Submitted'})
        // }
    }   

    function handleDelete(rowData) {
        // console.log(rowData)
        const id = rowData.id
        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
        })
    }

    // const handleEditing = (users) => {
    //     setUsers({...users})
    //     setEditing(true)
    // }

    function hideDialog() {
        setEditing(false)
    }
    
    function handleEdit(rowData) {
        setEditing(true)
        // console.log(rowData)
        const id = rowData.id
        const firstName = rowData.firstName
        const lastName = rowData.lastName

        setEditingID(id)
        setFirstName(firstName)
        setLastName(lastName)
    }

    function handleSave(editingID) {
        // console.log(rowData)
        const id = editingID
        console.log(id)
        // const firstName = rowData.firstName
        // const lastName = rowData.lastName

        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id, firstName, lastName})
        })
        setEditing(false)
    }

    // function userFooterDialog(rowData) {
    //     return (
    //         <>
    //             <Button onClick={hideDialog} label="Cancel" />
    //             {/* <Button onClick={() => handleEdit(rowData)} label="Save" /> */}
    //         </>
    //     )
    // }

    const actionBodyTemplate = (rowData) => {
        // console.log(users.id)
        // console.log(rowData.id)

        return (
            <>
                {/* {editing 
                    ? <Button label="Edit" />
                    : <Button label="Done" />
                } */}
                <Button onClick={() => handleEdit(rowData)} label="Edit" />
                <Button onClick={() => handleDelete(rowData)} severity="danger" label="Delete" />
            </>
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input value={lastName} onChange={e => setLastName(e.target.value)} />
                {/* <div> */}
                {/* <Toast ref={toast}/> */}
                <Button type="submit" label="Submit" />
                {/* </div> */}
                    {/* <Button onClick={toaster} label="World!!"/>
                </div> */}
            </form>
            
            <DataTable value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20]} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="id" sortable></Column>
                <Column field="firstName" header="firstname"></Column>
                <Column field="lastName" header="lastname"></Column>
                <Column header="action" body={actionBodyTemplate}></Column>
                {/* <Column field="email" header="email"></Column> */}
            </DataTable>

            <Dialog header="edit users" visible={editing} onHide={hideDialog} >
                <input value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input value={lastName} onChange={e => setLastName(e.target.value)} />
                <button onClick={() => handleSave(editingID)}>Save</button>
                <button onClick={hideDialog}>Cancel</button>
            </Dialog>
            {/* <ul>
                {users.map(user => (
                    <li key={user.id}>{user.firstName}</li>
                ))}
            </ul> */}
        </>
    )
}