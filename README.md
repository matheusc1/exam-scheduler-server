# exam-scheduler 📅

Esta API foi desenvolvida para gerenciar o agendamento de avaliações dos cursos a distância (EAD) da [UNIFAA](https://www.unifaa.edu.br/). A aplicação oferece uma série de funcionalidades para diferentes tipos de usuários, permitindo uma gestão eficiente e segura.

### Funcionalidades principais

- **Controle de acesso por roles**: A aplicação permite a definição de permissões para diferentes tipos de usuários, incluindo estudantes, coordenadores e administradores, garantindo que cada um tenha acesso apenas às funcionalidades pertinentes ao seu papel.
- **Autenticação de Usuários**: Usuários podem fazer login utilizando suas credenciais, com segurança e validação robusta.
- **Agendamento de Avaliações**: Os usuários podem agendar avaliações para cursos específicos, com a possibilidade de definir datas, horários e outros parâmetros relacionados ao exame.
- **Consulta de Avaliações Agendadas**: Tanto estudantes quanto coordenadores podem consultar as avaliações agendadas, verificando detalhes como data, horário e status do agendamento.
- **Gestão administrativa**: Os administradores possuem permissões para gerenciar toda a aplicação, incluindo a criação de usuários, atribuição de roles e outras configurações importantes para a operação do sistema.

### Rotas 🔀

A seção de rotas fornece todos os endpoints disponíveis na API para interagir com os recursos. Para acessar as rotas da aplicação, consulte a documentação detalhada de todos os endpoints da API aqui: [Documentação das Rotas - Postman](https://documenter.getpostman.com/view/31836170/2sAY545doe#6389d384-681e-444a-959f-bafc3ad03f80)

## Tecnologias utilizadas 💻

- [Typescript](https://www.typescriptlang.org/): Linguagem que adiciona tipagem estática ao JavaScript, oferecendo maior segurança e previsibilidade no código.
- [Node.js](https://nodejs.org/en): Plataforma para execução de código no servidor.
- [Fastify](https://fastify.dev/): Framework web rápido e leve para construção da API.
- [Drizzle ORM](https://orm.drizzle.team/): ORM moderno e leve para interação com bancos de dados SQL.
- [PostgreSQL](https://www.postgresql.org/): Banco de dados relacional open-source, robusto e confiável, ideal para cargas de trabalho complexas.
- [neon.tech](https://neon.tech/): Plataforma em nuvem para PostgreSQL, com escalabilidade automática e recursos otimizados para desenvolvedores.
- [Zod](https://zod.dev/): Biblioteca de validação de esquemas para TypeScript/JavaScript, que permite validar, parsear e tipar dados de maneira segura e concisa.
- [argon2](https://github.com/ranisalt/node-argon2): Algoritmo de hash seguro para criptografar senhas.
- [Day.js](https://day.js.org/): Biblioteca JavaScript leve e eficiente para manipulação de datas.

## Instalação 🛠️

### Pré requisitos
- Node instalado (versão recomendada LTS)
- Banco de dados PostgreSQL (é possível utilizar o neon.tech para testar a aplicação, basta criar uma conta gratuita)

### Passo a passo
1. Clone o repositório e acesse a pasta do projeto:

```sh
git clone https://github.com/matheusc1/exam-scheduler-server
cd exam-scheduler-server
```
2. Crie um arquivo `.env` e siga as instruções em `.env.example`.

```sh
DATABASE_URL=""
JWT_SECRET=""
```

3. Crie as tabelas no banco de dados caso esteja usando neon.tech, se estiver utilizando outro serviço de banco de dados configurações adicionais são necessárias:

```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

4. Gere os usuários administrador e coordenador, caso queira alterar as credencias acesse `src/db/create-users`

```sh
npm run create-users
```

5. Inicie o servidor

```sh
npm install
```

6. Acesse o repositório do front-end da aplicação: [instalação front-end](https://github.com/matheusc1/unifaa-exam-scheduler)  

- Estes passos permitirão que você tenha tanto a API quanto o front-end em funcionamento, proporcionando uma experiência completa na utilização da aplicação de agendamento de avaliações.

## License 🧾
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
