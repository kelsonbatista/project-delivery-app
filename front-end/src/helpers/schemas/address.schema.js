import * as yup from 'yup';

const addressSchema = yup.object({
  vendedor: yup.string()
    // .matches(/^[aA-zZ\s]+$/, 'Formato inválido')
    .required('Vendedor obrigatório'),
  endereco: yup.string().required('Endereço obrigatório'),
  numero: yup.string()
    .required('Número obrigatório'),
}).required();

export default addressSchema;
