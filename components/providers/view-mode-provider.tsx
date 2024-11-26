"use client";

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { viewModeAtom, type ViewMode } from '@/lib/atoms';

interface ViewModeProviderProps {
  children: React.ReactNode;
  initialMode?: ViewMode;
}

function HydrateAtoms({ initialMode = 'internal', children }: ViewModeProviderProps) {
  useHydrateAtoms([[viewModeAtom, initialMode]]);
  return <>{children}</>;
}

export function ViewModeProvider({ children, initialMode }: ViewModeProviderProps) {
  return (
    <Provider>
      <HydrateAtoms initialMode={initialMode}>
        {children}
      </HydrateAtoms>
    </Provider>
  );
}