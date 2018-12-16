import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { encomendaDataService } from '../service/encomendaData';

export class EncomendaDataController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/encomendadatas', this.list.bind(this));
        httpServer.get('/encomendadatas/:id', this.getById.bind(this));
        httpServer.post('/encomendadatas', this.create.bind(this));
        httpServer.put('/encomendadatas/:id', this.update.bind(this));
        httpServer.del('/encomendadatas/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await encomendaDataService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await encomendaDataService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await encomendaDataService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const encomendaData = await encomendaDataService.delete(req.params.id);
        res.send(encomendaData ? 200 : 404, encomendaData);
    }
}