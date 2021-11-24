
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
      $(".navbar-toggler-icon").addClass(" rolado");
      $(".navbar-toggler-icon").css("background","white");
      $(".navbar-toggler").click(function(){
          if($(".navbar-toggler").attr("aria-expanded") == "false")
          {
            $(".navbar-toggler-icon").css("background","#d148bb");
          }
          else
          {
            $(".navbar-toggler-icon").css("background","white");
          }
      });
    }
    else
    {
      $("#logo_toddes_oficial").attr("src","../../assets/toddes_img/logo_toddes_rosa.png");
      $(".navbar-toggler-icon").removeClass(" rolado");
      $(".navbar-toggler-icon").css("background","#d148bb");
      $(".navbar-toggler").click(function(){
      if($(".navbar-toggler").attr("aria-expanded") == "false")
          {
            $(".navbar-toggler-icon").css("background","white");
          }
          else
          {
            $(".navbar-toggler-icon").css("background","#d148bb");
          }
        });
    }
  });




});




// botão voltar para o topo
//Coloca o botão em uma varivel
var btn_subir = $("#botao-voltar-ao-topo");
//Faz a primeira verificacao ao carregar a pagina
$(document).ready(function(){
  btn_subir.hide();
});

//Fica monitorando a rolagem de pagina
$(window).scroll(function(){
    var minhaposicao = $(this).scrollTop();


// MOBILE FIRST
if($(window).width() <= 567)
{
  if(minhaposicao >=11150){
    btn_subir.fadeIn();
  }
  else{
      btn_subir.fadeOut();
  }
}


// TABLET
if($(window).width() >= 567 && $(window).width() <= 992)
{
  if(minhaposicao >=10750){
    btn_subir.fadeIn();
  }
  else{
      btn_subir.fadeOut();
  }
}

// DESKTOP
if($(window).width() > 992)
{
  if(minhaposicao >=9000){
    btn_subir.fadeIn();
  }
  else{
      btn_subir.fadeOut();
  }
}

});

btn_subir.click(function(){
    $('html,body').animate({scrollTop:0},1000);
});




/* EXPANDIR IMAGEM AO CLICAR */
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("der");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

$(".expandirIMG").click(function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

});








