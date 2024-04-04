import { useEffect, useState } from "react";
import * as publicApi from "@/apis/public";
import openLoading from "@/components/Loading/mount";

/** @typedef {import('@/apis/public').Record} Record */

const useInsert = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [submitLoading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  /** @type {Record[]} */
  const [items, setItems] = useState([]);

  const onSubmit = async () => {
    setLoading(true);

    /** @type {Record} */
    const res = await publicApi.add({
      name: "sentences",
      content,
    });
    setItems((_items) => [res, ..._items]);

    setLoading(false);
  };

  /**
   * 回滚到指定历史
   * @param {string} id
   */
  const onRevert = async (id) => {
    /** @type {Record | undefined} */
    const target = items.find((item) => item._id === id);

    if (target?.content) {
      const close = openLoading();

      /** @type {Record} */
      const res = await publicApi.add({
        name: "sentences",
        content: target.content,
      });
      setItems((_items) => [res, ..._items]);

      close();
    }
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
    onRevert,
    changed,
  };
};

export default useInsert;
