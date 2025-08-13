import type { SortKey, SortOrder } from "../../types/types";
import { formatDate } from "../../utils/dataFormatter";
import "./Debts.less";
import {
  FaCaretDown,
  FaCaretUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loader from "../Loader/Loader";
import NoResults from "../NoResults/NoResults";
import type { Debt } from "../../types/types";

interface DebtsProps {
  items: Debt[];
  loading: boolean;
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortChange: (key: SortKey) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDisabled?: boolean;
}

const Debts = ({
  items,
  loading,
  sortKey,
  sortOrder,
  onSortChange,
  page,
  totalPages,
  onPageChange,
  isDisabled,
}: DebtsProps) => {
  if (loading) return <Loader />;
  if (!items || items.length === 0) return <NoResults />;

  const btnIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? (
      <FaCaretUp fontSize={16} />
    ) : (
      <FaCaretDown fontSize={16} />
    );
  };

  const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="debts-table">
      <table className="debts-table__table">
        <thead className="debts-table__head">
          <tr>
            <th
              onClick={() => onSortChange("Name")}
              className={sortKey === "Name" ? "is-active" : ""}
            >
              DŁUŻNIK{btnIcon("Name")}
            </th>
            <th
              onClick={() => onSortChange("NIP")}
              className={sortKey === "NIP" ? "is-active" : ""}
            >
              NIP{btnIcon("NIP")}
            </th>
            <th
              onClick={() => onSortChange("Value")}
              className={sortKey === "Value" ? "is-active" : ""}
            >
              KWOTA ZADŁUŻENIA{btnIcon("Value")}
            </th>
            <th
              onClick={() => onSortChange("Date")}
              className={sortKey === "Date" ? "is-active" : ""}
            >
              DATA POWSTANIA ZOBOWIĄZANIA{btnIcon("Date")}
            </th>
          </tr>
        </thead>
        <tbody className="debts-table__body">
          {items.map((debt) => (
            <tr key={debt.Id}>
              <td>{debt.Name}</td>
              <td>{debt.NIP}</td>
              <td>{debt.Value}</td>
              <td>{formatDate(debt.Date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="debts-table__pagination">
        <button
          className="debts-table__pagebtn"
          aria-label="Poprzednia strona"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={isDisabled || page === 1}
        >
          <FaChevronLeft />
        </button>
        {pageList.map((p) => (
          <button
            key={p}
            className={`debts-table__pagenum ${p === page ? "is-active" : ""}`}
            onClick={() => onPageChange(p as number)}
            disabled={isDisabled || p === page}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}
        <button
          className="debts-table__pagebtn"
          aria-label="Następna strona"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={isDisabled || page === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Debts;
