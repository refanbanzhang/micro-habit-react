import { useState, useEffect } from 'react';
import { Card, Typography } from '@douyinfe/semi-ui';
import * as taskApi from '@/apis/task'

import styles from './style.less'
const { Text } = Typography;

function Task() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskApi.list().then(res => {
      setTasks(res.data)
    })
  }, [])

  return (
    <div className={styles.container}>
      {
        tasks.map(item => (
          <Card
            title={item.name}
            className={styles.card}
            style={{ maxWidth: '50%' }}
            headerExtraContent={
              <Text link>
                更多
              </Text>
            }
          >
            Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
          </Card>
        ))
      }
    </div>
  );
}

export default Task;
