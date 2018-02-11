/* eslint-disable */
import { configure, shallow, render, mount } from 'enzyme';
import $ from 'jquery';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import { LocalStorage } from '../__mocks__/localStorage';
import decode from 'jwt-decode';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import toJson from 'enzyme-to-json';


// This file is written in ES5 since it's not transpiled by Babel.
// This file does the following:
// 1. Sets Node environment variable
// 2. Registers babel for transpiling our code for testing
// 3. Disables Webpack-specific features that Mocha doesn't understand.
// 4. Requires jsdom so we can test via an in-memory DOM in Node
// 5. Sets up global vars that mimic a browser.
// 6. Sets up a mock store for redux reducers and action-creators

process.env.NODE_ENV = 'test';

// React 15 Enzyme adapter
configure({ adapter: new Adapter() });

// Mock redux store to test action creators
// Configure mock adapter for axios request
// Create mock store with redux-thunk middleware
const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
var jsdom = require('jsdom');

const { JSDOM } = jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

const { document } = (new JSDOM(
  '<!doctype html><html><body></body></html>')).window;

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.mock = mock;
global.mockStore = mockStore;
global.localStorage = new LocalStorage();
global.decode = decode;
global.expect = expect;
global.toJson = toJson;
global.document = document;
global.window = document.defaultView;
global.Materialize = window;
global.Materialize = { toast: () => {} };

global.$ = $;
global.jQuery = $;
$.prototype.material_select = () => {};
$.prototype.sideNav = () => {};
$.prototype.modal = () => {};
$.prototype.dropdown = () => {};
$.prototype.collapsible = () => {};
$.prototype.materialbox = () => {};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

var documentRef = document;