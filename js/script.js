(function($){
  $(document).ready(function(){
    $('.button-collapse').sideNav();
    $(".dropdown-button").dropdown();
    $("#edit").on("click", function() {
      $("#modal-edit").modal();
    });
    $("#delete").on("click", function() {
      $("#modal-delete").modal();
    });
    $("#new-post").on("click", function() {
      $("#modal-newpost").modal();
    });
    $("#title").val("Frosty Chocolat....");
    $("#content").val("Lorep ipsum dotae amet....");
    $("#first-name").val("Kayode");
    $("#last-name").val("Adeola");
    $("#handle").val("@monsieurkayode");
    $("#about-me").val("Lorep ipsum dotae amet coreum");
    $("#profile-link").on("click", function() {
      const exp = /hide/gi;
      let check = document.getElementById("user-profile").className;
      check = check.split(" ");
      if (check[check.length - 1].match(exp) ? check.pop() : check.push("hide"));
      console.log(check);
      // if (check[check.length - 1].match(exp)) {
      //   return $("#user-profile").removeClass("hide");
      // }
      // return $("#user-profile").addClass("hide");
    });
  });
})(jQuery);