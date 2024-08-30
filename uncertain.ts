/**
 * By. Lucas Silveira <contato.lucasdwbfff@gmail.com>
 */

class Result<T, E> {
  state: boolean | null = null;
  val: T | E | null = null;

  private constructor() {}

  static init<U, Y>(): Result<U, Y> {
    return new Result<U, Y>();
  }

  public Ok(val: T): this {
    this.state = true;
    this.val = val;
    return this;
  }

  public Err(val: E): this {
    this.state = false;
    this.val = val;
    return this;
  }

  public isOk(): boolean {
    return this.state == null ? false : this.state;
  }

  public isErr(): boolean {
    return this.state == null ? false : !this.state;
  }

  public unwrap(): any {
    return this.val;
  }
}

function match<T, E>(instance: Result<T, E>, obj: {success: (_: T) => void, fail: (_: E) => void}): void {
  if( instance.isOk() ) obj['success'](instance.unwrap());
  else obj['fail'](instance.unwrap())
}

export { Result, match };