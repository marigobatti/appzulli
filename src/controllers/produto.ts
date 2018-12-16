import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { produtoService } from '../service/produto';

export class ProdutoController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/produtos', this.list.bind(this));
        httpServer.get('/produtos/:id', this.getById.bind(this));
        httpServer.post('/produtos', this.create.bind(this));
        httpServer.put('/produtos/:id', this.update.bind(this));
        httpServer.del('/produtos/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.header('X-Total-Count', (await produtoService.list()).length);
        res.header('Content-Range', (await produtoService.list()).length);
        res.send(await produtoService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await produtoService.getById(req.params.id);
        res.header('X-Total-Count', 1);
        res.header('Content-Range', 1);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await produtoService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        res.send(await produtoService.update(req.body));
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const produto = await produtoService.delete(req.params.id);
        res.send(produto ? 200 : 404, produto);
    }
}