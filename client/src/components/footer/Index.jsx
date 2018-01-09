import React from 'react';

const Footer = () => (
  <footer className="page-footer blue-grey darken-2">
    <div className="row">
      <div
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        className="col l3"
      >
        <ul
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' }}
        >
          <li style={{ padding: 10 }}>
            <div
              style={{ display: 'flex', background: 'white', width: '60px', height: '60px', borderRadius: 50, border: '3px solid teal' }}
            >
              <span style={{ margin: 'auto' }}>
                <i className="fa fa-2x fa-github teal-text" />
              </span>
            </div>
          </li>
          <li style={{ padding: 10 }}>
            <div style={{ display: 'flex', background: 'white', width: '60px', height: '60px', borderRadius: 50, border: '3px solid teal' }}>
              <span style={{ margin: 'auto' }}>
                <i className="fa fa-2x fa-facebook teal-text" />
              </span>
            </div>
          </li>
          <li style={{ padding: 10 }}>
            <div style={{ display: 'flex', background: 'white', width: '60px', height: '60px', borderRadius: 50, border: '3px solid teal' }}>
              <span style={{ margin: 'auto' }}>
                <i className="fa fa-2x fa-twitter teal-text" />
              </span>
            </div>
          </li>
          <li style={{ padding: 10 }}>
            <div style={{ display: 'flex', background: 'white', width: '60px', height: '60px', borderRadius: 50, border: '3px solid teal' }}>
              <span style={{ margin: 'auto' }}>
                <i className="fa fa-2x fa-google teal-text" />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        © Andela 2018
        <a
          className="grey-text text-lighten-4 right"
          href="/"
        >
        Created by Kayode Adeola
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
