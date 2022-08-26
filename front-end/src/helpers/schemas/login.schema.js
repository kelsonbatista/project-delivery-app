import * as yup from 'yup';
import { SIX } from '../constants';

const loginSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string()
    .required('Senha obrigatória')
    .min(SIX, 'A senha deve ter no mínimo 6 caracteres'),
}).required();

export default loginSchema;
