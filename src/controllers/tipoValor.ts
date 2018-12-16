import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { tipoValorService } from '../service/tipoValor';

export class TipoValorController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/tiposvalor', this.list.bind(this));
        httpServer.get('/tiposvalor/:id', this.getById.bind(this));
        httpServer.post('/tiposvalor', this.create.bind(this));
        httpServer.put('/tiposvalor/:id', this.update.bind(this));
        httpServer.del('/tiposvalor/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await tipoValorService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await tipoValorService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await tipoValorService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const tipoValor = await tipoValorService.delete(req.params.id);
        res.send(tipoValor ? 200 : 404, tipoValor);
    }
}