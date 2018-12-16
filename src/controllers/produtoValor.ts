import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { produtoValorService } from '../service/produtoValor';

export class ProdutoValorController implements IController {
    public initialize(httpServer: IHttpServer): void {
        httpServer.get('/produtosvalor', this.list.bind(this));
        httpServer.get('/produtosvalor/:id', this.getById.bind(this));
        httpServer.post('/produtosvalor', this.create.bind(this));
        httpServer.put('/produtosvalor/:id', this.update.bind(this));
        httpServer.del('/produtosvalor/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await produtoValorService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const usuario = await produtoValorService.getById(req.params.id);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await produtoValorService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const produtoValor = await produtoValorService.delete(req.params.id);
        res.send(produtoValor ? 200 : 404, produtoValor);
    }
}