import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { tipoDataService } from '../service/tipoData';

export class TipoDataController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/tiposdata', this.list.bind(this));
        httpServer.get('/tiposdata/:id', this.getById.bind(this));
        httpServer.post('/tiposdata', this.create.bind(this));
        httpServer.put('/tiposdata/:id', this.update.bind(this));
        httpServer.del('/tiposdata/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await tipoDataService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await tipoDataService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await tipoDataService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const tipoData = await tipoDataService.delete(req.params.id);
        res.send(tipoData ? 200 : 404, tipoData);
    }
}