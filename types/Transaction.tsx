export class Transaction {
    name:string;
    type:string;
    amount:number;
    category:string;
    date:number;
    description:string;
    constructor(name:string, type:string, amount:number,category:string,date:number,description:string) {
      this.name=name,
      this.type=type,
      this.amount=amount,
      this.category=category,
      this.date=date,
      this.description=description
    }
}