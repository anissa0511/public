$(function() {
    //  手风琴菜单效果
    slide_left();

    //  点击菜单隐藏展开效果
    menu_slide();
    
    //点击菜单展开
    link_slideout();
    
    //设置选项展开
    setting_click();
    
    //默认页面
    com_infor_click();
    
    //  菜单点击跳转
    slide_left_click(); 
    
//  修改保存
    rewrite_save();
});
    
function rewrite_save(){
     $(document).on('click', '.btn_rewrite', function() {
         $(this).parents().find('.main_content').find('.content').css('display','block');
         $(this).parents().find('.main_content').find('.content_readonly').css('display','none');
     });
//  $('.rewrite').live('click',function(){
//      console.log(111)
//      
//  });
    $(document).on('click', '.btn_save', function() {
        $(this).parents().find('.main_content').find('.content').css('display','none');
        $(this).parents().find('.main_content').find('.content_readonly').css('display','block');
    });
}
function slide_left_click(){
    $('.s_secondNav').on('click',function(){
        let value = $(this).find('a').attr('data-value');
        switch(value){
            case 'com_infor': 
                com_infor_click();
                break;
            case 'web_manage': 
                web_manage_click();
                break;
        }
    });
}
function com_infor_click(){
    $.ajax({
        url: 'com_infor.html',
        dataType: "html",
        type: "get",
        success: function (res) {
            $(".main_content").html(res);
        }
    });
}
function web_manage_click(){
    $.ajax({
        url: 'web_manage.html',
        dataType: "html",
        type: "get",
        success: function (res) {
            $(".main_content").html(res);
        }
    });
}


function setting_click(){
    let timer=null;
    $('.setting').hover(function(){
        clearTimeout(timer);
        $('.set_float').css("display","block");
    },function(){
        timer=setTimeout(function() {
            $('.set_float').css("display","none");
        }, 1000);
    });
    $('.set_float').hover(function(){
        clearTimeout(timer);
        $('.set_float').css("display","block");
    },function(){
        timer=setTimeout(function() {
            $('.set_float').css("display","none");
        }, 1000);
    });
    
}
function menu_slide() {
    $('.menu_button').click(function() {
        if($('.s_side').hasClass('side_open')) {
            $('.s_side').removeClass('side_open').addClass('side_close');
//          console.log(('.s_side').find('.d_secondDrop').slideUp());
            
            $('.s_firstDrop').slideUp();
            $(this).addClass('iconRotate');
        } else {
            $('.s_side').removeClass('side_close').addClass('side_open');
            $(this).removeClass('iconRotate');

        }
    });
}
function link_slideout() {
    $('.s_firstNav').click(function() {
        if($('.s_side').hasClass('side_open')) {
        } else {
            $('.s_side').removeClass('side_close').addClass('side_open');
            $(this).removeClass('iconRotate');

        }
    });
}
function slide_left() {
    $('.s_firstNav').click(function() {
        if($(this).parents().find('.side_open').is('.side_open')) {
            $(this).parent().find('.s_secondDrop').slideUp();
            dropSwift($(this), '.s_firstDrop');
        }
    });
    $('.s_secondNav').click(function() {
        $(this).addClass('active').parent().siblings().find('.active').removeClass('active');
    });
}

function dropSwift(dom, drop) {
    dom.next().slideToggle();
    dom.parent().siblings().find(drop).slideUp();
    dom.parent().siblings().find('.iconRotate').removeClass('iconRotate');
    let iconChevron = dom.find('.slide_mark');
    if(iconChevron.hasClass('iconRotate')) {
        iconChevron.removeClass('iconRotate');
    } else {
        iconChevron.addClass('iconRotate');
    }
}
//上传图片
function previewImage(file) {
    var MAXWIDTH = 90;
    var MAXHEIGHT = 90;
    var div = document.getElementById('preview');
    if(file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead onclick=$("#previewImg").click()>';
        var img = document.getElementById('imghead');
        img.onload = function() {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            //                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    } else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {
        top: 0,
        left: 0,
        width: width,
        height: height
    };
    if(width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if(rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}