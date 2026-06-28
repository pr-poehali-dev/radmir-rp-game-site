import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/d706b4b2-d09a-46df-9e98-640a5fd7e8e3/files/7386285a-f6f1-4134-89e3-c09c431f5d2f.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'forum', label: 'Форум' },
  { id: 'server', label: 'Сервер' },
  { id: 'leaders', label: 'Рейтинг' },
];

const STATS = [
  { icon: 'Users', value: '1 248', label: 'Игроков онлайн' },
  { icon: 'Server', value: '4', label: 'Активных сервера' },
  { icon: 'Trophy', value: '52K', label: 'Зарегистрировано' },
  { icon: 'Clock', value: '99.9%', label: 'Аптайм' },
];

const FORUM = [
  { icon: 'Megaphone', title: 'Новости проекта', desc: 'Анонсы, обновления и важные объявления', topics: 142, color: 'primary' },
  { icon: 'HelpCircle', title: 'Помощь новичкам', desc: 'Гайды по началу игры и ответы на вопросы', topics: 318, color: 'accent' },
  { icon: 'ShieldAlert', title: 'Жалобы и баги', desc: 'Сообщить о нарушении или ошибке на сервере', topics: 521, color: 'primary' },
  { icon: 'MessageSquare', title: 'Общение', desc: 'Свободные темы и обсуждения игроков', topics: 980, color: 'accent' },
];

const LEADERS = [
  { rank: 1, name: 'NightRider', level: 87, score: 142850, faction: 'LSPD' },
  { rank: 2, name: 'BlackMamba', level: 84, score: 138420, faction: 'Mafia' },
  { rank: 3, name: 'GhostX', level: 81, score: 131900, faction: 'FBI' },
  { rank: 4, name: 'VendettaRU', level: 79, score: 124350, faction: 'Bikers' },
  { rank: 5, name: 'Shadow_77', level: 76, score: 119870, faction: 'Yakuza' },
  { rank: 6, name: 'IronWolf', level: 74, score: 112540, faction: 'LSPD' },
  { rank: 7, name: 'CryptoKing', level: 71, score: 108200, faction: 'Mafia' },
  { rank: 8, name: 'RedViper', level: 68, score: 99650, faction: 'Army' },
];

const SERVERS = [
  { name: 'RADMIR #1 [GOLD]', online: 487, max: 500, ping: 24, status: 'online' },
  { name: 'RADMIR #2 [SILVER]', online: 412, max: 500, ping: 31, status: 'online' },
  { name: 'RADMIR #3 [BRONZE]', online: 349, max: 500, ping: 28, status: 'online' },
  { name: 'RADMIR #4 [DELUXE]', online: 0, max: 500, ping: 0, status: 'offline' },
];

const rankMedal = (rank: number) => {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-zinc-300';
  if (rank === 3) return 'text-amber-600';
  return 'text-muted-foreground';
};

