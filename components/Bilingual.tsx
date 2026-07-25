type BilingualProps = {
  en: string;
  zh: string;
  className?: string;
};

export default function Bilingual({ en, zh, className }: BilingualProps) {
  return (
    <span className={className}>
      <span className="lang-en">{en}</span>
      <span className="lang-zh">{zh}</span>
    </span>
  );
}
