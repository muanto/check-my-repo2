import { Center } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import WelcomeScreen from "./screens/WelcomeScreen";
import InputScreen from "./screens/InputScreen";
import { setRepositoryName, setUsername } from "./store/checkMyRepoSlice";
import CheckScreen from "./screens/CheckScreen";
import SuccessScreen from "./screens/SuccessScreen";

const App = () => {
  const dispatch = useDispatch();

  const { currentScreen, username, repositoryName } = useSelector(
    (state: RootState) => state.checkMyRepo
  );

  return (
    <Center h="100vh">
      {currentScreen === 0 && <WelcomeScreen />}
      {currentScreen === 1 && (
        <InputScreen
          title="Username"
          inputValue={username}
          inputPlaceholder="Scrivi il tuo username di github"
          onInputChange={function (value: string): void {
            dispatch(setUsername(value));
          }}
        />
      )}
      {currentScreen === 2 && (
        <InputScreen
          title="Repository"
          inputValue={repositoryName}
          inputPlaceholder="Scrivi il nome del repo di github"
          onInputChange={function (value: string): void {
            dispatch(setRepositoryName(value));
          }}
        />
      )}
      {currentScreen === 3 && <CheckScreen />}

      {currentScreen === 4 && <SuccessScreen />}
    </Center>
  );
};

export default App;
