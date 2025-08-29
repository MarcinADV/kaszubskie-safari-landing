import React, { useState, useEffect } from "react";


Gemini_Generated_Image_ps2e3fps2e3fps2e.png;

function useLeads() {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    const raw = localStorage.getItem("ks_leads");
    if (raw) setLeads(JSON.parse(raw));
  }, []);
  const addLead = (lead) => {
    const next = [...leads, { ...lead, ts: new Date().toISOString() }];
    setLeads(next);
    localStorage.setItem("ks_leads", JSON.stringify(next));
  };
  return { leads, addLead };
}

const features = [
  { title: "Trasa Standard 1h", price: "Buggy 500 zł / Quad 220 zł", desc: "Widokowa pętla A→A z 10-minutowym foto-stopem. Jazda w kolumnie z przewodnikiem.", icon: "🚙" },
  { title: "Extreme 2h",       price: "Buggy 900 zł / Quad 400 zł", desc: "Więcej terenu, piachu i błota. Dłuższa trasa, mocniejsze wrażenia.", icon: "⛰️" },
  { title: "Night Ride 1.5h",  price: "Buggy 700 zł / Quad 300 zł", desc: "Nocne safari z oświetleniem LED i ogniskiem u partnera (opcjonalnie).", icon: "🌙" },
  { title: "Pakiet Rodzinny",  price: "Zestaw: 1 buggy + 2 quady ≈ 940 zł", desc: "Rodzinna wyprawa po kaszubskich szutrach. Zdjęcia/video w cenie pakietu.", icon: "👨‍👩‍👧‍👦" },
];

const routes = [
  { name: "Kaszubskie Szutry",        level: "łatwa",         desc: "Lekka trasa widokowa. Jeziora, lasy i klasyczne szutry." },
  { name: "Kaszubska Dzicz",          level: "średnia+",      desc: "Bardziej terenowo: piach, błoto, polany. Dla żądnych adrenaliny." },
  { name: "Szlak Jezior Raduńskich",  level: "łatwa/średnia", desc: "Panoramy jezior, punkty widokowe. Instagram-ready." },
  { name: "Kaszubskie Safari Nocą",   level: "średnia",       desc: "Wieczorna pętla z ogniskiem. Światła LED i klimat 10/10." },
];

