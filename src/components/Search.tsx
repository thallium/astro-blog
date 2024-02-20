import { Search } from "lucide-preact";
import { useRef, useState, useEffect } from "preact/hooks";
import Fuse from "fuse.js";
import { FuseResult } from "fuse.js";
import { SearchIndexItem } from "src/types";
import SearchResult from "./SearchResult";
import { LANGS } from "src/site-config";

function getBaseURL() {
  return process.env.NODE_ENV === "production"
    ? "https://tgc54.com"
    : "http://localhost:4321";
}

const fuseOptions = {
  includeMatches: true,
  minMatchCharLength: 2,
  keys: ["title", "content"],
};

const fuse = {};

for (const lang of LANGS) {
  const index = await fetch(`${getBaseURL()}/${lang}/search.json`).then((res) =>
    res.json(),
  );
  fuse[lang] = new Fuse(index, fuseOptions);
}

export default function SearchIcon({ lang }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [results, setResults] = useState<FuseResult<SearchIndexItem>[]>([]);

  useEffect(() => {
    dialogRef.current.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).nodeName === "DIALOG") {
        dialogRef.current.close();
      }
    });
  });

  function toggleDialog() {
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  function doSearch(search: string) {
    if (!search) {
      setResults([]);
      return;
    }

    const res = fuse[lang].search(search);
    setResults(res);
  }

  return (
    <>
      <button type="button" className="ml-4 sm:ml-6" onClick={toggleDialog}>
        {/* @ts-ignore */}
        <Search />
      </button>
      <dialog
        ref={dialogRef}
        className="mx-w-3xl top-16 mb-0 mt-0 max-h-[90%] w-full overflow-y-auto rounded-md border-2 bg-background px-0 text-foreground shadow-lg backdrop:backdrop-blur"
      >
        <div className="flex flex-row items-center px-3">
          <div className="mr-2">
            {/* @ts-ignore */}
            <Search />
          </div>
          <input
            placeholder="Search blog posts..."
            type="search"
            onInput={(e) => {
              doSearch((e.target as HTMLInputElement).value);
            }}
            className="h-11 w-full bg-transparent py-3 text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        {results.length > 0 && (
          <div
            id="results"
            role="listbox"
            className="max-h-[35rem] overflow-y-auto px-2 py-1 [&_[aria-selected='true']]:bg-accent"
          >
            {results.map((result) => (
              <SearchResult result={result} lang={lang} />
            ))}
          </div>
        )}
      </dialog>
    </>
  );
}
