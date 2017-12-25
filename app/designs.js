$(function() {
  var app = (function() {
    const $table = $('#pixel_canvas');
    const $gridButton = $('#grid');
    const $backgroundPicker = $('#bgColor');
    const $inputHeight = $('#input_height');
    const $inputWidth = $('#input_width');
    const $colorPicker = $('#colorPicker');
    const $eraserButton = $('#eraser');
    const $zoom = $('#zoom');
    const $canvas = $('#canvas');
    const $fa = $('.fa');
    const $zoomSlider = $('.zoom__slider');
    const $faWindow = $('fa-window-maximize');
    const $brush = $('.fa-paint-brush');
    let scale = 0;

    var initialize = false;

    return {
      init
    }

    function makeGrid() {
      let height = $inputHeight.val();
      let width = $inputWidth.val();
      let row = '';
      $table.html('');
      for (let i = 0; i < height; i++) {
        row += '<tr>';
        for (let j = 0; j < width; j++) {
          row += '<td class="grid"></td>';
        }
        row += '</tr>';
      }
      $table.append(row);
    }

    function paint() {
      const $td = $('td');
      var color = $colorPicker.val();
      var colorBackup = color;
      var isEraser = false;
      $colorPicker.on('change click', () => {
        color = $colorPicker.val()
        colorBackup = color;
        isEraser = false;
      });
      $eraserButton.on('click', () => {
      isEraser =!isEraser;
      color = isEraser ? 'transparent': colorBackup;
      if(!isEraser){
          $('.active').removeClass('active');
          $('.fa-paint-brush').addClass('active');
      }
      });
      $td.on('contextmenu', function(e) {
        e.preventDefault();
        $(this).css({
          background: 'transparent'
        });
        return false;
      });
      $td.on('click', function() {
        $(this).css({
          background: color
        });
      });
      $(document).on('mousedown', function() {
          $td.on('mouseover mouseleave', function() {
            $(this).css({
              background: color
            });
          });
        })
        .on('mouseup', function() {
          $td.off('mouseover mouseleave');
        });
    }

    function changeBackground() {
      let bgColor = $backgroundPicker.val('#FCFCFC');
      $backgroundPicker.on('change', () => {
        bgColor = $backgroundPicker.val()
        $table.css({
          background: bgColor
        });
        $faWindow.toggleClass('permactive')
        $('.active').removeClass('active');
        $brush.addClass('active');
      });

    }
    function inputNumberControl(input){
        input.forEach(el=>{el.on('keydown',function(e){
          console.log(e.keyCode)
          console.log();
          const KEYARRAYNUMBERS=[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
          const KEYARRAYSPECIAL=[46, 8, 9, 27, 13, 110, 116, 190];
          if(!~$.inArray(e.keyCode, KEYARRAYNUMBERS.concat(KEYARRAYSPECIAL))){
            e.preventDefault();
          }
          let $value=$(this).val()
          if($value.length>=3 && !~$.inArray(e.keyCode, KEYARRAYSPECIAL)){
             $error= $('.error');
             $error.css({visibility: 'visible'});
             e.preventDefault();
             setTimeout( () => $error.css({visibility:'hidden'}), 3000);
          }
        })
      });
    }
    function toggleGrid() {
      const $td = $('td');
      $gridButton.on('click', () => {
        $td.toggleClass('grid');
        $('.fa-table').toggleClass('permactive');
        $brush.addClass('active');
    });

    }

    function zoom() {
      $zoom.on('click', () => {
      $zoomSlider.show();
    });
    }

    function activateIcon(){
      $fa.on('click', function(){
        $zoomSlider.hide();
        $('.active').removeClass('active');
        $(this).addClass('active');
      })
    }


    function zoomControl(){
      const $zoomControl = $('.zoom_controler');
      $('.zoom__slider-plus').on('click',()=>{
          let position = parseInt($zoomControl.css('top'),10);
          if (position >=6){
            position -= 12;
            $zoomControl.css({'top': position});
            scale=position-24
          }
          let remove = $table.attr("class").split(" ").slice(1,2);
          $table.removeClass(remove.join(''));
          $table.addClass(`zoom-X${scale/6}`);
      });
      $('.zoom__slider-minus').on('click',()=>{
        console.log('minus')
          let position= parseInt($zoomControl.css('top'),10);
          if (position <=42){
            position += 12;
            $zoomControl.css({'top': position});
            scale=position-24
          }
          let remove = $table.attr("class").split(" ").slice(1,2);
          $table.removeClass(remove.join(''));
          $table.addClass(`zoom-X${scale/6}`);
      });
      $('.zoom__slider')
      .on('mousedown',function(event){
        let y= event.clientY
        $('.zoom_controler').on('mousemove',function(e){
           let position= parseInt($(this).css('top'),10);
          if (y-e.clientY>0){
            if (position >=6){
              position -= 12;
              $(this).css({'top': position});
              scale=position-24
            }
          }
          else{
            if (position <=42){
              position += 12;
              $(this).css({'top': position});
              scale=position-24;
            }
          }
          let remove = $table.attr("class").split(" ").slice(1,2);
          $table.removeClass(remove.join(''));
          $table.addClass(`zoom-X${scale/6}`);
        });
      });
      $(document).on('mouseup', function() {
        $('.zoom_controler').off('mousemove');
      });
    }
    function init() {
      if (initialize) {
        return;
      }
      initialize = true;
      activateIcon();
      inputNumberControl([$inputHeight,$inputWidth]);
      zoomControl();
      changeBackground();
      $('#submit').click(function(e) {
        e.preventDefault();
        makeGrid();
        zoom();
        paint();
        $canvas.show(2000);
        toggleGrid();

      });
    }
  })();

  app.init()
});
