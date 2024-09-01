> [!WARNING]
> Se você está trabalhando com JavaScript, é recomendável que use a [lib do Node.js](https://github.com/BFlex-financial/bfinancial-nodejs). Ou, transpile usando:
> `npx tsc common.ts index.ts uncertain.ts`
> 
> **Lembre-se de que se você usa Node.js, ele interpreta apenas código JavaScript, e pede a transpilação do Typescript.**
> **Oque quer dizer:** Se você pretende usar o Node.js, use a [lib específica](https://github.com/BFlex-financial/bfinancial-nodejs) para evitar problemas.

<br>
<br>

#
<br>

Para a segurança do seu sistema, usamos sistemas de incerteza. O código completo da incerteza está disponível em ./bfinancial/uncertain.ts. Isso também se aplica à sua aplicação. A incerteza implementada é inspirada na Result do Rust. O uso dessa abordagem trará mais segurança ao seu código, permitindo que, se houver algum problema, ele possa relatar o erro por meio de um callback bem implementado, em vez de gerar uma exceção e causar a falha do seu código.

<div><details>
<summary align="left"><h4>Mais sobre a incerteza</h4></summary>

## Como Funciona
O sistema de incertezas que implementamos tem como base a ideia de que, em vez de lançar exceções quando ocorrem erros, ele fornece uma estrutura para que esses erros sejam tratados de forma controlada e previsível. Essa estrutura permite que você defina callbacks específicos para tratar diferentes tipos de erros, garantindo que o fluxo do programa não seja interrompido abruptamente.

Por exemplo, ao invés de uma função que pode lançar uma exceção e causar a parada do seu código, você terá uma função que retorna um objeto que indica o sucesso ou o erro da operação. Dependendo do resultado, você pode decidir como proceder, seja corrigindo o erro ou tentando uma abordagem alternativa.

## Vantagens em um Sistema de Pagamentos
A implementação de um sistema de incertezas é particularmente vantajosa em um sistema de pagamentos, onde a integridade e a segurança das transações são cruciais. Veja algumas das principais vantagens:

1. **Robustez e Resiliência:** Em sistemas de pagamentos, erros podem ocorrer em diversas etapas, como validação de cartões, comunicação com gateways de pagamento ou processamento de transações. Utilizando a abordagem de incerteza, você pode garantir que os erros sejam tratados de maneira controlada, sem interromper o processo de pagamento ou afetar a experiência do usuário.

2. **Tratamento Específico de Erros:** Ao ter um controle mais granular sobre os tipos de erros, você pode implementar lógicas específicas para cada cenário. Por exemplo, erros de validação de cartão podem ser tratados com mensagens específicas para o usuário, enquanto problemas de comunicação com o gateway podem acionar tentativas de reenvio ou notificações para a equipe de suporte.

3. **Melhoria na Experiência do Usuário:** Em vez de um sistema que falha silenciosamente ou exibe mensagens genéricas de erro, você pode fornecer feedback mais detalhado e ações corretivas, o que melhora a confiança do usuário no sistema e reduz a frustração.

4. **Facilidade de Manutenção:** A estrutura de incerteza facilita a manutenção do código, permitindo que você adicione, remova ou modifique a forma como os erros são tratados sem precisar alterar o fluxo principal do programa. Isso simplifica a atualização e a escalabilidade do sistema de pagamentos.

5. **Segurança Adicional:** Ao lidar com erros de forma controlada, você reduz o risco de falhas catastróficas que poderiam comprometer a segurança das transações e dos dados dos usuários.

A implementação dessa abordagem traz uma camada adicional de segurança e flexibilidade ao seu sistema de pagamentos, ajudando a garantir que ele seja mais confiável e mais fácil de manter ao longo do tempo.
<br>

#
<br>

</details>
</div>

<div align="center">

Se interessou pela proposta do Rust? Temos também uma SDK para o Rust. 

<a href="https://github.com/BFlex-financial/bfinancial-rs" target="_blank"><img height="37px" src="https://img.shields.io/badge/Me%20interessei-843057"></a>
<br>
<br>
</div>

> [!NOTE]\
> Logicamente, o que funciona em TypeScript deve funcionar em JavaScript. No entanto, recomendamos seguir as instruções e especificações descritas para garantir a segurança adequada do seu sistema (Lidar com Exeptions nunca é a melhor solução em JavaScript). Seguir as orientações específicas ajuda a evitar problemas e a assegurar que tudo funcione conforme esperado.

# Gerando um pix com a SDK - TypeScript
```ts
const client = new Client().login("admin");
const payment = client.payments;

const info = {
  amount: 2,
  payer_email: "test@gmail.com"
};

/*
  Tenta gerar os dados para criar o pagamento pix.
  Caso dê algum problema, ele cairá no fail.
  Caso não, cairá no sucess. 
*/
match<PixPayment, string>(Presset.pix(info), {
  fail(_: string) { console.log(_); },

  success(pix: PixPayment) {
    /* 
      Por fim, tenta gerar os dados de pagamento do pix, como
      QRCode, Copia e cola e mais alguns dados que são necessários
      para o nosso funcionamento.
    */
    match(payment.create<Pix>(pix), {
      fail(_: string) { console.log(_); },

      async success(data: Promise<Pix>) {
        const pix: Pix = await data;
        console.log(pix);   
      }
    })
  }
})
```

> [!WARNING]
> Se você está trabalhando com JavaScript, é recomendável que use a [LIB do Node.js](https://github.com/BFlex-financial/bfinancial-nodejs). Ela não contem recursos como as incertezas, mas por isto, é simplificada, já que não temos tipagens para lidarmos com incertezas.

# Gerando um pix com a SDK - JavaScript
```js
const client = new Client().login("admin");
const payment = client.payments;

const info = {
  amount: 2,
  payer_email: "test@gmail.com"
};

/*
  Tenta gerar os dados de pagamento do pix, como
  QRCode, Copia e cola e mais alguns dados que são necessários
  para o nosso funcionamento.
*/
match(payment.create(new Transaction(info).pix()), {
  fail(_) { console.log(_); },

  async success(data) {
    const pix = await data;
    console.log(pix);
  }
})
```
<div align="center">

### Evitando usar o match
</div>

```js
const client = new Client().login("admin");
const payment = client.payments;

const info = {
  amount: 2,
  payer_email: "test@gmail.com"
};

/*
  Gera o pagamento pix, e envia para o data o conteúdo
  necessário para que seja possível o cliente efetuar o 
  pagamento.
*/
const data = payment.create(new Transaction(info).pix()).unwrap();
const pix = await data;
console.log(pix);
```
