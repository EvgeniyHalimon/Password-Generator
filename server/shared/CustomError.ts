export class CustomError extends Error{
  status: any;
  constructor(obj: { message: any; status: any; }){
    super(obj.message);
    this.name = 'CustomError';
    this.status = obj.status;
  }
}