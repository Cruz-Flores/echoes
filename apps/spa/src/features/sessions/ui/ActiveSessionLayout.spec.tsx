import { fireEvent, render, screen } from '@testing-library/react';
import { ActiveSessionLayout } from './ActiveSessionLayout';

describe('ActiveSessionLayout', () => {
  it('places the cycle beside the songs when the cycle is open', () => {
    render(
      <ActiveSessionLayout
        isCycleOpen
        onShowCycle={jest.fn()}
        cycle={<p>Ciclo visible</p>}
        header={<p>Cabecera</p>}
      >
        <p>Lista de canciones</p>
      </ActiveSessionLayout>,
    );

    expect(screen.getByText('Ciclo visible')).toBeTruthy();
    expect(screen.getByText('Lista de canciones')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Mostrar ciclo' })).toBeNull();
  });

  it('hides the cycle column and exposes the show action', () => {
    const onShowCycle = jest.fn();
    render(
      <ActiveSessionLayout
        isCycleOpen={false}
        onShowCycle={onShowCycle}
        cycle={<p>Ciclo visible</p>}
        header={<p>Cabecera</p>}
      >
        <p>Lista de canciones</p>
      </ActiveSessionLayout>,
    );

    expect(screen.queryByText('Ciclo visible')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar ciclo' }));
    expect(onShowCycle).toHaveBeenCalledTimes(1);
  });
});
