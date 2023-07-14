"use client";

import { useRouter } from 'next/navigation';
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
  idUsuario: number | null;
  dataCadastro: string | null;
}

const ClientCRUD = () => {

  const router = useRouter();
  const [clientes, setClients] = useState<Client[]>([]);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');

  var idUsuarioInteiro = 0;
  const idUsuarioCookie = Cookies.get("idUsuario");
  if (idUsuarioCookie !== undefined) {
    idUsuarioInteiro = parseInt(idUsuarioCookie);
  }
  var token = Cookies.get('token');

  useEffect(() => {
    buscarClientes();
  }, []);

  const buscarClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/cliente/buscar-clientes/' + idUsuarioInteiro, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setError('');
        setClients(data);
      }
      else if (response.status === 403) {
        idUsuarioInteiro = 0;
        token = '';
        router.push('/login')
      }
    } catch (error) {
      setError('Erro ao listar clientes. Verifique se a API está funcionando corretamente.');
    }
  };

  const salvarCliente = async (e: React.FormEvent) => {
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
        idUsuario: idUsuarioInteiro,
        dataCadastro: null,
      };

      const response = await fetch('http://localhost:8080/cliente/cadastrar-cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        limparFormulario();
        buscarClientes();
      }
      else if (response.status === 500) {
        setError('Erro ao cadastrar cliente. Verifique se todos os campos obrigatórios estão preenchidos corretamente.');
      }
      else if (response.status === 403) {
        idUsuarioInteiro = 0;
        token = '';
        router.push('/login')
      }
    } catch (error) {
      setError('Erro desconhecido, verifique se a API está funcionando corretamente.');
    }
  };

  const atualizarCliente = async (id: number) => {

    const newClient: Client = {
      id: id,
      nome,
      telefone,
      cpf,
      dataDeNascimento,
      cnpj,
      razaoSocial,
      nomeFantasia,
      idUsuario: idUsuarioInteiro,
      dataCadastro: null,
    };

    try {
      const response = await fetch(`http://localhost:8080/cliente/alterar-cliente`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        limparFormulario();
        buscarClientes();
      }
      else if (response.status === 500) {
        setError('Erro ao atualizar cliente. Verifique se todos os campos obrigatórios estão preenchidos corretamente.');
      }
      else if (response.status === 403) {
        idUsuarioInteiro = 0;
        token = '';
        router.push('/login')
      }
    } catch (error) {
      setError('Erro desconhecido, verifique se a API está funcionando corretamente.');
    }
  };

  const deletarCliente = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/cliente/deletar-cliente/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        buscarClientes();
      }
      else if (response.status === 500) {
        setError('Erro ao deletar cliente.');
      }
      else if (response.status === 403) {
        idUsuarioInteiro = 0;
        token = '';
        router.push('/login')
      }
    } catch (error) {
      setError('Erro desconhecido, verifique se a API está funcionando corretamente.');
    }
  };

  const limparFormulario = () => {
    setId('');
    setNome('');
    setTelefone('');
    setCpf('');
    setDataDeNascimento('');
    setCnpj('');
    setRazaoSocial('');
    setNomeFantasia('');
    setDataCadastro('');
  };

  return (
    <div className="container">
      <h1>Clientes</h1>
      <form onSubmit={salvarCliente} className="form">
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
        <span className="error">{error}</span>
      </form>

      {
        (
          <ul className="client-list">
            {clientes.map((client) => (
              <li key={client.id} className="client-item">
                <div className="grid-container">

                  <span className="client-id grid-item">ID:</span>
                  <span className="description">{client.id}</span>
                  <br></br>

                  <span className="client-id grid-item"> Data Cadastro:</span>
                  <span className="description">{client.dataCadastro}</span>
                  <br></br>

                  <span className="client-id grid-item"> Nome/Razão Social: </span>
                  <span className="description">{client.nome}</span>
                  <span className="description">{client.razaoSocial} </span>
                  <br></br>

                  <span className="client-id grid-item"> Cpf/Cnpj:</span>
                  <span className="description">{client.cpf}</span>
                  <span className="description">{client.cnpj}</span>
                  <br></br>

                  <span className="client-id grid-item"> Telefone:</span>
                  <span className="description">{client.telefone}</span>
                  <br></br>

                  <button onClick={() => atualizarCliente(client.id!)} className="btn grid-item">Editar</button>
                  <span className="description"> </span>
                  <button onClick={() => deletarCliente(client.id!)} className="btn error">Excluir</button>
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
