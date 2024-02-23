---
title: "Switch to Astro.js"
date: 2024-02-23T03:04:04.741Z
tags: ["Astro"]
summary: "Yes, I switched my blog framework again..."
keywords: ["Blog", "Astro"]
---

Yes, I switched my blog framework again...

## Motivation

I think it all started with that Nextjs is slow in building my blog. Also I've realized that I actually didn't have any interactive components other than my search bar. Using all kinds of React component library felt bloated as well (Yes I got this type of OCD from using arch Linux). All of these made me feel that Astro would be my ultimate choice and it uses a similar syntax to JSX so migrating shouldn't take too much time.

## New Stuff

### Bootstrap

I don't actually use Bootstrap but adopted its dropdown component with a few CSS and JS.

### Search

It's actually a lot easier than I thought without using component library.

Building index can be simply done with [Static File Endpoints](https://docs.astro.build/en/guides/endpoints/#static-file-endpoints).

```ts title="src/pages/[lang]/search.json.ts"
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang;
  const index = buildYourIndex(lang);
  return Response.json(index);
};

// generate index for each language
export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}
```

In terms of UI, the Dialog HTML tag works very well out of the box, and with a framework (I used preact) you can get real-time search. The choice of search library is Fuse.js cuz you can include matches in the search result which makes highlighting very easy.

```tsx
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
```
