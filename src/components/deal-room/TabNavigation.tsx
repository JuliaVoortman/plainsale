import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

export function TabNavigation() {
  const tabs = [
    { name: 'Overview', href: '#' },
    { name: 'Resources', href: '#' },
    { name: 'Timeline', href: '#' },
    { name: 'Emails', href: '#' },
    { name: 'Notes', href: '#' }
  ];

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 border-b border-gray-200 px-6">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              twMerge(
                'px-4 py-2.5 text-sm font-medium leading-5 text-gray-700',
                'focus:outline-none',
                selected
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'hover:text-gray-900 hover:border-gray-300'
              )
            }
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}