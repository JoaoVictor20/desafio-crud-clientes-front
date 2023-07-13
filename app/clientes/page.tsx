"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface Client {
  id: number | null;
  nome: string | null;
  telefone: string | null;
  cpf: string | null;
  dataDeNascimento: string | null;
  cnpj: string | null;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  idUsuario: number | null
}

const ClientCRUD = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkZXNhZmlvIiwic3ViIjoiSk9BTyIsImV4cCI6MTY4OTI5MTcyNn0.Uo49SnvUqaT8ShqcT0sLAWWoadRfVreSWQTiJaUJgrk';

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const response = await fetch('http://localhost:8080/cliente/buscar-clientes/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClients(data);
        setLoading(false);
        setError('');
      } else if (response.status === 403) {
        setError('Usuário ou senha inválidos');
        setLoading(false);
      } else {
        setError('Erro ao obter os clientes');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao obter os clientes:', error);
      setError('Erro ao obter os clientes');
      setLoading(false);
    }
  };

  const createClient = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newClient: Client = {
        id: null,
        nome,
        telefone,
        cpf,
        dataDeNascimento,
        cnpj,
        razaoSocial,
        nomeFantasia,
        idUsuario: 1,
      };

      await fetch('http://localhost:8080/cliente/cadastrar-cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newClient),
      });

      resetForm();
      getClients();
    } catch (error) {
      console.error('Erro ao criar o cliente:', error);
      setError('Erro ao criar o cliente');
    }
  };

  const updateClient = async (updatedClient: Client) => {
    try {
      await fetch(`http://localhost:8080/cliente/alterar-cliente`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedClient),
      });

      getClients();
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error);
      setError('Erro ao atualizar o cliente');
    }
  };

  const deleteClient = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/cliente/deletar-cliente/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      getClients();
    } catch (error) {
      console.error('Erro ao deletar o cliente:', error);
      setError('Erro ao deletar o cliente');
    }
  };

  const resetForm = () => {
    setId('');
    setNome('');
    setTelefone('');
    setCpf('');
    setDataDeNascimento('');
    setCnpj('');
    setRazaoSocial('');
    setNomeFantasia('');
    setIdUsuario('');
  };

  return (
    <div className="container">
      <h1>Clientes</h1>

      <form onSubmit={createClient} className="form">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="nome">Nome:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="nome"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="telefone">Telefone:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="telefone"
                  placeholder="Digite o telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="cpf">CPF:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="cpf"
                  placeholder="Digite o CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dataNascimento"
                  placeholder="Digite a data de nascimento"
                  value={dataDeNascimento}
                  onChange={(e) => setDataDeNascimento(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="cnpj">CNPJ:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="cnpj"
                  placeholder="Digite o CNPJ"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="razaoSocial">Razão Social:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="razaoSocial"
                  placeholder="Digite a razão social"
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="nomeFantasia">Nome Fantasia:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="nomeFantasia"
                  placeholder="Digite o nome fantasia"
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="btn">Adicionar</button>
      </form>

      {
        loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error">Erro: {error}</p>
        ) : (
          <ul className="client-list">
            {clients.map((client) => (
              <li key={client.id} className="client-item">
                <div className="grid-container">
                  <span className="client-id grid-item">{client.id}</span>
                  <span className="client-name grid-item">{client.nome}</span>
                  <span className="client-cpf grid-item">({client.cpf})</span>
                  <button onClick={() => updateClient(client)} className="btn grid-item">Editar</button>
                  <button onClick={() => deleteClient(client.id!)} className="btn grid-item">Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )
      }

      <style jsx>{`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: #f4f4f4;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    .form {
      display: flex;
      flex-direction: column;
      max-width: 400px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 10px;
    }

    label {
      font-weight: bold;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-top: 5px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 3px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
    }

    p {
      margin: 0;
      word-break: break-all;
      text-align: center;
      color: red;
    }

    .error {
      color: red;
    }

    .client-list {
      list-style: none;
      padding: 0;
    }

    .client-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .client-item .client-id {
      margin-right: 10px;
      font-weight: bold;
    }

    .client-item .client-cpf {
      margin-left: 10px;
      font-style: italic;
    }
  `}</style>
    </div>

  );
};

export default ClientCRUD;
