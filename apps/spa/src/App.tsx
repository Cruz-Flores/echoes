import { Outlet } from 'react-router-dom';
import { Sidebar } from './shared/ui/Sidebar';
import { StatsSessionProvider } from './StatsSessionProvider';

function App() {
  return (
    <StatsSessionProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </main>
      </div>
    </StatsSessionProvider>
  );
}

export default App;
