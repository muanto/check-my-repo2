import { useDispatch } from "react-redux";
import { nextScreen } from "../store/checkMyRepoSlice";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useRef, useState } from "react";
import { FormControl, FormErrorMessage, Input, VStack } from "@chakra-ui/react";

interface InputScreenProps {
  title: string;
  inputValue: string;
  inputPlaceholder: string;
  onInputChange: (value: string) => void;
}
const InputScreen = ({
  title,
  inputValue,
  inputPlaceholder,
  onInputChange,
}: InputScreenProps) => {
  const dispatch = useDispatch();
  const [pristine, setPristine] = useState<Boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isInvalid: boolean = !pristine && inputValue.length === 0;
  const isNextDisabled: boolean = inputValue.length === 0;
  return (
    <VStack>
      <NavigationBar title={title} nextDisabled={isNextDisabled} />
      <form
        style={{ width: "100%" }}
        onSubmit={(ev) => {
          if (!isNextDisabled) dispatch(nextScreen());
          ev.preventDefault();
        }}
      >
        <FormControl isInvalid={isInvalid}>
          <Input
            focusBorderColor="black"
            width={450}
            maxW={"100%"}
            variant="flushed"
            ref={inputRef}
            value={inputValue}
            placeholder={inputPlaceholder}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              if (pristine === true) {
                setPristine(false);
              }
              onInputChange(ev.target.value);
            }}
          />
          <FormErrorMessage>{isInvalid && "Valore richiesto"}</FormErrorMessage>
        </FormControl>
      </form>
    </VStack>
  );
};
export default InputScreen;
