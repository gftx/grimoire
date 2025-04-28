import { LoadingProvider } from "./providers/LoadingProvider";
import { RoutesPage } from "./Routes";
import { Loader } from "./shared/ui/Loader";
import { Header } from "./widgets/Header";

export const App = () => {
  return (
    <LoadingProvider>
      <Loader />
      <Header />
      <RoutesPage />
    </LoadingProvider>
  );
};
