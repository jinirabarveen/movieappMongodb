/*comparisssion of password and conformpassword in signup page */
$(function() {
    $("#button").click(function() {
        var password = $("#pass").val();
        var confirmPassword = $("#conpass").val();
        if (password != confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;

    });
});