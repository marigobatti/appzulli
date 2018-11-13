import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { pessoaService } from '../service/pessoa';

export class PessoaController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/pessoas', this.list.bind(this));
        httpServer.get('/pessoas/:id', this.getById.bind(this));
        httpServer.post('/pessoas', this.create.bind(this));
        httpServer.put('/pessoas/:id', this.update.bind(this));
        httpServer.del('/pessoas/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await pessoaService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await pessoaService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await pessoaService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const pessoa = await pessoaService.delete(req.params.id);
        res.send(pessoa ? 200 : 404, pessoa);
    }
}