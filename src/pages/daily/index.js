import { useState, useEffect } from 'react';
import { CheckboxGroup, Checkbox } from '@douyinfe/semi-ui';
import * as dailyApi from '@/apis/daily';
import Head from '@/shared/components/Head';

import styles from './style.less';

function Daily() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    dailyApi.list().then((res) => {
      setItems(res.data);
    });
  }, []);

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    // 根据checkedValues的情况，更新数据库
  };

  return (
    <div className={styles.container}>
      <Head />
      <CheckboxGroup
        style={{ width: '100%' }}
        onChange={onChange}
      >
        {items.map((item) => (
          <Checkbox
            key={item._id}
            value={item.name}
          >
            {item.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}

export default Daily;
