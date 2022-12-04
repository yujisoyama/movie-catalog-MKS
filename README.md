# Movie Catalog MKS

Aplicação backend, dockerizada, cujo objetivo é relacionar usuários e filmes através de um catálogo de filmes que é alimentado pelos próprios usuários.
Especificações do projeto: [MKS Backend Challenge](https://github.com/MKS-desenvolvimento-de-sistemas/mks-backend-challenge)

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Movie Catalog MKS**
| :label: Tecnologias | NodeJS, NestJS, TypeORM, PostgreSQL, Swagger, Docker, Redis
| :rocket: URL         | http://15.228.154.83:3000/

![](https://user-images.githubusercontent.com/64661100/203472585-42218034-b984-43a5-b32e-a3ae866f1fa5.png#vitrinedev)

## ▶️ Rodando localmente
### Pré-requisitos:
   - Ter o Docker instalado na sua máquina, pois toda a aplicação será subida em containers no Docker.

### Passo a Passo:
   - Clone esse repositório:
   ```
   git clone https://github.com/yujisoyama/movie-catalog-MKS.git
   ```
   - Entre na pasta do projeto:
   ```
   cd movie-catalog-MKS
   ```
   - Vamos construir o container da aplicação server-side NestJS. Execute o comando:
   ```
   docker compose build node
   ```
   - Finalizando a construção do container, execute o seguinte comando para rodar toda a aplicação através de 3 containers (server, database e redis):
   ```
   docker compose up
   ```
   - Para acessar a documentação no Swagger a respeito de cada enpoint, após a subida dos containers acesse o endereço abaixo: 
   ```
   http://localhost:3000/
   ```
## Live
  O deploy dessa aplicação bem como a hospedagem do banco de dados PostgreSQL foi feita na AWS ec2. Sinta-se livre para usar cada endpoint e utilizar a [aplicação que está no ar](http://15.228.154.83:3000/).
   
## A arquitetura e design das tabelas no PostgreSQL foi feita da seguinte forma:
<p align="center"><img src="https://user-images.githubusercontent.com/64661100/203474191-7dc33f98-ccf8-4e75-9646-03d98d501ef0.png" /></p>

## 🛠 Stacks utilizadas e a minha experiência em cada uma:

- <strong>NestJS (Intermediário)</strong>: desenvolvimento server-side e a criação de suas rotas utilizando Respository Pattern.
- <strong>TypeScript (Experiente)</strong>: utilizando em toda a aplicação.
- <strong>TypeORM (Experiente)</strong>: integração da aplicação com o banco de dados através de classes entidades, consultas, e design da arquitetura da base.
- <strong>PostgreSQL (Experiente)</strong>: utilizando em toda a aplicação.
- <strong>Docker (Intermediário)</strong>: aplicação totalmente dockerizada utilizando docker-compose e Dockerfile.
- <strong>Swagger (Iniciante)</strong>: utilizado para realizar toda a documentação das API's desenvolvidas.
- <strong>Redis (Iniciante)</strong>: utilizado para cache, armazenando algumas informações na memória e acessando elas em vez de consultar no banco de dados.


