import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { encomendaService } from '../service/encomenda';
import { corpoEncomendaService } from '../service/corpoEncomenda';

export class EncomendaController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/encomendas', this.list.bind(this));
        httpServer.get('/encomendas/:id', this.getById.bind(this));
        httpServer.post('/encomendas', this.create.bind(this));
        httpServer.put('/encomendas/:id', this.update.bind(this));
        httpServer.del('/encomendas/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.header('X-Total-Count', (await encomendaService.list()).length);
        res.header('Content-Range', (await encomendaService.list()).length);
        res.send(await encomendaService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await encomendaService.getById(req.params.id);
        res.header('X-Total-Count', 1);
        res.header('Content-Range', 1);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await encomendaService.create(req.body));
        await corpoEncomendaService.create(req.body.corpos);
    }

    private async update(req: Request, res: Response): Promise<void> {
        res.send(await encomendaService.update(req.body));
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const encomenda = await encomendaService.delete(req.params.id);
        res.send(encomenda ? 200 : 404, encomenda);
    }
}