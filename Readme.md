# App

App Campeonato de futevolei.

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de campeonatos pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de campeonatos;
- [ ] Deve ser possível o usuário buscar campeonatos próximos;
- [ ] Deve ser possível o usuário buscar campeonatos pelo nome;
- [ ] Deve ser possível o usuário realizar inscrição em um campeonato;
- [ ] Deve ser possível validar a inscrição de um usuário;
- [ ] Deve ser possível cadastrar um novo campeonato;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer check-in se não estiver perto (10km) do campeonato;
- [ ] O check-in só pode ser validado até 2 dias após criado;
- [ ] O check-in só pode ser validado pelo organizador do campeonato;
- [ ] O campeonato só pode ser cadastrado por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);