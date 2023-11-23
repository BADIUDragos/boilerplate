import { Store, AnyAction } from "redux";
import { Provider } from "react-redux";

function getWrapper(store: Store<any, AnyAction>): React.FC {
  return ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
}

export { getWrapper }