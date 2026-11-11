import type { ReactNode } from 'react';

type ActiveSessionLayoutProps = {
  cycle: ReactNode;
  isCycleOpen: boolean;
  onShowCycle: () => void;
  header: ReactNode;
  children: ReactNode;
};

export const ActiveSessionLayout = ({
  cycle,
  isCycleOpen,
  onShowCycle,
  header,
  children,
}: ActiveSessionLayoutProps) => {
  return (
    <div className="flex h-full min-h-0">
      {isCycleOpen ? (
        <aside className="w-80 shrink-0 overflow-y-auto border-r border-blue-200 bg-blue-50 p-4 lg:w-96">
          {cycle}
        </aside>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-none border-b border-gray-200 bg-white shadow-md">
          <div className="space-y-4 p-4">
            {isCycleOpen ? null : (
              <button
                type="button"
                onClick={onShowCycle}
                className="rounded border border-blue-300 bg-white px-3 py-1 text-sm text-blue-800 transition-colors hover:bg-blue-100"
              >
                Mostrar ciclo
              </button>
            )}
            {header}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="mx-auto max-w-7xl p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
