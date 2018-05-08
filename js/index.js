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
    return APIURL+'?page=academyAPI&action='+action+parametersText+'&tokenNumber='+tokenNumber;
}
function getMessages(response,element){
    html='<div class="alert '+((response.success)?'alert-success':'alert-danger')+'">';
    message=response.message;
    if(message.length==1){
        html+=((typeof errorMessages[message[0]]=='undefined')?message[0]:errorMessages[message[0]])+'</div>';
        $(element).html(html);
        return'';
    }
    html+='<ul>';
    if(Array.isArray(message)){
        message.forEach(function(item){
            html+='<li>'+((typeof errorMessages[item]=='undefined')?item:errorMessages[item])+'</li>'
        })
    }
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
includeHTML();
function onDeviceReady() {
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
}