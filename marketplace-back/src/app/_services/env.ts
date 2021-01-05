import { Location } from '@angular/common';
export class Env {
    hostname: string;
    port: string;
    host:string
    constructor() {
        this.hostname = location.hostname;
        this.port = "9004"

        this.host=this.hostname+':'+this.port;
}
  }