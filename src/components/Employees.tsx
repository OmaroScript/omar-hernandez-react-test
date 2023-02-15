import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Components.css'
import moment from 'moment';
import Upload from './Upload';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { Navigate } from 'react-router-dom';

interface Employee {
  id: number;
  name: string;
  last_name: string;
  birthday: String;
}

interface FormData {
  name: string;
  last_name: string;
  birthday: string;
}

const Employess: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const navigate = useNavigate()
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    last_name: "",
    birthday: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get<Employee[]>('https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:omar');
      setEmployees(response.data.data.employees);
    }
    
    fetchData();
  }, []);
  
  const emptyEmployees = Object.values(employees).length === 0;

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const filteredEmployees = currentEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:omar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.last_name,
            last_name: formData.name,
            birthday: formData.birthday,
          }),
        }
      );
      // Actualizar la tabla con los datos del servidor
      // Limpiar el formulario
      setFormData({
        name: "",
        last_name: "",
        birthday: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getDate = (date: String) => {
    const fecha = moment(date).format('YYYY/MM/DD')
    return fecha.toString()
  }

  return (
    <div>
      {/* <header>
        <Link to="/">Login</Link>
        <Link to="/employees">Empleados</Link>
        <Link to="/upload">Imagenes</Link>
      </header> */}
      <div>
        <input className='buscador' type="text" placeholder="Buscar" onChange={handleSearch} />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cumpleaños</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.last_name}</td>
                <td>{employee.name}</td>
                <td>{getDate(employee.birthday)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='tableButtons'>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Anterior
          </button>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Siguiente
          </button>
        </div>
      </div>
      <div>
        <form style={{marginTop: '5rem'}} onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={30}
              style={{marginLeft: '1rem'}}
            />
          </label>
          <br />
          <label>
            Apellidos:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              maxLength={30}
              style={{marginLeft: '.6rem'}}
            />
          </label>
          <br />
          <label>
            <p style={{marginBottom: '.2rem'}}>Fecha de nacimiento:</p>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button  onClick={() => navigate('/employees')} style={{marginTop: '1rem'}} type="submit">Enviar</button>
        </form>
      </div>
      <div>
        {/* <Upload/> */}
      </div>
    </div>
  );
};

export default Employess;
