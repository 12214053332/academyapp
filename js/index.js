/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();*/
var userData = window.sessionStorage.getItem("userData")
var APIURL="https://www.e3melbusiness.com/";
var tokenNumber="ay5t9Xh4hmAXSUEBby9j9dSAxjNCtnrFKp6x9YqG43JaXbpHESvHsP9G4vCg";
url = window.location.pathname;

var filename = url.substring(url.lastIndexOf('/')+1);
var errorMessages={
    "email_exist":"The Email Is Already Exist",
    "phone_exist":"The Phone Is Already Exist",
    "success":"Your Operation is success",
    "wrong_phone_or_password":"Wrong Phone Or Password",
    "user_not_active":"This User Not Active ",
    "user_id_required.":"User ID is required",
    "place_of_delivery_address_required.":"Place Of Delivery Address is required",
    "place_of_delivery_latitude_required.":"Place Of Delivery latitude is required",
    "place_of_delivery_longitude_required.":"Place Of Delivery longitude is required",
    "delivery_place_address_required.":"Delivery Place Address is required",
    "delivery_place_latitude_required.":"Delivery Place latitude is required",
    "delivery_place_longitude_required.":"Delivery Place longitude is required",
    "details_required.":"Details is required",
    "distance_required.":"Distance is required",
    "duration_required.":"Duration is required",
    "cost_required.":"Cost is required",
};
function makeURL(action,parameters){
    parametersText='';
    if(typeof parameters==='object'){
        for (var k in parameters){
           parametersText+='&'+k+'='+parameters[k];
        }
    }
    if(userData){
        userDataJson=JSON.parse(userData);
        parametersText+='&email='+userDataJson.email;
        parametersText+='&password='+userDataJson.password;
        parametersText+='&sessionUser='+userDataJson.session_user;
    }
    return APIURL+'?page=academyAPI&action='+action+parametersText+'&tokenNumber='+tokenNumber;
}
function getMessages(response,element){
    html='<div class="alert '+((response.success)?'alert-success':'alert-danger')+'">';
    message=response.message;
    /*if(message.length==1){
        html+=((typeof errorMessages[message[0]]=='undefined')?message[0]:errorMessages[message[0]])+'</div>';
        $(element).html(html);
        return'';
    }
    html+='<ul>';
    if(Array.isArray(message)){
        message.forEach(function(item){
            html+='<li>'+((typeof errorMessages[item]=='undefined')?item:errorMessages[item])+'</li>'
        })
    }*/
    html+='<ul>';
    html+='<li>'+errorMessages[message]+'</li>';
    html+='</ul></div>';
    $(element).html(html);
}
$(document).ready(function(){
    document.addEventListener("deviceready",onDeviceReady,false);
    $(".select2").select2()
});
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
includeHTML();
function onDeviceReady() {
    if(userData){
        $("#login-menu,#register-menu").addClass('hidden');
        userDataJson=JSON.parse(userData);
        if(userDataJson.image){
            $("#userDataImage").attr('src',APIURL+userDataJson.image)
        }else{
            $("#userDataImage").attr('src',APIURL+'assets/images/user/75x75/anonymous.png')
        }
        $("#userDataFullName").html(userDataJson.fullName);
    }
    if(filename=='register.html'){
        $.ajax({
            type: "GET",
            url: makeURL('countries'),
            success: function (msg) {
                if(msg.success){
                    html='<option value="">اختر  الدولة</option>';
                    msg.result.forEach(function(item){
                        html+='<option value="'+item.id+'" data-code="'+item.code+'"> '+item.name+'    +'+item.code+' </option>'
                    });
                    $("#country").html(html).trigger('change');
                }
            }

        });
        if(filename=='register.html'){
            var validator = $("#signup-form").validate({
                errorPlacement: function(error, element) {
                    // Append error within linked label

                    /*$( element )
                        .closest( "form" )
                        .find( "label[for='" + element.attr( "id" ) + "']" )
                        .append( error );*/
                },
                highlight: function(element) {
                    console.log(element);
                    if($(element).hasClass('select2')){
                        console.log("#select2-"+$(element).attr('id')+"-container")
                        $("#select2-"+$(element).attr('id')+"-container").parent().addClass('invalid');
                    }else{
                        $(element).addClass('invalid')
                    }

                    //$(element).closest('.form-group').addClass('has-error');

                },
                unhighlight: function(element) {
                    if($(element).hasClass('select2')){
                        console.log("#select2-"+$(element).attr('id')+"-container")
                        $("#select2-"+$(element).attr('id')+"-container").parent().removeClass('invalid');
                    }else {
                        $(element).removeClass('invalid')
                    }
                    //$(element).closest('.form-group').removeClass('has-error');

                },
                errorElement: "span",
                rules : {
                    fullname : {
                        required:true,
                        minlength : 5
                    },
                    email : {
                        required:true,
                        minlength : 5
                    },
                    mobile : {
                        required:true,
                        minlength : 6
                    },
                    country: {
                        required : true
                    },
                    password : {
                        required:true,
                        minlength : 5
                    },
                    confirmpassword : {
                        required:true,
                        minlength : 5,
                        equalTo : "#password"
                    },

                },
                messages: {
                },
                submitHandler: function() {
                    var countrycode=$('#country').find(':selected').data('code') ;
                    var Mobile1=$('#Mobile').val() ;
                    if( Mobile1.charAt( 0 ) === '0' )
                        Mobile1 = Mobile1.slice( 1 );
                    var Mobile=countrycode +  Mobile1;
                    $.ajax({
                        type: 'post',
                        url: /****/APIURL+'?page=_usersaction&action=signup',
                        data: $('#signup-form').serialize()+ "&Mobile="+Mobile,
                        success: function (data) {
                            $('#signup-response').html(data);
                            // alert(data);
                            if (IsJsonString(data))
                            {
                                var httpref = JSON.parse(data);
                                window.location.assign(httpref.httpref);
                            } else {
                                if (data.indexOf('شكر')!=-1){
                                    $('input').val('')

                                    $('select option[value=""]').attr('selected','selected');
                                    window.location.assign('?page=thanks');

                                    // window.location.assign("?page=profile")
                                }else{
                                    // $('.registerresult').html(data);
                                }
                            }
                        }
                    });

                }
            });

            $(".cancel").click(function() {
                validator.resetForm();
            });
        }



    }
    // sidenav control left
    $(".sidenav-control").sideNav({
        edge: 'right',//change rtl[left,right]
        closeOnClick: false
    });
    // panel collapse icon
    $(document).on("click",".collapsible-header",function(e){
        $(this).parent().siblings().find('span i').removeClass('fa-chevron-up')//change rtl[down,up]
        $(this).find('span i').toggleClass('fa-chevron-up')//change rtl[down,up]
        el=$(this).parent().find('.collapsible-body');
        if(el.is(':visible')){
            console.log('is :visible')
            el.css({"display":"block"});
        }else{
            console.log('else is :visible')
            el.css({"display":"none"});
        }
        $(".collapsible-body").not(el).not('.faq').css({"display":"none"});
    });

    // slick slider
    $('.slider-slick').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true
    });

    // faq collapse icon
    $(document).on("click",".faq-collapsible",function(e){
        $(this).parent().siblings().find('i').removeClass('fa-minus')
        $(this).find('i').toggleClass('fa-minus')
    });

    // testimonial
    $("#testimonial").owlCarousel({
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem: true
    });

    // tabs
    $('ul.tabs').tabs();
    function objectifyForm(formArray) {//serialize data function

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            console.log(formArray)
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
    if(filename=='login.html'){
        var loginValidator = $("#login-form").validate({
            errorPlacement: function(error, element) {
                // Append error within linked label
                /*$( element )
                    .closest( "form" )
                    .find( "label[for='" + element.attr( "id" ) + "']" )
                    .append( error );*/
                //$(element).parent().parent().addClass('has-error');
            },
            highlight: function(element) {

                $(element).closest('.form-group').addClass('has-error');

            },
            unhighlight: function(element) {

                $(element).closest('.form-group').removeClass('has-error');

            },
            errorElement: "span",
            rules : {

                email : {
                    required:true,
                    minlength : 5
                },
                password : {
                    required:true,
                    minlength : 5
                }
            },
            messages: {
            },
            submitHandler: function() {

                //alert('start');
                //$("#charge-btn").attr("disabled", true);
                $.ajax({
                    type: "POST",
                    url: makeURL('login'),
                    data: $("#login-form").serialize(),
                    success: function (msg) {
                        getMessages(msg,"#response")
                        $(".loader").hide();
                        if(msg.success){
                            console.log(msg);
                            msg.result.password=$("#login-form #password").val();
                            window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                            window.location.href="index.html";
                        }
                    }

                });
            }
        });
        $(".cancel").click(function() {
            loginValidator.resetForm();
        });
    }

}