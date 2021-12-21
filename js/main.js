

$(document).ready(function() {
	const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.nav');
const oLay = document.querySelector('.overlay');
const bodyEl = document.body;


navIcon.addEventListener('click', function () {
	this.classList.toggle('nav-icon--active');
	nav.classList.toggle('nav--active');
	oLay.classList.toggle('nav--active');
	bodyEl.classList.toggle('noscroll');
});

// Находим ссылки внутри мобильной навигации
const navLinks = document.querySelectorAll('.nav a');

// Обходим ссылки методом forEach
navLinks.forEach(function (item) {
	// Для каждой ссылки добавляем прослушку по событию "Клик"
	item.addEventListener('click', function () {
		navIcon.classList.remove('nav-icon--active'); // Убираем активный класс у иконки моб. навигации
		nav.classList.remove('nav--active'); // Убираем активный класс у блока моб. навигации
		oLay.classList.remove('nav--active'); // Убираем активный класс у блока моб. навигации
		bodyEl.classList.remove('noscroll');
	})
});

window.addEventListener('resize', function() {
	navIcon.classList.remove('nav-icon--active'); 
	nav.classList.remove('nav--active');
	oLay.classList.remove('nav--active'); 
	bodyEl.classList.remove('noscroll');
})

// Back Top Button
const backtopBtn = document.querySelector('.backtop-btn');

backtopBtn.style.opacity = 0;

document.addEventListener('scroll', function () {
	if(window.pageYOffset > 500) {
		backtopBtn.style.opacity = 1;
	} else {
		backtopBtn.style.opacity = 0;
	}
})

// Header-top Shadow
const topShadow = document.querySelector('.header-top');

document.addEventListener('scroll', function () {
	if(window.pageYOffset > 100) {
		topShadow.classList.add('active');
	} else {
		topShadow.classList.remove('active');
	}
})

// Параллакс движения за мышкой

let prxScene = document.querySelector('.contacts');
let prxItem = document.querySelectorAll('.contacts-icons');

prxScene.addEventListener('mousemove', function (e) {
	let x = e.clientX / window.innerWidth;
	let y = e.clientY / window.innerHeight;
	for(let item of prxItem) {
		item.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
	}
})

// Form Placeholder

const formItems = document.querySelectorAll('.form-field');

for (let item of formItems) {
	const thisParent = item.closest('.form-item');
	const thisPlaceholder = thisParent.querySelector('.fake-placeholder');

	// Если в фокусе
	item.addEventListener('focus', function() {
		thisPlaceholder.classList.add('active');
		thisParent.classList.add('active');
	});

	// Если инпут теряет фокус
	item.addEventListener('blur', function () {
		if (item.value.length > 0) {
			thisPlaceholder.classList.add('active');
		} else {
			thisPlaceholder.classList.remove('active');
		}
	});

	item.addEventListener('blur', function () {
		thisParent.classList.remove('active');
	});
}

// MixitUp
	let containerEl = document.querySelector('#mix-cards');
	let mixer = mixitup(containerEl, {
		classNames: {
			block: ""
		}
	});

	// Валидация Формы
	$('.contacts-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},

			message: {
				required: true
			},
		},

		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутствует символ @'
			},

			message: {
				required: 'Поле не должно быть пустым!'
			}
		},

		submitHandler: function (form) {
			ajaxFormSubmit();
		}
	});

//  Функция AJAX запроса на сервер

	function ajaxFormSubmit() {
		let string = $('.contacts-form').serialize();// Сохраняем данные введенные в форму
		
		// Формируем AJAX запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие данные отправляем, в данном случае переменную String

			// Функция если все прошло успешно
			success: function (html) {
				$(".contacts-form").slideUp(800);
				$("#answer").html(html);
			}
		});

		// Чтобы по Submit больше ничего не выполнялось - делаем возврат False
		return false;
	};

	   // plagin pageNav
	   $('#header-menu').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });

});


