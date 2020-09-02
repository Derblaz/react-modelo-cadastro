import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

interface Item {
    id: number,
    name: string,
    cpf: string,
    motherName: string,
    fatherName: string
}

const Register = () => {
    const [formData, setFormData] = useState<Item>({
        id: 0,
        name: '',
        cpf: '',
        motherName: '',
        fatherName: ''
    })

    const [list, setList] = useState<Item[]>([])

    const [updateStatus, setUpdateStatus ] = useState<boolean>(false)

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        axios.get('http://localhost:8080/register/list').then(response => {
            setList(response.data)
        })
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value } = event.target
    setFormData({...formData, [name]: value})
    }

    function handleDeleteRegister(id: number){
        axios.delete(`http://localhost:8080/register/${id}`)
        .then(() => {
            getList()
        })
    }

    function handleSelectedRegister(id: number){
        const register = list.find(item => item.id === id)
        if(register){
            setFormData(register)
        }
        setUpdateStatus(true)
    }

    function handleClear(){
        setFormData({
            id: 0,
            name: '',
            cpf: '',
            motherName: '',
            fatherName: ''
        })
        setUpdateStatus(false)
    }

    function create(){
        axios.post('http://localhost:8080/register', formData)
        .then(response => {
            getList()
            alert(response.data)
        }).catch(() => {
            alert("Não foi possivel realizar o cadastro")
        })
    }

    function update(){
        axios.put('http://localhost:8080/register',formData)
        .then(response => {
            getList()
            alert(response.data)
        })
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault()
        updateStatus ? update() : create()
    }

    return(
    <body> 
        <div id="header">
            <span>
                <Link to="/" id="back">
                    voltar
                </Link>
            </span>
        </div>
        <div id="row">
            <div className="list">
                <h2>Cadastrados</h2>
                <ul>
                    {list.map( item => (
                        <li key={item.id} >
                            <a href="#" id="btnUpdate" onClick={() => handleSelectedRegister(item.id)}>{item.name}</a>
                            <a href="#" id="btnDelete" onClick={() => handleDeleteRegister(item.id)}>deletar</a>
                        </li>
                    ))}
                </ul>

            </div>
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Formulário</h2>
                <div className="field">
                    <label>Nome</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}/>
                </div>

                <div className="field">
                    <label>CPF</label>
                    <input type="text" name="cpf" id="cpf" value={formData.cpf} onChange={handleInputChange}/>
                </div>

                <div className="field">
                    <label>Nome da mãe</label>
                    <input type="text" name="motherName" id="motherName" value={formData.motherName} onChange={handleInputChange}/>
                </div>

                <div className="field">
                    <label>Nome da pai</label>
                    <input type="text" name="fatherName" id="fatherName" value={formData.fatherName} onChange={handleInputChange}/>
                </div>

                    <button id="submit" type="submit">{updateStatus ? "Atualizar": "Cadastrar"}</button>
                <button type="button" onClick={handleClear}>Limpar campos</button>
            </form>
        </div>
    </body>
    )
}

export default Register;