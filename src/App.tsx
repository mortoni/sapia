import { useCallback, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Menu from "./components/Menu";
import { MenuProps } from "./components/Menu/Menu";

const data: MenuProps[] = [
  {
    id: "1",
    label: "Menu 1",
    items: [
      {
        id: "1-1",
        label: "Menu 1-1",
        items: [
          {
            id: "1-1-1",
            label: "Menu 1-1-1",
          },
          {
            id: "1-1-2",
            label: "Menu 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Menu 2",
    items: [
      {
        id: "2-1",
        label: "Menu 2-1",
        items: [
          {
            id: "2-1-1",
            label: "Menu 2-1-1",
          },
          {
            id: "2-1-2",
            label: "Menu 2-1-2",
            items: [
              {
                id: "2-1-2-1",
                label: "Menu 2-1-2-1",
              },
              {
                id: "2-1-2-2",
                label: "Menu 2-1-2-2",
              },
            ],
          },
        ],
      },
    ],
  },
];

function App() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (selectedMenu) {
      const isAlreadyInTheHistory = history.includes(selectedMenu);
      if (!isAlreadyInTheHistory) {
        setHistory((h) => [...h, selectedMenu]);
      }
    }
  }, [selectedMenu, history]);

  const handleSelectMenu = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  const handleCancel = useCallback(() => {
    setSelectedMenu(history[history.length - 2]);
    setHistory((h) =>
      h
        .slice(0, h.length - 1)
        .filter((value, index) => h.indexOf(value) === index)
    );
  }, [history]);

  return (
    <div className="flex space-x-10">
      <Menu
        menuData={data}
        selectedMenu={selectedMenu}
        onSelectMenu={handleSelectMenu}
      />

      <div>{selectedMenu && <LoginForm onCancel={handleCancel} />}</div>
    </div>
  );
}

export default App;
