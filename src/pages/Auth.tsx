import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AUTH_URL = 'https://functions.poehali.dev/82d08264-0f89-4427-8d1f-2bc713d1ceee';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/login' : '/register';
      const body = mode === 'login'
        ? { username: form.username, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

      const res = await fetch(AUTH_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Произошла ошибка. Попробуй снова.');
      } else {
        localStorage.setItem('lame_user', JSON.stringify(data.user));
        navigate('/');
      }
    } catch {
      setError('Ошибка соединения с сервером.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary box-glow-red">
              <Icon name="Gamepad2" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider">
              LAME<span className="text-primary">CRMP</span>
            </span>
          </button>
        </div>
      </header>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="mb-8 flex rounded-lg border border-border overflow-hidden">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-3 font-display text-sm uppercase tracking-widest transition-colors ${
                  mode === m
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'login' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                <Icon name={mode === 'login' ? 'LogIn' : 'UserPlus'} size={28} className="text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold uppercase">
                {mode === 'login' ? 'Добро пожаловать' : 'Создать аккаунт'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === 'login'
                  ? 'Войди в свой аккаунт и продолжи игру'
                  : 'Зарегистрируйся и начни своё приключение'}
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                  Никнейм
                </Label>
                <Input
                  id="username"
                  placeholder="Твой игровой ник"
                  value={form.username}
                  onChange={set('username')}
                  required
                  className="bg-secondary border-border"
                />
              </div>

              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="твой@email.ru"
                    value={form.email}
                    onChange={set('email')}
                    required
                    className="bg-secondary border-border"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                  Пароль
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set('password')}
                  required
                  className="bg-secondary border-border"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <Icon name="AlertCircle" size={16} />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full font-display uppercase tracking-wide box-glow-red"
              >
                {loading ? (
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                ) : (
                  <Icon name={mode === 'login' ? 'LogIn' : 'UserPlus'} size={18} className="mr-2" />
                )}
                {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-accent underline underline-offset-4 hover:text-accent/80"
            >
              {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
