courses ={
    getAll:function(func){
        $.ajax({
            type: "GET",
            url: makeURL('courses'),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingle:function(courseID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleCourse',{courseID:courseID}),
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
        html+='</div><div class="price"><h5>'+singleCourse.course_section.ksa_price+'$</h5></div></div></div>';
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
        $(document).on('click','.single-course a',function(e){
            e.preventDefault();
            courseID=$(this).data('id');
            console.log(courseID);
            window.sessionStorage.setItem("courseID", courseID);
            el.redirectToSingleCourse();
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
                   $("#courseIframe").attr('src',course.intro_vedio);
                   $("#courseTitle").html(course.name);
                   $("#instructorImage").attr('src',APIURL+course.instractor_pic);
                    $("#instructorNname").html(course.instractor_name);
                    $("#storyViews").html(course.view);
                    $("#courseDate").html(course.createdtime);
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
