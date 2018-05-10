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
        html+='</div>'+((!singleCourse.hasCourse)?'<a class="button pull-left">اشترك الان</a>':'')+'<div class="price"><h5>'+singleCourse.ksa_price+'$</h5></div></div></div>';
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
                    html='';
                    x=0;
                    course.sections.forEach(function(section){
                        html+='<div class="panel panel-default"><div class="panel-heading" role="tab" id="section-'+section.id+'"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-'+section.id+'" aria-expanded="true" aria-controls="collapse-'+section.id+'"><i class="fa fa-plus"></i> '+section.name+'</a></h4></div><div id="collapse-'+section.id+'" class="panel-collapse collapse '+((x==0)?'in':'')+'" role="tabpanel" aria-labelledby="section-'+section.id+'"><div class="panel-body">';
                        section.curriculum.forEach(function(item){
                            switch (item.type){
                                case 'default':
                                    html+='<div class="container"><div class="row"><div class="col s10">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s2">'+((item.duration)?item.duration:'')+'</div><div class="col s3"><a class="link-watch">مشاهدة</a></div><div class="col s3"><a class="link-listen">أستماع</a></div></div></div>';
                                    break;
                                case'training':
                                    html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء التدريب</a></div></div></div>';
                                    break;
                                case'exam':
                                    html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء الأختبار</a></div></div></div>';
                                    break;
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


    }
};
