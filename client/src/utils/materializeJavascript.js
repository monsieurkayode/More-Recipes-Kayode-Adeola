const initializeMaterializeJavascript = () => {
  $('select').material_select();
  $('.dropdown-button').dropdown();
  $('.button-collapse').sideNav({
    closeOnClick: true,
    draggable: false
  });
  $('.collapsible').collapsible();
  $('#modal-delete').modal();
  $('#modal-edit').modal();
};

export default initializeMaterializeJavascript;
