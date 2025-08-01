window.addEventListener('DOMContentLoaded', () => {



  /*!
 * hoverIntent v1.10.1 // 2019.10.05 // jQuery v1.7.0+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007-2019 Brian Cherne
 */
!function(factory){"use strict";"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof module&&module.exports?module.exports=factory(require("jquery")):jQuery&&!jQuery.fn.hoverIntent&&factory(jQuery)}(function($){"use strict";function track(ev){cX=ev.pageX,cY=ev.pageY}var cX,cY,_cfg={interval:100,sensitivity:6,timeout:0},INSTANCE_COUNT=0,compare=function(ev,$el,s,cfg){if(Math.sqrt((s.pX-cX)*(s.pX-cX)+(s.pY-cY)*(s.pY-cY))<cfg.sensitivity)return $el.off(s.event,track),delete s.timeoutId,s.isActive=!0,ev.pageX=cX,ev.pageY=cY,delete s.pX,delete s.pY,cfg.over.apply($el[0],[ev]);s.pX=cX,s.pY=cY,s.timeoutId=setTimeout(function(){compare(ev,$el,s,cfg)},cfg.interval)};$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var instanceId=INSTANCE_COUNT++,cfg=$.extend({},_cfg);$.isPlainObject(handlerIn)?(cfg=$.extend(cfg,handlerIn),$.isFunction(cfg.out)||(cfg.out=cfg.over)):cfg=$.isFunction(handlerOut)?$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector}):$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut});function handleHover(e){var ev=$.extend({},e),$el=$(this),hoverIntentData=$el.data("hoverIntent");hoverIntentData||$el.data("hoverIntent",hoverIntentData={});var state=hoverIntentData[instanceId];state||(hoverIntentData[instanceId]=state={id:instanceId}),state.timeoutId&&(state.timeoutId=clearTimeout(state.timeoutId));var mousemove=state.event="mousemove.hoverIntent.hoverIntent"+instanceId;if("mouseenter"===e.type){if(state.isActive)return;state.pX=ev.pageX,state.pY=ev.pageY,$el.off(mousemove,track).on(mousemove,track),state.timeoutId=setTimeout(function(){compare(ev,$el,state,cfg)},cfg.interval)}else{if(!state.isActive)return;$el.off(mousemove,track),state.timeoutId=setTimeout(function(){!function(ev,$el,s,out){var data=$el.data("hoverIntent");data&&delete data[s.id],out.apply($el[0],[ev])}(ev,$el,state,cfg.out)},cfg.timeout)}}return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}});






  const menu = document.querySelector('.menu__catalog'),
  menuItem = document.querySelectorAll('.menu__link'),
  menuClose = document.querySelector('.menu__catalog__close'),
  contentClose = document.querySelectorAll('.menu__catalog__content__close'),
  menuContent = document.querySelectorAll('.menu__catalog__content'),
  hamburger = document.querySelector('.hamburger');
  mainMenu = document.querySelector('.main-menu__mobile');
  mainMenuCatalog = document.querySelector('.main-menu__mobile__item-catalog');
  body = document.querySelector('.body__wrap');
  header = document.querySelector('header');

  mainMenuCatalog.addEventListener('click', () => {
      
      menu.classList.toggle('menu__catalog_hide');
  });

  hamburger.addEventListener('click', () => {
    mainMenu.classList.toggle('main-menu__mobile-active');
    hamburger.classList.toggle('hamburger_active');
    body.classList.toggle('overflow');
  });

  menuClose.addEventListener('click', () => {
      menu.classList.toggle('menu__catalog_hide');
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.remove('hamburger_active');
          menu.classList.remove('menu_active');
      });
  });
  for (let i = 0; i < contentClose.length; i++) {
      contentClose[i].addEventListener('click', function() {
          menuContent[i].classList.remove('menu__catalog__content_active');
      });
    }
  //показать каталог меню
  $('.showCatalog').on('click', function(){
      $('.menu__catalog').toggleClass('menu__catalog_hide');
      $('.btn__burger').toggleClass('btn__burger_active');
      $("body").toggleClass('opened_menu');
      
      $('.menu__catalog__overlay').toggleClass('menu__catalog__overlay_active');
      // $('body').toggleClass('overflow');
  });
  

  $(function() {


    function showMenuBig() {
      $(this)
          .addClass('menu__catalog__link_active').siblings().removeClass('menu__catalog__link_active')
          .closest('div.menu__catalog__wrap').find('div.menu__catalog__content').removeClass('menu__catalog__content_active').eq($(this).index()).addClass('menu__catalog__content_active');
    }
    function hideMenuBig() {

    }
    $("ul.menu__catalog__scroll li:not(.menu__catalog__link_active)").hoverIntent(showMenuBig, hideMenuBig);

      // $('ul.menu__catalog__scroll').on('mouseenter', 'li:not(.menu__catalog__link_active)', function() {
      //   $(this)
      //     .addClass('menu__catalog__link_active').siblings().removeClass('menu__catalog__link_active')
      //     .closest('div.menu__catalog__wrap').find('div.menu__catalog__content').removeClass('menu__catalog__content_active').eq($(this).index()).addClass('menu__catalog__content_active');
      // });
      
    });

    
   
  
//overlay
function consoleBG() {
  if ($(window).scrollTop() == 160) {
    $('.menu__catalog__overlay').css({
      'top' : '0px',
      
    });
    
  } 
  
}
consoleBG();

//dropdown menu - сужение меню при изменении ширины экрана
function responseMenu(){
$('ul.dropdown-menu li.item').appendTo('ul.menu');
var items = $('ul.menu li.item');
var max_width = $('ul.menu').width() - $('ul.menu li.dd_menu').outerWidth();
var width = 0;
var hide_from = 0;

items.css({'width':'auto'});

items.each(function(index){
  if (width + $(this).outerWidth() > max_width)
  {
    return false;
  }
  else
  {
    hide_from = index;
    width += $(this).outerWidth();
  }
});
if (hide_from < items.length - 1) {
  items.eq(hide_from).nextAll('li.item').appendTo('ul.dropdown-menu');
  // items.css({'width':(max_width / (hide_from)) + 'px'});
      items.css({'width':'fit-content'});
  $('ul.menu li.dd_menu').show();
}
else
{
  $('ul.menu li.dd_menu').hide();
}
}



$('.top_menu').on('click', '.dropdown-toggle', function () {
  $('.dropdown-menu').toggle();
});

$(window).on('resize', function(){
  responseMenu();
}).trigger('resize');
  $(document).mouseup( function(e){ // событие клика по веб-документу
      var div = $( ".dropdown-menu" ); // тут указываем ID элемента
      if ( !div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
          $('.dropdown-menu').hide(); // скрываем его
      }
  
  
      
  });


// ПОКАЗ МОДАЛЬНЫХ ОКОН

  //modal login войти зарегистрироваться
  $('.header__profile, .registration').on('click', function(e) {
    $('.overlay, .modal').fadeOut();
      $('.overlay, .modal__login').fadeIn();
      
  });


  if (window.location.pathname === '/pro/') {
    // Находим кнопку с классом .sign__in-btn
    const signInBtn = document.querySelector('.sign__in-btn');
    
    if (signInBtn) {
        // Добавляем обработчик клика
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение, если нужно
            
            // Находим элемент с id="form_pro"
            const formPro = document.querySelector('#form_pro');
            
            if (formPro) {
                // Плавный скролл к элементу
                formPro.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
} else {
  //modal login войти для авторизации (зарег пользователи)
  $('.log-in,.sign__in-btn').on('click', function(e) {
    e.preventDefault();
    $('.modal__login').fadeOut();
    $('.overlay, .modal__login-reg-user').fadeIn();
    
  });
}





  //modal login войти как поставщик
  $('.login-prov').on('click', function(e) {
    e.preventDefault();
    $('.modal__login').fadeOut();
    $('.overlay, .modal__login-reg-prov').fadeIn();
    
  });



  
  $('.add__review-btn').on('click', function(e) {
    e.preventDefault();
      $('.overlay, .modal__review').fadeIn();
  });


  //modal help footer
  $('.showHelp').on('click', function(e) {
    e.preventDefault();
      $('.overlay, .modal__help').fadeIn();
  });
  //modal order оформить заказ

  // товар добавлен в корзину тогглер
  $('.modal__addincart__tonn').on('click', function() {
      $('.modal__addincart__tonn').addClass('active');
      $('.modal__addincart__metr').removeClass('active');
  });
  $('.modal__addincart__metr').on('click', function() {
      $('.modal__addincart__metr').addClass('active');
      $('.modal__addincart__tonn').removeClass('active');
  });
  //providerscard добавить в корзину товар
  $('.addincart').on('click', function() {
      $('.overlay, .modal__addincart').fadeIn();
  });

  //закрыть модальное окно
  $('.modal__close, .overlay, .order__close,.close__modal-b').on('click', function() {
      $('.overlay, .modal').fadeOut();
      // window.location.href = "/orders/";
  });

  //показать вопрос с уточнением города
  $('.header__place').on('click', function(e) {
    e.preventDefault();
      $('.header__place__quest').toggleClass('hide');
  });
  //показать выбор города 
  $('.city-modal').on('click', function(e) {
    e.preventDefault();
    $('.overlay, .modal__city').fadeIn();
  });

  //показать продление медийного баннера/оплата
  
  $('.payBanner').on('click', function(e) {
    e.preventDefault();
      $('.overlay, .modal').fadeIn();
      console.log('ok');
  });

  //подписаться за заявку страница applications
  $('.applications-subscribe').on('click', function(e) {
    e.preventDefault();
    $('.overlay, .modal__applications-subscribe').fadeIn();
  });

  //разместить заявку страница applications
  $('.applications-order').on('click', function(e) {
    e.preventDefault();
    $('.overlay, .modal__applications__order').fadeIn();
  });

   //Отправить приглашение поставщику
   $('.invite-provider').on('click', function(e) {
    e.preventDefault();
    $('.overlay, .modal__invite').fadeIn();
  });

    //заказать обратный звонок
    $('.call').on('click', function(e) {
      e.preventDefault();
      $('.modal').fadeOut();
      $('.overlay, .modal__call').fadeIn();
    });

    //Написать письмо
    $('.mail-send').on('click', function(e) {
      e.preventDefault();
      $('.modal').fadeOut();
      $('.overlay, .modal__mail').fadeIn();
    });

//КОРЗИНА добавить-убрать еденицу товара


  $('.plus').on('click', function() {
    var input = $(this).prev('.quantity');
    var value = parseFloat(input.val());
      input.val((value + 1).toFixed(2));
  });

  $('.minus').on('click', function() {
      var input = $(this).nextAll('.quantity').first();
      var value = parseFloat(input.val());
      if (value > 0) {
        input.val((value - 1).toFixed(2));
      }
    });


//показать подробнее заявку на странице applications
function showApplication () {
$('.applications__table__descr').each(function() {
  var $text = $(this).find('.applications__table__descr__text');
  var lineHeight = parseInt($text.css('line-height')); // получаем высоту строки
  var maxHeight = lineHeight * 4; // максимальная высота текста - 4 строки
  if ($text.height() > maxHeight) { // если текст занимает больше 4 строк
    $text.css({
      'max-height': maxHeight + 'px', // устанавливаем максимальную высоту
      'overflow': 'hidden' // скрываем остаток текста
    });
    var $button = $('<button>Подробнее</button>'); // создаем кнопку "Подробнее"
    $button.on('click', function() { // при клике на кнопку
      $text.css({
        'max-height': 'none', // устанавливаем высоту по содержимому
        'overflow': 'visible' // показываем весь текст
      });
      $button.hide(); // скрываем кнопку "Подробнее"
    });
    $(this).append($button); // добавляем кнопку после текста
  }
});
}
showApplication ();
//маска для телефона

let element = document.querySelectorAll('.phone');
let maskOptions = {
  mask: '+7 (000) 000-00-00'
};
for (let i = 0; i < element.length; i++) {
  let mask = IMask(element[i], maskOptions);
}

//скопировать реферальную ссылку
$('.copy').click(function() {
  var copyText = $('#ref-link');
  copyText.select();
  document.execCommand('copy');
  $('.profile__tooltip').fadeIn();
  setTimeout(function() { $('.profile__tooltip').hide('slow'); }, 1000);
});

//прикрепить файл реквизитов в профиле
var dt = new DataTransfer();

$('.input-file input[type=file]').each(function(){
$(this).on('change', function(){
  let $files_list = $(this).closest('.input-file').next();
  $files_list.empty();

  for(var i = 0; i < this.files.length; i++){
    let new_file_input = '<div class="input-file-list-item">' +
      '<span class="input-file-list-name">' + this.files.item(i).name + '</span>' +
      '<div class="input-file-list-remove"></div>' +
      '</div>';
    $files_list.append(new_file_input);
    dt.items.add(this.files.item(i));
  };
  this.files = dt.files;
    $('.btn_file').fadeOut();
});
});
$("body").on('click', '.input-file-list-remove', function(i) {
$('.input-file-list-item').remove();
$('.btn_file').fadeIn();
});


//показать календарь
new AirDatepicker('#calend', {
      isMobile: true,
      autoClose: true,
      range: true,
      multipleDatesSeparator: ' - ',
      showOtherMonths: true,
      dateFormat: 'dd MMM yy',
      selectOtherMonths:true,
      moveToOtherMonthsOnSelect: true,
      numberOfMonths: 3
  });

  new AirDatepicker('#calend2', {
      isMobile: true,
      autoClose: true,
      range: true,
      multipleDatesSeparator: ' - ',
      showOtherMonths: true,
      dateFormat: 'dd MMM yy',
      selectOtherMonths:true,
      moveToOtherMonthsOnSelect: true,
      numberOfMonths: 3
  });
  

  //showMore catalog
  function showMore(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              
              $('.catalog__list__wrap').eq(i).toggleClass('heightAuto');
              $('.catalogShowMore').eq(i).toggleClass('hide');
              $('.catalogHide').eq(i).toggleClass('hide');
          });
      });
  }
  showMore('.catalogShowMore');
  showMore('.catalogHide');


