@address
Feature: My Address

    Eu como usuário cadastrado no MIBR
    Quero poder acessar meus endereços
    Para que eu possa edita-los, adicionar novos endereço ou até mesmo excluí-los

    Background: Tela de Cadastro
        Given que o usuário esteja logado, e acessar a tela de endereços

    Scenario: Validar acesso a sessão de endereços
        Then devem ser visualizados os endereços já cadastrados, e o botão Adicionar um endereço

    Scenario: Validar adição de novo endereço com sucesso
        When adicionar um novo endereço com sucesso
        Then devem ser visualizado o novo endereço cadastrado e a mensagem "Endereço adicionado"

    Scenario: Validar adição de novo endereço sem informar Nome do destinatário
        When adicionar um novo endereço sem informar o campo "Nome do destinatário"
        Then deve ser apresentada a mensagem "Campo obrigatório" no campo "Nome do Destinatário"

    Scenario: Validar adição de novo endereço sem informar Cidade
        When adicionar um novo endereço sem informar o campo "Cidade"
        Then deve ser apresentada a mensagem "Campo obrigatório" no campo "Cidade"

    Scenario: Validar adição de novo endereço sem informar Bairro
        When adicionar um novo endereço sem informar o campo "Bairro"
        Then deve ser apresentada a mensagem "Campo obrigatório" no campo "Bairro"

    Scenario: Validar adição de novo endereço sem informar Endereço
        When adicionar um novo endereço sem informar o campo "Endereço"
        Then deve ser apresentada a mensagem "Campo obrigatório" no campo "Endereço"

    Scenario: Validar adição de novo endereço sem informar Numero
        When adicionar um novo endereço sem informar o campo "Numero"
        Then deve ser apresentada a mensagem "Campo obrigatório" no campo "Numero"

    Scenario: Validar edição de endereço com sucesso
        When acessar um dos endereços para edição e realizar a edição do nome para "Endereço editado com sucesso", número "321" e Complemento "Apartamento"
        Then o endereço editado deve ser apresentado na tela de endereço com o nome "Endereço editado com sucesso", número "321" e Complemento "Apartamento"

    Scenario: Validar exclusão de endereço com sucesso
        When acessar o endereço com o nome "Endereço a ser excluído" e clicar em Deletar endereço
        Then o endereço não deve ser mais apresentado nos endereços cadastrados


