$(function() {

    $('#content').fullpage({
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        onLeave: function(origin){
            $('.aos-init').removeClass('aos-animate');
            $('.btn-more.active').trigger('click');
            // $(window).trigger('resize');
            // $(document).trigger('resize');
            // $('html, body').trigger('resize');
        },
        afterLoad: function(origin){
            let current = $('.section.active').index();
            let qtyTest = $('.section').length;
            if(current + 1 == qtyTest){
                $('.nav-arrows').addClass('last');
                $('.nav-bottom').addClass('hidden');
            }else{
                $('.nav-arrows').removeClass('last');
                $('.nav-bottom').removeClass('hidden');
            }
            current = parseInt(current + 1);
            if(current < 10){
                current = '0' + current;
            }
            if(current !== '01'){
                $('.nav-arrows').addClass('mid');
                $('.nav-top').removeClass('hidden');
            }else{
                $('.nav-arrows').removeClass('mid');
                $('.nav-top').addClass('hidden');
            }
            $('.nav-nums .current').html(current);
            $('.aos-init').addClass('aos-animate');
        }
    });

    $('.nav-top').on('click', function(){
        $.fn.fullpage.moveSectionUp();
    });

    $('.nav-bottom').on('click', function(){
        $.fn.fullpage.moveSectionDown();
    });

    $('.down').on('click', function(){
        $.fn.fullpage.moveSectionDown();
    });

    $('.to-ask').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveTo(7);
    });

    $('.to-contacts').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveTo(10);
    });

    $('.tec1').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveTo(4);
    });

    $('.tec2').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveTo(5);
    });

    $('.tec3').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveTo(6);
    });

    let qty = $('#content .section').length;
    if(qty < 10){
        qty = '0' + qty;
    }
    $('.nav-nums .qty').html(qty);

    $('.menu-open button').on('click', function () {
        $(this).addClass('hidden');
        $('.menu-wrap').addClass('active');
    });

    $('.menu-close button').on('click', function () {
        $('.menu-open button').removeClass('hidden');
        $('.menu-wrap').removeClass('active');
    });

    $('.project-wrap.horizontal').mCustomScrollbar({
        axis: 'x',
        scrollButtons:{enable:true},
        autoDraggerLength: true
    });

    $('.project-wrap.vertical').mCustomScrollbar({
        axis: 'yx',
        mouseWheel:{enable:true},
        scrollButtons:{enable:true},
        autoDraggerLength: true
    });

    $('.project-details').on('click', function () {
        $(this).siblings().toggle('fast');
    });

    $('.btn-more').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.slide-tab').toggleClass('active');
        $(this).closest('.slide-tab').find('.img-abs').toggleClass('hidden');
        $(this).closest('.slide-tab').find('.video-block').toggle('fast');
        $('.video-frame')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        $('.video-frame')[1].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    });

    var lFollowX = 0,
        lFollowY = 0,
        sFollowX = 0,
        sFollowY = 0,
        tFollowX = 0,
        tFollowY = 0,
        x = 0,
        y = 0,
        x2 = 0,
        y2 = 0,
        x3 = 0,
        y3 = 0,
        friction = 1 / 30;

    function animate() {
        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;
        x2 += (sFollowX - x2) * friction;
        y2 += (sFollowY - y2) * friction;
        x3 += (tFollowX - x3) * friction;
        y3 += (tFollowY - y3) * friction;

        translate = 'translate(' + x + 'px, ' + y + 'px)';
        translate2 = 'translate(' + x2 + 'px, ' + y2 + 'px)';
        translate3 = 'translate(' + x3 + 'px, ' + y3 + 'px)';

        $('.parallax1').css({
            '-webit-transform': translate,
            '-moz-transform': translate,
            'transform': translate
        });

        $('.parallax2').css({
            '-webit-transform': translate2,
            '-moz-transform': translate2,
            'transform': translate2
        });

        $('.parallax3').css({
            '-webit-transform': translate3,
            '-moz-transform': translate3,
            'transform': translate3
        });

        window.requestAnimationFrame(animate);
    }

    $(window).on('mousemove click', function(e) {

        var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
        var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
        lFollowX = (20 * lMouseX) / 150;
        lFollowY = (10 * lMouseY) / 150;
        sFollowX = (20 * lMouseX) / 200;
        sFollowY = (10 * lMouseY) / 200;
        tFollowX = (20 * lMouseX) / 100;
        tFollowY = (10 * lMouseY) / 100;

    });

    animate();

    $(window).on('load resize', function () {
        if($(window).width() < 768){
            $('.apps-list').mCustomScrollbar();
        }else{
            $('.apps-list').mCustomScrollbar('destroy');
        }
    });

    $('#ask_form').validate({
        rules: {
            // simple rule, converted to {required:true}
            name: "required",
            message: "required",
            // compound rule
            email: {
                required: true,
                email: true
            }
        },
        onfocusout: function(element) {
            if($("#ask_form input.valid").length == 2 && $("#ask_form textarea.valid").length == 1){
                $("#ask_form input[type='submit']").removeAttr('disabled');
            } else {
                $("#ask_form input[type='submit']").attr('disabled', 'disabled');
            }
            this.element(element);
        },
        onkeyup: function(element) {
            if($("#ask_form input.valid").length == 2 && $("#ask_form textarea.valid").length == 1){
                $("#ask_form input[type='submit']").removeAttr('disabled');
            } else {
                $("#ask_form input[type='submit']").attr('disabled', 'disabled');
            }
            this.element(element);
        },
    });

    $('#ask_form').submit(function(){
        $.ajax({
            url: 'https://prod-yaskravo-app.azurewebsites.net/api/mail/sales/message',
            type: 'POST',
            data: $(this).serialize(),
            success: function done(message) {$('#thank-you').modal()}
        });
        return false;
    });

});
