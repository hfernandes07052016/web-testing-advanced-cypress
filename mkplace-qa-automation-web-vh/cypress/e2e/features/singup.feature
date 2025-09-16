Feature: Sing Up

    Feature to signup new user on Victor Hugo site.

    Background:
        Given que o usuario acessou a pagina de cadastro

    Scenario: Validar cadastro com sucesso
        When preencher todos os campos e clicar em cadastrar
        Then o cadastro deverá ser concluido com sucesso e apresentada a mensagem "Cadastro realizado com sucesso"

    Scenario: Validar cadastro sem informar o campo Nome
        When preencher todos os campos exceto o campo "nome" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Campo obrigatóirio" abaixo do campo "nome"

    Scenario: Validar cadastro sem informar o campo Email
        When preencher todos os campos exceto o campo "email" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Campo obrigatóirio" abaixo do campo "email"

    Scenario: Validar cadastro sem informar o campo CPF
        When preencher todos os campos exceto o campo "cpf" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Campo obrigatóirio" abaixo do campo "cpf"

    Scenario: Validar cadastro sem informar o campo Aniverário
        When preencher todos os campos exceto o campo "aniversario" e clicar em cadastrar
        Then o cadastro deverá não deve ser concluído apresentando a mensagem "Campo obrigatóirio" abaixo do campo "aniversario"

    Scenario: Validar cadastro informando apenas o primeiro nome
        When preencher o campo Nome Completo apenas com o nome "Helder"
        Then deve ser apresentada a mensagem "Digite o nome completo" abaixo do campo Nome Completo

    Scenario: Validar cadastro com CPF inválido
        When preencher todos os campos mas informar um CPF invalido e clicar em cadastrar
        Then deve ser apresentada a mensagem "Digite um CPF válido" abaixo do campo CPF

    Scenario: Validar cadastro com Telefone inválido
        When preencher todos os campos mas informar um telefone invalido e clicar em cadastrar
        Then deve ser apresentada a mensagem "Digite um número de telefone válido" abaixo do campo Telefone

    Scenario: Validar cadastro com Senha fora dos padrões
        When preencher todos os campos mas informar uma senha fora do padrão e clicar em cadastrar
        Then deve ser apresentada a mensagem "A senha deve ter pelo menos seis caracteres e conter pelo menos uma letra e um número" abaixo do campo Senha

    Scenario: Validar cadastro com senhas divergentes
        When preencher todos os campos mas informar senhas diferentes e clicar em cadastrar
        Then deve ser apresentada a mensagem "As senhas não conferem" abaixo do campo Senha


    