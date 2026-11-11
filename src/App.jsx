import React, { useState } from "react";

const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || "";

const packages = [
  {
    id: "mini",
    tag: "Na dobry początek",
    title: "Mini Safari",
    duration: "ok. 1 godziny",
    price: "699 zł",
    summary: "Pierwsza porcja emocji, szutrowe drogi i krótki przystanek na zdjęcia.",
    points: ["Prowadzona trasa krajobrazowa", "Instruktaż przed startem", "Postój fotograficzny"],
    accent: false,
  },
  {
    id: "classic",
    tag: "Najbardziej uniwersalny",
    title: "Classic Safari",
    duration: "ok. 2 godzin",
    price: "1 299 zł",
    summary: "Więcej kaszubskich widoków, szutru i swobody odkrywania okolicy.",
    points: ["Dłuższa trasa z przewodnikiem", "Widokowe przystanki", "Czas na rodzinne zdjęcia"],
    accent: true,
  },
  {
    id: "vip",
    tag: "Prywatne doświadczenie",
    title: "Golden Hour VIP",
    duration: "ok. 3–4 godzin",
    price: "1 899 zł",
    summary: "Spokojniejsze tempo, najlepsze światło dnia i prywatna wyprawa, którą zapamiętasz.",
    points: ["Prywatny charakter wyprawy", "Zachód słońca i zdjęcia", "Opcjonalne wątki lokalnej historii"],
    accent: false,
  },
];

const months = [
  ["2027-05", "Maj 2027"],
  ["2027-06", "Czerwiec 2027"],
  ["2027-07", "Lipiec 2027"],
  ["2027-08", "Sierpień 2027"],
  ["2027-09", "Wrzesień 2027"],
];

const faq = [
  {
    q: "Czy Kaszubskie Safari już działa?",
    a: "To planowana oferta na sezon maj–wrzesień 2027. Teraz badamy zainteresowanie. Pozostawienie kontaktu nie jest rezerwacją ani zobowiązaniem do zapłaty.",
  },
  {
    q: "Czy będę mógł samodzielnie prowadzić buggy?",
    a: "Rozważamy zarówno wariant samodzielnego prowadzenia, jak i przejazd z kierowcą. Ostateczne zasady ustalimy po wyborze pojazdu, weryfikacji uprawnień i ubezpieczenia.",
  },
  {
    q: "Czy oferta będzie odpowiednia dla rodzin?",
    a: "Taką ofertę planujemy w pierwszej kolejności. Liczba miejsc oraz ograniczenia wieku i wzrostu będą zależały od homologacji i wyposażenia konkretnego buggy.",
  },
  {
    q: "Czy zobaczymy kaszubskie kurhany?",
    a: "Planujemy warianty z opowieścią o historii regionu i przystankami przy wybranych miejscach, w tym kurhanach. Dokładny przebieg wypraw podamy po zatwierdzeniu tras dla pojazdów.",
  },
];

function Arrow({ className = "" }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="m6 33 11-15 7 9 6-8 12 14H6Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /><path d="M11 37h26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><circle cx="35" cy="12" r="4" fill="currentColor" /></svg></span>;
}

