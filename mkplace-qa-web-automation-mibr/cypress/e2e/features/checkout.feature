@checkout
Feature: My Checkout

    Feature necessário para validar compras dos produtos da victor hugo

    Scenario: Validar compra com cartão de Crédito
        Given que o usuário adiciona um ou mais itens ao carrinho
        When finalizar a compra
        Then a compra deve ser concluída com sucesso apresentando a seguinte mensagem "Recebemos a solicitação de pagamento, em breve você será informado sobre o status do seu pedido."

    Scenario: Validar compra com cartão vencido
        Given que o usuário adiciona um ou mais itens ao carrinho
        When a adição de um cartão vencido
        Then a compra não deve ser concluída com sucesso e a mensagem "Data de validade expirada" será apresentada

    Scenario: Validar a adição de novo cartão de crédito
        Given que o usuário tem 1 produto no carrinho
        When a adição de um cartão novo
        Then o cartão deve ser salvo com sucesso e a mensagem "Cartão adicionado com sucesso!" será apresentada

    Scenario: Validar compra no cartão de crédito de forma parcelada
        Given que o usuário tem 1 produto no carrinho
        When selecionar a quantidade de parcelas e finalizar a compra
        Then a compra deve ser concluída com sucesso apresentando a seguinte mensagem "Recebemos a solicitação de pagamento, em breve você será informado sobre o status do seu pedido."

    Scenario: Validar compra com boleto
        Given que o usuário adiciona um ou mais itens ao carrinho
        When seleciona opção para pagamento no boleto e finaliza a compra
        Then as informações do pagamento via boleto exibidas ao usuário concluir o pagamento

    Scenario: Validar compra com PIX
        Given que o usuário adiciona um ou mais itens ao carrinho
        When seleciona opção para pagamento no pix e finaliza a compra
        Then as informações com QR code do pagamento via pix exibidas ao usuário concluir o pagamento

    Scenario: Validar checkout com carrinho vazio
        Given que o usuário esteja com o carrinho vazio
        When acessar o carrinho
        Then o botão de avançar deve estar inativo e não deve ser possível prosseguir

    Scenario: Validar a remoção de produtos do checkout
        Given que o usuário tem produtos no carrinho
        When acessa o checkout, volta para o carrinho e seleciona a opção de remover o produto do carrinho
        Then o produto é removido do carrinho, o valor total é atualizado de acordo e deve ser possível realizar o pagamento

    Scenario: Validar a criação de pedido com um usuário deslogado
        Given que o usuário não esteja logado
        When adiciona produtos no carrinho, preenche o endereço e tenta finalizar a compra
        Then deve ser solicitado que o usuário faça login ou se registre antes de prosseguir com o checkout

    Scenario: Validar a adição de produtos no checkout
        Given que o usuário tem 1 produto no carrinho
        When acessa o checkout, volta para o carrinho e seleciona a opção de aumentar a quantidade de um dos produtos
        Then a quantidade sera igual a "2", o valor total é atualizado de acordo e deve ser possível realizar o pagamento


