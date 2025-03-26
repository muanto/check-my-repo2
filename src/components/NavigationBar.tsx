import { useDispatch } from "react-redux";

import { nextScreen, prevScreen } from "../store/checkMyRepoSlice";

import { Heading, Button, Flex } from "@chakra-ui/react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface NavigationBarProps {
  title: string;
  nextShow?: boolean;
  nextDisabled?: boolean;
  prevShow?: boolean;
  prevDisabled?: boolean;
}

const NavigationBar = ({
  title,
  nextShow = true,
  nextDisabled = false,
  prevShow = true,
  prevDisabled = false,
}: NavigationBarProps) => {
  const dispatch = useDispatch();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <div>
        {prevShow && (
          <Button
            size="sm"
            colorScheme="gray"
            data-testid="prev-button"
            disabled={prevDisabled}
            onClick={() => dispatch(prevScreen())}
          >
            <MdArrowBack />
          </Button>
        )}
      </div>

      <Heading size="2xl" fontWeight={700} ml={5} mr={5}>
        {title}
      </Heading>

      <div>
        {nextShow && (
          <Button
            size="sm"
            colorScheme="gray"
            data-testid="next-button"
            disabled={nextDisabled}
            onClick={() => dispatch(nextScreen())}
          >
            <MdArrowForward />
          </Button>
        )}
      </div>
    </Flex>
  );
};

export default NavigationBar;
