webinar ={
    getAll:function(func){
        $.ajax({
            type: "GET",
            url: makeURL('webinar'),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingle:function(webinarID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleWebinar',{webinarID:webinarID}),
            success: function (msg) {
                func(msg);
            }
        });
    },
    coursesSingleDiv:function(singleCourse){
        html='<div class="col s6 single-course"><div class="entry"><img src="'+APIURL+singleCourse.image+'" alt=""><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div></div></div>';
        return html;
    },
    webinarPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#allwebinarData").html(html);
           }
        });
        $(document).on('click','.single-course a',function(e){
            e.preventDefault();
            webinarID=$(this).data('id');
            console.log(webinarID);
            window.sessionStorage.setItem("webinarID", webinarID);
            el.redirectToSingleCourse();
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="webinar-single.html";
    },
    redirectToCourse: function(){
        window.location.href="webinar.html";
    },
    singleWebinarPage:function(){
        el=this;
        webinarID=window.sessionStorage.getItem("webinarID")
        if(webinarID){
            el.getSingle(webinarID,function(msg){
                course=msg.result;
                if(msg.success){
                    console.log(course.link)
                    if(course.link){
                        $("#courseIframe").attr('src',course.link).removeClass('hidden');
                    }else{
                        $("#courseImageIframe").attr('src',APIURL+course.image).removeClass('hidden');
                    }

                   $("#courseTitle").html(course.name);
                   $("#instructorImage").attr('src',APIURL+course.instractor_pic);
                    $("#instructorNname").html(course.instractor_name);
                    $("#courseDate").html(course.createdtime);
                    $("#courseViews").html(course.view);
                    $("#courseDescription").html(course.description);
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }
};
