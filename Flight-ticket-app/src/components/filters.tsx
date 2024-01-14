import React from 'react';
import { useDispatch } from 'react-redux';
import { Radio, Row, Col, Space } from 'antd';
import { setSortKey, setSortOrder } from '../app/flightsSlice';

const Filters: React.FC = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e: any) => {
    const value = e.target.value;
    switch (value) {
      case 'cheapest':
        dispatch(setSortKey('price'));
        dispatch(setSortOrder('asc'));
        break;
      case 'fastest':
        dispatch(setSortKey('duration'));
        dispatch(setSortOrder('asc'));
        break;
      case 'optimal':
        // Customize based on your criteria for "optimal"
        break;
      default:
        break;
    }
  };

  return (
    <Row>
      <Col>
        <Space>
          <Radio.Group
            className="radio-group"
            defaultValue="cheapest"
            onChange={handleSortChange}
          >
            <Radio.Button className='radio-item' value="cheapest">Самый дешевый</Radio.Button>
            <Radio.Button className='radio-item' value="fastest">Самый быстрый</Radio.Button>
            <Radio.Button className='radio-item' value="optimal">Самый оптимальный</Radio.Button>
          </Radio.Group>
        </Space>
      </Col>
    </Row>
  );
};

export default Filters;
