import { useState } from "react";
import "./Navbar.less";

interface NavbarProps {
  onSearch: (query: string) => void;
  isDisabled?: boolean;
}

const Navbar = ({ onSearch, isDisabled }: NavbarProps) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchPhrase);
  };

  return (
    <div className="navbar">
      <div className="navbar__content">
        <h1 className="navbar__title">PODAJ NIP LUB NAZWĘ DŁUŻNIKA</h1>
        <form className="navbar__search" onSubmit={submit}>
          <input
            type="text"
            className="navbar__search-input"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          <button
            className="navbar__search-button"
            type="submit"
            disabled={isDisabled}
          >
            SZUKAJ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