//страница профиль статистика
  //табы в моб. версии
  $('ul.profile__stat__tabs__caption').on('click', 'li:not(.profile__stat__tab_active)', function() {
      $(this)
      .addClass('profile__stat__tab_active').siblings().removeClass('profile__stat__tab_active')
      .closest('div.profile__stat__tabs').find('div.profile__stat__tab__content').removeClass('profile__stat__tab__content_active').eq($(this).index()).addClass('profile__stat__tab__content_active');
  });
  
  //слайдер листать список топовых категорий
  if($('.profile__stat__list__slider').length > 0) {
  $('.profile__stat__list__slider').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: true,
      arrows: false,
    });
     
  $('.profile__stat__btn_prev').each(function(i) {
      $(this).on('click', function() {
          $('.profile__stat__list__slider').eq(i).slick('slickPrev');
          
      });
    });
    $('.profile__stat__btn_next').each(function(i) {
      $(this).on('click', function() {
          $('.profile__stat__list__slider').eq(i).slick('slickNext');
          
      });
    });
  }
  if($('.promo__slider').length > 0) {
// promo slider
  $('.promo__slider').slick({
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="/img/next.svg"></button>',
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  arrows: false,
                  slidesToShow: 1                   
              }
               
          },
          {
              breakpoint: 1420,
              settings: {
                  arrows: false,
                  slidesToShow: 1                   
              }
               
          }
          
      ]
    });
  }

  if($('.popular__slider').length > 0) {


  // popular slider
  $('.popular__slider').slick({
      dots: false,
      slidesToShow: 7,
      centerMode: false,
      // touchThreshold: 15,
      prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="/img/next.svg"></button>',
      
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  arrows: false,
                  slidesToShow: 4,
                  variableWidth: true,
                  centerMode: false,
                                     
              } 
          },
          {
              breakpoint: 768,
              settings: {
                  arrows: false,
                  slidesToShow: 2,
                  centerPadding: '16px',
                  // variableWidth: true,
                  centerMode: false,
                  
              } 
          }
      ]
  });
}
  //show info providers card
