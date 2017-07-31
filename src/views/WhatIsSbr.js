import React from 'react';

const WhatIsSbr = function () {
  return (
    <div className="page-intro background--gallery">
      <div className="wrapper">
        <div className="col-wrap">
          <div className="col">
            <nav>
              <div className="breadcrumb print--hide">
                <ol className="breadcrumb__list">
                  <li className="breadcrumb__item">
                    <a className="breadcrumb__link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb__item">
                    What is SBR
                  </li>
                </ol>
              </div>
            </nav>
            <div className="col col--md-47 col--lg-48">
              <h1 className="page-intro__title ">
                What is SBR
              </h1>
              <p className="page-intro__content" style={{ marginBottom: '50px' }}>
                What is SBR details etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsSbr;
