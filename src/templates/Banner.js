import React from 'react';

const Banner = function () {
  const style = {
    banner: {
      marginTop: '-20px',
      width: '100vw',
      backgroundColor: '#3B7A9E',
      color: '#fff',
      boxSizing: 'border-box',
      display: 'block',
      height: '40px',
    },
    bannerTag: {
      paddingTop: '2px',
      paddingRight: '7px',
      paddingBottom: '3px',
      paddingLeft: '7px',
      marginLeft: '10px',
      textTransform: 'uppercase',
      color: '#FFFFFF',
      fontWeight: '700',
      backgroundColor: '#323132',
      boxSizing: 'border-box',
    },
    p: {
      paddingTop: '10px',
    },
  };
  return (
    <div style={style.banner}>
      <div style={style.banner}>
        <div className="container">
          <p style={style.p}>
            <strong style={style.bannerTag}>
              Alpha
            </strong>&nbsp;
            this release is still in development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