function showInfo(item) {
  $(item).each(function(i) {
      $(this).on('click', function(e) {
          
          $('.providers__phone').eq(i).removeClass('providerscard__hide');
          
      });
  });
}
showInfo('.showInfo');

//raiting count
const counters = document.querySelectorAll('.raiting-counter'),
    lines = document.querySelectorAll('.about__raiting__line span');

counters.forEach( (item, i) => {
  lines[i].style.width = item.innerHTML*100/10 + '%';
});

//providerscard slider
if($('.providerscard__slider-for').length > 0) {
$('.providerscard__slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  infinite: true,
  asNavFor: '.providerscard__slider-nav',
  prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev.svg"></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="/img/next.svg"></button>',
  responsive: [
      {
          breakpoint: 767,
          settings: {
              arrows: false,
              slidesToShow: 1,
              
              centerMode: true,
          } 
      }
  ]
});
}
if($('.providerscard__slider-nav').length > 0) {
$('.providerscard__slider-nav').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  asNavFor: '.providerscard__slider-for',
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true,
  infinite: true,
});
}

$( '.providerscard__slider-for' ).on('beforeChange', function(event, slick, currentSlide, nextSlide){
  $("video").each(function(){
    this.pause();
  });
});


//плавный скролл
$('.providerscard__menu__link').on('click', function() {
  var el = $(this);
  var dest = el.attr('href');
  if (dest !== undefined && dest !== '') {
      $('html').animate({
          scrollTop: $(dest).offset().top
      }, 500);
  }
  // return false;

});

