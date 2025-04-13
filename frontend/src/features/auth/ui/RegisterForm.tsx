import { useForm, SubmitHandler } from 'react-hook-form';
import { register as registerApi } from '../api/register';
import { useNavigate } from 'react-router-dom';

type RegisterFormValues = {
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await registerApi(data.email, data.password);
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            {...register('email', { required: 'Укажите email' })}
            placeholder="Введите email" 
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label>Пароль:</label>
          <input 
            type="password" 
            {...register('password', { required: 'Укажите пароль' })}
            placeholder="Введите пароль" 
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}