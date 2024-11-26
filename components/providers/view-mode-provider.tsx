// components/providers/view-mode-provider.tsx
"use client";

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { viewModeAtom, companyBrandingAtom, type ViewMode, type BackgroundConfig } from '@/lib/atoms';

interface ViewModeProviderProps {
  children: React.ReactNode;
  initialMode?: ViewMode;
  initialBranding?: BackgroundConfig;
}

function HydrateAtoms({ 
  initialMode = 'internal',
  initialBranding = {
    type: 'color',
    color: '#002447',
    animation: 'none'
  },
  children 
}: ViewModeProviderProps) {
  useHydrateAtoms([
    [viewModeAtom, initialMode],
    [companyBrandingAtom, initialBranding]
  ]);
  return <>{children}</>;
}

export function ViewModeProvider({ children, initialMode, initialBranding }: ViewModeProviderProps) {
  return (
    <Provider>
      <HydrateAtoms initialMode={initialMode} initialBranding={initialBranding}>
        {children}
      </HydrateAtoms>
    </Provider>
  );
}
