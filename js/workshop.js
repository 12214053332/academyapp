workShop ={
    getAll:function(func){
        $.ajax({
            type: "GET",
            url: makeURL('workShop'),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingle:function(workShopID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleWorkShop',{workShopID:workShopID}),
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
    workShopPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#allworkshopData").html(html);
           }
        });
        $(document).on('click','.single-course a',function(e){
            e.preventDefault();
            workShopID=$(this).data('id');
            console.log(workShopID);
            window.sessionStorage.setItem("workShopID", workShopID);
            el.redirectToSingleCourse();
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="workshop-single.html";
    },
    redirectToCourse: function(){
        window.location.href="workshop.html";
    },
    singleworkShopPage:function(){
        el=this;
        workShopID=window.sessionStorage.getItem("workShopID")
        if(workShopID){
		
			
            el.getSingle(workShopID,function(msg){
                course=msg.result;
                if(msg.success){
                   $("#courseIframe").attr('src',APIURL+course.image);
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
