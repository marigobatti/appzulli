import { IHttpServer } from './httpServer';
import * as restify from 'restify';
import { Server, RequestHandler } from 'restify';
import * as morgan from 'morgan';
import * as passport from 'passport';
import { jwtStrategy } from '../config/passport';
import { CONTROLLERS } from '../controllers';
import * as corsMiddleware from 'restify-cors-middleware';

export class ApiServer implements IHttpServer {
    private restify: Server;

    public get(url: string, requestHandler: RequestHandler, authenticate?: boolean): void {
        this.addRoute('get', url, requestHandler, authenticate);
    }

    public post(url: string, requestHandler: RequestHandler, authenticate?: boolean): void {
        this.addRoute('post', url, requestHandler, authenticate);
    }

    public put(url: string, requestHandler: RequestHandler, authenticate?: boolean): void {
        this.addRoute('put', url, requestHandler, authenticate);
    }

    public del(url: string, requestHandler: RequestHandler, authenticate?: boolean): void {
        this.addRoute('del', url, requestHandler, authenticate);
    }

    private addRoute(
    method: 'get' | 'post' | 'put' | 'del',
    url: string, requestHandler: RequestHandler, authenticate?: boolean): void {
        if (authenticate)  {
            this.restify[method](url, passport.authenticate('jwt', { session: false }), async (req, res, next) => {
                try {
                    res.header('Access-Control-Expose-Headers', ['Content-Range', 'X-Total-Count']);
                    await requestHandler(req, res, next);
                } catch (e) {
                    console.log(e);
                    res.send(500, e);
                }
            });
        } else {
            this.restify[method](url, async (req, res, next) => {
                try {
                    res.header('Access-Control-Expose-Headers', ['Content-Range', 'X-Total-Count']);
                    await requestHandler(req, res, next);
                } catch (e) {
                    console.log(e);
                    res.send(500, e);
                }
            });
        }
        console.log(`Rota adicionada ${method.toUpperCase()}: ${url}`);
    }

    public start(port: number) {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.queryParser());
        this.restify.use(morgan('dev') as any);

        const cors = corsMiddleware({
            preflightMaxAge: 5,
            origins: ['http://localhost:8081', 'http://localhost:3000', 'http://localhost:3001', '*'],
            allowHeaders: ['Origin', 'Authorization', 'X-Requested-With', 
            'Content-Type', 'Accept', 'Content-Range', 'X-Total-Count'],
            exposeHeaders: ['Origin', 'Authorization', 'X-Requested-With', 
            'Content-Type', 'Accept', 'Content-Range', 'X-Total-Count']
        });

        this.restify.pre(cors.preflight);
        this.restify.use(cors.actual);

        // Initialize passport
        this.restify.use(passport.initialize() as any);

        jwtStrategy(passport);

        CONTROLLERS.forEach((controller) => controller.initialize(this));

        this.restify.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
    }
}