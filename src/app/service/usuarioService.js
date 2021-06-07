import ApiService from '../apiservice'
import ErroValidacao from '../expcetion/erroValidacao'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario) {
        return this.post('/', usuario);
    }

    validarSenha(usuario) {

        var senha = usuario.senha;
        var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (senha.length < 6) {
            return false;
            
        } else if (!regex.exec(senha)) {
            return false;
        }

        return true;

    }
    validar(usuario) {
        const errors = []

        if (!usuario.nome) {
            errors.push('Opss! Você esqueceu de informar o campo Nome.')
        }

        if (!usuario.email) {
            errors.push('Você esqueceu de informar o campo Email.')
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('Informe um Email válido.')
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            errors.push('Digite a senha 2 vezes.')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            errors.push('As senhas não batem.')
        }
        if (errors && errors.length > 0) {
            throw new ErroValidacao(errors);
        }

        return errors;
    }
}

export default UsuarioService;