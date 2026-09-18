import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  GitFork,
  ListTree,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  people,
  peopleById,
  childrenOf,
  verificationLabel,
  timeline,
  sourceChecks,
  yakovChildrenMeta,
  type Person,
  type Verification,
} from "@/data/family";
import { cn } from "@/lib/utils";

type Tab = "tree" | "timeline" | "sources" | "list";

const tabs: { id: Tab; label: string; icon: typeof GitFork }[] = [
  { id: "tree", label: "Древо", icon: GitFork },
  { id: "timeline", label: "Хроника", icon: BookOpen },
  { id: "sources", label: "Проверка", icon: ShieldCheck },
  { id: "list", label: "Список", icon: ListTree },
];

export function FamilyApp() {
  const [tab, setTab] = useState<Tab>("tree");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showCollateral, setShowCollateral] = useState(true);
  const selected = selectedId ? peopleById[selectedId] : undefined;

  return (
    <div className="min-h-dvh bg-parchment text-ink">
      <header className="border-b border-line bg-paper/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-gold-dim uppercase">
                Нарым · Омск · Ольгинфельд
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold text-forest sm:text-4xl">
                Шарф — Фот
              </h1>
              <p className="mt-1 max-w-xl text-sm text-muted">
                Генеалогия отца, Андрея Ивановича Шарфа. Две немецкие семьи,
                высланные в 1931 году, и то, что удалось сверить в открытых архивах.
              </p>
            </div>
            <Legend />
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const on = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3.5 text-sm font-medium transition-colors",
                    on
                      ? "bg-forest text-parchment"
                      : "bg-transparent text-ink-soft hover:bg-line/60",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className={cn("mx-auto max-w-6xl px-4 py-6 sm:px-6", selected && tab === "tree" && "pb-72 sm:pb-6")}>
        {tab === "tree" && (
          <TreeTab
            selectedId={selectedId}
            onSelect={setSelectedId}
            showCollateral={showCollateral}
            onToggleCollateral={() => setShowCollateral((v) => !v)}
          />
        )}
        {tab === "timeline" && <TimelineTab onSelect={setSelectedId} />}
        {tab === "sources" && <SourcesTab />}
        {tab === "list" && (
          <ListTab
            query={query}
            onQuery={setQuery}
            onSelect={(id) => {
              setSelectedId(id);
              setTab("tree");
            }}
          />
        )}
      </main>

      {selected && tab === "tree" && (
        <PersonPanel person={selected} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
      )}
    </div>
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-3 text-xs text-muted">
      <li className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-sharf" /> Шарф
      </li>
      <li className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-fot" /> Фот
      </li>
      <li className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-gold" /> Соединение линий
      </li>
      <li className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-blood" /> Расстрел / гибель
      </li>
    </ul>
  );
}

