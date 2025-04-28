import { useForm } from 'react-hook-form';
import { authService } from '@/shared/services/AuthService';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/shared/config/routes';
import './styles.scss';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await authService.login(data.email, data.password);
      navigate(AppRoutes.ME);
    } catch (error) {
      console.error('Login failed', error);
      // В будущем можно показать уведомление
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page__title">Login to Grimoire 🧙‍♂️</h1>
      <form className="login-page__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-page__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="login-page__error">{errors.email.message}</span>}
        </div>

        <div className="login-page__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span className="login-page__error">{errors.password.message}</span>}
        </div>

        <button type="submit" className="login-page__submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="login-page__footer">
          <span>Don't have an account?</span>
          <a href={AppRoutes.REGISTER} className="login-page__link">Register</a>
        </div>
      </form>
    </div>
  );
};