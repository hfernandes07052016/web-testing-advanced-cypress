Feature: Login page

    Feature Login page will work depending on the user credentials.

    Background:
        Given que o customer acessou a página de login
    @login
    Scenario: Validar login com sucesso
        When ele informar o email "helder.paula@mkplace.com.br" e senha "mkplace@2024" e clicar no botão de acessar
        Then deve visualizar a página inicial
    @login
    Scenario: Validar login com E-mail incorreto
        When ele informar o email "helder.incorreto@mkplace.com.br" e senha "mkplace@2024" e clicar no botão de acessar
        Then deve visualizar a seguinte mensagem de erro "E-mail ou senha inválidos"

    Scenario: Validar login com Senha incorreta
        When ele informar o email "helder.paula@mkplace.com.br" e senha "12345678" e clicar no botão de acessar
        Then deve visualizar a seguinte mensagem de erro "E-mail ou senha inválidos"

    Scenario: Validar login sem informar a Senha do usuário
        When ele informar o e-mail "helder.incorreto@mkplace.com.br" e clica no botão de acessar sem informar a senha
        Then deve visualizar a mensagem "Seu e-mail ou senha estão incorretos." abaixo do campo

    Scenario: Validar login sem informar o E-mail do usuário
        When ele informar a senha "mKPLACE@2023" e clica no botão de acessar sem informar o e-mail
        Then deve visualizar a mensagem "Seu e-mail ou senha estão incorretos." abaixo do campo

