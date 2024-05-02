import { Link } from "react-router-dom"

const NoMatch = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className='title title_snake'>Web Snake</h1>
        <div className="box box_center">
          <h2 className="subtitle">Страница не найдена!</h2>
          <Link className="link link_underline" to="/" style={{ width: '100%', textAlign: 'center' }}>Вернуться на главную</Link>
        </div>
      </div>
    </section>
  )
}

export default NoMatch