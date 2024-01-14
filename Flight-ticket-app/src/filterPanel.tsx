import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import './styles/filterPanel.scss'

const FilterPanel: React.FC = () => {
  return (
    <Row style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
      <Col>
        <Checkbox.Group className="checkbox-group">
            <h2>Количество пересадок</h2>
            <Checkbox className='checkbox-item' value="0">Без пересадки</Checkbox>
            <Checkbox className='checkbox-item' value="1">1 пересадка</Checkbox>
            <Checkbox className='checkbox-item' value="2">2 пересадки</Checkbox>
            <Checkbox className='checkbox-item' value="3">3 пересадки</Checkbox>
        </Checkbox.Group>
      </Col>
    </Row>
  );
};

export default FilterPanel;
