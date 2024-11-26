import { atom } from 'jotai';

// View mode atom for switching between internal and customer views
export const viewModeAtom = atom<'internal' | 'customer'>('internal');

// Company branding atom for storing company card background color
export const companyBrandingAtom = atom<string>('#002447');

// Deal room background atom for storing the room's background settings
export const dealRoomBackgroundAtom = atom<{
  color: string;
  pattern?: string;
  animation?: boolean;
}>({
  color: '#ffffff',
  pattern: undefined,
  animation: false,
});



// Background patterns available for the deal room
export const backgroundPatterns = [
  {
    id: 'solid',
    name: 'Solid Color',
    preview: 'solid-preview.svg'
  },
  {
    id: 'gradient',
    name: 'Gradient Flow',
    preview: 'gradient-preview.svg',
    animated: true
  },
  {
    id: 'dots',
    name: 'Dot Matrix',
    preview: 'dots-preview.svg',
    animated: true
  },
  {
    id: 'waves',
    name: 'Soft Waves',
    preview: 'waves-preview.svg',
    animated: true
  },
  {
    id: 'circuit',
    name: 'Circuit Board',
    preview: 'circuit-preview.svg'
  }
];
