import { useDispatch } from "react-redux";
import { nextScreen } from "../store/checkMyRepoSlice";
import { Heading, Text, Button, VStack } from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
const WelcomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <VStack>
      <Heading size="2xl" fontWeight={700}>
        Benvenuto
      </Heading>
      <Text fontSize="4xl" fontWeight={300} lineHeight={1.5}>
        Nelle prossime schermate verra richiesto di inserire <br /> username e
        nome del repository del tuo progetto github
      </Text>
      <Button
        onClick={() => dispatch(nextScreen())}
        colorScheme="blue"
        rightIcon={<MdArrowForward />}
      >
        Procediamo
      </Button>
    </VStack>
  );
};

export default WelcomeScreen;
