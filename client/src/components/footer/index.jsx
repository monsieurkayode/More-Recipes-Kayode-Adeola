import React from 'react';

/**
 * Footer
 * @function Footer
 *
 * @param {void} void
 *
 * @return {JSX} JSX
 */
const Footer = () => (
  <footer className="page-footer blue-grey darken-2">
    <div className="row">
      <div className="col l3 social-icon-container">
        <ul>
          <li>
            <div>
              <span>
                <i className="fa fa-2x fa-github teal-text" />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>
                <i className="fa fa-2x fa-facebook teal-text" />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>
                <i className="fa fa-2x fa-twitter teal-text" />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>
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
