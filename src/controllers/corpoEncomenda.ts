import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { corpoEncomendaService } from '../service/corpoEncomenda';

export class CorpoEncomendaController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/corposencomenda', this.list.bind(this));
        httpServer.get('/corposencomenda/:id', this.getById.bind(this));
        httpServer.post('/corposencomenda', this.create.bind(this));
        httpServer.put('/corposencomenda/:id', this.update.bind(this));
        httpServer.del('/corposencomenda/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await corpoEncomendaService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await corpoEncomendaService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await corpoEncomendaService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        res.send(await corpoEncomendaService.update(req.body));
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const corpoEncomenda = await corpoEncomendaService.delete(req.params.id);
        res.send(corpoEncomenda ? 200 : 404, corpoEncomenda);
    }
}