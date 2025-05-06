import { RoutesPage } from "./Routes";
import { Loader } from "./shared/ui/Loader";
import { Header } from "./shared/ui/Header";

export const App = () => {
  return (
    <>
      <Loader />
      <Header />
      <RoutesPage />
    </>
  );
};
