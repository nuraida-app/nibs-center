import { useState } from "react";

const Playground = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const toggleMenu = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
    }
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sidebar">
      <div className="menu" onClick={() => toggleMenu("akademik")}>
        Akademik
        {selectedMenu === "akademik" && (
          <div className={`submenu ${isMenuOpen ? "open" : ""}`}>
            <ul>
              <li>Guru</li>
              <li>Murid</li>
              <li>Satuan</li>
              <li>Tingkat</li>
              <li>Kelas</li>
            </ul>
          </div>
        )}
      </div>
      <div className="menu">Akademik</div>
    </div>
  );
};

export default Playground;
