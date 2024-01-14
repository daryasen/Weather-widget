import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Row, Col, Checkbox, Radio, Space } from 'antd';
import '../styles/filterPanel.scss'

const FilterPanel: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
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
      <br />
      <br />
      <Radio.Group className="checkbox-group" onChange={onChange} value={value}>
        <Space direction="vertical">
          <h2>Компании</h2>
          <Radio className='radio-item-company' value={1}>Победа</Radio>
          <Radio className='radio-item-company' value={2}>Red Wings</Radio>
          <Radio className='radio-item-company' value={3}>S7 Airlines</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
};

export default FilterPanel;
