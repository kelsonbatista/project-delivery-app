import * as yup from 'yup';
import { SIX, TWELVE } from '../constants';

const registerSchema = yup.object().shape({
  name: yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Formato inválido')
    .required('Nome obrigatório')
    .min(TWELVE, 'O nome deve ter no mínimo 12 caracteres'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string()
    .required('Senha obrigatória')
    .min(SIX, 'A senha deve ter no mínimo 6 caracteres'),
}).required();

export default registerSchema;
