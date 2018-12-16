import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { enderecoService } from '../service/endereco';

export class EnderecoController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/enderecos', this.list.bind(this));
        httpServer.get('/enderecos/:id', this.getById.bind(this));
        httpServer.post('/enderecos', this.create.bind(this));
        httpServer.put('/enderecos/:id', this.update.bind(this));
        httpServer.del('/enderecos/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await enderecoService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await enderecoService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await enderecoService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const endereco = await enderecoService.delete(req.params.id);
        res.send(endereco ? 200 : 404, endereco);
    }
}