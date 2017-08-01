import React from 'react';
import { Link } from 'react-router';
import RefSearchImage from '../resources/img/t1-local.png';

const Home = () => {
  return (
    <div>
      <div className="page-intro background--astral">
        <div className="wrapper">
          <div className="col-wrap">
            <div className="col">
              <div className="col col--md-47 col--lg-34">
                <h1 className="page-intro__title page-intro__title--home"><span className="page-intro__title page-intro__title--home-big">
              Welcome to the</span> Statistical Business Register
              </h1>
                <p className="page-intro__content page-intro__content--home-big">
                  The Statistical Business Register (SBR) is a comprehensive
                  list of UK businesses used by government for statistical purposes.
                </p>
              </div>
              <div className="a-z col col--md-47 col--lg-23 col--lg-offset-2 margin-top-lg--3 margin-left-sm--0">
                <h2 className="margin-top-md--2 margin-top-sm--2 "><a href="/atoz">A to Z of statistical bulletins</a></h2>
                <ul className="a-z-list padding-top-md--1 padding-top-sm--1 padding-left--0">
                  <li className="a-z-list-item"><a href="/atoz?az=a">A</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=b">B</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=c">C</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=d">D</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=e">E</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=f">F</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=g">G</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=h">H</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=i">I</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=j">J</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=k">K</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=l">L</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=m">M</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=n">N</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=o">O</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=p">P</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=q">Q</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=r">R</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=s">S</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=t">T</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=u">U</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=v">V</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=w">W</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=x">X</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=y">Y</a></li>
                  <li className="a-z-list-item"><a href="/atoz?az=z">Z</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content border-top--iron-sm border-top--iron-md">
        <div className="background--gallery" style={{ paddingBottom: '20px' }}>
          <div className="wrapper">
            <div className="tiles">
              <h2>Statistical Business Register Features</h2>
            </div>
            <div className="margin-top--2 col height-sm--13 col--md-23 col--lg-14 height-md--13 height-lg--38 background--white margin-left-md--1 margin-bottom--2 js-hover-click">
              <div className="padding-left--1 padding-right--1 padding-top--2 padding-bottom--1">
                <div className="box__content box__content--homepage height-sm--19 height-md--19 height-md--44 padding-top-lg--17">
                  <h2 className="tiles__title tiles__title-h2--home"><Link to="/RefSearch"><a>Reference Search</a></Link></h2>
                  <span className="image-holder hide--sm hide--md-only width-lg--12"><img src={RefSearchImage} alt="" className="no-border" /></span>
                  <p className="margin-top-lg--1">Search for a reference (VAT, Company House, UBRN) and explore the data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
