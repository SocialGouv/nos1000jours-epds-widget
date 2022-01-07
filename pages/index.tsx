import type { NextPage } from 'next'
import { Col } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Col>Hello world</Col>
    </div>
  )
}

export default Home
