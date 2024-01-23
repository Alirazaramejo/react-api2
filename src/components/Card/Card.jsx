import React from 'react';
import { Card as AntCard, Button } from 'antd';

const { Meta } = AntCard;

function CustomCard({
  title,
  description,
  image
}) {
  return (
    <AntCard
      hoverable
      style={{ width: '350px', margin: '16px' }}
      cover={<img alt="" src={image} style={{ height: '200px' }} />}
    >
      <Meta title={title} description={description} />
      <div style={{ marginTop: '16px' }}>
        <Button type="primary">Read More</Button>
      </div>
    </AntCard>
  );
}

export default CustomCard;
