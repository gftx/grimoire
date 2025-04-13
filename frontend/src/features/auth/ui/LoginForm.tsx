import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '../api/login';
import { useAuth } from '../model/useAuth';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const setToken = useAuth((s) => s.setToken);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const { accessToken } = await login(data.email, data.password);

      setToken(accessToken);

      navigate('/me');
    } catch (error) {
      console.error('Ошибка логина:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            {...register('email', { required: 'Введите email' })}
            placeholder="Введите email" 
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label>Пароль:</label>
          <input 
            type="password" 
            {...register('password', { required: 'Введите пароль' })}
            placeholder="Введите пароль" 
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}