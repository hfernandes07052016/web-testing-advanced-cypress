Feature: Sing Up

    Feature to signup new user on Victor Hugo site.

    Background:
        Given que o usuario acessou a pagina de cadastro

    Scenario: Validar cadastro com sucesso
        When preencher todos os campos e clicar em cadastrar
        Then o cadastro deverá ser concluido com sucesso e apresentada a mensagem "Cadastro realizado com sucesso"

    Scenario: Validar cadastro sem informar o campo Nome
        When preencher todos os campos exceto o campo "Nome Completo" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Preencha este campo." abaixo do campo "Nome Completo"

    Scenario: Validar cadastro sem informar o campo Email
        When preencher todos os campos exceto o campo "E-mail" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Preencha este campo." abaixo do campo "E-mail"

    Scenario: Validar cadastro sem informar o campo CPF
        When preencher todos os campos exceto o campo "CPF" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Preencha este campo." abaixo do campo "CPF"

    Scenario: Validar cadastro sem informar o campo Telefone
        When preencher todos os campos exceto o campo "Telefone" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Digite um telefone válido." abaixo do campo "Telefone"

    Scenario: Validar cadastro sem informar o campo Senha
        When preencher todos os campos exceto o campo "Senha" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Necessário pelo menos 6 dígitos." abaixo do campo "Senha"

    Scenario: Validar cadastro informando apenas o primeiro nome
        When preencher o campo Nome Completo apenas com o nome "Helder"
        Then deve ser apresentada a mensagem "O nome precisa ser completo." abaixo do campo Nome Completo

    Scenario: Validar cadastro com CPF inválido
        When preencher todos os campos mas informar um CPF invalido e clicar em cadastrar
        Then deve ser apresentada a mensagem "Digite um CPF válido." abaixo do campo CPF

    Scenario: Validar cadastro com Telefone inválido
        When preencher todos os campos mas informar um telefone invalido e clicar em cadastrar
        Then deve ser apresentada a mensagem "Números de celular devem começar com o dígito 9." abaixo do campo Telefone

    Scenario: Validar cadastro com Senha sem letras
        When preencher todos os campos mas informar uma senha apenas com números e clicar em cadastrar
        Then deve ser apresentada a mensagem "Necessário pelo menos uma letra." abaixo do campo Senha

    Scenario: Validar cadastro com Senha menor que 6 dígitos
        When preencher todos os campos mas informar uma senha com menos de 6 dígitos e clicar em cadastrar
        Then deve ser apresentada a mensagem "Necessário pelo menos 6 dígitos." abaixo do campo Senha


    