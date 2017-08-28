(function($){
  $(document).ready(function(){
    $('.button-collapse').sideNav();
    $(".dropdown-button").dropdown();
    $("#modal-delete").modal();
    $("#modal-edit").modal();
    // $("#edit").on("click", function() {
    //   $("#modal-edit").modal();
    // });
    // $("#delete").on("click", function() {
    //   $("#modal-delete").modal();
    // });
    $("#new-post").on("click", function() {
      $("#modal-newpost").modal();
    });
    $("#title").val("Frosty Chocolat....");
    $("#ingredients").val("Vanilla, Chocolat, Margarine, Baking Powder");
    $("#content").val("Lorep ipsum dotae amet....");
    $("#first-name").val("Kayode");
    $("#last-name").val("Adeola");
    $("#handle").val("@monsieurkayode");
    $("#about-me").val("Lorep ipsum dotae amet coreum");
    // $("#profile-link").on("click", function() {
    //   const exp = /hide/gi;
    //   let check = document.getElementById("user-profile").className;
    //   check = check.split(" ");
    //   if (check[check.length - 1].match(exp) ? check.pop() : check.push("hide"));
    //   console.log(check);
      // if (check[check.length - 1].match(exp)) {
      //   return $("#user-profile").removeClass("hide");
      // }
      // return $("#user-profile").addClass("hide");
    // });
    // $('#myTab a').click(function(e) {
    //   e.preventDefault();
    //   $(this).tabs('select_tab', 'tab_id');
    // });
    // $("ul.tabs > li > a").on("shown.bs.tab", function(e) {
    //   var id = $(e.target).attr("href").substr(1);
    //   window.location.hash = id;
    // });
    // var hash = window.location.hash;
    // $('#myTab a[href="' + hash + '"]').tabs('select_tab', 'tab_id');
  });
})(jQuery);