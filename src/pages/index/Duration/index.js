import { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';
import * as recordApi from '@/apis/record';
import ThemeContext from '@/shared/ThemeContext';

import styles from './style.less';

function Duration(props) {
  const { timestamp } = props;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const context = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await recordApi.list()
      const data = res.data ?? [];
      setItems(data)
      setLoading(false)
    }
    fetchData();
  }, [timestamp])

  // 数据按日期归类
  const obj = items.reduce((acc, curr) => {
    if (acc[curr.date]) {
      acc[curr.date].push(curr)
    } else {
      acc[curr.date] = [curr]
    }
    return acc;
  }, {})

  const values = Object.keys(obj).map((key) => {
    return {
      name: key,
      value: obj[key].reduce((acc, curr) => {
        return acc += curr.value
      }, 0)
    }
  })

  const nextValues = values.sort((prev, next) => next.value - prev.value).slice(0, 3)

  if (loading) {
    return <Spin indicator={<IconLoading />} />;
  }

  return (
    <div className={classnames([styles.container, styles[context.state]])}>
      <div>时长top3</div>
      {
        nextValues.map(item => <div key={item.name}>{item.name}: {item.value}</div>)
      }
    </div>
  );
}

export default Duration;
