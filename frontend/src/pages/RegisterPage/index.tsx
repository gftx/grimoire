import { useForm } from 'react-hook-form';
import { authService } from '@/shared/services/AuthService';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/shared/config/routes';
import './styles.scss';

interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
}

export const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await authService.register(data.email, data.username, data.password);
      navigate(AppRoutes.ME);
    } catch (error) {
      console.error('Registration failed', error);
      // В будущем можно показать уведомление
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-page__title">Register in Grimoire</h1>
      <form className="register-page__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-page__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="register-page__error">{errors.email.message}</span>}
        </div>

        <div className="register-page__field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <span className="register-page__error">{errors.username.message}</span>}
        </div>

        <div className="register-page__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span className="register-page__error">{errors.password.message}</span>}
        </div>

        <button type="submit" className="register-page__submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        <div className="register-page__footer">
          <span>Already have an account?</span>
          <a href={AppRoutes.LOGIN} className="register-page__link">Login</a>
        </div>
      </form>
    </div>
  );
};