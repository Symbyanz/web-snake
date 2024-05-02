import { Link } from "react-router-dom"

const Settings = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className='title title_snake'>Web Snake</h1>
        <div className="box">
          <p>settings...</p>
          <Link className="link link_underline" to="/" style={{ width: '100%', textAlign: 'center' }}>Вернуться на главную</Link>
        </div>
      </div>
    </section>
  )
}

export default Settings