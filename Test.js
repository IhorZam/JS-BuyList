$(function(){

     var pageList = $(".first_part");
     var pageRes = $(".second_part");
     var buttonForAdd = $(".Button_for_text");
     var $listItemTemplate = $('.template').html();
     var $smallListItemTenp = $(".small-template").html();


     function add_item(title){
             var $aux_node = $($listItemTemplate);

             var $title = $aux_node.find(".title-prod");
             $title.text(title);
             $aux_node.css("display", "flex");

             $aux_node.fadeOut(250, function () {
                 $aux_node.fadeIn(250);
             });
             pageList.append($aux_node);

             $aux_node.find(".delete").click(function(){
                 $($aux_node).animate({
                     opacity: 0
                 }, 500, function() {
                     $aux_node.remove();
                     refreshList();
                 });

             });

             $title.click(function () {
                 doMagic($aux_node);
             });


            changeNumMinus($aux_node);
            changeNumPlus($aux_node);
            refreshList();
            buy($aux_node);


     }

     function doMagic(node) {
         var value_is = node.find(".title-prod").text();
         node.find(".title-prod").remove();
         node.find(".product").append("<input type=\"text\" class=\"edit\">")
         node.find(".edit").val(value_is);
         node.find(".edit").focusout(function () {
             var cur_val = $(this).val();
             node.find(".edit").remove();
             node.find(".product").append("<span class=\"title-prod\"></span>");
             node.find(".title-prod").text(cur_val);
             node.find(".title-prod").click(function () {
                 doMagic(node);
             });
         });

     }

     function buy(node){
         node.find(".buy").click(function(){
             node.addClass("bought");
             node.removeClass("unbought");
             node.find(".more").css("display", "none");
             node.find(".less").css("display", "none");
             node.find(".noMore").css("display", "none");
             node.find(".delete").css("display", "none");
             node.find(".buy").text("Не куплено");
             node.find(".buy").addClass("dontBuy");
             node.find(".buy").removeClass("buy");
             refreshList();
             buy(node);
         });

         node.find(".dontBuy").click(function () {
             node.removeClass("bought");
             node.addClass("unbought");
             node.find(".more").css("display", "inherit");
             node.find(".less").css("display", "inherit");
             node.find(".noMore").css("display", "inherit");
             node.find(".delete").css("display", "inherit");
             node.find(".dontBuy").text("Куплено");
             node.find(".dontBuy").addClass("buy");
             node.find(".dontBuy").removeClass("dontBuy");
             refreshList();
             buy(node);
         });
     }

     function refreshList(){
         var all_prods = pageList.children(".unbought");
         console.log(all_prods);
         pageRes.find(".left_info").children().each(function(){
             $(this).remove();
         });
         all_prods.each(function(){
             var $node = $($smallListItemTenp);
             $node.find(".prod_text").text($(this).find(".product").text());
             $node.find(".left_number").text($(this).find(".number").text());
             pageRes.find(".left_info").append($node);
         });

         var bought_prod = pageList.children(".bought");
         console.log(bought_prod);
         pageRes.find(".bought_info").children().each(function(){
             $(this).remove();
         });
         bought_prod.each(function(){
             var $node = $($smallListItemTenp);
             $node.find(".prod_text").text($(this).find(".product").text());
             $node.find(".left_number").text($(this).find(".number").text());
             pageRes.find(".bought_info").append($node);
         });
     }

     function changeNumPlus(node){
         node.find(".more").click(function(){
             var number_of_now = parseInt(node.find(".number").text());
             node.find(".number").text(number_of_now + 1);
             if (number_of_now === 1){
                 node.find(".noMore").remove();
                 node.find(".number_of").prepend("<button class=\"less\" data-tooltip='Tooltip'>-</button>")
                 changeNumMinus(node);
             }
             refreshList();
         });
     }

     function changeNumMinus(node){
         node.find(".less").click(function(){
             var num_of_now = parseInt(node.find(".number").text());
             node.find(".number").text(num_of_now - 1);
             if (num_of_now - 1 === 1){
                 node.find(".less").remove();
                 node.find(".number_of").prepend("<button class=\"noMore\" data-tooltip='Tooltip'>-</button>");
             }
             refreshList();
         });
     }

     buttonForAdd.click(function () {
         var title = $(".text_input");
         if (title.val() === ""){
             alert("No name entered");
             return;
         }
        add_item(title.val());
        title.val("");
     });

    $(".text_input").keypress(function(e) {
        if(e.which == 13) {
            var title = $(".text_input");
            if (title.val() === ""){
                alert("No name entered");
                return;
            }
            add_item(title.val());
            title.val("");
        }
    });


     add_item("Печиво");
     add_item("Молоко");
     add_item("Сир");
     add_item("Хліб");

 });



