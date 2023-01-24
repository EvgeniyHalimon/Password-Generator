export class CustomError extends Error{
  status: any;
  constructor(obj){
    super(obj.message);
    this.name = 'CustomError';
    this.status = obj.status;
  }
}