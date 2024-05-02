import { Link } from 'react-router-dom'
import './Home.scss'

const Home = () => {
  return (
    <section className='section'>
      <div className='container'>
        <div className="menu">
          <h1 className='title title_snake'>Web Snake</h1>
          <nav className='menu__nav'>
            <ul className='menu-list menu__list'>
              <li className='menu-list__item'><Link to={'game'} className='menu-list__link'>Play</Link></li>
              <li className='menu-list__item'><Link to={'about'} className='menu-list__link'>About</Link></li>
              <li className='menu-list__item'><Link to={'settings'} className='menu-list__link'>Settings</Link></li>
              <li className='menu-list__item'><Link to={'records'} className='menu-list__link'>Records</Link></li>
            </ul>
          </nav>
        </div>

      </div>
    </section>
  )
}

export default Home