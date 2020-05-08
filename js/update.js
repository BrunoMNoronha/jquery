$('#btn-update').click(getFrase);

function getFrase() {

    reiniciaJogo();
    $('.frase').text('').css('background-image', 'url("./img/spinner.gif")');
    $.get('http://localhost:3000/frases', fraseAleatoria)
        .fail(function () {

            $('.card-panel').slideDown();
            setTimeout(function () {

                $('.card-panel').slideUp();
            }, 3000)
        })
        .always(function () {

            $('.frase').css('background-image', 'none');
        });
}

function fraseAleatoria(data) {

    let frase = $('.frase');
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo)
}