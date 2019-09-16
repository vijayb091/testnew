import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import Swiper from 'swiper';

@Injectable()
export class JqueryService {

	constructor() { }

	public menuHide() {
		if ($('#hide-menu').hasClass('show-menu')) {
			$('#hide-menu').removeClass('show-menu').addClass('hide-menu');
		} else {
			$('#hide-menu').removeClass('hide-menu').addClass('show-menu');
		}
	}

	public roteteCube() {
		if ($('#item-one').hasClass('first-third-rotete')) {
			$('#item-one').removeClass('first-third-rotete').addClass('rotete-reverce');
		} else {
			$('#item-one').removeClass('rotete-reverce').addClass('first-third-rotete');
		}
		this.roteteCubeSecond();
		this.roteteCubeThird();
		$('.bottom-content').css('opacity', '1');
	}

	public roteteCubeOne() {
		if ($('#item-one').hasClass('first-third-rotete')) {
			$('#item-one').removeClass('first-third-rotete').addClass('rotete-reverce');
		} else {
			$('#item-one').removeClass('rotete-reverce').addClass('first-third-rotete');
		}
		this.roteteCubeThird();
		this.roteteCubeSecond();
		$('.bottom-content, .personal-content').css('opacity', '1');
	}

	public roteteCubeSecond() {
		if ($('#item-second').hasClass('graph-second-rotete')) {
				$('#item-second').removeClass('graph-second-rotete').addClass('graph-reverce');
		} else {
				$('#item-second').removeClass('graph-reverce').addClass('graph-second-rotete');
		}
	}

	public roteteCubeThird() {
		if ($('#item-third').hasClass('first-third-rotete')) {
				$('#item-third').removeClass('first-third-rotete').addClass('rotete-reverce');
		} else {
				$('#item-third').removeClass('rotete-reverce').addClass('first-third-rotete');
		}
	}
}
