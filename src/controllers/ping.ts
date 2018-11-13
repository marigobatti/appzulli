import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';

export class PingController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/ping', (req, res) => res.send(200, 'hello'));
    }
}