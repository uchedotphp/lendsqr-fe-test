import { Suspense } from "react";
import Loader from "@components/loader";

interface LazyRouteProps {
  children: React.ReactNode;
}

const LazyRoute = ({ children }: LazyRouteProps) => (
  <Suspense fallback={<Loader />}>
    {children}
  </Suspense>
);

export default LazyRoute; 