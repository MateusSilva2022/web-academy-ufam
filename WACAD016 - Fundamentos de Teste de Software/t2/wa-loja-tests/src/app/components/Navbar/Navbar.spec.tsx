import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("deve renderizar o nome da aplicação", () => {
    render(<Navbar />);

    expect(screen.getByText("Vitrine WA")).toBeInTheDocument();
  });

  test("deve renderizar o link Início", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", {
      name: "Início",
    });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("deve renderizar o link Lista de Favoritos", () => {
    render(<Navbar />);

    const favoritesLink = screen.getByRole("link", {
      name: "Lista de Favoritos",
    });

    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveAttribute(
      "href",
      "/favorites"
    );
  });

  test("deve renderizar a marca apontando para a página inicial", () => {
    render(<Navbar />);

    const brand = screen.getByRole("link", {
      name: "Vitrine WA",
    });

    expect(brand).toHaveAttribute("href", "/");
  });

  test("deve renderizar o botão do menu responsivo", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button", {
        name: "Abrir menu",
      })
    ).toBeInTheDocument();
  });
});