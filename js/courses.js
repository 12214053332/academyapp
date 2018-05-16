courses ={
    getAll:function(func){
        ajaxRequest(makeURL('courses'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(courseID,func){
        ajaxRequest(makeURL('singleCourse',{courseID:courseID}),function (msg) {
            func(msg);
        });
    },
    getSingleCurriculum:function(courseID,curriculumID,func){
        ajaxRequest(makeURL('singleCurriculum',{courseID:courseID,curriculumID:curriculumID}),function (msg) {
            func(msg);
        });
    },
    coursesSingleDiv:function(singleCourse){
        html='<div class="col s6 single-course"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div>'+((!singleCourse.hasCourse)?'<a href="subscriptions.html" class="button pull-left">اشترك الان</a>':'')+'<div class="price"><h5>'+singleCourse.ksa_price+'$</h5></div></div></div>';
        return html;
    },
    coursesPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#allCoursesData").html(html);
           }
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="courses-single.html";
    },
    redirectToCourse: function(){
        window.location.href="courses.html";
    },
    singleCoursePage:function(){
        el=this;
        courseID=window.sessionStorage.getItem("courseID")
        if(courseID){
            el.getSingle(courseID,function(msg){
                course=msg.result;
                if(msg.success){
                   $("#courseIframe").attr('src','https:'+course.intro_vedio);
                   $("#courseTitle").html(course.name);
                   $("#instructorImage").attr('src',APIURL+course.instractor_pic);
                    $("#instructorNname").html(course.instractor_name);
                    $("#storyViews").html(course.view);
                    $("#courseDate").html(course.createdtime);
                    $("#courseDescription").html(course.description);
                    html='';
                    x=0;
                    course.sections.forEach(function(section){
                        if(section.curriculum[0].type!='exam'){
                            html+='<div class="panel panel-default"><div class="panel-heading" role="tab" id="section-'+section.id+'"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-'+section.id+'" aria-expanded="true" aria-controls="collapse-'+section.id+'"><i class="fa fa-plus"></i> '+section.name+'</a></h4></div><div id="collapse-'+section.id+'" class="panel-collapse collapse '+((x==0)?'in':'')+'" role="tabpanel" aria-labelledby="section-'+section.id+'"><div class="panel-body">';
                        }
                        section.curriculum.forEach(function(item){
                            switch (item.type){
                                case 'default':
                                    html+='<div class="container"><div class="row"><div class="col s10">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s2">'+((item.duration)?item.duration:'')+'</div><div class="col s3"><a '+((msg.userSuccess||item.isfree=='yes')?'data-id="'+item.id+'" href="#"':'href="login.html"')+'  class="link-watch">مشاهدة</a></div><div class="col s3"><a '+((msg.userSuccess||item.isfree=='yes')?'data-id="'+item.id+'" href="#"':'href="login.html"')+' href="#" class="link-listen">أستماع</a></div></div></div>';
                                    break;
                               /* case'training':
                                    html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء التدريب</a></div></div></div>';
                                    break;
                                case'exam':
                                    html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء الأختبار</a></div></div></div>';
                                    break;*/
                            }

                        });
                        html+='</div></div></div>';
                        x++;
                    });
                    $("#accordion").html(html);
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    },
    watchVideoMenu:function(msg){
        course=msg.result;
        currentVideo=course.currentVideo;
        html='';
        course.sections.forEach(function(section){
            if(section.curriculum[0].type!='exam'){
                html+=' <li> <div class="collapsible-header '+((section.id==currentVideo.section_id)?'active':'')+'"><i class="fa fa-arrow-left"></i>'+section.name+' <span><i class="fa '+((section.id==currentVideo.section_id)?'fa-chevron-right fa-chevron-up':'fa-chevron-right')+'"></i></span></div> <div class="collapsible-body" '+((section.id==currentVideo.section_id)?'style="display: block;"':'')+'> <ul class="side-nav-panel"> ';
                section.curriculum.forEach(function(video){
                    html+='<li '+((video.id==currentVideo.id)?'class="active"':'')+'><a '+((msg.userSuccess||video.isfree=='yes')?'data-id="'+video.id+'" href="#"':'href="login.html"')+' class="link-watch">'+((video.name)?video.name:'')+((video.description)?video.description:'')+'</a></li>';
                });
                html+=' </ul> </div> </li>';
            }

        });
        return html;
    },
    watchVideoPage:function(){
        el=this;
        courseID=window.sessionStorage.getItem("courseID")
        curriculumID=window.sessionStorage.getItem("watchVideoID");
        if(courseID&&curriculumID){
            el.getSingleCurriculum(courseID,curriculumID,function(msg){
                course=msg.result;
                currentVideo=course.currentVideo;
                if((currentVideo&&currentVideo.isfree=='yes')||msg.userSuccess){
                    $("#courseIframe").attr('src',currentVideo.link)
                    html=el.watchVideoMenu(msg);
                    $("#slide-out-left.curriculum-menu").html(html);
                    el.trackUser(course);
                }else{
                    window.location.href="login.html";
                }


            })
        }
    },
    trackUser:function(course){
        currentVideo=course.currentVideo;
        if((currentVideo&&currentVideo.isfree=='yes')||msg.userSuccess){
            $("#courseIframe").attr('src',currentVideo.audio_link)
            html=el.watchVideoMenu(msg);
            $("#slide-out-left.curriculum-menu").html(html);

            $('#draggable-point').draggable({
                axis: 'x',
                containment: "#audio-progress"
            });
            $('#draggable-point').draggable({
                drag: function() {
                    var offset = $(this).offset();
                    var xPos = (100 * parseFloat($(this).css("left"))) / (parseFloat($(this).parent().css("width"))) + "%";

                    $('#audio-progress-bar').css({
                        'width': xPos
                    });
                }
            });
            var mousedown=false,
                currenttime= 0,
                $progress = $('.vjs-progress-holder.vjs-slider.vjs-slider-horizontal');
            /*$progress.on('click', function(e){
             var percent = ((e.pageX-$progress.offset().left)/$progress.width());
             var seek = percent*player.getDuration();
             //$('.vjs-progress-holder.vjs-slider').css('width', percent*100 + '%');
             $('.vjs-play-progress.vjs-slider-bar').css('width', percent*100 + '%');
             player.seek(seek)
             });*/

            $progress.mousedown(function(e) {
                mousedown=true;
            });

            $progress.mouseup(function(e) {

                if  (mousedown===true)
                    player.seek(currenttime);
                mousedownn=false;
            });

            $progress.mouseleave(function(e) {
                if  (window.mousedown===true)
                    player.seek(currenttime);
                mousedown=false;
            });

            $progress.mousemove(function(e) {
                console.log(player.getDuration());
                if (mousedown===true){
                    /*var progresswidth=$('.vjs-progress-control.vjs-control').width();
                     var parentOffset = $(this).parent().offset();
                     var relX = e.pageX - parentOffset.left;
                     var seekingpostion=((relX*100)/progresswidth);
                     $('.vjs-play-progress.vjs-slider-bar').css('width', seekingpostion +'%');
                     currenttime=(seekingpostion*player.getDuration())/100;*/
                    var percent = ((e.pageX-$progress.offset().left)/$progress.width());
                    var seek = percent*player.getDuration();
                    currenttime=seek;
                    $('.vjs-play-progress.vjs-slider-bar').css('width', percent*100 + '%');



                }
            });



            $(".sproutvideo-player").attr('height',$(window).height()-10);
            $("#left-information").css({'max-height':$(window).height()-10});
            $(document).on('click','#hidden-left-info',function(e){
                e.preventDefault();
                $("#left-information").hide('slide', {direction: 'left'}, 1000,function(){$('#open-left-info').css({'display':''});});

            });

            $(document).on('click','#open-left-info a',function(e){
                e.preventDefault();
                $('#open-left-info').hide();
                $("#left-information").show('slide', {direction: 'left'}, 1000,function(){});
            });
            $(document).on('click','#saveData',function () {
                saveData();
            })
            currentVideolink=currentVideo.audio_link;
            splitLinks=currentVideolink.split('/');
            videoID=splitLinks[splitLinks.length-2];
            var userData=window.sessionStorage.getItem('userData');
            email="";
            if(userData){
                userData=JSON.parse(userData)
                email=userData.email
            }
            var videoID=splitLinks[splitLinks.length-2];
            var video_time=currentVideo.video_time;
            var current_time=currentVideo.current_time;
            var player = new SV.Player({videoId:videoID });
            var curriculum_id=currentVideo.id;
            Cookies.remove('curriculum-'+curriculum_id);
            var course_id=courseID;
            window.onbeforeunload = closingCode;
            dataCookies=Cookies.getJSON();
            console.log(dataCookies);
            var saveData=function (){
                dataCookies=Cookies.getJSON();
                console.log(dataCookies);
                $.ajax({
                    type: 'post',
                    url: APIURL+'?page=courses&action=saveCoursesData&email='+email ,
                    data:{dataCookies:dataCookies},
                    success: function (response) {
                        //console.log('saveDataDone')
                        Cookies.remove('curriculum-'+curriculum_id);
                    }
                });
            };
            function closingCode(){
                // do something...
                saveData();
                return null;
            }
            if(typeof Cookies.get(course_id)=='undefined'){
                Cookies.set('curriculum-'+curriculum_id,{type:'curriculum',course_id:course_id,id:curriculum_id,video_time:parseFloat(video_time),current_time:parseFloat(current_time),max_time:0,completed:0});
                //console.log(Cookies.getJSON('curriculum-'+curriculum_id));
            }
            player.bind('ready',function(){

                console.log('ready');
                var CurrentTime=player.getDuration();
                console.log(CurrentTime);
                //player.seek(parseInt(current_time));
                //player.setVolume(1);
                //player.play();


            });

            $('#play').bind('click', function(e){
                player.play();
                if ( !$(this).hasClass('playing')){
                    $(this).addClass('playing');

                }else
                {
                    $(this).removeClass('playing');
                }
            });

            player.bind('play',function(){
                console.log('play');
                //player.seek(parseInt(current_time));
                //player.setVolume(1);
                /* if ( !$(this).hasClass('playing')){
                 $(this).addClass('playing');

                 }*/
                var CurrentTime=player.getDuration();
                console.log(player.getDuration());
                var minutes=Math.floor(CurrentTime/60);
                var seconds=Math.floor(CurrentTime-(minutes*60));
                $('.duration').html(minutes+ ":" +seconds );


            });
            //player.play();
            hasRequest=false;
            player.bind('progress',function(){

                dataCookies=Cookies.getJSON('curriculum-'+curriculum_id);
                //console.log(dataCookies);
                //console.log(player.getPercentLoaded());
                console.log(player.getDuration());
                durationTime=player.getDuration();
                durationTime=(durationTime>0)?durationTime:video_time;
                var CurrentTime=player.getCurrentTime();
                var minutes=Math.floor(CurrentTime/60);
                var seconds=Math.floor(CurrentTime-(minutes*60));
                $('.currenttime').html(minutes+ ":" +seconds );
                percentageTime=(CurrentTime/durationTime)*100
                dataCookies=Cookies.getJSON('curriculum-'+curriculum_id);
                //console.log(dataCookies);
                dataCookies.video_time=player.getDuration();
                dataCookies.current_time=player.getCurrentTime();
                dataCookies.max_time=(dataCookies.max_time>dataCookies.current_time)?dataCookies.max_time:player.getCurrentTime();
                if(percentageTime>=70&&!hasRequest){dataCookies.completed=1;}
                Cookies.set('curriculum_id-'+curriculum_id,dataCookies);
                if(percentageTime>=70&&!hasRequest){
                    hasRequest=true;
                    console.log(percentageTime);
                    saveData();
                }

                if (mousedown===false){
                    // $('.vjs-play-progress.vjs-slider-bar').css('width', player.getPercentLoaded()*100 +'%');
                    $('.vjs-play-progress.vjs-slider-bar').css('width',(CurrentTime*100)/player.getDuration() +'%');
                }
            });
            player.bind('completed',function(){
                dataCookies=Cookies.getJSON('curriculum-'+curriculum_id);
                dataCookies.completed+=1
                Cookies.set('curriculum-'+curriculum_id,dataCookies);
                saveData();
                next_id=$(".playing-data").attr('next-id');
                if(next_id>0){
                    window.location='courses/showCurriculumaudio/'+next_id + '/'+ course_id;
                }
            });
            $(document).on('click',"#player-next",function(){
                //console.log('asd');
                next_id=$(".playing-data").attr('next-id');
                if(next_id>0){
                    window.location='courses/showCurriculumaudio/'+next_id + '/'+ course_id;

                }
            });

            $(document).on('click',"#player-prev",function(){
                ////console.log('asd');
                prev_id=$(".playing-data").attr('prev-id');
                if(prev_id>0){
                    window.location='courses/showCurriculumaudio/'+prev_id + '/'+ course_id;

                }
            });


            $(document).on('mousemove mouseover','#videoIframe,#videoIframe iframe.sproutvideo-player html',function(){
                //console.log('sad');
                $("#backToCourse,#continue").css({'opacity':'1'});
            });



        }else{
            window.location.href="login.html";
        }

        },
    listenVideoPage:function(){
        el=this;
        courseID=window.sessionStorage.getItem("courseID")
        curriculumID=window.sessionStorage.getItem("listenVideoID");
        if(courseID&&curriculumID){
            el.getSingleCurriculum(courseID,curriculumID,function(msg){
                course=msg.result;
                el.trackUser(course);
            })
        }
    }
};
