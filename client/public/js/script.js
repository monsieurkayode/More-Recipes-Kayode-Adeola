(($) => {
  $(document).ready(function(){
    $('.button-collapse').sideNav();
    $(".dropdown-button").dropdown();
    $("#modal-delete").modal();
    $("#modal-edit").modal();
    $("#modal-newpost").modal();
    $("#new-post").on("click", function() {
      $("#modal-newpost").modal();
    });
  });
})(jQuery);