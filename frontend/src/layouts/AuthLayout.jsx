import { Outlet } from 'react-router-dom';
import BackgroundOverlay from '@/components/BackgroundOverlay';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-foreground overflow-hidden">
      <BackgroundOverlay />

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h2 className="text-center text-3xl font-extrabold text-white">
          No-Name Project
        </h2>
      </div>

      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
