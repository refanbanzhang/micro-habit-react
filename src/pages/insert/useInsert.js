import { useEffect, useState } from "react";
import * as publicApi from "@/apis/public";

const useInsert = () => {
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [content, setContent] = useState("");
  const [items, setItems] = useState([]);

  const onSubmit = async () => {
    setLoading(true);

    if (items.length) {
      await publicApi.update({
        name: "sentences",
        content,
      });
    } else {
      await publicApi.add({
        name: "sentences",
        content,
      });
    }

    items[0].content = content

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
    loading,
    initLoading,
    content,
    setContent,
    onSubmit,
    changed,
  };
};

export default useInsert;
