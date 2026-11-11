import type { ComponentProps } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CycleOverviewView } from './CycleOverviewView';

const dancedSongs = [{ id: 'a', label: 'Alfa · nivel 1 · v1' }];
const missingSongs = [{ id: 'b', label: 'Bravo · nivel 2 · v1' }];

const renderView = (
  overrides: Partial<ComponentProps<typeof CycleOverviewView>> = {},
) => {
  const onToggle = jest.fn();
  const onReset = jest.fn();
  render(
    <CycleOverviewView
      dancedCount={1}
      dancedSongs={dancedSongs}
      missingSongs={missingSongs}
      missingTitle="Faltan por bailar (1)"
      missingEmptyMessage="No faltan canciones por bailar en este ciclo."
      isExpanded={false}
      onToggle={onToggle}
      onReset={onReset}
      {...overrides}
    />,
  );
  return { onToggle, onReset };
};

describe('CycleOverviewView', () => {
  it('keeps both song columns hidden until the cycle is expanded', () => {
    renderView();

    expect(
      screen.queryByRole('heading', {
        name: 'Canciones bailadas en este ciclo',
      }),
    ).toBeNull();
    expect(screen.queryByText('Faltan por bailar (1)')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Mostrar' }).getAttribute('aria-expanded'),
    ).toBe('false');
  });

  it('shows the cycle column and the missing songs column when expanded', () => {
    renderView({ isExpanded: true });

    expect(
      screen.getByRole('heading', { name: 'Canciones bailadas en este ciclo' }),
    ).toBeTruthy();
    expect(screen.getByText('Faltan por bailar (1)')).toBeTruthy();
    expect(screen.getByText('1. Alfa · nivel 1 · v1')).toBeTruthy();
    expect(screen.getByText('1. Bravo · nivel 2 · v1')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'Ocultar' }).getAttribute('aria-expanded'),
    ).toBe('true');
  });

  it('delegates show, hide, and reset actions', () => {
    const { onToggle, onReset } = renderView({ isExpanded: true });

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reset Cycle' }));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('hides reset when the cycle has no songs', () => {
    renderView({ dancedCount: 0, onReset: jest.fn() });

    expect(screen.queryByRole('button', { name: 'Reset Cycle' })).toBeNull();
  });
});
