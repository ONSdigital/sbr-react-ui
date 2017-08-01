import React from 'react';

const ContactUs = () => {
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
                    Contact Us
                  </li>
                </ol>
              </div>
            </nav>
            <div className="col col--md-47 col--lg-48">
              <h1 className="page-intro__title ">
                Contact Us
              </h1>
              <p className="page-intro__content" style={{ marginBottom: '50px' }}>
                Contact details etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
