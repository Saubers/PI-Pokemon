import { render, screen } from "@testing-library/react";
import App from "./App";
import Landing from '../src/components/LandingPage/LandingPage';
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText("ENTER");
  expect(linkElement).toBeInTheDocument();
});

describe("<Landing/>", () => {
  let component;
  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <Landing>
          <div>testcontent</div>
        </Landing>
      </BrowserRouter>
    );
  });
  test("render", () => {
    component.getByText("Bienvenido a la PokePage");
  });
});