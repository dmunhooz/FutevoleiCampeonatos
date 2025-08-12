# App

App Campeonato de futevolei.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de campeonatos;
- [x] Deve ser possível o usuário buscar campeonatos pela cidade;
- [x] Deve ser possível o usuário buscar campeonatos pelo nome;
- [x] Deve ser possível o usuário realizar inscrição em um campeonato;
- [x] Deve ser possível validar a inscrição de um usuário;
- [x] Deve ser possível cadastrar um novo campeonato;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] A inscrição só pode ser validado até 2 dias após criado;
- [ ] A inscrição só pode ser validado pelo organizador do campeonato;
- [ ] O campeonato só pode ser cadastrado por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);