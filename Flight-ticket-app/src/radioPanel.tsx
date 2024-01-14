import React from 'react';
import { Row, Col, Radio, Space } from 'antd';
import './styles/filterPanel.scss'

const RadioPanel: React.FC = () => {
  return (
    <Row >
      <Col>
        <Space>
          <Radio.Group className="radio-group" defaultValue="cheapest">
            <Radio.Button className='radio-item' value="cheapest">Самый дешевый</Radio.Button>
            <Radio.Button className='radio-item' value="fastest">Самый быстрый</Radio.Button>
            <Radio.Button className='radio-item' value="optimal">Самый оптимальный</Radio.Button>
          </Radio.Group>
        </Space>
      </Col>
    </Row>
  );
};

export default RadioPanel;
