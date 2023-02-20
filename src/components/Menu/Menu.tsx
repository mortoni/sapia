import clsx from "clsx";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

export type MenuProps = {
  id: string;
  label: string;
  items?: MenuProps[];
};

const Menu = ({
  menuData,
  marginLeft = 0,
  selectedMenu,
  onSelectMenu,
}: {
  menuData: MenuProps[];
  marginLeft?: number;
  selectedMenu: string | null;
  onSelectMenu: (menuId: string) => void;
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleClick = (itemId: string) => {
    onSelectMenu(itemId);
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  return (
    <div className="flex flex-col space-y-3 mt-3" style={{ marginLeft }}>
      {menuData.map((item) => {
        const isExpanded = expandedItems.includes(item.id);

        return (
          <div key={item.id}>
            <button
              className={clsx(
                "bg-transparent text-blue-600 font-semibold py-2 px-4 border border-blue-500 rounded",
                selectedMenu === item.id && "!bg-blue-500 !text-white"
              )}
              onClick={() => handleClick(item.id)}
            >
              <div className="flex items-center space-x-2 ">
                <span onClick={() => handleClick(item.id)}>{item.label}</span>
                {item.items && (
                  <div>{isExpanded ? <GoChevronUp /> : <GoChevronDown />}</div>
                )}
              </div>
            </button>

            {isExpanded && item.items ? (
              <div className="submenu">
                <Menu
                  menuData={item.items}
                  marginLeft={marginLeft + 16}
                  onSelectMenu={onSelectMenu}
                  selectedMenu={selectedMenu}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
