import { useEffect, useState } from "react";
import * as publicApi from "@/apis/public";

const useInsert = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [submitLoading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [items, setItems] = useState([]);

  const onSubmit = async () => {
    setLoading(true);

    await publicApi.add({
      name: "sentences",
      content,
    });

    items[0].content = content;

    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setInitLoading(true);

      const res = await publicApi.list({ name: "sentences" });

      if (res.data) {
        setItems(res.data);
      }

      setInitLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (items.length) {
      setContent(items[0].content);
    }
  }, [items]);

  const changed = items[0]?.content === content;

  return {
    initLoading,
    submitLoading,
    items,
    content,
    setContent,
    onSubmit,
    changed,
  };
};

export default useInsert;
