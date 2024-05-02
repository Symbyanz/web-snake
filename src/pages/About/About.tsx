import { Link } from "react-router-dom"

const About = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className='title title_snake'>Web Snake</h1>
        <div className="box">
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
          <Link className="link link_underline" to="/" style={{ width: '100%', textAlign: 'center' }}>Вернуться на главную</Link>
        </div>
      </div>
    </section>
  )
}

export default About