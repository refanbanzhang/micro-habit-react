import style from "./style.module.less";

function Fixed(props) {
  const { children } = props

  return <>
    <div className={style.container}>
      {children}
    </div>
    <div className={style.padding}></div>
  </>;
}

export default Fixed;
