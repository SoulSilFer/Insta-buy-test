# Projeto: Insta-Buy Front-End

### Metodologias do Front-end utilizadas no projeto
Neste projeto, foram utilizadas as seguintes metodologias no desenvolvimento do front-end:

* React: O projeto foi desenvolvido utilizando a biblioteca React para a construção da interface do usuário de forma modular e reativa.

* CSS-in-JS com Emotion: O Emotion foi utilizado para a estilização dos componentes de forma inline, seguindo a abordagem de CSS-in-JS. Isso proporciona maior flexibilidade e facilidade de manutenção do estilo dos componentes.

* Material-UI: A biblioteca Material-UI foi utilizada para aproveitar seus componentes prontos e estilizados, seguindo as diretrizes do Material Design. Isso acelerou o desenvolvimento e garantiu uma interface consistente e visualmente agradável.

* React Router: O React Router foi utilizado para o roteamento e navegação dentro do aplicativo. Com ele, foi possível criar rotas dinâmicas e permitir a navegação entre diferentes páginas e componentes.

* Redux e Redux Saga: O Redux foi utilizado para gerenciar o estado global da aplicação, permitindo o compartilhamento de dados entre diferentes componentes. O Redux Saga foi utilizado para tratar as requisições assíncronas e os efeitos colaterais do aplicativo.

* React Slick e React Responsive Carousel: As bibliotecas React Slick e React Responsive Carousel foram utilizadas para criar carrosséis e slideshows responsivos, tornando possível exibir imagens e conteúdo de forma interativa e visualmente atraente.

* Essas metodologias foram escolhidas para proporcionar uma experiência de desenvolvimento eficiente, modularidade, reatividade e uma interface de usuário moderna e intuitiva.


### Instalação e Execução do Projeto
Siga as instruções abaixo para instalar as dependências e executar o projeto em sua máquina local.

Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em: https://nodejs.org

#### Passos
1. Faça o clone do repositório para o seu ambiente local:

```
shell
git clone https://github.com/SoulSilFer/Insta-buy-test.git
```

2.Acesse a pasta do projeto:

```
shell
cd insta-buy-test
```

3. Instale as dependências do projeto:

```
shell
yarn install
```

4. Após a conclusão da instalação, execute o seguinte comando para iniciar o servidor de desenvolvimento:

```
shell
yarn dev
```

5. O servidor de desenvolvimento será iniciado e você poderá acessar o projeto em seu navegador através da seguinte URL: http://localhost:4200

6. Para construir a versão de produção do projeto, execute o seguinte comando:

```
shell
yarn build
```

Isso criará uma pasta **dist** com os arquivos otimizados para produção.

### Executando o projeto com o http-server
Se você preferir executar o projeto utilizando o http-server, siga os passos adicionais abaixo:

1. Instale o pacote http-server globalmente em sua máquina:

```
shell
npm install -g http-server
```

2. Navegue até a pasta dist do projeto:

```
shell
cd dist
```

3.Inicie o servidor http-server:

```
shell
http-server
```

O servidor será iniciado e você poderá acessar o projeto em seu navegador através da URL fornecida.

Certifique-se de ter as dependências instaladas corretamente e siga os passos acima para executar o projeto com sucesso.
