import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { cidadeService } from '../service/cidade';

export class CidadeController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/cidades', this.list.bind(this));
        httpServer.get('/cidades/:id', this.getById.bind(this));
        httpServer.post('/cidades', this.create.bind(this));
        httpServer.put('/cidades/:id', this.update.bind(this));
        httpServer.del('/cidades/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await cidadeService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await cidadeService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await cidadeService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const cidade = await cidadeService.delete(req.params.id);
        res.send(cidade ? 200 : 404, cidade);
    }
}