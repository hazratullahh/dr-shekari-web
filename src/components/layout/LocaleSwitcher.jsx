'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { ChevronDownIcon } from 'lucide-react';

const languages = [
    { code: 'ps', label: 'پښتو', flag: '🇦🇫', dir: 'rtl' },
    { code: 'fa', label: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
    { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
];

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const current = languages.find(l => l.code === locale);
    const isRTL = current?.dir === 'rtl';

    const switchLocale = (newLocale) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
            router.refresh();
        }
    };

    return (
        <div className="relative inline-block">
            <Menu as="div" className="relative">

                {/* Button */}
                <Menu.Button
                    dir={current?.dir}
                    className={`inline-flex items-center gap-2 rounded-xl 
                                bg-white px-4 py-2 text-sm font-medium 
                                shadow-md border border-gray-300 
                                hover:bg-gray-50 transition
                                ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                    {/* <span>{current?.flag}</span> */}
                    <span>{current?.label}</span>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Menu.Items
                        dir={current?.dir}
                        className={`absolute mt-2 w-44 rounded-2xl 
                                    bg-white shadow-xl border border-gray-200
                                    focus:outline-none z-50
                                    ${isRTL ? 'left-0 origin-top-left text-right'
                                : 'right-0 origin-top-right text-left'}`}
                    >
                        <div className="p-2">
                            {languages.map((lang) => {
                                const isActiveLocale = lang.code === locale;

                                return (
                                    <Menu.Item key={lang.code}>
                                        {({ active }) => (
                                            <button
                                                dir={lang.dir}
                                                onClick={() => switchLocale(lang.code)}
                                                className={`
                                                    w-full flex items-center gap-3 
                                                    rounded-lg px-3 py-2 text-sm transition
                                                    ${lang.dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}
                                                    ${active ? 'bg-gray-100' : ''}
                                                    ${isActiveLocale
                                                        ? 'bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold'
                                                        : 'text-gray-700'}
                                                `}
                                            >
                                                {/* <span>{lang.flag}</span> */}
                                                <span>{lang.label}</span>
                                            </button>
                                        )}
                                    </Menu.Item>
                                );
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}