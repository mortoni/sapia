import { render, fireEvent, screen } from "@testing-library/react";
import Menu, { MenuProps } from "./Menu";

const menuData: MenuProps[] = [
  {
    id: "1",
    label: "Menu 1",
    items: [
      {
        id: "2",
        label: "Menu 2",
      },
      {
        id: "3",
        label: "Menu 3",
        items: [
          {
            id: "4",
            label: "Menu 4",
          },
        ],
      },
    ],
  },
];

describe("Menu", () => {
  it("should render the menu correctly", () => {
    render(
      <Menu
        menuData={menuData}
        marginLeft={0}
        selectedMenu={null}
        onSelectMenu={() => {}}
      />
    );

    expect(screen.getByText("Menu 1")).toBeInTheDocument();
  });

  it("should expand the submenu when clicking on the menu item", () => {
    render(
      <Menu
        menuData={menuData}
        marginLeft={0}
        selectedMenu={null}
        onSelectMenu={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Menu 1"));

    expect(screen.getByText("Menu 2")).toBeInTheDocument();
    expect(screen.getByText("Menu 3")).toBeInTheDocument();
  });

  it("should collapse the submenu when clicking on the menu item again", () => {
    render(
      <Menu
        menuData={menuData}
        marginLeft={0}
        selectedMenu={null}
        onSelectMenu={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Menu 1"));
    fireEvent.click(screen.getByText("Menu 1"));

    expect(screen.queryByText("Menu 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Menu 3")).not.toBeInTheDocument();
  });
});
