let campo = $('.text-area');
let tempoInicial = $('#tempo-digitacao').text();

$(function () {

    campo.val('');
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    validaTextArea();
    $('#btn-reset').click(reiniciaJogo);
});

function atualizaTamanhoFrase() {

    let frase = $('.frase').text();
    let numPalavras = frase.split(/\S+/).length - 1;
    let tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}

function inicializaContadores() {

    campo.on('input', function () {
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        let qtdCaracteres = conteudo.length;
        $('#contador-palavras').text(qtdPalavras);
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializaCronometro() {

    campo.one('focus', function () {

        let tempoRestante = $('#tempo-digitacao').text();
        let cronometro = setInterval(function () {
            $('#btn-reset').addClass('disabled');
            $('#btn-reset').attr('disabled', true);
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                finish();
                clearInterval(cronometro);
            }
            tempoRestante--;
        }, 1000);
    });
}

function finish() {

    campo.attr('disabled', true);
    campo.addClass('text-area-desabilitado');
    $('#btn-reset').removeClass('disabled');
    $('#btn-reset').attr('disabled', false)

    setScore();
}

function validaTextArea() {


    campo.on('input', function () {
        let frase = $('.frase').text();
        let digitado = campo.val();
        let digitouCorreto = frase.startsWith(digitado);
        if (digitouCorreto) {
            campo.removeClass('text-area-errado');
            campo.addClass('text-area-correto');
        } else {
            campo.removeClass('text-area-correto');
            campo.addClass('text-area-errado');
        }
    })
}

function reiniciaJogo() {

    campo.attr('disabled', false);
    campo.val('');
    campo.removeClass('text-area-desabilitado');
    campo.removeClass('text-area-correto');
    campo.removeClass('text-area-errado');

    $('#btn-reset').addClass('disabled');
    $('#btn-reset').attr('disabled', true);

    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    $('#tempo-digitacao').text(tempoInicial);

    inicializaCronometro();
};

function setScore() {

    let tbody = $('.score').find('tbody');
    let nome = 'Bruno';
    let numPalavras = $('#contador-palavras').text();

    let linha = `<tr>
                    <td>${nome}</td>
                    <td>${numPalavras}</td>
                </tr>`;

    tbody.prepend(linha);

    $('.score').slideDown(500);
    scrollScore();
}

$('#btn-score').click(showScore);

function showScore() {

    $('.score').stop().slideToggle(500);
}

function scrollScore() {

    var posicaoPlacar = $('.score').offset().top;
    $('html, body').animate({ scrollTop: posicaoPlacar + "px" }, 1000);
}