export default function App() {
  const [chosen, setChosen] = useState("classic");
  const [type, setType] = useState("Prywatna wyprawa");
  const [month, setMonth] = useState("2027-07");
  const [participants, setParticipants] = useState("4");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [state, setState] = useState({ kind: "idle", message: "" });

  const selectPackage = (id) => {
    setChosen(id);
    document.getElementById("zainteresowanie")?.scrollIntoView({ behavior: "smooth" });
  };

  async function submit(e) {
    e.preventDefault();
    if (!contactConsent) {
      setState({ kind: "error", message: "Potwierdź zgodę na kontakt w sprawie zapytania." });
      return;
    }
    if (!LEAD_ENDPOINT) {
      setState({ kind: "preview", message: "To wersja do zatwierdzenia. Formularz nie przesyła ani nie zapisuje danych. Podłączymy odbiorcę zgłoszeń przed kampanią." });
      return;
    }
    setState({ kind: "loading", message: "Przesyłanie zgłoszenia…" });
    try {
      const payload = {
        package: chosen,
        experience: type,
        month,
        participants,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        contactConsent,
        marketingConsent,
        source: "kaszubskie-safari-landing-2027",
      };
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Wysyłka nie powiodła się");
      setState({ kind: "success", message: "Dziękujemy. Otrzymaliśmy Twoje zainteresowanie planowaną ofertą na sezon 2027. To jeszcze nie jest rezerwacja." });
      setName(""); setEmail(""); setPhone(""); setMessage("");
      setContactConsent(false); setMarketingConsent(false);
    } catch {
      setState({ kind: "error", message: "Nie udało się przesłać formularza. Spróbuj ponownie później. Żadne zgłoszenie nie zostało potwierdzone." });
    }
  }

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> Projekt w przygotowaniu · Sezon maj–wrzesień 2027 · Teraz badamy zainteresowanie</div>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#start" className="brand" aria-label="Kaszubskie Safari — początek"><Mark /><span><strong>KASZUBSKIE</strong><small>SAFARI</small></span></a>
          <nav className="desktop-nav" aria-label="Nawigacja główna">
            <a href="#doswiadczenie">Doświadczenie</a>
            <a href="#pakiety">Pakiety</a>
            <a href="#historia">Kaszuby i historia</a>
            <a href="#faq">Pytania</a>
          </nav>
          <a href="#zainteresowanie" className="header-cta">Lista zainteresowanych <Arrow /></a>
        </div>
      </header>

      <section id="start" className="hero">
        <div className="hero-picture" role="img" aria-label="Poglądowa grafika kaszubskiej przygody — do zastąpienia prawdziwymi zdjęciami z tras"></div>
        <div className="hero-shade"></div>
        <div className="container hero-content">
          <p className="eyebrow hero-eyebrow"><span /> ODKRYJ KASZUBY PO SWOJEMU</p>
          <h1>Nie wypożyczamy pojazdów.<br /><em>Tworzymy wspomnienia.</em></h1>
          <p className="hero-lead">Wsiądź w przygodę: kaszubskie szutry, widokowe przystanki, lokalne historie i emocje, które zabierzesz do domu. Planujemy prowadzone wyprawy buggy dla rodzin, par i małych grup.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#pakiety">Poznaj planowane wyprawy <Arrow /></a>
            <a className="btn btn-glass" href="#zainteresowanie">Interesuje mnie sezon 2027</a>
          </div>
          <p className="hero-caption">Grafika poglądowa z wcześniejszego projektu. Autentyczne materiały z tras przygotujemy przed kampanią.</p>
        </div>
        <div className="hero-bottom container">
          <span>01 / KASZUBY INACZEJ</span>
          <span>PRZYGODA · KRAJOBRAZ · HISTORIA</span>
        </div>
      </section>

      <section id="doswiadczenie" className="intro section">
        <div className="container intro-grid">
          <div>
            <p className="eyebrow"><span /> CO NAS WYRÓŻNIA</p>
            <h2>Zwykły dzień na Kaszubach?<br /><em>Nie tym razem.</em></h2>
          </div>
          <div>
            <p className="intro-copy">To propozycja dla tych, którzy mają ochotę na coś więcej niż kolejny spacer. Rodzinna wyprawa, prezent dla bliskich, randka o zachodzie słońca czy małe świętowanie — wybierasz okazję, my planujemy trasę i jej oprawę.</p>
            <div className="qualities">
              <div><b>01</b><span>Przygoda dostępna również dla rodzin</span></div>
              <div><b>02</b><span>Kaszubskie widoki i przystanki na zdjęcia</span></div>
              <div><b>03</b><span>Lokalne historie zamiast zwykłego wynajmu</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="pakiety" className="packages section section-sand">
        <div className="container">
          <div className="section-topline"><p className="eyebrow"><span /> WYBIERZ SWÓJ MOMENT</p><p>Pakiety i ceny do walidacji rynkowej</p></div>
          <div className="section-heading"><h2>Trzy sposoby na <em>przygodę.</em></h2><p>Wszystkie pakiety są koncepcją oferty na sezon 2027. Podane ceny są orientacyjne — sprawdzamy zainteresowanie, nie przyjmujemy jeszcze rezerwacji.</p></div>
          <div className="package-grid">
            {packages.map((p, index) => (
              <article key={p.id} className={"package-card" + (p.accent ? " featured" : "")}>
                <div className="package-top"><span className="package-index">0{index + 1}</span><span className="package-tag">{p.tag}</span></div>
                <div className="package-art"><span>{index === 0 ? "SZUTER" : index === 1 ? "ODKRYWANIE" : "ZŁOTA GODZINA"}</span></div>
                <div className="package-inner">
                  <p className="duration">{p.duration}</p>
                  <h3>{p.title}</h3>
                  <p className="package-desc">{p.summary}</p>
                  <ul>{p.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  <div className="package-bottom"><div><span className="from">Cena testowa za grupę</span><strong>{p.price}</strong></div><button className="package-button" type="button" onClick={() => selectPackage(p.id)} aria-label={"Jestem zainteresowany pakietem " + p.title}><Arrow /></button></div>
                </div>
              </article>
            ))}
          </div>
          <p className="package-notice">Dostępność pojazdów, liczba miejsc, możliwość prowadzenia i finalne ceny zależą od uruchomienia usługi oraz warunków bezpieczeństwa.</p>
        </div>
      </section>

      <section id="historia" className="heritage section">
        <div className="container heritage-grid">
          <div className="heritage-visual">
            <div className="heritage-line"></div>
            <span className="heritage-number">54°</span>
            <div className="heritage-bottom"><span>KASZUBY</span><span>POZA GŁÓWNYM SZLAKIEM</span></div>
          </div>
          <div className="heritage-copy">
            <p className="eyebrow"><span /> WIĘCEJ NIŻ JAZDA</p>
            <h2>Tu krajobraz<br />ma swoją <em>historię.</em></h2>
            <p>Wyobraź sobie zatrzymanie przy malowniczym punkcie widokowym, krótką opowieść o lokalnych miejscach i odkrywanie śladów przeszłości — także kaszubskich kurhanów.</p>
            <p>Chcemy łączyć jazdę buggy z autentycznym doświadczeniem regionu. Szczegółowe przystanki dobierzemy do ostatecznie zatwierdzonych tras i warunków dostępu.</p>
            <a href="#zainteresowanie" className="text-link">Chcę poznać tę ofertę <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="occasion section section-forest">
        <div className="container occasion-grid">
          <div><p className="eyebrow"><span /> DLA KOGO?</p><h2>Nie trzeba mieć okazji.<br /><em>Ale można ją stworzyć.</em></h2></div>
          <div className="occasion-pills"><span>Rodzinne popołudnie</span><span>Wyjątkowa randka</span><span>Golden Hour</span><span>Prezent i voucher</span><span>Wieczór kawalerski</span><span>Mała integracja</span></div>
        </div>
      </section>

      <section id="zainteresowanie" className="signup section">
        <div className="container signup-grid">
          <div className="signup-copy">
            <p className="eyebrow"><span /> SEZON 2027</p>
            <h2>Chcesz być<br /><em>jednym z pierwszych?</em></h2>
            <p>Pomóż nam dopracować ofertę. Wybierz pakiet i orientacyjny miesiąc, a po uruchomieniu zapisów otrzymasz informację o dostępnych terminach.</p>
            <div className="signup-info"><span className="info-star">✳</span><p>To badanie zainteresowania. Nie pobieramy opłat, nie gwarantujemy terminów i nie dokonujemy rezerwacji.</p></div>
          </div>
          <div className="form-wrap">
            <div className="form-head"><span>01 / ZAPYTANIE</span><span>MAJ—WRZESIEŃ 2027</span></div>
            <h3>Wybierz swoją przygodę</h3>
            <form onSubmit={submit}>
              <label htmlFor="offer">Pakiet</label>
              <select id="offer" value={chosen} onChange={(e) => setChosen(e.target.value)}>
                {packages.map((p) => <option key={p.id} value={p.id}>{p.title} — {p.price} (cena testowa)</option>)}
              </select>
              <div className="fields-two">
                <div><label htmlFor="month">Preferowany miesiąc</label><select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>{months.map(([value, title]) => <option key={value} value={value}>{title}</option>)}</select></div>
                <div><label htmlFor="count">Liczba uczestników</label><select id="count" value={participants} onChange={(e) => setParticipants(e.target.value)}><option value="1">1 osoba</option><option value="2">2 osoby</option><option value="3">3 osoby</option><option value="4">4 osoby</option><option value="5+">5+ osób / grupa</option></select></div>
              </div>
              <label htmlFor="experience">Rodzaj zainteresowania</label>
              <select id="experience" value={type} onChange={(e) => setType(e.target.value)}><option>Prywatna wyprawa</option><option>Pojedyncze miejsce we wspólnej grupie</option><option>Wyjazd VIP / okazja</option><option>Firma / grupa zorganizowana</option></select>
              <div className="fields-two"><div><label htmlFor="name">Imię <span>(opcjonalnie)</span></label><input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Twoje imię" autoComplete="given-name" /></div><div><label htmlFor="phone">Telefon <span>(opcjonalnie)</span></label><input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+48 ..." autoComplete="tel" /></div></div>
              <label htmlFor="email">Adres e-mail <span className="required">*</span></label>
              <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="twoj@email.pl" autoComplete="email" required maxLength={254} />
              <label htmlFor="message">Co byłoby dla Ciebie najważniejsze? <span>(opcjonalnie)</span></label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="3" placeholder="Np. rodzinna wyprawa, zachód słońca, historia regionu…" maxLength={700} />
              <label className="checkbox"><input type="checkbox" required checked={contactConsent} onChange={(e) => setContactConsent(e.target.checked)} /><span>Proszę o kontakt dotyczący wskazanej przeze mnie oferty. Rozumiem, że nie dokonuję rezerwacji. <b>*</b></span></label>
              <label className="checkbox"><input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} /><span>Chcę także otrzymywać przyszłe informacje marketingowe o Kaszubskim Safari. (Opcjonalnie)</span></label>
              <button className="btn btn-primary form-submit" type="submit" disabled={state.kind === "loading"}>Sprawdź moje zainteresowanie <Arrow /></button>
              {state.kind !== "idle" && <p className={"form-status " + state.kind} role="status">{state.message}</p>}
              <p className="form-disclaimer">Tryb podglądu: dane nie są nigdzie wysyłane bez skonfigurowanego odbiorcy. Przed uruchomieniem trzeba podać dane administratora i pełną informację o prywatności.</p>
            </form>
          </div>
        </div>
      </section>

      <section id="faq" className="faq section section-sand">
        <div className="container faq-grid"><div><p className="eyebrow"><span /> DOBRZE WIEDZIEĆ</p><h2>Najczęstsze <em>pytania.</em></h2></div><div className="faq-items">{faq.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div></div>
      </section>

      <footer className="footer"><div className="container footer-grid"><a href="#start" className="brand brand-footer"><Mark /><span><strong>KASZUBSKIE</strong><small>SAFARI</small></span></a><p>Przygoda. Widoki. Historia.<br />Planowana oferta turystyczna na sezon 2027.</p><a href="#zainteresowanie">Wyraź zainteresowanie <Arrow /></a></div><div className="container footer-bottom"><span>© 2026 Kaszubskie Safari</span><span>Projekt koncepcyjny · Bez aktywnych rezerwacji</span></div></footer>
    </main>
  );
}
