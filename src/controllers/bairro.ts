import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { bairroService } from '../service/bairro';

export class BairroController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/bairros', this.list.bind(this));
        httpServer.get('/bairros/:id', this.getById.bind(this));
        httpServer.post('/bairros', this.create.bind(this));
        httpServer.put('/bairros/:id', this.update.bind(this));
        httpServer.del('/bairros/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await bairroService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await bairroService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await bairroService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const bairro = await bairroService.delete(req.params.id);
        res.send(bairro ? 200 : 404, bairro);
    }
}