var container = $('div.container');

$('input#get').click(function(){
    $.ajax({
       type: 'GET',
       url: 'conversations.json',
       dateType: 'json',
       success: function(date) {
           $.each(date, function(index, item){
              $.each(item, function(key, value){
                container.append(key+':'+value+'</br>');  
              });
               container.append('<br/></br>');
           });
       }
        
    });
})