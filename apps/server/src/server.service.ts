import { Injectable } from '@nestjs/common';
import { ITest } from '../../commons/ITest';

@Injectable()
export class ServerService {
  getHello(): string {
    const test: ITest = {name: "Alex"}
    console.log(test.name);
    
    return 'Hello World!';
  }
}
