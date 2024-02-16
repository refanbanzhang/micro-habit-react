import { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';
import * as recordApi from '@/apis/record';
import ThemeContext from '@/shared/ThemeContext';

import styles from './style.less';

function Duration(props) {
  const { timestamp } = props;
  const context = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await recordApi.list();
      const data = res.data ?? [];
      setItems(data);
      setLoading(false);
    };
    fetchData();
  }, [timestamp]);

  // 数据按日期归类
  const obj = items.reduce((acc, curr) => {
    if (acc[curr.date]) {
      acc[curr.date].push(curr);
    } else {
      acc[curr.date] = [curr];
    }
    return acc;
  }, {});

  // 计算每天的总时长
  const values = Object.entries(obj).map(([key, values]) => ({
    name: key,
    value: values.reduce((acc, curr) => (acc += curr.value), 0),
  }));

  // 排序并提取top3
  const nextValues = values.sort((prev, next) => next.value - prev.value).slice(0, 3);

  if (loading) {
    return <Spin indicator={<IconLoading />} />;
  }

  return (
    <div className={classnames([styles.container, styles[context.state]])}>
      <div>时长top3</div>
      {nextValues.map((item) => (
        <div key={item.name}>
          {item.name}: {item.value}
        </div>
      ))}
    </div>
  );
}

export default Duration;
