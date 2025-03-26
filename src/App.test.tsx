import { cleanup, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { render } from "./test-utils";
afterEach(cleanup);
describe("CheckMyRepro App", () => {
  test("Testing Success", async () => {
    // Riassegna funzione fetch per simulate chiamata http riuscita
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve("OK"),
    });
    render(
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    );

    //welcome screen
    const titleElement = screen.getByText(/Benvenuto/i);
    expect(titleElement).toBeInTheDocument();
    const proceedButton = screen.getByText(/Procediamo/i);
    expect(proceedButton).toBeInTheDocument();
    fireEvent.click(proceedButton);

    //Username screen
    const usernameInput = screen.getByPlaceholderText(
      /Scrivi il tuo username di github/i
    );
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveFocus();
    expect(usernameInput).toHaveValue("");

    var nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput).toHaveValue("testuser");

    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);

    //Repository screen
    const repositoryNameInput = screen.getByPlaceholderText(
      /Scrivi il nome del repo di github/i
    );
    expect(repositoryNameInput).toBeInTheDocument();
    expect(repositoryNameInput).toHaveFocus();
    expect(repositoryNameInput).toHaveValue("");

    nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    fireEvent.change(repositoryNameInput, { target: { value: "testrepo" } });
    expect(repositoryNameInput).toHaveValue("testrepo");
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);

    //Check screen
    const checkScreenTitle = screen.getByText(/Controllo dati inseriti/i);
    expect(checkScreenTitle).toBeInTheDocument();
    const sendButton = screen.getByText(/Invio/i);
    expect(sendButton).toBeInTheDocument();
    fireEvent.click(sendButton);

    await screen.findByText(/Repository mandato/i);
    fireEvent.click(screen.getByText(/Home/i));
    await screen.findByText(/benvenuto/i);
  });
  test("Testing Failed", async () => {
    // Riassegna funzione fetch per simulate chiamata http fallita
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    render(
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    );

    //welcome screen
    const titleElement = screen.getByText(/Benvenuto/i);
    expect(titleElement).toBeInTheDocument();
    const proceedButton = screen.getByText(/Procediamo/i);
    expect(proceedButton).toBeInTheDocument();
    fireEvent.click(proceedButton);

    //Username screen
    const usernameInput = screen.getByPlaceholderText(
      /Scrivi il tuo username di github/i
    );
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveFocus();
    expect(usernameInput).toHaveValue("");

    var nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput).toHaveValue("testuser");

    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);

    //Repository screen
    const repositoryNameInput = screen.getByPlaceholderText(
      /Scrivi il nome del repo di github/i
    );
    expect(repositoryNameInput).toBeInTheDocument();
    expect(repositoryNameInput).toHaveFocus();
    expect(repositoryNameInput).toHaveValue("");

    nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    fireEvent.change(repositoryNameInput, { target: { value: "testrepo" } });
    expect(repositoryNameInput).toHaveValue("testrepo");
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);

    //Check screen
    const checkScreenTitle = screen.getByText(/Controllo dati inseriti/i);
    expect(checkScreenTitle).toBeInTheDocument();
    const sendButton = screen.getByText(/Invio/i);
    expect(sendButton).toBeInTheDocument();
    fireEvent.click(sendButton);
    await screen.findByText("Errore durante invio verificare e riprovare");
  });
});
