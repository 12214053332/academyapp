diplomas ={
    getAll:function(func){
        $.ajax({
            type: "GET",
            url: makeURL('diplomas'),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingle:function(diplomaID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleDiplomas',{diplomaID:diplomaID}),
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
    diplomasPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#alldiplomaData").html(html);
           }
        });
        $(document).on('click','.single-course a',function(e){
			
            e.preventDefault();
            diplomaID=$(this).data('id');
            console.log(diplomaID);
            window.sessionStorage.setItem("diplomaID", diplomaID);
            el.redirectToSingleCourse();
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="diploma-single.html";
    },
    redirectToCourse: function(){
        window.location.href="diploma.html";
    },
	
	
	    singleCategoryPage:function(singleCategory){
		
		console.log(singleCategory);

		
		
		 htmly='<div class="col s6 single-course"><div class="entry"><img src="'+APIURL+singleCategory.image+'" alt=""><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCategory.rating;x++){
            htmly+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            htmly+='<span class=""><i class="fa fa-star"></i></span>';
        }
        htmly+='</div></div></div>';
        return htmly;
    },
	
	
	
    singlediplomasPage:function(){
        el=this;
        diplomaID=window.sessionStorage.getItem("diplomaID")
        if(diplomaID){
		         el.getSingle(diplomaID,function(msg){
                course=msg.result;
				

				
	
				
				
				
                if(msg.success){
					htmly='';
                   $("#courseIframe").attr('src',APIURL+course.image);
                   $("#courseTitle").html(course.name);
                   $("#instructorImage").attr('src',APIURL+course.instractor_pic);
                    $("#instructorNname").html(course.instractor_name);
                    $("#courseDate").html(course.createdtime);
                    $("#courseViews").html(course.view);
					
                    $("#courseDescription").html(course.description);
					msg.result.courses.forEach(function(item){		
                    htmly+=el.singleCategoryPage(item);
                });
					
					$("#allinnercategoryPageData").html(htmly);


                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }
};
