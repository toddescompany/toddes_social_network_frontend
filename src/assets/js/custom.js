
  $(function () {

    // ativa os tooltips do start
    $(document).ready(function(){
      $("a").tooltip();
    });

    // MENU
    $('.nav-link').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });


    // AOS ANIMATION
    AOS.init({
      disable: 'mobile',
      duration: 800,
      anchorPlacement: 'center-bottom'
    });


    // SMOOTH SCROLL
    $(function() {
      $('.nav-link').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
          }, 1500);
            event.preventDefault();
      });
    });


    // PROJECT SLIDE
    $('#project-slide').owlCarousel({
      loop: true,
      center: true,
      autoplayHoverPause: false,
      autoplay: false,
      margin: 30,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
          },
          768:{
              items:2,
          }
      }
    });





 // menu fixo muda cor dps do scroll
 $(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

    if($nav.hasClass("scrolled"))
    {
      $("#logo_toddes_oficial").attr("src","../../assets/toddes_img/logo_toddes_branco.png");
    }
    else
    {
      $("#logo_toddes_oficial").attr("src","../../assets/toddes_img/logo_toddes_rosa.png");
    }
  });
});


// botão voltar para o topo
//Coloca o botão em uma varivel
var btn_subir = $("#botao-voltar-ao-topo");
//Faz a primeira verificacao ao carregar a pagina
$(document).ready(function(){
    var minhaposicao = $(this).scrollTop();
    if(minhaposicao >=100){
        btn_subir.fadeIn();
    }
    else{
        btn_subir.fadeOut();
    }
});
//Fica monitorando a rolagem de pagina
$(window).scroll(function(){
    var minhaposicao = $(this).scrollTop();

    if(minhaposicao >=7400){
        btn_subir.fadeIn();
    }
    else{
        btn_subir.fadeOut();
    }
});

btn_subir.click(function(){
    $('html,body').animate({scrollTop:0},1000);
})


  });