//providerscard tabs
$(function() {

  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  });
  
});

// show map adresses providerscard
function showAdress(item) {
  $(item).each(function(i) {
      $(this).on('click', function(e) {
          
          $('.providerscard__map__adress').eq(i).fadeIn();
          
      });
  });
}
showAdress('.providerscard__map__block');



// страница каталог фильтры, Страница Поставщики фильтры

//show catalogFilters
$('.showFilters').on('click', function() {
  $('.catalogFilters__form').fadeIn();
  $('.catalogFilters__header').fadeIn();
  $('.overlay').fadeIn();
  $('.showFilters').fadeOut();
});
$('.catalogFilters__close').on('click', function() {
  $('.catalogFilters__form').fadeOut();
  $('.catalogFilters__header').fadeOut();
  $('.overlay').fadeOut();
  $('.showFilters').fadeIn();
});

//фильтры в кастомном дропдауне c возможностью ввода диапазона на странице каталог фильтры

$('.custom-drop').on('click', function(){
  $('.form__input__dropdown').css('height', 'auto');
});
//фильтр
$('.form__input__dropdown__filter-count-from, .form__input__dropdown__filter-count-to').on('input', function(){
  var from = parseInt($('.form__input__dropdown__filter-count-from').val());
  var to = parseInt($('.form__input__dropdown__filter-count-to').val());
  $('.form__input__dropdown__label').each(function(){
    var price = parseInt($(this).find('.fs_15').text());
    if(price >= from && price <= to){
      $(this).show();
    }else{
      $(this).hide();
    }
  });
});
//отображаются все значения, если не заполнен фильтр
$('.form__input__dropdown__filter-count').on('input', function(){
if($(this).val() == '') {
  $('.form__input__dropdown__label').show();
}
});
//значения выбранных чекбоксов подставляется в значение инпута
$('.catalogFilters-sizecheck').change(function() {
var checkedLabels = $('.catalogFilters-sizecheck:checked').map(function() {
  return $('label[for="' + $(this).attr('id') + '"]').text().trim();
}).get().join(', ');
$('#catalogFilters-size').val(checkedLabels.trim());

});
//скрыть дропдаун при клике на окно
$(document).mouseup( function(e){ // событие клика по веб-документу
  var div = $( ".form__input__search" ); // тут указываем ID элемента
  if ( !div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
      $('.form__input__dropdown').hide(); // скрываем его

  } else {
      $('.form__input__dropdown').show();
  }
   });

