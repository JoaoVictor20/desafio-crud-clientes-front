"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/login');
  };

  return (
    <div className="container">
      <h1 className="title">Bem-vindo à Home</h1>
      <p className="description">Esta é a página inicial do meu site. Clique no botão para prosseguir para o login.</p>
      <div>
        <button onClick={handleNavigate}>Ir para login</button>
      </div>

      <style jsx>{`
      
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f4f4f4;
        }

        .title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }

        .description {
          font-size: 16px;
          color: #666;
          text-align: center;
        }

        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
}
