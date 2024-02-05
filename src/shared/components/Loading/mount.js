import ReactDOM from 'react-dom/client';
import Loading from './index';

/**
 * 打开loading弹层
 * @param {Object} options
 * @returns {function}
 */
function open(options) {
  // 1. 创建dom元素
  const div = document.createElement('div');
  // 2. 将dom元素插入body
  document.body.appendChild(div);
  // 3. 将组件挂载到dom元素中
  const divRoot = ReactDOM.createRoot(div);
  divRoot.render(<Loading />);

  return () => {
    // 移除弹层
    divRoot.unmount();
    document.body.removeChild(div);
  };
}

export default open;