// стили datalist на странице каталог-фильтры, выбор города
$('.filter-dropdown').each(function(){
  let filter = $(this),
      filterInput = filter.find('input'),
      filterList = filter.find('datalist');
     
      filterInput.on('focus', function () {
        filterList.css('display', 'block');
       
      });
     
      filterList.find('option').on('click', function () {
        filterInput.val($(this).val());
        filterList.css('display', 'none');
          
    });
    
    filterInput.on('input', function() {
      currentFocus = -1;
      var text = filterInput.val().toUpperCase();
      for (let option of filterList.find('option')) {
        if(option.value.toUpperCase().indexOf(text) > -1){
          $(option).css('display', 'block');
      }else{
        $(option).css('display', 'none');
        }
      };
    });
      var currentFocus = -1;
      filterInput.onkeydown = function(e) {
        if(e.keyCode == 40){
          currentFocus++
         addActive(filterList.options);
        }
        else if(e.keyCode == 38){
          currentFocus--
         addActive(filterList.options);
        }
        else if(e.keyCode == 13){
          e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (filterList.options) filterList.options[currentFocus].click();
              }
        }
      }
      
      function addActive(x) {
          if (!x) return false;
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          x[currentFocus].classList.add("active");
        }
        function removeActive(x) {
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("active");
          }
        }
       
        $(document).mouseup( function(e){ // событие клика по веб-документу
          var div = $( ".filter-dropdown" ); // тут указываем ID элемента
          if ( !div.is(e.target) // если клик был не по нашему блоку
              && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
              $(filterList).hide(); // скрываем его
              
          }
         });
       
        
           
});


function inputCity () {
let filter = $('.filter-dropdown-city'),
    filterInput = filter.find('input'),
    filterList = filter.find('datalist');
   
    filterInput.on('input', function () {
      filterList.css('display', 'block');
      $('.modal__city__list').css('display', 'none'); //для выбора города
      $('.remove-val').css('display', 'block'); //для выбора города
    });
   
    filterList.find('option').on('click', function () {
      var url = $(this).data('url');
      window.location.href = url;
      filterInput.val($(this).val());
      filterList.css('display', 'none');
        
  });
  
  filterInput.on('input', function() {
    currentFocus = -1;
    var text = filterInput.val().toUpperCase();
    for (let option of filterList.find('option')) {
      if(option.value.toUpperCase().indexOf(text) > -1){
        $(option).css('display', 'block');
    }else{
      $(option).css('display', 'none');
      }
    };
  });
    var currentFocus = -1;
    filterInput.onkeydown = function(e) {
      if(e.keyCode == 40){
        currentFocus++
       addActive(filterList.options);
      }
      else if(e.keyCode == 38){
        currentFocus--
       addActive(filterList.options);
      }
      else if(e.keyCode == 13){
        e.preventDefault();
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (filterList.options) filterList.options[currentFocus].click();
            }
      }
    }
    
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("active");
      }
      function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("active");
        }
      }
     
      $(document).mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".filter-dropdown" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            $(filterList).hide(); // скрываем его
            
        }
       });
       $(document).mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".filter-dropdown form" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            ) { 
              $('.modal__city__list').css('display', 'grid'); //показать весь список городов
            
        }
       });
      
}
inputCity();       


//выбор города - вставить значение в инпут
$('.modal__city__list button').click(function() {
$('#modal-city').val($(this).text());
});

//блог - показать больше статей

      
var visibleBlocks = 12;
var allBlocks = $('.blog__articles__item').length;
       
$('.blog__articles__item').slice(visibleBlocks).hide();
       
$('.btn_show-more').on('click', function() {
         visibleBlocks += 12;
         
 if (visibleBlocks >= allBlocks) {
   $('.btn_show-more').hide();
 }
          
 $('.blog__articles__item').slice(0, visibleBlocks).show();
});

//спецпредложения - показать больше спецпредложений


var visibleBlocks1 = 12;
var allBlocks1 = $('.offers__item').length;
   
$('.offers__item').slice(visibleBlocks1).hide();
   
$('.btn_show-more').on('click', function() {
     visibleBlocks1 += 12;
     
if (visibleBlocks1 >= allBlocks1) {
$('.btn_show-more').hide();
}
      
$('.offers__item').slice(0, visibleBlocks1).show();
});  

//поставщики (provider-site) - показать больше поставщиков


var visibleBlocks2 = 8;
var allBlocks2 = $('.providerSite__item').length;
   
$('.providerSite__item').slice(visibleBlocks2).hide();
   
$('.btn_show-more').on('click', function() {
     visibleBlocks2 += 12;
     
if (visibleBlocks2 >= allBlocks2) {
$('.btn_show-more').hide();
}
      
$('.providerSite__item').slice(0, visibleBlocks2).show();
});       



