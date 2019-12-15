$(document).ready(function () {

	$("a[rel='m_PageScroll2id']").mPageScroll2id({
			offset:100,
			highlightClass:"left-nav-el-active",
	});

//closeModal() - закрыть окна
//initModal('data-name-attr') - Открыть нужное окно

//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	$('.modal-content').click(function (event) {
		event.stopPropagation();
	});

	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflow: 'hidden',
				position: 'fixed',
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%'
			});
		}
		modalState.isModalShow = true;

		$('.head-toggle').removeClass('head-toggle--open');
		$('.slide-menu').removeClass('slide-menu--open');
		$('.content').removeClass('content--open');
		$('.header-wrap').removeClass('header-wrap--open');
		$('body').removeClass('body-fix')

	};
	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').removeClass('modal__show');
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close').click(function () {
		closeModal();
	});
//modals===end

//mobile menu
//Фиксируем скрол
	$('.head-toggle--open').click(function () {
		$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
	});

	$('.head-toggle').click(function (event) {
		event.stopPropagation();
		$('.head-toggle').toggleClass('head-toggle--open');
		$('.slide-menu').toggleClass('slide-menu--open');
		$('.content').toggleClass('content--open');
		$('.header-wrap').toggleClass('header-wrap--open');
		$('body').toggleClass('body-fix')
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
		$('.head-wrap').removeClass('head--up');
		$('.head-toggle').removeClass('head-toggle--open');
		$('.slide-menu').removeClass('slide-menu--open');
		$('.content').removeClass('content--open');
		$('.header-wrap').removeClass('header-wrap--open');
		console.log(modalState.isModalShow);
		if (modalState.isModalShow == false) {
			$('body').removeClass('body-fix')
		}
	});
//mobile menu===end

	// fix top-menu
	var shrinkHeader = 250;
	var heightHeader = $('.header').height();
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		if (scroll >= shrinkHeader) {
			$('body').css('paddingTop', heightHeader);
			$('.header').addClass('shrink');
		} else {
			$('body').css('paddingTop', 0);
			$('.header').removeClass('shrink');
		}
	});

	$(window).resize(function () {
		heightHeader = $('.header').height();
	});
	// fix top-menu === end
	
	// animate
/*	var tl = new TimelineMax();

	tl
		.fromTo('.menu-line', .6, {x: -100}, {x: 0 })
		.fromTo('.menu-line .icon', .6, {x:100,opacity:0}, {x:0,opacity:1})
		.fromTo('.header-wrap', .4, {y: -100,opacity: 0}, {y: 0,opacity: 1 })
		.staggerFromTo(".menu__el", 0.3, {opacity: 0, y: 30}, {opacity: 1, y: 0}, 0.1)
		.fromTo('.search', .6, {y: 20,opacity: 0}, {y: 0,opacity: 1 })
		.fromTo('.section-cont--main .section-title-line', .6, {width: 0,opacity: 0},{width: 100,opacity: 1 })
		.fromTo('.section-cont--main .section-title-line', .6, {rotation: 0,scale:1,x:0},{rotation: "90deg",scale:.5,x:-100})
		.fromTo('.section-cont--main .section-title-sub', .6, {y: 30,opacity: 0},{y: 0,opacity: 1 })
		.fromTo('.section-cont--main .section-title', 1, {x: 30,opacity: 0,rotation: "0deg",transformOrigin:"left top"},{x: 0,opacity: 1,rotation: "0" })
		.to('.section-cont--main .section-title-line', .6, {rotation: "0",scale:1,x:0})*/
		//.fromTo('.content', .6, {y: 20, opacity: 0}, {y: 0, opacity: 1,  })
		//.fromTo('.head', .6, {y: -100, opacity: 0}, {y: 0, opacity: 1})
		//.fromTo(".logo", 0.3, {opacity: 0, x: -30}, {opacity: 1, x: 0})

	
	// animation === end


	/*var rellax = new Rellax('.rellax', {
		speed: -2,
		center: false,
		wrapper: null,
		round: true,
		vertical: true,
		horizontal: false
	});*/
	AOS.init({
		offset: 140,
		mirror: "true",
		delay:100
	});
	// animate === end
	
	
	// animate sort
	$(function(){
	    $('.galary-wraper').mixItUp();
	});
	// animate sort === end

	// active sort el
	$('.galary-head__el').click(function(){
		$('.galary-head__el').not(this).removeClass('galary-head__el--active');
		$(this).toggleClass('galary-head__el--active');
	});
	// active sort el === end

	//validate
	jQuery.validator.addMethod("getPhone", function(value, element) {
		// allow any non-whitespace characters as the host part
		return this.optional( element ) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,18}(\s*)?$/.test( value );
		}, 'Введите правильный номер телефона');
	$('.validate-form').each(function () {
		var curentForm = $(this);
		$(this).validate({
			highlight: function (element) { //даем родителю класс если есть ошибка
				$(element).parent().addClass("field-error");
			},
			unhighlight: function (element) {
				$(element).parent().removeClass("field-error");
			},
			rules: { //правила для полей
				name: {
					required: true,
				},
				phone: {
					required: true,
					minlength: 5,
					getPhone: true
				},
				comment: {
					required: true,
					minlength: 5,
				},
				agree: {
					required: true
				}
			},
			messages: {
				name: {
					required: 'Обязательное поле',
				},
				phone: {
					required: 'Обязательное поле',
					number: 'Введите правильный номер',
					minlength: 'Номер должен быть длиннее',
				},
				comment: {
					required: 'Обязательное поле',
					minlength: 'Сообщение должно быть длиннее',
				},
				agree: {
					required: false,
				}
			},
			submitHandler: function (form) {
				$.ajax({ //отправка ajax
					type: "POST",
					url: "sender.php",
					data: $(form).serialize(),
					timeout: 3000,
				});
				closeModal();
				initModal("truemessage");
				setTimeout(function () {
					closeModal();
					$(':input', '.validate-form') //очитска формы от данных
						.not(':button, :submit, :reset, :hidden')
						.val('')
						.removeAttr('checked')
						.removeAttr('selected')
				}, 2500)

			}
		});
	});

	$('.fancybox').fancybox({
		thumbs : {
			autoStart : true
		}
	});
});
