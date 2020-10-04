# Recuperação de Senha

**RF (Requisitos Funcionais)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos Não Funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazons SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN (Regra de Negócio)**

- O link enviado por e-mail para resetar senha deve expirar em duas horas;
- O usuário precisa confirmar a nova senha ao resetar a senha;

# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu perfil, nome, email e senha;

**RNF**

**RN**

- Usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua nova senha;

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamento do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- Listagem de prestadores devem ser armazenado em cache;

**RN**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h as 18h (Primeiro às 08 e o ultimo as 17h)
- O usuário não pode agendar em um horario já ocupado
- O usuário não pode agendar um horario que já passou
- O usuário não pode agendar um serviço consigo mesmo
