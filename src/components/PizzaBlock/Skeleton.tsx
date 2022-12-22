import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader: React.FC<any> = (props) => (
  <div className='pizza-center'>
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={465}
      viewBox='0 0 280 465'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <circle cx='134' cy='123' r='118' />
      <rect x='5' y='253' rx='2' ry='2' width='262' height='26' />
      <rect x='5' y='295' rx='2' ry='2' width='262' height='43' />
      <rect x='6' y='351' rx='2' ry='2' width='120' height='25' />
      <rect x='145' y='351' rx='2' ry='2' width='122' height='25' />
    </ContentLoader>
  </div>
);

export default MyLoader;
