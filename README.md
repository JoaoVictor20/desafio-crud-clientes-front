
Sobre o projeto (Resumido):

O projeto consiste em um sistema de crud de clientes. Para alguém realizar quaisquer operação no sistema, precisa possuir um Login e Senha ,tendo um tempo limite de acesso de 2 horas, onde após isso o seu token irá expirar e o mesmo precisará realizar o Login novamente. O sistema possui comunicação com uma API Java Spring externa, disponível em https://github.com/JoaoVictor20/desafio-crud-clientes-api.git.


Sobre o projeto (Detalhamento):

Após baixar as depências necessárias e executar o projeto. [http://localhost:3000](http://localhost:3000) É a página Home do projeto, ela é responsável por direcionar para [http://localhost:3000/login](http://localhost:3000/login) , onde será necessário se identificar com um Login e Senha, se as credênciais estiverem corretas a API retorna um Token de acesso e o Id do usuário logado. O Token será utilizado em todas as outras operações na tela [http://localhost:3000/clientes](http://localhost:3000/clientes) para fazer todas as operações que o sistema precisa, tais como listagem de clientes, inserção de novos clientes, atualização de clientes e deleção dos mesmos. Caso o token venha a expirar, o usuário será redirecinado para a tela de login na sua próxima requisição, desta forma não permitindo que o mesmo realize operações sem ter acesso.

Depêndencias do projeto:

"dependencies": {
    "@types/node": "20.4.1",
    "@types/react-dom": "18.2.6",
    "autoprefixer": "10.4.14",
    "axios": "^1.4.0",
    "eslint": "8.44.0",
    "eslint-config-next": "13.4.9",
    "js-cookie": "^3.0.5",
    "next": "13.4.9",
    "postcss": "8.4.25",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "^6.14.1",
    "tailwindcss": "3.3.2",
    "typescript": "5.1.6"
  },
  "devDependencies": {
    "@types/js-cookie": "^3.0.3",
    "@types/next": "^9.0.0",
    "@types/react": "^18.2.14"
  }
