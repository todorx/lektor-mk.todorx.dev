import { useEffect, useState } from 'react'

const logoSrc = new URL('./assets/logo.png', import.meta.url).href

const GITHUB = 'https://github.com/todorx/lektor-mk'
const AUTHOR = 'https://todorx.dev/mk/'

// ─── Sections (drive the left rail) ───────────────────────────────────────────
const SECTIONS = [
  { id: 'index', label: 'Почеток' },
  { id: 'demo', label: 'Демо' },
  { id: 'privacy', label: 'Приватност' },
  { id: 'features', label: 'Функции' },
  { id: 'stats', label: 'Бројки' },
  { id: 'code', label: 'Код' },
  { id: 'faq', label: 'Прашања' },
  { id: 'contact', label: 'Преземи' },
]
const SECTION_IDS = SECTIONS.map((s) => s.id)

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids])

  return active
}

function Rail() {
  const active = useActiveSection(SECTION_IDS)
  return (
    <nav className="rail" aria-label="Секции">
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          title={label}
          aria-label={label}
          aria-current={active === id ? 'location' : undefined}
        >
          <span />
        </a>
      ))}
    </nav>
  )
}

function Mark() {
  return <img className="mark" src={logoSrc} alt="" width={24} height={24} />
}

// ─── Interactive demo ─────────────────────────────────────────────────────────
function Demo() {
  const [fixed, setFixed] = useState(false)

  return (
    <div className="demo" role="group" aria-label="Интерактивна демо">
      <div className="demo-bar">
        <span className="demo-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="demo-url">docs.gov.mk</span>
        <Mark />
      </div>

      <p className="demo-text">
        Ја прочитав{' '}
        {fixed ? (
          <span className="corrected">убавата книга</span>
        ) : (
          <button type="button" className="err" onClick={() => setFixed(true)}>
            убавата книгата
          </button>
        )}{' '}
        вчера навечер.
      </p>

      <div className="demo-panel" aria-live="polite">
        {fixed ? (
          <>
            <div className="demo-rule">
              <b>✓ 0 грешки</b>
            </div>
            <button type="button" className="btn btn-ghost" onClick={() => setFixed(false)}>
              Врати назад
            </button>
          </>
        ) : (
          <>
            <div className="demo-rule">
              <b className="bad">✗ Двојна определба</b>
              <span>Членот не се удвојува → <b>убавата книга</b></span>
            </div>
            <button type="button" className="btn btn-outline" onClick={() => setFixed(true)}>
              Примени поправка
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="index" className="hero">
      <div className="hero-main">
        <div className="eyebrow eyebrow-row">
          <Mark />
          <span>Firefox додаток  /  GPL-3.0</span>
        </div>
        <h1>Лектор-МК</h1>
        <p className="lede">
          Првиот вистински <em>правопис за македонски</em>. Бесплатна, отворена Firefox додатка што проверува правопис и граматика <em>целосно на вашиот уред</em> — без сервери, без сметки.
        </p>
        <div className="cta">
          <a className="btn btn-outline" href={GITHUB} target="_blank" rel="noopener noreferrer">
            Преземи од GitHub ↗
          </a>
          <a className="btn btn-ghost" href="#features">Функции ↓</a>
        </div>
        <div className="status">
          <span><span className="status-dot" />Работи целосно офлајн</span>
          <span>Бесплатно и со отворен код</span>
        </div>
      </div>

      <aside className="hero-aside">
        <div className="stack-2">
          <div className="eyebrow-sm">Што е</div>
          <div className="strong">Правопис и граматика</div>
          <div className="muted">за македонски јазик, директно во прелистувачот</div>
        </div>
        <div className="stack-3">
          <div className="eyebrow-sm">Технологија</div>
          <div className="tags">
            <span className="tag tag-outline">Rust</span>
            <span className="tag tag-outline">WebAssembly</span>
            <span className="tag tag-outline">FST</span>
            <span className="tag tag-outline">Firefox</span>
            <span className="tag tag-outline">GPL-3.0</span>
          </div>
        </div>
        <div className="links">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={AUTHOR} target="_blank" rel="noopener noreferrer">Автор ↗</a>
        </div>
      </aside>
    </section>
  )
}

// ─── Demo section ─────────────────────────────────────────────────────────────
function DemoSection() {
  return (
    <section id="demo" className="section">
      <h2>Демо</h2>
      <div className="section-body">
        <Demo />
        <p className="demo-hint">Кликнете на грешката за да видите поправка во реално време.</p>
      </div>
    </section>
  )
}

// ─── Privacy ──────────────────────────────────────────────────────────────────
function Privacy() {
  return (
    <section id="privacy" className="section section-about">
      <h2>Приватност</h2>
      <div className="section-body about-body">
        <div className="figure">100% <em>локално</em></div>
        <p className="about-lead">
          Лекторот гледа сè — деловни извештаи, лични пораки, новинарски написи пред објава. Грамерли и слични алатки го испраќаат тој текст на свои сервери. Лектор-МК не.
        </p>
        <p className="about-sub">
          Целиот мотор — речникот, граматиката, предлозите — се испорачува внатре во додатката како неколку мегабајти WebAssembly и работи исклучиво во вашиот прелистувач.
        </p>
        <p className="about-sub">
          Ова е особено важно за новинари, лектори и државни службеници кои работат со доверлив материјал.
        </p>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    title: 'Правопис со рангирани поправки',
    kind: '427.464 форми',
    body: '427.464 форми стиснати во 1,25 MB конечно-статусен трансдуктор. Предлози рангирани по фреквенција и македонски конфузии (к/ќ, е/ѐ), плус контекст на соседните зборови.',
  },
  {
    title: 'Детекција на хомоглифи',
    kind: 'латиница во кирилица',
    body: 'Открива латинични букви скриени во кирилски зборови — пиксел-идентични, невидливи за луѓе, но ги кршат пребарувањето и сортирањето. Открива и српски/руски/бугарски букви.',
  },
  {
    title: 'Граматички правила',
    kind: '0 лажни позитиви',
    body: 'Двојна определба (убавата книгата ✗), редослед на клитики (ми го даде / го ми даде), ѝ vs и, согласување на л-партицип — прецизно подесено на нула лажни позитиви.',
  },
  {
    title: 'Брзо и офлајн',
    kind: '~6,2 MB',
    body: '17.782 зборови проверени за 0,95 секунди. Целата додатка е ~6,2 MB. Работи без интернет — во авион, во болница, зад заштитен ѕид.',
  },
  {
    title: 'WebAssembly мотор',
    kind: 'Rust · WASM',
    body: 'Написан во Rust и компајлиран до WASM. Речникот, граматиката и автодополнувањето работат директно во прелистувачот без инсталација на надворешни програми.',
  },
]

function Features() {
  return (
    <section id="features" className="section">
      <h2>Функции</h2>
      <div className="section-body projects">
        <p className="about-lead">
          Ниту еден постоечки алат — LanguageTool, Grammarly, ниту друг — не поддржува македонски. Лектор-МК е направен специфично за македонскиот правопис и граматика.
        </p>
        {features.map((f) => (
          <div key={f.title} className="project">
            <div className="project-head">
              <h3 className="project-name">{f.title}</h3>
              <span className="project-kind">{f.kind}</span>
            </div>
            <p className="project-desc">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { n: '427.464', label: 'лексички форми', sub: 'во 1,25 MB FST' },
  { n: '2,78%', label: 'стапка на грешки', sub: 'на живата мак. Википедија' },
  { n: '0', label: 'лажни позитиви', sub: 'на 17.782 збора уредена проза' },
  { n: '0,95 s', label: 'за 17.782 зборови', sub: 'целосна провера' },
  { n: '~6,2 MB', label: 'вкупна големина', sub: 'вградено во додатката' },
  { n: '71.109', label: 'имиња во газетир', sub: 'намалувачи на лажни аларми' },
]

function Stats() {
  return (
    <section id="stats" className="section">
      <h2>Бројки</h2>
      <div className="section-body">
        <div className="stack-2">
          <div className="eyebrow-sm">Измерени бројки · сите репродуцибилни</div>
          <p className="about-lead">Бројки, не ветувања. Секој број е измерен и може да се репродуцира од README.</p>
        </div>
        <div className="stats">
          {stats.map(({ n, label, sub }) => (
            <div key={label} className="stat">
              <div className="stat-n">{n}</div>
              <div className="stat-label">{label}</div>
              <div className="stat-sub">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Open source ──────────────────────────────────────────────────────────────
const sources = [
  { name: 'gerazov/dictionary-mk', use: 'Основен речник (261.460 форми)', license: 'GPL-2.0' },
  { name: 'apertium-mkd', use: 'Парадигми / морфолошко проширување', license: 'GPL' },
  { name: 'МК Википедија — написи', use: 'Фреквентни броења', license: 'CC BY-SA 4.0' },
  { name: 'МК Википедија — наслови', use: 'Газетир со сопствени имиња', license: 'CC BY-SA 4.0' },
]

function OpenSource() {
  return (
    <section id="code" className="section">
      <h2>Код</h2>
      <div className="section-body about-body">
        <p className="about-lead">Слободен, отворен, заеднички.</p>
        <p className="about-sub">
          GPL-3.0-or-later. Изворниот код, речникот, граматичките правила и алатките за изградба се целосно достапни.
        </p>
        <div>
          <a className="btn btn-outline" href={GITHUB} target="_blank" rel="noopener noreferrer">
            todorx/lektor-mk ↗
          </a>
        </div>

        <div className="stack-3" style={{ marginTop: 'var(--space-6)' }}>
          <div className="eyebrow-sm">Извори на податоци</div>
          {sources.map((s) => (
            <div key={s.name} className="job">
              <div className="job-title">{s.name} <span>— {s.license}</span></div>
              <div className="job-detail">{s.use}</div>
            </div>
          ))}
        </div>
        <p className="project-stack">Лиценцирано под GPL-3.0-or-later, наследено од речничката зависност.</p>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Кои прелистувачи се поддржани?',
    a: 'Тековно само Firefox. Додатката користи Manifest V2, кој Chrome го укина. Поддршката за Chrome/Edge е планирана кога Manifest V3 ќе овозможи еквивалентен API.',
  },
  {
    q: 'Дали работи без интернет?',
    a: 'Да, целосно. Речникот, граматиката и автодополнувањето се дел од додатката. По инсталацијата не е потребна мрежна врска.',
  },
  {
    q: 'Дали мојот текст се праќа некаде?',
    a: 'Никогаш. Нема сервери, нема сметки, нема аналитика. Целиот мотор работи во вашиот прелистувач. Може да го верифицирате со преглед на изворниот код.',
  },
  {
    q: 'Зошто само Firefox, а не Chrome?',
    a: 'Chrome го укина Manifest V2, кој ни овозможуваше да го вбризгуваме моторот во секоја страница. Manifest V3 сè уште нема доволно API. Firefox продолжи со поддршка на MV2.',
  },
]

function FAQ() {
  return (
    <section id="faq" className="section">
      <h2>Прашања</h2>
      <div className="section-body" style={{ gap: 0 }}>
        {faqs.map((f, i) => (
          <details key={f.q} className="faq" open={i === 0}>
            <summary>
              <span>{f.q}</span>
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

// ─── Contact / colophon ───────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      /* clipboard unavailable — the link above still works */
    }
  }

  return (
    <button className="btn btn-ghost" type="button" onClick={copy}>
      {copied ? 'Копирано' : 'Копирај'}
    </button>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="eyebrow">Преземи</div>
      <div className="contact-row">
        <a className="email" href={GITHUB} target="_blank" rel="noopener noreferrer">
          github.com/todorx/lektor-mk
        </a>
        <CopyButton text={GITHUB} />
      </div>
      <footer className="colophon">
        <span>
          <Mark />
          <span>
            Лектор-МК · GPL-3.0-or-later · Изработено од <a href={AUTHOR}>Тодор Тодоровски</a>
          </span>
        </span>
        <nav className="langs" aria-label="Врски">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </nav>
      </footer>
    </section>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Rail />
      <main>
        <Hero />
        <DemoSection />
        <Privacy />
        <Features />
        <Stats />
        <OpenSource />
        <FAQ />
        <Contact />
      </main>
    </>
  )
}