export default function App() {
  const { addLead } = useLeads();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState(null);

  function validEmail(v) { return /.+@.+\..+/.test(v); }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validEmail(email)) { setStatus({ ok: false, text: "Podaj poprawny adres e-mail." }); return; }
    if (!consent) { setStatus({ ok: false, text: "Zaznacz zgodę na kontakt (RODO)." }); return; }
    addLead({ email, name, phone, msg, source: "landing" });
    setStatus({ ok: true, text: "Dziękujemy! Dodaliśmy Cię do listy premiery 2026." });
    setEmail(""); setName(""); setPhone(""); setMsg(""); setConsent(false);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/30">Premiera: wiosna 2026</span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">Kaszubskie Safari</h1>
              <p className="mt-4 max-w-xl text-slate-200">
                Buggy & Quady w okolicach Kartuz (baza: Kiełpino / Pępowo). 1-godzinne pętle widokowe z foto-stopem i przewodnikiem.
                <span className="font-semibold"> Buggy 500 zł</span> / <span className="font-semibold"> Quad 220 zł</span>.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href="#oferta" className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow hover:bg-emerald-600">Zobacz ofertę</a>
                <a href="#lead"   className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white/90 hover:bg-white/10">Zapisz się na premierę</a>
              </div>
              <p className="mt-3 text-xs text-slate-400">Zapis nie zobowiązuje do zakupu. Dostaniesz info o starcie i kod -10%.</p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
                {/* 👇 TU JUŻ JEST TWÓJ OBRAZ – DZIAŁA BEZ PUBLIC/ */}
                <img src={buggy} alt="Buggy na kaszubskich szutrach" className="h-full w-full object-cover" />
              </div>
              <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rotate-2 rounded-2xl bg-white/90 p-4 text-sm shadow-xl ring-1 ring-slate-200 md:block">
                „Najlepsze widoki to te, do których nie dojedziesz zwykłą osobówką.”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {["Jazda z przewodnikiem", "Legalne trasy szutrowe", "Foto-stop w cenie", "Bezpieczeństwo i instruktarz"].map((t, i) => (
            <div key={i} className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
              <p className="text-sm font-semibold">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER */}
      <section id="oferta" className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-10">
          <h2 className="text-3xl font-bold">Oferta</h2>
          <p className="mt-2 max-w-2xl text-slate-600">Wybierz trasę i format dopasowany do Ciebie. Wszystkie przejazdy prowadzone są w kolumnie z przewodnikiem. W połowie – 10-minutowa przerwa na zdjęcia.</p>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              <p className="mt-4 text-sm font-semibold text-emerald-700">{f.price}</p>
              <a href="#lead" className="mt-4 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Zapisz się</a>
            </div>
          ))}
        </div>
      </section>

      {/* ROUTES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <header className="mb-8">
            <h2 className="text-3xl font-bold">Proponowane trasy</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Baza: Kiełpino / Pępowo Kartuskie. Pętle A→A około 1h. Dostępne poziomy trudności i warianty dzienne/nocne.</p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {routes.map((r) => (
              <div key={r.name} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-lg font-semibold">{r.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Poziom: {r.level}</p>
                <p className="mt-3 text-sm text-slate-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Partnerzy lokalni</h2>
          <p className="mt-2 max-w-2xl text-slate-600">Współpracujemy z przystaniami kajakowymi, agroturystykami i klubami motocyklowymi. Razem tworzymy pakiety łączone (kajaki + buggy / grill po trasie).</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {["Przystań Kajakowa X", "Agroturystyka Y", "Moto Klub Z"].map((p) => (
            <div key={p} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm font-semibold">{p}</p>
              <p className="mt-2 text-sm text-slate-600">Dołącz jako partner – napisz do nas, przygotujemy wspólny pakiet i prowizję partnerską.</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="lead" className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Zapisz się na premierę (wiosna 2026)</h2>
              <p className="mt-2 max-w-xl text-slate-300">Dostaniesz wiadomość, gdy otworzymy rezerwacje. Dla zapisanych – kod rabatowy <span className="font-semibold text-white">-10%</span> na pierwszy przejazd.</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm">
                <li>• Brak zobowiązań, tylko info o starcie.</li>
                <li>• Pierwszeństwo rezerwacji w długie weekendy i wakacje.</li>
                <li>• Okazjonalne bonusy i pakiety z partnerami.</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="rounded-3xl bg-white/5 p-6 shadow-inner ring-1 ring-white/10">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-slate-200">Imię (opcjonalnie)</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="np. Marcin" className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <div>
                  <label className="text-sm text-slate-200">E-mail</label>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="twoj@email.pl" className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" required />
                </div>
                <div>
                  <label className="text-sm text-slate-200">Telefon (opcjonalnie)</label>
                  <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="np. 500 600 700" className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <div>
                  <label className="text-sm text-slate-200">Wiadomość (opcjonalnie)</label>
                  <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="Rodzinna trasa / integracja / nocna jazda…" className="mt-1 h-28 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <label className="flex items-start gap-3 text-slate-300 text-sm">
                  <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10" />
                  <span>Wyrażam zgodę na kontakt w sprawie premiery i oferty (RODO). Zapis jest niezobowiązujący.</span>
                </label>
                <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600">Zapisz mnie</button>
                {status && (<p className={`${status.ok ? "text-emerald-300" : "text-rose-300"} text-sm`}>{status.text}</p>)}
                <p className="text-xs text-slate-400">*Dane są zapisywane lokalnie w przeglądarce (demo). Podłącz później dostawcę e-mail marketingu.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h3 className="text-2xl font-bold text-white">Gotowy na kaszubską przygodę?</h3>
          <p className="mt-2 text-slate-300">Zapisz się na premierę. Wyślemy Ci termin i kod zniżkowy.</p>
          <a href="#lead" className="mt-6 inline-block rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600">Dołącz do listy</a>
          <p className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} Kaszubskie Safari • Buggy & Quady Kaszuby • Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </main>
  );
}