//select 
function newSelect() {
$('.select_main').each(function() {
  const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 350; // длительность анимации 

  _this.hide();
  _this.wrap('<div class="select"></div>');
  $('<div>', {
      class: 'new-select',
      text: _this.children('option:selected').text()
  }).insertAfter(_this);

  const selectHead = _this.next('.new-select');
  $('<div>', {
      class: 'new-select__list'
  }).insertAfter(selectHead);

  const selectList = selectHead.next('.new-select__list');
  for (let i = 1; i < selectOptionLength; i++) {
      $('<div>', {
          class: 'new-select__item',
          html: $('<span>', {
              text: selectOption.eq(i).text()
          })
      })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }

  const selectItem = selectList.find('.new-select__item');
  selectList.slideUp(0);
  selectHead.on('click', function() {
      if ( !$(this).hasClass('on') ) {
          $(this).addClass('on');
          selectList.slideDown(duration);

          selectItem.on('click', function() {
              let chooseItem = $(this).data('value');

              _this.val(chooseItem).attr('selected', 'selected');
              selectHead.text( $(this).find('span').text() );

              selectList.slideUp(duration);
              selectHead.removeClass('on');
              let select = $('select');
              _this.trigger('change');
          });

      } else {
          $(this).removeClass('on');
          selectList.slideUp(duration);
      }
  });
});
$(document).mouseup( function(e){ // событие клика по веб-документу
  var div = $( "new-select" ); // тут указываем ID элемента
  if ( !div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
      $('.new-select__list').hide(); // скрываем его
  }
 });
}
newSelect();


// //меняется контент подраздела в зависимости от раздела
// var select1 = document.getElementById("chapter");
// var select2 = document.getElementById("chapter2");
// if (select1) {
// document.querySelector('.armatura').style.display = 'block';

// select1.onchange = function() {
// changeSelect2Options();

// };

// function changeSelect2Options() {
// var selectedOption = select1.value;

// switch(selectedOption) {
//   case "Арматура":
//     var elements = document.querySelectorAll('.chapter_2');
//       for (var i = 0; i < elements.length; i++) {
//         elements[i].style.display = 'none';
//       }
//     document.querySelector('.armatura').style.display = 'block';
//     break;

//   case "Балка":
//     var elements = document.querySelectorAll('.chapter_2');
//     for (var i = 0; i < elements.length; i++) {
//       elements[i].style.display = 'none';
//     }
//     document.querySelector('.balka').style.display = 'block';
//     break;

//   case "Баллоны":
//     var elements = document.querySelectorAll('.chapter_2');
//       for (var i = 0; i < elements.length; i++) {
//         elements[i].style.display = 'none';
//       }
//     document.querySelector('.ballony').style.display = 'block';
//     break;

//   case "Дробь":
//     var elements = document.querySelectorAll('.chapter_2');
//       for (var i = 0; i < elements.length; i++) {
//         elements[i].style.display = 'none';
//       }
//     document.querySelector('.drob').style.display = 'block';
//     break;

//   case "Заглушки":
//      var elements = document.querySelectorAll('.chapter_2');
//        for (var i = 0; i < elements.length; i++) {
//          elements[i].style.display = 'none';
//       }
//      document.querySelector('.zaglushki').style.display = 'block';
//      break;

//     case "Задвижки":
//     var elements = document.querySelectorAll('.chapter_2');
//       for (var i = 0; i < elements.length; i++) {
//         elements[i].style.display = 'none';
//       }
//     document.querySelector('.zadvighki').style.display = 'block';
//     break;
    
//     case "Катанка":
//       var elements = document.querySelectorAll('.chapter_2');
//         for (var i = 0; i < elements.length; i++) {
//           elements[i].style.display = 'none';
//         }
//       document.querySelector('.katanka').style.display = 'block';
//       break;

//     case "Квадрат":
//       var elements = document.querySelectorAll('.chapter_2');
//          for (var i = 0; i < elements.length; i++) {
//            elements[i].style.display = 'none';
//         }
//        document.querySelector('.kwadrat').style.display = 'block';
//       break;

//      case "Краны шаровые":
//        var elements = document.querySelectorAll('.chapter_2');
//          for (var i = 0; i < elements.length; i++) {
//           elements[i].style.display = 'none';
//         }
//        document.querySelector('.krany').style.display = 'block';
//         break;

//     case "Лента и штрипс":
//       var elements = document.querySelectorAll('.chapter_2');
//          for (var i = 0; i < elements.length; i++) {
//          elements[i].style.display = 'none';
//         }
//       document.querySelector('.lenta').style.display = 'block';
//        break;

//        case "Лист":
//         var elements = document.querySelectorAll('.chapter_2');
//           for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = 'none';
//           }
//         document.querySelector('.list').style.display = 'block';
//         break;
  
//       case "Металло-черепица":
//         var elements = document.querySelectorAll('.chapter_2');
//         for (var i = 0; i < elements.length; i++) {
//           elements[i].style.display = 'none';
//         }
//         document.querySelector('.metallocherepiza').style.display = 'block';
//         break;
  
//       case "Отводы":
//         var elements = document.querySelectorAll('.chapter_2');
//           for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = 'none';
//           }
//         document.querySelector('.otvody').style.display = 'block';
//         break;
  
//       case "Переходы":
//         var elements = document.querySelectorAll('.chapter_2');
//           for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = 'none';
//           }
//         document.querySelector('.perehody').style.display = 'block';
//         break;
  
//       case "Поковка":
//          var elements = document.querySelectorAll('.chapter_2');
//            for (var i = 0; i < elements.length; i++) {
//              elements[i].style.display = 'none';
//           }
//          document.querySelector('.pokovka').style.display = 'block';
//          break;
  
//         case "Полоса":
//         var elements = document.querySelectorAll('.chapter_2');
//           for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = 'none';
//           }
//         document.querySelector('.polosa').style.display = 'block';
//         break;
        
