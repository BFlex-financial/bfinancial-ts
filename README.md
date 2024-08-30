Para a segurança do seu sistema, usamos sistemas de incertezas. Está disponível em `./bfinancial/uncertain.ts` todo o código da incerteza.
Isto serve também para sua aplicação. A incerteza implementada, é inspirada na `impl` Result do Rust.
O uso dela trará segurança à seu código, para que se houver algum problema, ele possa te relatar o erro por um callback bem feito,
ao invez de gerar uma Exeption e explodir o seu código.

Se interessou pela proposta do Rust? Temos também uma SDK para o Rust. 

<div align="center">
<a href="https://bflex.tech" target="_blank"><img height="37px" src="https://img.shields.io/badge/Me%20interessei-843057"></a>
<br>
<br>
</div>

# Gerando um pix com a SDK
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