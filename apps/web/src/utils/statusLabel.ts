import { Vhs } from '@/models';

export const statusLabel: Record<Vhs['status'], string> = {
  available: 'Disponible',
  rented: 'Louée',
  lost: 'Perdue',
};
