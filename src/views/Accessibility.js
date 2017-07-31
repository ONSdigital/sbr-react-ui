import React from 'react';

const Accessibility = function () {
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
                    Accessibility
                  </li>
                </ol>
              </div>
            </nav>
            <div className="col col--md-47 col--lg-48">
              <h1 className="page-intro__title ">
                Accessibility
              </h1>
              <p className="page-intro__content" style={{ marginBottom: '50px' }}>
                Accessibility details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
