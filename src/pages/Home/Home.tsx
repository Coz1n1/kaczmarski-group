import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getTopDebts, getTotalDebts, getFilteredDebts } from "../../api/debts";
import Debts from "../../components/Debts/Debts";
import "./Home.less";
import toast from "react-hot-toast";
import type { Debt, SortKey, SortOrder } from "../../types/types";

const PAGE_SIZE = 10;

const Home = () => {
  const [items, setItems] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("Name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setLoading(true);
    getTotalDebts()
      .then((data) => setAmount(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const getItems = () => {
    setLoading(true);
    getTopDebts()
      .then((data) => setItems(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleSearch = async (query: string) => {
    const phrase = query.trim();

    if (phrase.length === 0) {
      getItems();
      setPage(1);
      return;
    }

    if (phrase.length < 3 && phrase.length > 0) {
      toast.error("Wprowadź co najmniej 3 znaki");
      return;
    }

    setLoading(true);
    try {
      const data = await getFilteredDebts(phrase);
      setItems(data);
      setPage(1);
      toast.success(`Znaleziono ${data.length} wyników`);
    } catch (error) {
      toast.error("Wystąpił błąd podczas wyszukiwania: " + error);
    } finally {
      setLoading(false);
    }
  };

  const collator = new Intl.Collator("pl", { sensitivity: "base" });

  const sortedItems = useMemo(() => {
    const arr = [...items];
    const dir = sortOrder === "asc" ? 1 : -1;

    arr.sort((a, b) => {
      const av = a?.[sortKey];
      const bv = b?.[sortKey];
      let cmp = 0;

      if (sortKey === "Value") {
        cmp = Number(av ?? 0) - Number(bv ?? 0);
      } else if (sortKey === "Date") {
        const ta = av ? new Date(av).getTime() : 0;
        const tb = bv ? new Date(bv).getTime() : 0;
        cmp = ta - tb;
      } else {
        cmp = collator.compare(String(av ?? ""), String(bv ?? ""));
      }
      return cmp * dir;
    });

    return arr;
  }, [items, sortKey, sortOrder]);

  const handleSortChange = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  useEffect(() => {
    setPage(1);
  }, [sortKey, sortOrder, items]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return sortedItems.slice(start, end);
  }, [sortedItems, page]);

  return (
    <div>
      <Navbar onSearch={handleSearch} isDisabled={loading} />
      <Debts
        items={paginatedItems}
        loading={loading}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isDisabled={loading}
      />
      <div className="debts-count">
        Wyświetlono {sortedItems?.length} z {amount}
      </div>
    </div>
  );
};

export default Home;
