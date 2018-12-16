import { UsuarioController } from './usuario';
import { PessoaController } from './pessoa';
import { EnderecoController } from './endereco';
import { EstadoController } from './estado';
import { CidadeController } from './cidade';
import { BairroController } from './bairro';
import { EncomendaController } from './encomenda';
import { EncomendaDataController } from './encomendaData';
import { CorpoEncomendaController } from './corpoEncomenda';
import { ProdutoController } from './produto';
import { ProdutoValorController } from './produtoValor';
import { TipoDataController } from './tipoData';
import { TipoValorController } from './tipoValor';
import { PingController } from './ping';

export const CONTROLLERS = [
    new UsuarioController(),
    new PessoaController(),
    new EnderecoController(),
    new EstadoController(),
    new CidadeController(),
    new BairroController(),
    new EncomendaController(),
    new EncomendaDataController(),
    new CorpoEncomendaController(),
    new ProdutoController(),
    new ProdutoValorController(),
    new TipoDataController(),
    new TipoValorController(),
    new PingController()
];