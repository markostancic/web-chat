jQuery(document).ready(function ($) {
	var messages = [];
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    $.ajax({
            url: '/praksa/json/conversations.json',
            type: 'GET',
            dataType: 'json'
        })
        .done(function (result) {
            //console.log(result);
			messages = [];
			for(var j in result){
				var el = result[j];
				var name = el.name;
				for(var i in el.received_messages){
					var item = el.received_messages[i];
					messages.push({'owner':name, time: item.time, content: item.content, type:'r'});
				}
				for(var i in el.sent_messages){
					var item = el.sent_messages[i];
					messages.push({'owner':name, time: item.time, content: item.content, type:'s'});
				}
                var res = name.toLowerCase();
				$('#contact').append('<div class="field" id="'+el.name+'"><img src="/praksa/images/'+res+'.jpg" class="img img-response img-circle icon"/><p class="name">' + el.name + '</p><p class="status">' + el.status + '</p></div>');
                
                $('.field').click(function(){
                      $(this).parent().find('.field').css('background-color', '#ffffff');
                      $(this).css('background-color', '#c1c1c1');
                    
                });
                $('#'+el.name).click(function (el) {
					var name = el.currentTarget.id;
					$('#chat').empty();
					var lista = [];
					for(var k in messages){
						if(messages[k].owner == name){
								lista.push(messages[k]);
						}
					}
					lista.sort(function(a,b){
						return a.time > b.time;
					});

                    for (var k in lista) {
						var el = lista[k];
                            var dt=eval(el.time*1000);
                            var myDate = new Date(dt);
                            var n = addZero(myDate.getHours());
                            var m = addZero(myDate.getMinutes());
                            if( n < 12){
                                n = n + ":" + m + "AM";
                            }else{
                                n = n-12 +":" +m +"PM"
                            }
                            
                        if(el.type == 's'){
                            $('#chat').append('<div class="row well right"><p id="text">'+ el.content + '</p><p id="date" class="pull-left">'+n +'</p></div>');
                        }else {
                            $('#chat').append('<div class="row well left"><p id="text1">'+ el.content + '</p><p id="date1" class="pull-right">'+n+'</p></div>');
                        }
                        
                    }
                    $('#chat').append('<div class="container-fluid" id="field1"><input type="text" name="msg" id="msg" /><input type="button" id="button1" class="btn btn-default" Value="Pošalji" /></div>');
                    
                    var current = new Date();
                    var h = addZero(current.getHours());
                    var mm = addZero(current.getMinutes());
                    if( h < 12){
                        h = h + ":" + mm + "AM";
                    }else{
                        h = h-12 +":" +mm +"PM"
                    }
                    $('#button1').click(function(){
                        $('#chat').append('<div class="row well right"><p id="text3">'+$("#msg").val()+'</p><p id="date" class="pull-left">'+h+'</div>');
                    });
                });
                

			}


			

        })

        .fail(function () {
            console.log("fail");
        })
    

			
});
