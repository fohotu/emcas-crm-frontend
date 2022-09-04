import React from 'react'
import { Row,Col } from 'antd';
import HeaderMenu from './HeaderMenu';
function Header() {
  return (
    <Row justify="end">
        <Col>
            <HeaderMenu />
        </Col>
    </Row>
  )
}

export default Header