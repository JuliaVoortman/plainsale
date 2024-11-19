"use client";

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

export function TabNavigation() {
  const tabs = [
    { name: 'Resources', href: '#', current: true },
    { name: 'Timeline', href: '#', current: false },
    { name: 'Emails', href: '#', current: false },
    { name: 'Notes', href: '#', current: false },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className={twMerge(
              tab.current
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
            )}
            aria-current={tab.current ? 'page' : undefined}
          >
            {tab.name}
          </a>
        ))}
      </nav>
    </div>
  );
}