var g = G$("Sara ", "Daqiq");
g.greet().setLang('es').greet(true).log();

$('#login').click(function(){
    var logingrtr = G$("Sara", "Daqiq");
    
    $('#logindiv').hide();
    logingrtr.setLang($("#lang").val()).HTMLGreetings('#greeting', true).log();
});