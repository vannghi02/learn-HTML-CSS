function openMenu() {
    $("#toggle").click(function () {
        $(".menu_fl2").slideToggle("slow");
    });
}

$(document).ready(function (){
    openMenu();
})

window.addEventListener