"use client";
import { useRouter } from 'next/navigation';

import { useState, FormEvent } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/autorizacao/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha }),
      });

      if (response.ok) {
        const { token, idUsuario } = await response.json();
        setToken(token);
        setIdUsuario(idUsuario);
        setError('');
        Cookies.set('token', token);
        Cookies.set('idUsuario', idUsuario);
        router.push('/clientes')
        e.preventDefault();
      } else if (response.status === 403) {
        setToken('');
        setIdUsuario('');
        setError('Usuário ou senha inválidos');
      }
    } catch (error) {
      setToken('');
      setIdUsuario('');
      console.error('Erro desconhecido ao realizar login', error);
      setError('Erro desconhecido ao realizar login');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: #f4f4f4;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: bold;
          margin-bottom: 5px;
        }

        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 3px;
          margin-bottom: 10px;
        }

        button {
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

        h2 {
          font-size: 18px;
          margin-bottom: 10px;
          text-align: center;
        }

        p {
          margin: 0;
          word-break: break-all;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Login;
