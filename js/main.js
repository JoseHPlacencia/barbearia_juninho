(function () {
    var raiz = document.documentElement;
    raiz.classList.add('js');

    var cab = document.getElementById('cabecalho');
    var btn = document.querySelector('.menu_btn');
    var menu = document.getElementById('menu');

    function abrir(abrirMenu) {
        if (!btn || !menu) return;
        menu.classList.toggle('aberto', abrirMenu);
        btn.classList.toggle('ativo', abrirMenu);
        btn.setAttribute('aria-expanded', abrirMenu ? 'true' : 'false');
        btn.setAttribute('aria-label', abrirMenu ? 'Fechar menu' : 'Abrir menu');
        raiz.classList.toggle('menu_aberto', abrirMenu);
    }

    if (btn && menu) {
        btn.addEventListener('click', function () { abrir(!menu.classList.contains('aberto')); });
        menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') abrir(false); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') abrir(false); });
        window.addEventListener('resize', function () { if (window.innerWidth > 900) abrir(false); });
    }

    // Topo ganha fundo ao rolar
    var fixo = document.querySelector('.whats_fixo');
    function aoRolar() {
        if (cab) cab.classList.toggle('rolou', window.scrollY > 40);
        // Botão flutuante só aparece depois de passar pelo topo (hero)
        if (fixo) fixo.classList.toggle('mostrar', window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();

    // Animação suave de entrada
    var alvos = document.querySelectorAll('.chamada, .texto_apoio, .projetos .foto, .servico, .conheca_fotos, .conheca_texto, .mosaico .foto, .faixa_foto, .tabela_precos li, .chamada_final .moldura');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var io = new IntersectionObserver(function (itens) {
            itens.forEach(function (i) {
                if (i.isIntersecting) { i.target.classList.add('visivel'); io.unobserve(i.target); }
            });
        }, { threshold: 0.12 });
        alvos.forEach(function (el) { el.classList.add('revelar'); io.observe(el); });
    }
})();
