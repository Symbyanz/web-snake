import { Link } from "react-router-dom"

const Records = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className='title title_snake'>Web Snake</h1>
        <div className="box">
          <p className="paragraph">Lorem ipsum dolor sit, amet consectetusequi. Amet odit fugiat laborum maxime necessitatibu. Iste doloribus voluptas magnam deserunt consequatur, placeat autem quaerat, commodi veniam voluptatibus iure sed? Ratione adipisci ipsum architecto quo sint rerum ea aut deserunt, at labore! Labore fuga quidem nostrum aliquam inventore explicabo enim eligendi consectetur excepturi omnis iure corporis, laborum voluptates, fugiat harum maxime dolore nobis sunt fugit, magnam quae dolor. Natus, placeat.</p>
          <Link className="link link_underline" to="/" style={{ width: '100%', textAlign: 'center' }}>Вернуться на главную</Link>
        </div>
      </div>
    </section>
  )
}

export default Records