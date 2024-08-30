export type CardCreate = {
  amount: number,
  number: string,
  cvv: string ,
  payer_email: string,
  payer_name: string,
  payer_cpf: string,
  expiration_year: number,
  expiration_month: number
};


export type PixCreate = {
  amount: number,
  payer_email: string
};

/**
 * with method field
 */

export type CardPayment = {
  method: string,
  amount: number,
  number: string,
  cvv: string ,
  payer_email: string,
  payer_name: string,
  payer_cpf: string,
  expiration_year: number,
  expiration_month: number
};

export type PixPayment = {
  method: string,
  amount: number,
  payer_email: string
};