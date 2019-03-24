$(document).ready(function () {

    $(".sidenav").sidenav();

    $(".modal").modal();

    // Very Basic login name change

    $("#sign-in-btn").on("click", function () {
        if ($("#user-name").val().trim().length > 0 && $("#password").val().trim().length) {
            var username = $("#user-name").val().trim();
            console.log(username)
            $("#navbar-login-top").html(username + '<i class="material-icons right">perm_identity</i>');
            $("#navbar-login-side").html(username);

        } else {
            console.log("need more info")

        }
    })




});