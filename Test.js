$(function(){

     var pageList = $(".first_part");
     var pageRes = $(".second_part");
     var buttonForAdd = $(".Button_for_text");
     var $listItemTemplate = $('.template').html();
     var $smallListItemTenp = $(".small-template").html();


     function add_item(title){
             var $aux_node = $($listItemTemplate);

             $aux_node.find(".product").text(title);
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
                 });
                 refreshList();
             });


            changeNumMinus($aux_node);
            changeNumPlus($aux_node);
            refreshList();
            buy($aux_node);


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
                 node.find(".noMore").addClass("less");
                 node.find(".less").removeClass("noMore");
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
                 node.find(".less").addClass("noMore");
                 node.find(".noMore").removeClass("less");
                 node.find(".noMore").click(function(){
                     var num_of_now = parseInt(node.find(".number").text());
                     node.find(".number").text(num_of_now);
                 });
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


     add_item("Печиво");
     add_item("Молоко");
     add_item("Сир");
     add_item("Хліб");

 });



