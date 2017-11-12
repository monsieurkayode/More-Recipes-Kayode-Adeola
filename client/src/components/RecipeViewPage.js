import React, { Component } from 'react';
import HomeNavbar from './headers/HomeNavbar';
import recipeImg from '../assets/css/img/cake.jpg';
import boxImg from '../assets/css/img/cake2.jpg';
import Footer from './footer/Footer';
import { Ingredients, Instructions, Comments, CommentBox } from './recipeview/Index';
import { NewPostModal } from './modals/Index';
import { SideNav } from './main/Index';

class RecipeViewPage extends Component {
  componentDidMount() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div>
        <HomeNavbar user={this.props.user}/>
        <div id="recipe-img" className="hide-on-small-only">
          <div className="card z-depth-0">
            <div className="card-image">
              <img className="responsive-img" src={recipeImg} alt="" />
              <span className="card-title">Frosty Chocolat</span>
            </div>
          </div>
        </div>
        <div className="row">
          <Ingredients />
          <div className="col l7 m8 s12">
            <div className="row">
              <Instructions />
            </div>
            <div className="col l12 m12 s12">
              <div className="card recipe-view">
                <div className="card-image">
                  <img className="materialboxed" src={boxImg} alt="" />
                  <span className="card-title right">
                    <a className="chip active" href=""><i className="fa fa-thumbs-up"></i></a>
                    <a className="chip" href=""><i className="fa fa-thumbs-down "></i></a>
                    <a className="chip" href=""><i className="fa fa-heart"></i></a> 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideNav />
        <CommentBox />
        <Comments />
        <Footer />
        <NewPostModal />
      </div>
    );
  }
}

export default RecipeViewPage;