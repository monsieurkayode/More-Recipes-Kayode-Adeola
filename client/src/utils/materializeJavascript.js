const initializeMaterializeJavascript = () => {
  $('select').material_select();
  $('.dropdown-button').dropdown();
  $('.button-collapse').sideNav();
  $('.collapsible').collapsible();
  $('#modal-delete').modal();
  $('#modal-edit').modal();
};

export default initializeMaterializeJavascript;
