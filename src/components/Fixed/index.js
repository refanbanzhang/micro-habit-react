function Fixed(props) {
  const { children } = props

  return <>
    <div className="fixed top-0 right-0 left-0 z-10">
      {children}
    </div>
    <div className="h-[51px]"></div>
  </>;
}

export default Fixed;
