export class Admin {
    id: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    birthDate: string;
    mail: string;
    password: string;
    role: string;
    address: string;
    isActive:Boolean
    public constructor(init?: Partial<Admin >) {
      Object.assign(this, init);
  }
   

  }