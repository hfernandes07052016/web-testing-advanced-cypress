@address
Feature: My Credit Cards

    Eu como usuário cadastrado na VICTOR HUGO
    Quero poder acessar meus Cartões de Crédito
    Para que eu possa edita-los, adicionar novos endereço ou até mesmo excluí-los

    Background: Tela de Meus Cartões
        Given que o usuário esteja logado, e acessar a tela de Meus Cartões

    # Scenario: Validar acesso a sessão de Meus Cartões
    # Then devem ser visualizados os cartões já cadastrados, e o botão Adicionar um novo Cartão

    # Scenario: Validar adição de novo Cartão de Crédito com sucesso
    #     When adicionar um novo Cartão com sucesso
    #     Then devem ser visualizado o novo cartão cadastrado e a mensagem "Cartão adicionado com sucesso!"

    # Scenario: Validar botão de Ver cartões ao tentar cadastrar novo cartão
    #     When insira todos os dados do cartão e clicar em Ver cartões
    #     Then devem ser visualizados os cartões já cadastrados, e o botão Adicionar um novo Cartão

    # Scenario: Validar cadastro de cartão sem informar nenhum campo
    #     When clicar em Adicionar cartão sem informar nenhum campo
    #     Then deve ser apresentada a mensagen "Campo obrigatório" informandos a obrigatoriedade dos campos

    # Scenario: Validar edição de cartão cadastrado
    #     When editar um cartão com sucesso alterando seu endereço e clicar em salvar
    #     Then deve ser apresentada a mensagen "Cartão atualizado com sucesso!"

    Scenario: Validar edição de cartão cadastrado deixando os campos de endereço em branco
        When editar um cartão deixando os campos do endereço em branco e clicar em salvar
        Then deve ser apresentada a mensagen "Campo obrigatório" abaixo dos campos em branco


