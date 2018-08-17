import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const BtnGroup = props => {
  return (
    <Button.Group className="btn-group">
      <Button type="primary" onClick={() => props.showModal('add')}>
        借用设备
      </Button>
    </Button.Group>
  );
};

BtnGroup.propTypes = {
  showModal: PropTypes.func.isRequired
};

export default BtnGroup;