import { Menu, Transition } from '@headlessui/react'

import { Languages } from "lucide-react";
import { LANGS, languages } from "src/site-config";
// import { usePathname } from "next/navigation";
import { Fragment } from 'react';

export default function LangSwitch() {
    // const pathname = Astro.
    // const pathname = usePathname().split('/')
    // const suffix = pathname.slice(2).join('/')
    return (
        <Menu as="div" className="relative inline-block text-left h-6">
            <Menu.Button>
                <Languages className="h-6 w-6 cursor-pointer" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 text-foreground bg-background rounded-md border-border border-[1px]">
                    <div className="p-1">
                        {LANGS.map(lang => (
                            <Menu.Item as="div" key={lang} className="py-2 px-2 rounded-md ui-active:bg-accent">
                                <a href={`/${lang}`}>{languages[lang].name}</a>
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
