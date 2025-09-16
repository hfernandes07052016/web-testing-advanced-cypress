Feature: Recovery Password

    Feature is necessary to the user recovery your password

    Background:
        Given que o customer acessou a página de login

    Scenario: Validar envio do e-mail de solicitação de reset de senha
        When clicar no link esqueci minha senha, informar o e-mail "helder.paula@mkplace.com.br" e clicar em recuperar senha
        Then deve retornar a mensagem "Email enviado com sucesso!" confirmando o envio do e-mail

    Scenario: Validar reset de senha para e-mail não cadastro
        When clicar no link esqueci minha senha, informar o e-mail "helder.fpaula070516@gmail.com" e clicar em recuperar senha
        Then deve retornar a mensagem "Acesso negado! Parece que sua sessão expirou. Faça login para continuar." informando que o usuário informando não foi encontrado

    Scenario: Validar reset de senha informando um e-mail incorreto
        When clicar no link esqueci minha senha, informar o e-mail "helder.fpaula070516" e clicar em recuperar senha
        Then tem que retornar mensagem "E-mail incorreto"