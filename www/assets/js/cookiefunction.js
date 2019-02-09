$(document).ready(function(){  
    
    if (localStorage.getItem("cookieclick") == "true") {

    } else {
        setTimeout(function () {
            $("#cookieConsent").fadeIn(200);
        }, 0);
        $("#closeCookieConsent, a.cookieConsentOK").click(function(src) {
            $("#cookieConsent").fadeOut(200);
            if (src.target.id == "fineBtn") {
                localStorage.setItem("cookieclick", "true");
            }
        });
    }
}
); 