//         case "Проволока":
//           var elements = document.querySelectorAll('.chapter_2');
//             for (var i = 0; i < elements.length; i++) {
//               elements[i].style.display = 'none';
//             }
//           document.querySelector('.provoloka').style.display = 'block';
//           break;
  
//         case "Профнастил":
//           var elements = document.querySelectorAll('.chapter_2');
//              for (var i = 0; i < elements.length; i++) {
//                elements[i].style.display = 'none';
//             }
//            document.querySelector('.profnastil').style.display = 'block';
//           break;
  
//          case "Рельсы":
//            var elements = document.querySelectorAll('.chapter_2');
//              for (var i = 0; i < elements.length; i++) {
//               elements[i].style.display = 'none';
//             }
//            document.querySelector('.relsy').style.display = 'block';
//             break;
  
//         case "Рулоны":
//           var elements = document.querySelectorAll('.chapter_2');
//              for (var i = 0; i < elements.length; i++) {
//              elements[i].style.display = 'none';
//             }
//           document.querySelector('.rulony').style.display = 'block';
//            break;
      
//            case "Сетка":
//             var elements = document.querySelectorAll('.chapter_2');
//               for (var i = 0; i < elements.length; i++) {
//                 elements[i].style.display = 'none';
//               }
//             document.querySelector('.setka').style.display = 'block';
//             break;
    
//           case "Слитки":
//             var elements = document.querySelectorAll('.chapter_2');
//                for (var i = 0; i < elements.length; i++) {
//                  elements[i].style.display = 'none';
//               }
//              document.querySelector('.slitki').style.display = 'block';
//             break;
    
//            case "Сэндвич-панели":
//              var elements = document.querySelectorAll('.chapter_2');
//                for (var i = 0; i < elements.length; i++) {
//                 elements[i].style.display = 'none';
//               }
//              document.querySelector('.sandwichpaneli').style.display = 'block';
//               break;
    
//           case "Тройники":
//             var elements = document.querySelectorAll('.chapter_2');
//                for (var i = 0; i < elements.length; i++) {
//                elements[i].style.display = 'none';
//               }
//             document.querySelector('.troiniki').style.display = 'block';
//              break;

//              case "Труба":
//               var elements = document.querySelectorAll('.chapter_2');
//                 for (var i = 0; i < elements.length; i++) {
//                   elements[i].style.display = 'none';
//                 }
//               document.querySelector('.truba').style.display = 'block';
//               break;
      
//             case "Уголок":
//               var elements = document.querySelectorAll('.chapter_2');
//                  for (var i = 0; i < elements.length; i++) {
//                    elements[i].style.display = 'none';
//                 }
//                document.querySelector('.ugolok').style.display = 'block';
//               break;
      
//              case "Фланцы":
//                var elements = document.querySelectorAll('.chapter_2');
//                  for (var i = 0; i < elements.length; i++) {
//                   elements[i].style.display = 'none';
//                 }
//                document.querySelector('.flanzy').style.display = 'block';
//                 break;
      
//             case "Чушки":
//               var elements = document.querySelectorAll('.chapter_2');
//                  for (var i = 0; i < elements.length; i++) {
//                  elements[i].style.display = 'none';
//                 }
//               document.querySelector('.chushki').style.display = 'block';
//                break;

//                case "Швеллер":
//                 var elements = document.querySelectorAll('.chapter_2');
//                   for (var i = 0; i < elements.length; i++) {
//                     elements[i].style.display = 'none';
//                   }
//                 document.querySelector('.shweller').style.display = 'block';
//                 break;
        
//               case "Шестигранник":
//                 var elements = document.querySelectorAll('.chapter_2');
//                    for (var i = 0; i < elements.length; i++) {
//                      elements[i].style.display = 'none';
//                   }
//                  document.querySelector('.shestigrannik').style.display = 'block';
//                 break;
        
//                case "Шина":
//                  var elements = document.querySelectorAll('.chapter_2');
//                    for (var i = 0; i < elements.length; i++) {
//                     elements[i].style.display = 'none';
//                   }
//                  document.querySelector('.shina').style.display = 'block';
//                   break;
        
//               case "Электроды":
//                 var elements = document.querySelectorAll('.chapter_2');
//                    for (var i = 0; i < elements.length; i++) {
//                    elements[i].style.display = 'none';
//                   }
//                 document.querySelector('.elektrody').style.display = 'block';
//                  break;
    
      
// }

// }
// }


// показать все характериситки в моб
function tableShowMore(item) {
  $(item).each(function(i) {
      $(this).on('click', function(e) {
          
          $('.table__row_top').eq(i).toggleClass('heightAuto');
          $('.table__showMore').eq(i).toggleClass('hide');
          $('.table__hide').eq(i).toggleClass('hide');
      });
  });
}
tableShowMore('.table__showMore');
tableShowMore('.table__hide');

//страница рекламодателям

