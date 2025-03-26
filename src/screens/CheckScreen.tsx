import { useDispatch, useSelector } from "react-redux";
import { nextScreen } from "../store/checkMyRepoSlice";

import NavigationBar from "../components/NavigationBar";
import usePushMoreIO from "../hooks/usePushMoreIO";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";

const CheckScreen = () => {
  const dispatch = useDispatch();
  const pushMoreIo = usePushMoreIO();
  const { username, repositoryName } = useSelector(
    (state: RootState) => state.checkMyRepo
  );

  useEffect(() => {
    if (pushMoreIo.state === "success") {
      dispatch(nextScreen());
    }
  }, [dispatch, pushMoreIo.state]);

  const sendData = async () => {
    pushMoreIo.sendData({
      username: username,
      repositoryName: repositoryName,
    });
  };
  const isLoading: boolean = pushMoreIo.state === "loading";
  return (
    <VStack>
      <NavigationBar title="Controllo dati inseriti" nextShow={false} />
      <Text fontSize="4xl">/{username}</Text>
      <Text fontSize="4xl" mb={5}>
        /{repositoryName}
      </Text>

      <Button
        onClick={!isLoading ? sendData : undefined}
        disabled={isLoading}
        colorScheme="orange"
      >
        {isLoading ? "Invio in corso" : "Invio!"}
      </Button>

      <Text color={"red.500"} mt={5}>
        {pushMoreIo.state === "error"
          ? "Errore durante invio verificare e riprovare"
          : ""}
      </Text>
    </VStack>
  );
};

export default CheckScreen;
