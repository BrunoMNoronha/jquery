let campo = $('.text-area');
let tempoInicial = $('#tempo-digitacao').text();

$(function () {

    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    validaTextArea();
    $('#btn-reset').click(reiniciaJogo);
});

function atualizaTamanhoFrase() {

    let frase = $('.frase').text();
    let numPalavras = frase.split(/\S+/).length;
    let tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {

    campo.on('input', function () {
        let conteudo = campo.val();

        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);

        let qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializaCronometro() {

    let tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', function () {
        $('#btn-reset').toggleClass('disabled');
        let cronometro = setInterval(function () {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                finish();
                clearInterval(cronometro);
            }
        }, 1000);
    });
}

function finish() {

    campo.attr('disabled', true);
    campo.addClass('text-area-desabilitado');
    $('#btn-reset').removeClass('disabled');
    setScore();
}

function validaTextArea() {

    let frase = $('.frase').text();
    campo.on('input', function () {
        var digitado = campo.val();
        var digitouCorreto = frase.startsWith(digitado);
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
}