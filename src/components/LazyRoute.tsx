import { Suspense, type ReactNode } from "react";
import Loader from "@components/loader";

interface LazyRouteProps {
  children: ReactNode;
}

const LazyRoute = ({ children }: LazyRouteProps) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export default LazyRoute;
