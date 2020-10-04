import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/apiClient';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/Toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContent, Background } from './styles';

import logoImg from '../../assets/logo.svg';

interface signUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: signUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido.'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso.',
          description: 'Você já pode fazer logon no GoBarber.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao realizar cadastro',
          description: 'Houve um erro ao realizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />
        <Content>
          <AnimationContent>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
              <Input
                name="email"
                icon={FiMail}
                type="text"
                placeholder="E-mail"
              />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContent>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
