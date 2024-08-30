import { Client, Presset } from  "../";
import type { Pix } from "../";
import type { PixPayment } from "../common";
import { match } from "../uncertain";

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
