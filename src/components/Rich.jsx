// Texto editável com marcação mínima: *destaque* → <em>, quebra de linha → <br />.
// Permite que títulos com palavra em destaque venham do CMS como texto simples.
export default function Rich({ text, emClassName, emStyle }) {
  if (text == null) return null;
  return String(text)
    .split('\n')
    .map((line, li, lines) => (
      <span key={li}>
        {line.split(/\*([^*]+)\*/).map((part, i) =>
          i % 2 ? (
            <em key={i} className={emClassName} style={emStyle}>
              {part}
            </em>
          ) : (
            part
          ),
        )}
        {li < lines.length - 1 && <br />}
      </span>
    ));
}
