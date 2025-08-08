// components/Loader.tsx
import { LoaderCircle } from 'lucide-react';

export default function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoaderCircle className="animate-spin w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
    </div>
  );
}
