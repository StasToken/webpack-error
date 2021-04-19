/*  ---------------------------------------------------
    Template Name: Manup
    Description: Manup Event HTML Template
    Author: Colorlib
    Author URI: http://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import '../css/elegant-icons.css';
import '../css/owl.carousel.min.css';
import '../css/magnific-popup.css';
import '../css/slicknav.min.css';
import '../css/style.css';

import $ from "jquery";
//import './popper.min.js'; // найти
//import './bootstrap.min.js'; // установлен
import 'bootstrap'; // установлен
//import './jquery.magnific-popup.min.js'; // установлен
import "magnific-popup";
// import './jquery.countdown.min.js'; // установлен
import 'jquery-countdown/dist/jquery.countdown.min.js';

import './jquery.slicknav.js'; // возможно не тот
import './owl.carousel.min.js'; // установлен


const API_NOTIFICATIONS_TELEGRAM  = '/home/api/telegram';
const API_NOTIFICATIONS_EMAIL  = '/home/api/email';
const API_NOTIFICATIONS_MT  = '/home/api/mt';
const API_RESET_TELEGRAM  = '/home/api/reset_token_telegram';
const API_RESET_MT  = '/home/api/reset_token_mt';
const API_RESEND_EMAIL  = '/home/api/resending_email';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        'label': 'МЕНЮ',
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------------
		Partner Slider
    ----------------------- */
    $(".partner-logo").owlCarousel({
        items: 6,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        margin: 116,
        responsive: {
            320: {
                items: 2,
            },
            480: {
                items: 3,
            },
            768: {
                items: 4,
            },
            992: {
                items: 5,
            },
            1200: {
                items: 6
            }
        }
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 2,
        dots: false,
        autoplay: false,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"],
        responsive: {
            320: {
                items: 1,
            },
            768: {
                items: 2
            }
        }
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();
    //
    // if(mm == 12) {
    //     mm = '01';
    //     yyyy = yyyy + 1;
    // } else {
    //     mm = parseInt(mm) + 1;
    //     mm = String(mm).padStart(2, '0');
    // }
    // var timerdate = mm + '/' + dd + '/' + yyyy;
    //For demo preview end

    // Use this for real timer date
    /*  var timerdate = "08/01/2020"; */
    if (document.getElementById("section-stock")) {
        var timerdate = $('#section-stock').data('stock-end');
        $("#countdown").countdown(timerdate, function (event) {
            $(this).html(event.strftime("<div class='cd-item'><span>%D</span> <p>ДНЕЙ</p> </div>" + "<div class='cd-item'><span>%H</span> <p>ЧАСОВ</p> </div>" + "<div class='cd-item'><span>%M</span> <p>МИНУТ</p> </div>" + "<div class='cd-item'><span>%S</span> <p>СЕКУМД</p> </div>"));
        });
    }

    /*------------------
    Home notifications
    --------------------*/

    //telegram
    $( "#home_api_telegram" ).click(function() {
        let send_status = undefined;
        let text = undefined;
        let remove_class = undefined;
        let add_class = undefined;

        let status = Boolean($("#home_api_telegram").data("enabled"));
        if(status){
            send_status = 0;
            remove_class = "home-action-block-enabled";
            add_class = "home-action-block-disabled";
            text = "Включить уведомления в telegram <br /> (отключено)";

        }else{
            send_status = 1;
            add_class = "home-action-block-enabled";
            remove_class = "home-action-block-disabled";
            text = "Отключить уведомления в telegram <br /> (включено) ";
        }
        $.get( API_NOTIFICATIONS_TELEGRAM+"?notifications="+send_status, function( data ) {
            if(data.status){
                $("#home_api_telegram").removeClass( remove_class );
                $("#home_api_telegram").addClass( add_class );
                $("#home_api_telegram_text").empty();
                $("#home_api_telegram_text").html(text);
                $("#home_api_telegram").data("enabled",send_status);
            }else{
                $('#modal-error').modal('show');
            }
        }).fail(function() {
            $('#modal-error').modal('show');
        });
    });

    //email
    $( "#home_api_email" ).click(function() {
        let send_status = undefined;
        let text = undefined;
        let remove_class = undefined;
        let add_class = undefined;

        let status = Boolean($("#home_api_email").data("enabled"));
        if(status){
            send_status = 0;
            remove_class = "home-action-block-enabled";
            add_class = "home-action-block-disabled";
            text = "Включить уведомления на email <br /> (отключено)";

        }else{
            send_status = 1;
            add_class = "home-action-block-enabled";
            remove_class = "home-action-block-disabled";
            text = "Отключить уведомления на email <br /> (включено)";
        }
        $.get( API_NOTIFICATIONS_EMAIL+"?notifications="+send_status, function( data ) {
            if(data.status){
                $("#home_api_email").removeClass( remove_class );
                $("#home_api_email").addClass( add_class );
                $("#home_api_email_text").empty();
                $("#home_api_email_text").html(text);
                $("#home_api_email").data("enabled",send_status);
            }else{
                $('#modal-error').modal('show');
            }
        }).fail(function() {
            $('#modal-error').modal('show');
        });
    });

    //MT
    $( "#home_api_mt" ).click(function() {
        let send_status = undefined;
        let text = undefined;
        let remove_class = undefined;
        let add_class = undefined;

        let status = Boolean($("#home_api_mt").data("enabled"));
        if(status){
            send_status = 0;
            remove_class = "home-action-block-enabled";
            add_class = "home-action-block-disabled";
            text = "Включить доступ MT5/MT4 (отключено)";

        }else{
            send_status = 1;
            add_class = "home-action-block-enabled";
            remove_class = "home-action-block-disabled";
            text = "Отключить доступ MT5/MT4 (включено)";
        }
        $.get( API_NOTIFICATIONS_MT+"?notifications="+send_status, function( data ) {
            if(data.status){
                $("#home_api_mt").removeClass( remove_class );
                $("#home_api_mt").addClass( add_class );
                $("#home_api_mt_text").empty();
                $("#home_api_mt_text").html(text);
                $("#home_api_mt").data("enabled",send_status);
            }else{
                $('#modal-error').modal('show');
            }
        }).fail(function() {
            $('#modal-error').modal('show');
        });
    });

    //Tooltips
    $('[data-toggle="tooltip"]').tooltip();
    // For fast copying of API keys
    $('.home-action-block-pre').click(function() {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(this).text()).select();
        document.execCommand("copy");
        $temp.remove();
        $('.toast').toast('show');
    });

    //submit form ajax update email
    $("#form_reset_email").submit(function(e) {
        e.preventDefault();
        let form = $(this);
        let url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                $("#notification_text_reset_email").hide();
                $("#success_text_reset_email").hide();
                $("#error_text_reset_email").hide();
                if(data.status){
                    $("#success_text_reset_email").show();
                }else{
                    $("#error_text_reset_email").empty();
                    $("#error_text_reset_email").text(data.messages);
                    $("#error_text_reset_email").show();
                }
            },
            error: function(xhr, status, error){
                $("#success_text_reset_email").modal('hide');
                $('#modal-error').modal('show');
            }
        });
    });

    //submit form ajax update password
    $("#form_reset_password").submit(function(e) {
        e.preventDefault();
        let form = $(this);
        let url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                $("#notification_text_reset_password").hide();
                $("#success_text_reset_password").hide();
                $("#error_text_reset_password").hide();
                if(data.status){
                    $("#success_text_reset_password").show();
                }else{
                    $("#error_text_reset_password").empty();
                    $("#error_text_reset_password").text(data.messages);
                    $("#error_text_reset_password").show();
                }
            },
            error: function(xhr, status, error){
                $("#success_text_reset_password").modal('hide');
                $('#modal-error').modal('show');
            }
        });
    });

    //reset key for telegrams
    $( "#home_api_reset_telegram" ).click(function() {
        $("#success_text_reset_telegram").hide();
        $("#error_text_reset_telegram").hide();
        $.get( API_RESET_TELEGRAM, function( data ) {
            if(data.status){
                $("#success_text_reset_telegram").show();
                $('#modal-reset-telegram').modal('show');
                $('#pre-telegram').empty();
                $('#pre-telegram').html(data.key);
            }else{
                $("#error_text_reset_telegram").show();
                $('#modal-reset-telegram').modal('show');
            }
        }).fail(function() {
            $('#modal-error').modal('show');
        });
    });

    //reset key for mt
    $( "#home_api_reset_mt" ).click(function() {
        $("#success_text_reset_mt").hide();
        $("#error_text_reset_mt").hide();
        $.get( API_RESET_MT, function( data ) {
            if(data.status){
                $("#success_text_reset_mt").show();
                $('#modal-reset-mt').modal('show');
                $('#pre-mt').empty();
                $('#pre-mt').html(data.key);
            }else{
                $("#error_text_reset_mt").show();
                $('#modal-reset-mt').modal('show');
            }
        }).fail(function() {
            $('#modal-error').modal('show');
        });
    });
    //scroll
    let margin = 100;
    $("a.scroll_link").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top+margin+ "px"
        }, {
            duration: 1600,
            easing: "swing"
        });
        return false;
    });
    //Resending email
    $( "#resending_email" ).click(function() {
        $("#success_text_resend_email").hide();
        $("#error_text_resend_email").hide();
        $.get( API_RESEND_EMAIL, function( data ) {
            if(data.status){
                $("#success_text_resend_email").show();
                $('#modal_resend_email').modal('show');
                $("#resending_email").hide();
            }else{
                $("#error_text_resend_email").show();
                $('#modal_resend_email').modal('show');
            }
        }).fail(function() {
            $('#modal-error').modal('show');
        });
    });
})(jQuery);