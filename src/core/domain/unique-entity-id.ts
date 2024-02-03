import { randomUUID } from 'crypto'

export class UniqueEntityID {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  toValue() {
    return this.value
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}