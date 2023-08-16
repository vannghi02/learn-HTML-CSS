; (function (win, $) {
	win.MAIN = win.MAIN || {};

	win.MAIN.common = (function () {
		var defParams = {
			isShowClass: 'is_show',
			isActiveClass: 'is_active',

			body: 'body',
			section: '.section',
			dimmed: '.dimmed',
			tit: '.tit',
			subTit: '.subtit',
			desc: '.desc',
			animation: '.animate',
			keyVisual: '.kv',
			tabItem: '.tab_item',
			tabBtn: '.tab_btn',
			tabCont: '.tab_cont_item',
			coinArea: '.coin_area',
			coinList: '.coin_lst',
			coinNum: '.coin_num',
			productSwiper: '.product_swiper',
			mediaVideo: '.media_video',
			card: '.card',
			missionInfo: '.mission_info',

			btn: 'button',
			btnRefresh: '.btn_refresh',
			btnProduct: '.product_btn',
			btnToggle: '.btn_toggle',
			btnDropdown: '.btn_dropdown',
			btnPopTab: '.pop_tab_btn',
			btnClose: '.btn_close',
			btnCopy: '.btn_copy',
			btnInvite: '.btn_invite',
			btnHistory: '.btn_history',
			btnCancel: '.btn_cancel',
			btnConfirm: '.btn_confirm',
		};
		return {

			init: function () {
				this.setElement();
				this.initOpts();
				this.initLayout();
				this.bindEvents();
			},
			setElement: function () {
				this.document = $(document);
				this.window = $(win);

				this.body = $(defParams.body);
				this.section = $(defParams.section);
				this.dimmed = $(defParams.dimmed);
				this.tit = $(defParams.tit);
				this.subTit = $(defParams.subTit);
				this.desc = $(defParams.desc);
				this.animation = $(defParams.animation);
				this.keyVisual = $(defParams.keyVisual);
				this.tabItem = $(defParams.tabItem);
				this.tabBtn = $(defParams.tabBtn);
				this.tabCont = $(defParams.tabCont);
				this.coinArea = $(defParams.coinArea);
				this.coinList = $(defParams.coinList);
				this.coinNum = $(defParams.coinNum);
				this.productSwiper = $(defParams.productSwiper);
				this.mediaVideo = $(defParams.mediaVideo);
				this.card = $(defParams.card);
				this.missionInfo = $(defParams.missionInfo);

				this.btn = $(defParams.btn);
				this.btnProduct = $(defParams.btnProduct);
				this.btnRefresh = $(defParams.btnRefresh);
				this.btnToggle = $(defParams.btnToggle);
				this.btnDropdown = $(defParams.btnDropdown);
				this.btnPopTab = $(defParams.btnPopTab);
				this.btnClose = $(defParams.btnClose);
				this.btnCopy = $(defParams.btnCopy);
				this.btnInvite = $(defParams.btnInvite);
				this.btnHistory = $(defParams.btnHistory);
				this.btnCancel = $(defParams.btnCancel);
				this.btnConfirm = $(defParams.btnConfirm);

			},
			initOpts: function () {
				this.scrollTop = this.window.scrollTop();
				this.breakPointMo = 769;
				this.sectionLength = this.section.length;
				// this.body.css('margin-top', 0);
				this.num = 0;
				this.swiperBrand;
				this.swiperProduct = [];
				this.sideBarBaseHeight = $('.sidebar_base').height();
				this.sideBarLineHeight = $('.sidebar_line').height();
				this.sidebarMove = (this.sideBarBaseHeight - this.sideBarLineHeight) / (this.sectionLength - 1);
			},
			bindEvents: function () {
				this.window.on('resize', $.proxy(this.windowResize, this));
				this.window.on('scroll', $.proxy(this.windowScroll, this));
				this.tabBtn.on('click', $.proxy(this.handleTabBtnClicked, this));
				this.btnRefresh.on('click', $.proxy(this.handleCounter, this));
				this.coinNum.eq(-1).on('webkitAnimationEnd animationend', $.proxy(this.handleAnimateEnd, this));
				this.btnToggle.on('click', $.proxy(this.handleBtnToggleClicked, this));
				this.btnDropdown.on('click', $.proxy(this.handleProductWrapShown, this));
				this.btnPopTab.on('click', $.proxy(this.handlePopTabClicked, this));
				this.dimmed.on('click', $.proxy(this.handleClosePopup, this));
				this.btnClose.on('click', $.proxy(this.handleClosePopup, this));
				this.btnCancel.on('click', $.proxy(this.handleClosePopup, this));
				this.btnConfirm.on('click', $.proxy(this.handleClosePopup, this));
				this.btnCopy.on('click', $.proxy(this.handleCopyLinkInvite, this));
				this.btnInvite.on('click', $.proxy(this.handlePopupShown, this));
				this.btnHistory.on('click', $.proxy(this.handlePopupShown, this));
			},
			initLayout: function () {
				this.convertViewPort();
				this.handleAnimation();
				this.handleCounter();
				this.checkSwiperProduct();
				this.initSlideBrand();
				this.handleSideBar();
				this.handleSideBarHide();
				this.initMediaVideo();
				$('.scrollbar-inner').scrollbar();
				this.saveCookie();
			},
			convertViewPort: function () {
				this.scrollTop = this.window.scrollTop();
				this.vw = this.window.width();
				this.vh = this.window.height();
				this.body.css('--vh', (this.vh * .01) + 'px');
				this.handleParallax();
			},
			windowScroll: function () {
				this.scrollTop = this.window.scrollTop();
				this.handleParallax();
				this.handleAnimation();
				this.handleSideBar();
				this.handleSideBarHide();
			},
			windowResize: function () {
				this.convertViewPort();
				this.initSlideBrand();
				this.checkSwiperProduct();
				this.handleSideBar();
				this.handleSideBarHide();
			},
			handleParallax: function () {
				if (this.vh < 500) return;
				const self = this;
				this.keyVisual.each(function () {
					let dataDeep = $(this).attr('data-deep');
					let value = dataDeep * self.scrollTop;
					if (self.scrollTop < self.vh) {
						$(this).css({
							'will-change': 'transform',
							'transform': `translateY(${-value}px)`,
						});
					}
				});
			},
			handleAnimation: function () {
				const self = this;
				this.animation.each(function () {
					let elementTop = $(this).offset().top;
					if (self.scrollTop > elementTop - (.9 * self.vh)) {
						$(this).addClass(defParams.isShowClass);
					}
					if (self.scrollTop < (.8 * self.vh)) {
						$('.kv .animate').addClass(defParams.isShowClass);
					}
				})
			},
			handleSideBar: function () {
				const self = this;
				let numCurrent;
				let numTotal;

				numTotal = this.sectionLength < 10 ? `0${this.sectionLength}` : `${this.sectionLength}`;
				$('.num_total').text(numTotal);
				this.section.each(function (index) {
					let sectionTop = $(this).offset().top;
					if (self.scrollTop > sectionTop - (self.vh * .5)) {
						$('.sidebar_line').css('top', `${self.sidebarMove * index}px`)
						numCurrent = index < 9 ? `0${index + 1}` : `${index + 1}`;
						$('.num_current').text(numCurrent)
					}
				});
			},
			handleSideBarHide: function () {
				if (!$('.notes').length) return;
				let notesTop = $('.notes').offset().top;
				if (this.scrollTop > notesTop - (this.vh * .5)) {
					$('.sidebar').removeClass(defParams.isShowClass);
				} else {
					$('.sidebar').addClass(defParams.isShowClass);
				}
			},
			handleTabBtnClicked: function (e) {
				let target = $(e.currentTarget);
				let index = target.parents('.tab_item').index();
				this.tabItem.removeClass(defParams.isActiveClass);
				target.parents('.tab_item').addClass(defParams.isActiveClass);
				this.tabCont.hide();
				this.tabCont.eq(index).show();
			},
			handleCounter: function () {
				this.coinArea.addClass(defParams.isActiveClass);
				this.coinNum.text('');
				let dataCoin = this.coinList.attr('data-coin');
				let dataNum;
				this.coinNum.each(function (index) {
					dataNum = dataCoin[index];
					if (!dataNum) {
						dataNum = ''
						$(this).parents('.coin_item').addClass('is_null');
					}
					$(this).attr('data-number', dataNum);
					$(this).text(dataNum)
				});
			},
			handleAnimateEnd: function (event) {
				if (event.type === "webkitAnimationEnd" || event.type === "animationend") {
					this.coinArea.removeClass(defParams.isActiveClass);
				}
			},
			checkSwiperProduct: function () {
				if (!$('.product_swiper')) return;
				const self = this;
				this.productSwiper.each(function (index) {
					if (self.swiperProduct[index] != undefined) {
						self.swiperProduct[index].destroy();
						self.swiperProduct[index] = undefined;
					}
					let productLength = $(this).find('.product_item').length;
					if (self.vw < self.breakPointMo) {
						self.initSlideProduct(index);
					} else {
						if (productLength > 4) {
							self.initSlideProduct(index);
						}
					}
				})
			},
			initSlideProduct: function (index) {
				this.swiperProduct[index] = new Swiper(this.productSwiper[index], {
					slidesPerView: 2,
					grabCursor: true,
					resistanceRatio: 0,
					observer: true,

					breakpoints: {
						769: {
							slidesPerView: 4,
						},
					},

					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
				});
			},
			initSlideBrand: function () {
				if (!$('.brands_swiper').length) return;
				if (this.swiperBrand != undefined) {
					this.swiperBrand.destroy();
					this.swiperBrand = undefined;
				}

				let brandLength = $('.brands_item').length;
				if (brandLength <= 3 && this.vw >= this.breakPointMo) return;

				this.swiperBrand = new Swiper(".brands_swiper", {
					slidesPerView: 1,
					grabCursor: true,
					centeredSlides: true,
					resistanceRatio: 0,
					loop: true,

					breakpoints: {
						769: {
							slidesPerView: 3,
						},
					},

					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
				});
			},
			handleBtnToggleClicked: function (e) {
				let target = $(e.currentTarget);
				target.toggleClass(defParams.isActiveClass);
			},
			handleProductWrapShown: function (e) {
				let target = $(e.currentTarget);
				target.parents('.tit').toggleClass(defParams.isActiveClass);
			},
			handlePopTabClicked: function (e) {
				this.num = 0;
				let target = $(e.currentTarget);
				let index = target.closest('.pop_tab_item').index();
				$('.pop_tab_item').removeClass(defParams.isActiveClass);
				target.parents('.pop_tab_item').addClass(defParams.isActiveClass);
				$('.pop_tab_bx').hide();
				$('.pop_tab_bx').eq(index).show();
				$('.pagination').eq(index).find('.pagination_lst').hide();
				$('.pagination').eq(index).find('.pagination_lst').eq(this.num).show();
			},
			scrollLock: function (isLock) {
				if (isLock && !$('body').hasClass('is_lock')) {
					scrollTop = $(window).scrollTop();
					$('body').addClass('is_lock');
					$('.layer').show();
					$('.text_roll').css('animation-play-state', 'paused');
					$('body').css('top', -scrollTop);
				} else if (!isLock && $('body').hasClass('is_lock')) {
					$('body').removeClass('is_lock');
					$('body').css('top', '');
					$('.layer, .pop_item').hide();
					$('.text_roll').css('animation-play-state', 'running');
					this.window.scrollTop(scrollTop);
				}
			},
			handleClosePopup: function (e) {
				let target = $(e.currentTarget);
				if (target.hasClass('dimmed') && !target.hasClass('is_confirm') || target.hasClass('btn_close') || target.hasClass('btn_cancel') || target.hasClass('btn_confirm')) {
					$('.dimmed').removeClass('is_confirm');
					this.scrollLock(false);
				}
			},
			handleCopyLinkInvite: function () {
				$(".invite_inp").select();
				document.execCommand('copy');
				$('.pop_invite').hide();
				$('.dimmed').addClass('is_confirm')
				$('.pop_copy_complete').show();
			},
			initMediaVideo: function () {
				let iframeMedia = this.mediaVideo.find('iframe');
				let dataSrc = iframeMedia.attr('src') + '?mute=1';
				iframeMedia.attr('src', dataSrc);
			},
			saveCookie: function () {
				if (!window.location.search) return;
				const urlParam = window.location.search;
				const arrParam = urlParam.substring(1).split('&');
				arrParam.forEach(function (item) {
					if (!item.includes('=')) return;
					const keyParam = item.split('=')[0];
					if (keyParam == 'fivc') {
						document.cookie = item;
					}
				});
			},
			handlePopupShown: function (e) {
				let target = $(e.currentTarget);
				this.scrollLock(true);
				if (target.hasClass('btn_history')) {
					$('.pop_history').show();
				} else if (target.hasClass('btn_invite')) {
					$('.pop_invite').show();
				}
			}
		}
	})();

	$(document).ready(function () {
		MAIN.common.init();
	})

})(window, window.jQuery);