export default function Index() {
  const [active, setActive] = useState('home');

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary box-glow-red">
              <Icon name="Gamepad2" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider">
              LAME<span className="text-primary">CRMP</span>
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`px-4 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors ${
                  active === n.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button className="font-display uppercase tracking-wide box-glow-red">
            <Icon name="LogIn" size={16} className="mr-1" /> Войти
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Radmir RP" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="font-display text-sm uppercase tracking-widest text-accent">Серверы онлайн</span>
            </div>
            <h1 className="font-display text-6xl font-bold uppercase leading-none tracking-tight md:text-8xl">
              Твой город.
              <br />
              <span className="text-primary text-glow-red">Твои правила.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Погрузись в живой мир ролевой игры. Строй карьеру, вступай в банды, зарабатывай репутацию и поднимайся в рейтинге лучших игроков.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="https://disk.yandex.com/d/OP8cqjlk9qWqOg" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="font-display text-base uppercase tracking-wide box-glow-red hover-scale">
                  <Icon name="Download" size={18} className="mr-2" /> Начать играть
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('leaders')}
                className="font-display text-base uppercase tracking-wide border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Icon name="Trophy" size={18} className="mr-2" /> Таблица лидеров
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card/50">
        <div className="container grid grid-cols-2 gap-px md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 py-10 text-center">
              <Icon name={s.icon} size={28} className="text-primary" />
              <span className="font-display text-4xl font-bold">{s.value}</span>
              <span className="text-sm uppercase tracking-wide text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FORUM */}
      <section id="forum" className="container py-24">
        <div className="mb-12 text-center">
          <span className="font-display text-sm uppercase tracking-widest text-accent">Сообщество</span>
          <h2 className="mt-2 font-display text-5xl font-bold uppercase">Форум</h2>
          <p className="mt-3 text-muted-foreground">Обсуждай, помогай и делись опытом с тысячами игроков</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {FORUM.map((f) => (
            <div
              key={f.title}
              className="group flex items-center gap-5 rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:box-glow-red"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${f.color === 'primary' ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent'}`}>
                <Icon name={f.icon} size={26} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="font-display text-lg font-bold">{f.topics}</p>
                <p className="text-xs uppercase text-muted-foreground">тем</p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          ))}
        </div>
      </section>

      {/* SERVER */}
      <section id="server" className="relative border-y border-border bg-card/30 py-24 grid-bg">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="font-display text-sm uppercase tracking-widest text-accent">Подключение</span>
            <h2 className="mt-2 font-display text-5xl font-bold uppercase">Серверы</h2>
            <p className="mt-3 text-muted-foreground">Выбирай сервер и заходи в игру прямо сейчас</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {SERVERS.map((srv) => {
              const isOnline = srv.status === 'online';
              const fill = isOnline ? Math.round((srv.online / srv.max) * 100) : 0;
              return (
                <div key={srv.name} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-accent animate-pulse-glow' : 'bg-muted-foreground'}`} />
                      <span className="font-display text-lg font-semibold tracking-wide">{srv.name}</span>
                    </div>
                    <Button size="sm" disabled={!isOnline} className="font-display uppercase tracking-wide">
                      {isOnline ? 'Играть' : 'Тех. работы'}
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all" style={{ width: `${fill}%` }} />
                    </div>
                    <span className="w-24 text-right text-sm text-muted-foreground">
                      {isOnline ? `${srv.online}/${srv.max}` : '— / —'}
                    </span>
                    <span className="flex w-16 items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Wifi" size={14} /> {isOnline ? `${srv.ping}ms` : '—'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaders" className="container py-24">
        <div className="mb-12 text-center">
          <span className="font-display text-sm uppercase tracking-widest text-accent">Соревнование</span>
          <h2 className="mt-2 font-display text-5xl font-bold uppercase">Таблица лидеров</h2>
          <p className="mt-3 text-muted-foreground">Лучшие игроки сезона по очкам репутации</p>
        </div>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-12 gap-4 border-b border-border bg-card px-6 py-4 font-display text-xs uppercase tracking-widest text-muted-foreground">
            <span className="col-span-3 md:col-span-2">Место</span>
            <span className="col-span-4">Игрок</span>
            <span className="col-span-2 hidden text-center md:block">Уровень</span>
            <span className="col-span-2 hidden text-center md:block">Фракция</span>
            <span className="col-span-5 text-right md:col-span-2">Очки</span>
          </div>
          {LEADERS.map((p) => (
            <div
              key={p.rank}
              className={`grid grid-cols-12 items-center gap-4 border-b border-border px-6 py-4 transition-colors hover:bg-card ${
                p.rank <= 3 ? 'bg-card/60' : ''
              }`}
            >
              <span className="col-span-3 flex items-center gap-2 md:col-span-2">
                {p.rank <= 3 ? (
                  <Icon name="Medal" size={22} className={rankMedal(p.rank)} />
                ) : (
                  <span className="w-[22px] text-center font-display text-lg text-muted-foreground">{p.rank}</span>
                )}
                <span className={`font-display text-lg font-bold ${rankMedal(p.rank)}`}>#{p.rank}</span>
              </span>
              <span className="col-span-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-primary">
                  {p.name[0]}
                </div>
                <span className="font-semibold">{p.name}</span>
              </span>
              <span className="col-span-2 hidden text-center font-display text-lg text-accent md:block">{p.level}</span>
              <span className="col-span-2 hidden text-center text-sm text-muted-foreground md:block">{p.faction}</span>
              <span className="col-span-5 text-right font-display text-lg font-bold md:col-span-2">{p.score.toLocaleString('ru')}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" className="font-display uppercase tracking-wide border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Icon name="List" size={16} className="mr-2" /> Полный рейтинг
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="Gamepad2" size={20} className="text-primary" />
            <span className="font-display text-lg font-bold tracking-wider">
              LAME<span className="text-primary">CRMP</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Radmir RP. Все права защищены.</p>
          <div className="flex gap-3">
            {['MessageCircle', 'Send', 'Youtube'].map((ic) => (
              <button key={ic} className="flex h-9 w-9 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}