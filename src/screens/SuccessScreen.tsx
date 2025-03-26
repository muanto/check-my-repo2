import { useDispatch } from "react-redux";
import { restart } from "../store/checkMyRepoSlice";
import { Button, Heading, VStack } from "@chakra-ui/react";

const SuccessScreen = () => {
  const dispatch = useDispatch();
  return (
    <VStack>
      <Heading size="2xl" fontWeight={700} mb={10}>
        Repository mandato!
      </Heading>
      <Button colorScheme="blue" onClick={() => dispatch(restart())}>
        Home
      </Button>
    </VStack>
  );
};

export default SuccessScreen;
