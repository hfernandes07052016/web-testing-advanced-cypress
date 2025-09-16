<div align="center">
  <div>
    <img 
    src="https://cloud.githubusercontent.com/assets/1268976/20607953/d7ae489c-b24a-11e6-9cc4-91c6c74c5e88.png"
    width="400"
    />
  </div>
  <br/>
  <br/>
	</a>
  <p>Tradução da documentação oficial do framework Cypress.io em Português-Brasil</p>
</div>
<br/>

![markdown-lint](https://github.com/pedrohyvo/cypress-docs-pt-br/workflows/markdown-lint/badge.svg?branch=master)
[![GitHub](https://img.shields.io/github/license/pedrohyvo/cypress-docs-pt-br)](https://github.com/pedrohyvo/cypress-docs-pt-br/edit/master/LICENSE)

---

# Victor Hugo - Cypress Automation

<div align="center">
  <div>
    <img 
    src="https://gsobmidia.com.br/uploads/lojas/606/victor-hugo_1600280178.jpg"
    width="200"
    />
  </div>
  <br/>
  <br/>
</div>
<br/>

## O que é o Cypress?

O Cypress é uma ferramenta de teste de front-end de código aberto que permite aos desenvolvedores escrever e executar testes de forma rápida e eficiente em aplicativos da web. Ele oferece uma API simples e intuitiva, além de uma interface de usuário amigável, que facilita a criação, execução e depuração de testes de front-end.

## Instalação e Configuração:

Para começar a usar o Cypress em seu projeto, siga estas etapas:

1. **Instale as dependências**: Você pode instalar o Cypress e todas as dependências do projeto via npm usando o seguinte comando:

```bash
npm install
```
## Instalação extensões VSCODE:

**Instale as seguintes extensões:**

- Cucumber.
- Cucumber (Gherkin) Full Support.

Neste caso existe a necessidade de instalação dessas extensões por estarmos utilizando o Cucumber para realizar toda criação dos testes automatizados.

## Executando o Cypress:

No Cypress é possível executarmos todos os testes em modo headless ou utilizando sua interface mais conhecimento como CLI.

1. **Executando todos os testes:** Para executar todos os cenários utilize o seguinte comando:

```bash
npx cypress run
```
Ou
```bash
npm run cypress:execution
```

2. **Executando uma feature específica:** Para executar uma feature específica, deve-se primeiro alterar a tag definida dentro do arquivo package.json na linha 9. Uma vez alterada a tag que deseja executar, rode o comando abaixo:

```bash
npm run cypress:execution-tags
```

## Conhecendo o Cypress CLI:

O Cypress CLI nada mais é do que uma interface amigável que lhe possibilidade interagir com algumas funcionalidades do Cypress de forma mais visual, além de ter uma visualização clara dos logs dos testes executados.

2. **Abrindo o Cypress CLI:** Para visualizar a primeira tela do Cypress CLI, execute o comando a seguir:

```bash
npx cypress open
```
- Selecione a opção E2E Testing
![Logo do Markdown](/img/image.png)

- Selecione qual Browser deseja executar os testes
![Logo do Markdown](/img/Cypress_XkYoIdgMft.png)

- Em seguida será apresentada a interface CLI com todas as Features automatizadas. 
![Logo do Markdown](/img/chrome_89OnQeDIVy.png)

## Gerando relatórios:

Hoje após a execução dos testes, é possível gerar um relatório para melhor compreensão dos resultados dos testes. 

O arquivo responsável pela geração dos relatórios é o **cucumber-html-report.js**.

O arquivo **cucumber-html-report.js** captura o resultado dos testes de um arquivo .json que se encontra dentro da pasta _**jsonlogs**_. Uma vez que os dados são capturados, é gerado um relatório dentro da pasta **_cypress/reports/cucumber-html-report_**.

1. **Gerando o arquivo log.json**: Primeiro você deve executar os testes conforme o informado nos tópicos anteriores, porém os testes devem ser executados pela linha de comando e não pela interface CLI. Ou seja, execute o comando:

```bash
npx cypress run
```
Ou
```bash
npm run cypress:execution
```

2. **Gerando o relatório**: Uma vez com os testes concluídos, o arquivo log.json será gerado na pasta jsonlogs. Feito isso é só executar o comando:

```bash
node cucumber-html-report.js
```
Pronto! O relatório pode ser visualizado abrindo o arquivo index.html presente na pasta **_cypress/reports/cucumber-html-report_**. Veja o exemplo abaixo:

![Logo do Markdown](/img/chrome_Kjakzns3Um.png)





