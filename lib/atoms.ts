import { atom } from 'jotai';

export type ViewMode = 'internal' | 'customer';

export const viewModeAtom = atom<ViewMode>('internal');

export const companyBrandingAtom = atom<string>('#002447');