function TreeTab({
  selectedId,
  onSelect,
  showCollateral,
  onToggleCollateral,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  showCollateral: boolean;
  onToggleCollateral: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted">
          Нажмите на человека — откроется карточка с источниками. Предки слева и
          сверху, Андрей — внизу.
        </p>
        <button
          type="button"
          onClick={onToggleCollateral}
          className="min-h-11 rounded-md border border-line bg-paper px-3 text-sm text-ink-soft"
        >
          {showCollateral ? "Скрыть боковые ветви" : "Показать боковые ветви"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line bg-paper p-4 sm:p-6">
        <div className="flex min-w-[52rem] flex-col items-center gap-8">
          <GenLabel>Прапрадеды · восстановлены по отчеству</GenLabel>
          <div className="flex w-full flex-wrap justify-center gap-16">
            <Node id="ivan-sharf" selectedId={selectedId} onSelect={onSelect} />
            <Node id="ivan-fot" selectedId={selectedId} onSelect={onSelect} />
          </div>

          <Connector />
          <GenLabel>Прадеды · высылка 1931</GenLabel>
          <div className="flex w-full flex-wrap justify-center gap-6">
            {showCollateral && (
              <Node id="yakov" selectedId={selectedId} onSelect={onSelect} compact />
            )}
            <Couple
              a="iosif"
              b="ekaterina"
              selectedId={selectedId}
              onSelect={onSelect}
            />
            {showCollateral && (
              <>
                <Node id="christian" selectedId={selectedId} onSelect={onSelect} compact />
                <Node id="fedor" selectedId={selectedId} onSelect={onSelect} compact />
              </>
            )}
            <Couple
              a="franz"
              b="maria-fot"
              selectedId={selectedId}
              onSelect={onSelect}
            />
          </div>

          <Connector />
          <GenLabel>Деды · родились / выросли на спецпоселении</GenLabel>
          <div className="flex w-full flex-wrap justify-center gap-4">
            {showCollateral &&
              ["nina", "olga", "emma"].map((id) => (
                <Node key={id} id={id} selectedId={selectedId} onSelect={onSelect} compact />
              ))}
            <Couple
              a="ivan-iosifovich"
              b="margarita"
              selectedId={selectedId}
              onSelect={onSelect}
              featured
            />
            {showCollateral && (
              <Node id="petr" selectedId={selectedId} onSelect={onSelect} compact />
            )}
          </div>

          {showCollateral && (
            <>
              <p className="text-center text-xs tracking-wide text-muted uppercase">
                Братья и сёстры Маргариты · дети Петра и Зельмы
              </p>
              <div className="flex max-w-4xl flex-wrap justify-center gap-2">
                {[
                  "nina-fot",
                  "yuri-fot",
                  "arthur-fot",
                  "vera-fot",
                  "valentin-fot",
                  "vilma-fot",
                  "konstantin-fot",
                ].map((id) => (
                  <Node key={id} id={id} selectedId={selectedId} onSelect={onSelect} compact />
                ))}
              </div>
            </>
          )}

          <Connector />
          <GenLabel>Отец</GenLabel>
          <Node id="andrey" selectedId={selectedId} onSelect={onSelect} featured />

          {showCollateral && (
            <details className="w-full max-w-2xl rounded-md border border-line bg-parchment/60 p-3 text-sm">
              <summary className="cursor-pointer font-medium text-ink-soft">
                Дети Якова Ивановича (список 1931, 9 человек)
              </summary>
              <ul className="mt-2 grid gap-1 text-muted sm:grid-cols-2">
                {yakovChildrenMeta.map((c) => (
                  <li key={c.name}>
                    {c.name}
                    <span className="ml-1 text-xs">({c.years})</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted">
                Иван Яковлевич (~1910) — не дед Иван Иосифович (1934).
              </p>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

function GenLabel({ children }: { children: string }) {
  return (
    <p className="text-center text-xs font-medium tracking-[0.18em] text-gold-dim uppercase">
      {children}
    </p>
  );
}

function Connector() {
  return <div className="h-8 w-px bg-gold/50" aria-hidden />;
}

function Couple({
  a,
  b,
  selectedId,
  onSelect,
  featured,
}: {
  a: string;
  b: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  featured?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <Node id={a} selectedId={selectedId} onSelect={onSelect} featured={featured} />
      <span className="px-1 font-display text-lg text-gold">×</span>
      <Node id={b} selectedId={selectedId} onSelect={onSelect} featured={featured} />
    </div>
  );
}

function Node({
  id,
  selectedId,
  onSelect,
  compact,
  featured,
}: {
  id: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  compact?: boolean;
  featured?: boolean;
}) {
  const p = peopleById[id];
  if (!p) return null;
  const executed = p.deathYear === 1938 || p.id === "iosif";
  const diedExile = p.id === "franz" || p.id === "arthur-fot" || p.id === "maria-fot";
  return (
    <button
      type="button"
      onClick={() => onSelect(p.id)}
      className={cn(
        "min-h-11 rounded-md border text-left transition-colors",
        compact ? "max-w-40 px-2.5 py-2" : "max-w-52 px-3 py-2.5",
        featured && "ring-1 ring-gold/40",
        selectedId === p.id
          ? "border-gold bg-gold/10"
          : "border-line bg-card hover:border-gold-dim",
      )}
    >
      <span className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "mt-1 size-2 shrink-0 rounded-full",
            p.branch === "sharf" && "bg-sharf",
            p.branch === "fot" && "bg-fot",
            p.branch === "join" && "bg-gold",
          )}
        />
        {(executed || diedExile) && (
          <span className="size-2 shrink-0 rounded-full bg-blood" title="Гибель" />
        )}
      </span>
      <span
        className={cn(
          "mt-1 block font-display leading-tight text-forest",
          compact ? "text-sm" : "text-base",
          featured && "text-lg",
        )}
      >
        {p.name}
      </span>
      <span className="mt-0.5 block text-xs text-muted">
        {p.years || p.role}
        {p.years ? ` · ${p.role}` : ""}
      </span>
    </button>
  );
}

function PersonPanel({
  person,
  onClose,
  onSelect,
}: {
  person: Person;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const parents = person.parentIds.map((id) => peopleById[id]).filter(Boolean);
  const spouses = person.spouseIds.map((id) => peopleById[id]).filter(Boolean);
  const kids = childrenOf(person.id);

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 max-h-[52vh] overflow-y-auto border-t border-line bg-paper shadow-[0_-12px_40px_rgb(28_25_20/0.12)] sm:inset-auto sm:right-4 sm:bottom-4 sm:max-h-[85vh] sm:w-[26rem] sm:rounded-lg sm:border">
      <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-line bg-paper px-4 py-3">
        <div>
          <p className="text-xs tracking-wide text-gold-dim uppercase">{person.role}</p>
          <h2 className="font-display text-2xl text-forest">{person.name}</h2>
          <p className="text-sm text-muted">{person.years || "годы не указаны"}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-md hover:bg-line/50"
          aria-label="Закрыть"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="space-y-4 px-4 py-4">
        <VerifyBadge v={person.verification} />
        <p className="text-sm leading-relaxed text-ink-soft">{person.summary}</p>
        {(person.birthPlace || person.occupation || person.nationality) && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            {person.birthPlace && (
              <>
                <dt className="text-muted">Место</dt>
                <dd>{person.birthPlace}</dd>
              </>
            )}
            {person.occupation && (
              <>
                <dt className="text-muted">Работа</dt>
                <dd>{person.occupation}</dd>
              </>
            )}
            {person.nationality && (
              <>
                <dt className="text-muted">Национальность</dt>
                <dd>{person.nationality}</dd>
              </>
            )}
          </dl>
        )}
        {person.events.length > 0 && (
          <section>
            <h3 className="mb-2 text-xs tracking-wide text-muted uppercase">События</h3>
            <ol className="space-y-2 border-l border-gold/40 pl-3">
              {person.events.map((e, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium tabular-nums text-gold-dim">{e.year}</span>{" "}
                  {e.title}
                  {e.detail && <span className="block text-xs text-muted">{e.detail}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}
        {person.notes && person.notes.length > 0 && (
          <section className="rounded-md bg-parchment px-3 py-2 text-sm text-ink-soft">
            {person.notes.map((n) => (
              <p key={n} className="mb-1 last:mb-0">
                {n}
              </p>
            ))}
          </section>
        )}
        {person.sources.length > 0 && (
          <section>
            <h3 className="mb-2 text-xs tracking-wide text-muted uppercase">Источники</h3>
            <ul className="space-y-1.5 text-sm">
              {person.sources.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sharf underline decoration-gold/40 underline-offset-2"
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
        <RelRow label="Родители" items={parents} onSelect={onSelect} />
        <RelRow label="Супруг(а)" items={spouses} onSelect={onSelect} />
        <RelRow label="Дети" items={kids} onSelect={onSelect} />
      </div>
    </aside>
  );
}

function RelRow({
  label,
  items,
  onSelect,
}: {
  label: string;
  items: Person[];
  onSelect: (id: string) => void;
}) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="mb-1 text-xs tracking-wide text-muted uppercase">{label}</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className="min-h-10 rounded-md border border-line px-2.5 text-sm hover:border-gold"
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function VerifyBadge({ v }: { v: Verification }) {
  const styles: Record<Verification, string> = {
    confirmed: "bg-sharf/10 text-sharf",
    "family-archive": "bg-gold/15 text-gold-dim",
    probable: "bg-fot/10 text-fot",
    inferred: "bg-line text-muted",
  };
  return (
    <p className={cn("inline-block rounded-sm px-2 py-1 text-xs font-medium", styles[v])}>
      {verificationLabel[v]}
    </p>
  );
}

function TimelineTab({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <ol className="relative space-y-0 border-l border-gold/50 pl-6">
      {timeline.map((t, i) => (
        <li key={`${t.year}-${i}`} className="relative pb-8">
          <span className="absolute -left-[1.7rem] top-1 size-3 rounded-full border-2 border-gold bg-paper" />
          <p className="font-display text-2xl text-forest">{t.year}</p>
          <h2 className="font-display text-xl">{t.title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">{t.body}</p>
        </li>
      ))}
      <li className="pb-2">
        <button
          type="button"
          onClick={() => onSelect("andrey")}
          className="inline-flex min-h-11 items-center gap-1 text-sm text-gold-dim"
        >
          <ChevronLeft className="size-4" /> К карточке Андрея Ивановича
        </button>
      </li>
    </ol>
  );
}

function SourcesTab() {
  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
        Сверка по Открытому списку, музею «Следственная тюрьма НКВД» (Томск),
        «Крестьянской Голгофе» и вашим выпискам из ГАОО / ИЦ УВД. Глубже XIX века
        открытые репрессивные базы не идут — нужны метрические книги колоний.
      </p>
      <ul className="space-y-3">
        {sourceChecks.map((s) => (
          <li
            key={s.title}
            className="rounded-md border border-line bg-paper p-4"
          >
            <p className="flex items-center gap-2 text-sm font-medium">
              <span
                className={cn(
                  "size-2 rounded-full",
                  s.status === "ok" && "bg-sharf",
                  s.status === "warn" && "bg-gold",
                  s.status === "info" && "bg-muted",
                )}
              />
              {s.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">
        Для следующих поколений: метрики евангелическо-лютеранских колоний Дона и
        Омского уезда, похозяйственные книги Майска и Усть-Чижапки, личные дела в
        ИЦ УВД Томской и Омской областей.
      </p>
    </div>
  );
}

function ListTab({
  query,
  onQuery,
  onSelect,
}: {
  query: string;
  onQuery: (q: string) => void;
  onSelect: (id: string) => void;
}) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...people].sort((a, b) => (a.birthYear ?? 9999) - (b.birthYear ?? 9999));
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        (p.birthPlace ?? "").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <label className="relative mb-4 block">
        <Search className="pointer-events-none absolute top-3 left-3 size-4 text-muted" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Имя, роль, место…"
          className="h-11 w-full rounded-md border border-line bg-paper pr-3 pl-10 text-sm outline-none focus:border-gold"
        />
      </label>
      <ul className="divide-y divide-line rounded-md border border-line bg-paper">
        {filtered.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              className="flex min-h-14 w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-parchment"
            >
              <span>
                <span className="block font-medium">{p.name}</span>
                <span className="text-xs text-muted">
                  {p.years} · {p.role}
                </span>
              </span>
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  p.branch === "sharf" && "bg-sharf",
                  p.branch === "fot" && "bg-fot",
                  p.branch === "join" && "bg-gold",
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
