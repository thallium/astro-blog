import { FuseResult, RangeTuple } from "fuse.js";
import { SearchIndexItem } from "src/types";

export default function SearchResult({
  result,
  lang,
}: {
  result: FuseResult<SearchIndexItem>;
  lang: string;
}) {
  function highlightMatches(text: string, indices: readonly RangeTuple[]) {
    // return ["hi", <mark>world</mark>];
    let result = [];
    let lastMatchEnd = 0;
    indices.forEach(([start, end]) => {
      if (lastMatchEnd < start) {
        result.push(text.slice(lastMatchEnd, start));
      }
      result.push(
        <mark className="bg-background text-foreground">
          {text.slice(start, end + 1)}
        </mark>,
      );
      lastMatchEnd = end + 1;
    });
    result.push(text.slice(lastMatchEnd));
    return result;
  }

  let contentMatch = null;
  if (result.matches[0].key === "content") {
    contentMatch = result.matches[0];
  } else if (result.matches[1]?.key === "content") {
    contentMatch = result.matches[1];
  }

  return (
    <a
      role="option"
      aria-selected="false"
      href={result.item.url}
      className="block rounded-md p-2 text-muted-foreground outline-none hover:bg-accent"
    >
      <div className=" text-lg">
        {result.matches[0].key === "title"
          ? highlightMatches(result.matches[0].value, result.matches[0].indices)
          : result.item.title}
      </div>
      {contentMatch &&
        contentMatch.indices.map(([start, end]: RangeTuple) => {
          const offset = lang === "en" ? 30 : 20;
          const first = Math.max(0, start - offset);
          const last = Math.min(end + offset, contentMatch.value.length - 1);
          return (
            <div className="ml-4 mt-1 text-sm">
              {highlightMatches(contentMatch.value.slice(first, last + 1), [
                [start - first, end - first],
              ])}
            </div>
          );
        })}
    </a>
  );
}
