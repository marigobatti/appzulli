import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { estadoService } from '../service/estado';

export class EstadoController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/estados', this.list.bind(this));
        httpServer.get('/estados/:id', this.getById.bind(this));
        httpServer.post('/estados', this.create.bind(this));
        httpServer.put('/estados/:id', this.update.bind(this));
        httpServer.del('/estados/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await estadoService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await estadoService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await estadoService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const estado = await estadoService.delete(req.params.id);
        res.send(estado ? 200 : 404, estado);
    }
}