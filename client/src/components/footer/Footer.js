import React from 'react';

const Footer = (props => {
  return(
    <footer className="page-footer blue-grey darken-2">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Stay Connected</h5>
            <p className="grey-text text-lighten-4">Sign up for our newsletter for new articles</p>
            <p className="grey-text text-lighten-4">Connect with us on social media</p>
            <i className="fa fa-3x fa-facebook-square"></i>
            <i className="fa fa-3x fa-twitter-square"></i>
            <i className="fa fa-3x fa-pinterest-square"></i>
            <i className="fa fa-3x fa-github-square"></i>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Navigation</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="/">Home</a></li>
              <li><a className="grey-text text-lighten-3" href="/">New Articles</a></li>
              <li><a className="grey-text text-lighten-3" href="/">Top of the Week</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2017 Copyright Text
        <a className="grey-text text-lighten-4 right" href="/">Check out our blog</a>
        </div>
      </div>
    </footer>
  )
})

export default Footer;