// rew slider
if($('.advRew__slider').length > 0) {
$('.advRew__slider').slick({
  dots: false,
  prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev.svg"></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="/img/next.svg"></button>',
  slidesToShow: 4,
  infinite: false,
  
  responsive: [
      {
          breakpoint: 1023,
          settings: {
              centerMode: false,
              slidesToShow: 2,  
              arrows: false,
                           
          }
         
      }
  ]
});
}

  //страница blog
  //blog slider
  if($('.advRew__slider').length > 0) {
  $('.blog__slider').slick({
      dots: false,
      slidesToShow: 6,
      
      prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="/img/next.svg"></button>',
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  arrows: false,
                  slidesToShow: 4,
                  variableWidth: true,
                  centerMode: true,
                                     
              } 
          },
          {
              breakpoint: 768,
              settings: {
                  arrows: false,
                  slidesToShow: 3,
                  variableWidth: true,
                  centerMode: false,
                                     
              } 
          }
      ]
  });
  }
 




  // стили datalist на странице справочника стандартов

  let directory = document.getElementById('directory'),
  directorysearch = document.getElementById('directorysearch');
  if(directory) {
      directory.onfocus = function () {
          directorysearch.style.display = 'block';
          $('.overlay_light').fadeIn();
          $('.catalog__search').css('z-index', '11');
        };
        for (let option of directorysearch.options) {
          option.onclick = function () {
              directory.value = option.value;
              directorysearch.style.display = 'none';
              
              $('.overlay_light').fadeOut();
          }
        };
        
        directory.oninput = function() {
          currentFocus = -1;
          var text = directory.value.toUpperCase();
          for (let option of directorysearch.options) {
            if(option.value.toUpperCase().indexOf(text) > -1){
              option.style.display = "block";
          }else{
            option.style.display = "none";
            }
          };
        }
        var currentFocus = -1;
        directory.onkeydown = function(e) {
          if(e.keyCode == 40){
            currentFocus++
           addActive(directorysearch.options);
          }
          else if(e.keyCode == 38){
            currentFocus--
           addActive(directorysearch.options);
          }
          else if(e.keyCode == 13){
            e.preventDefault();
                if (currentFocus > -1) {
                  /*and simulate a click on the "active" item:*/
                  if (directorysearch.options) directorysearch.options[currentFocus].click();
                }
          }
        }
        
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("active");
          }
          function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
              x[i].classList.remove("active");
            }
          }
      
         $('.overlay_light').on('click', function(){
          directorysearch.style.display = 'none';
          $('.overlay_light').fadeOut();
         })
  }


    //rew popup + company popup Достижения и награды страницы О сервисе
// $('.advRew__slider').magnificPopup({
//   delegate: 'a',
//   type: 'image',
//   tLoading: 'Загрузка изображения #%curr%...',
//   gallery: {
//       enabled: true,
//       navigateByImgClick: true,
//       preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
//   }
//   });

  //страница для поставщиков
  //слайдер
  if($('.advRew__slider').length > 0) {
  $('.forproviders__cases__slider').slick({
      dots: false,
      prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="/img/next.svg"></button>',
      slidesToShow: 1,
      infinite: true,
    //   responsive: [
    //     {
    //         breakpoint: 800,
    //         settings: {
    //             arrows: false,
    //             dots: true,            
    //         }
             
    //     },
        
        
    // ]
  });
}
  //выбор тарифа
  var radioButtons = $('.forproviders__details__tarif-item input[type="radio"]');

  radioButtons.change(function() {
    // Находим ближайший блок с классом "forproviders__details__tarif-item"
    var tarifItem = $(this).closest('.forproviders__details__tarif-item');
    $('.forproviders__details__tarif-item').removeClass('active');
    // Если радиокнопка выбрана, то добавляем класс "active", иначе удаляем его
    if ($(this).is(':checked')) {
      tarifItem.addClass('active');
    } else {
      tarifItem.removeClass('active');
    }
    var activeTarifName = $('.forproviders__details__tarif-item.active').find('.forproviders__details__tarif-name').text();
    $('.forproviders__details__order').val(activeTarifName);
    var activeTarifCost = $('.forproviders__details__tarif-item.active').find('.forproviders__details__tarif-cost').text();
    $('.forproviders__details__cost').val(activeTarifCost);
    if(activeTarifName == 'Тариф – 6 месяцев') {
      $(".good__t").text('');
      $(".forproviders__details__old-price").text('');
    }
    if(activeTarifName == 'Тариф – 12 месяцев') {
      $(".good__t").text('Ваша выгода – 46 800 руб.');
      $(".forproviders__details__old-price").text('165 600 руб.');
    }
    if(activeTarifName == 'Тариф – 24 месяца') {
      $(".good__t").text('Ваша выгода – 160 800 руб.');
      $(".forproviders__details__old-price").text('331 200 руб.');
    }
    
  });
  radioButtons.on('click', function() {
    $('.forproviders__details__choise').css({'margin-top': '30px', 'opacity': '1'});
  })
 

  });


  //страница заявки
  //показать контакты в моб версии
  $('.btn_show-contacts').each(function(i) {
    $(this).on('click', function() {
      $('.applications__table__contacts').eq(i).toggleClass('applications__table__contacts-active');
      $('.mobile_file').eq(i).toggleClass('mobile_file-active');
      $('.btn_show-contacts-show').eq(i).toggleClass('active');
      $('.btn_show-contacts-move').eq(i).toggleClass('active');
  });
  })



 