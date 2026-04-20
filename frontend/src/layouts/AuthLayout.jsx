import { Outlet } from 'react-router-dom';

const backgroundImage =
  'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2400&q=80';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-foreground overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80"
      />

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
