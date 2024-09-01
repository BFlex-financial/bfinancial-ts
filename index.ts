/**
 * By. Lucas Silveira <contato.lucasdwbfff@gmail.com>
 */

import { Result } from "./uncertain";
import type { PixCreate, CardCreate, CardPayment, PixPayment } from "./common";

class Client {
  constructor() {}
  public login(api_key: string): PaymentInterface {
    return { payments: new Payment(api_key) };
  }
}

type PaymentInterface = {
  payments: Payment;
}

class Presset {
  static card(data: CardCreate): Result<CardPayment, string> {
    let result = Result.init<CardPayment, string>();
    
    result.Ok({
      method: "Card",

      amount: data.amount,
      cvv: data.cvv,
      number: data.number,
      
      payer_cpf: data.payer_cpf,
      payer_email: data.payer_email,
      payer_name: data.payer_name,
      
      expiration_month: data.expiration_month,
      expiration_year: data.expiration_year,
    })
    
    return result;
  }

  static pix(data: PixCreate): Result<PixPayment, string> {
    let result = Result.init<PixPayment, string>();
    result.Ok({
      method: "Pix",

      amount: data.amount,
      payer_email: data.payer_email,
    })
    
    return result;
  }
}

type PaymentReq = CardPayment | PixCreate

class Payment {
  private __api_url: string = "http://127.0.0.1:8080";
  private __prefix: string = "Bearer ";
  private __api_key: string;
  constructor(api_key: string) {
    this.__api_key = api_key;
  }

  public create<T>(payment_data: PaymentReq): Result<Promise<T>, string> {
    let result = Result.init<Promise<T>, string>();
   
    result.Ok(new Promise(async (resolve) => {
      const request = await fetch(`${this.__api_url}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization-key": this.__prefix + this.__api_key
        },
        body: JSON.stringify(payment_data)
      });

      const response = await request.json();
      resolve(response.data as T)
    }));
    
    return result;
  }
}

class Transaction {
  private info: PixCreate | CardCreate;
  constructor(info: PixCreate | CardCreate) {
    this.info = info;
  }
  public pix(): PixPayment {
    const data: PixCreate = this.info as PixCreate;
    return { 
      method: "Pix",
      amount: data.amount,
      payer_email: data.payer_email
    }
  }
  public card(): CardPayment {
    const data: CardCreate = this.info as CardCreate;
    return { 
      method: "Card",

      amount: data.amount,
      cvv: data.cvv,
      number: data.number,
      
      payer_cpf: data.payer_cpf,
      payer_email: data.payer_email,
      payer_name: data.payer_name,
      
      expiration_month: data.expiration_month,
      expiration_year: data.expiration_year,
    }
  }
}

export type Pix = {
  payment_id: string,
  qr_code: {
    base64: string,
    literal: string
  }
};

export type Card = {
  payment_id: string,
  total_amount: number,
  increase: number,
};

export { Client, Presset, Transaction };
