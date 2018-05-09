categories ={
    getAll:function(func){
        $.ajax({
            type: "GET",
            url: makeURL('categories'),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingle:function(categoryID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleCategories',{categoryID:categoryID}),
            success: function (msg) {
                func(msg);
            }
        });
    },

    getSingleCourse:function(courseID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleCourse',{courseID:courseID}),
            success: function (msg) {
                func(msg);
            }
        });
    },


    categorySingleDiv:function(singleCategory){

        html='<div class="col s6 single-category"><div class="entry"><img src="'+APIURL+singleCategory.image+'" alt=""><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
       /* for(x=1;x<=singleCategory.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }*/
       // html+='</div><div class="price"><h5>'+singleCategory.course_section.ksa_price+'$</h5></div></div></div>';
	     html+='</div></div></div>';

        return html;
    },
    categoriesPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.categorySingleDiv(item);
                });
                $("#allcategoryData").html(html);
           }
        });
        $(document).on('click','.single-category a',function(e){
            e.preventDefault();
            categoryID=$(this).data('id');
            console.log(categoryID);
            window.sessionStorage.setItem("categoryID", categoryID);
            el.redirectToSingleCourse();
        });
    },
	 innercategoryPage:function(){
        el=this;
         categoryID=window.sessionStorage.getItem("categoryID")
        el.getSingle(categoryID,function(msg){
           if(msg.success){
               html='';
               html+='<div style="padding: 12px"> <h5> كورسات</h5></div>';
               html_webinars='';
               html_webinars+='<div style="padding: 12px"> <h5> ندوات</h5></div>';
               html_successtories='';
               html_successtories+='<div style="padding: 12px"> <h5> قصص النجاح</h5></div>';
               html_workShops='';
               html_workShops+='<div style="padding: 12px"> <h5> ورش عمل </h5></div>';
               html_books='';
               html_books+='<div style="padding: 12px"> <h5> كتب </h5></div>';
               $("#category-name").html(msg.result.name);
               msg.result.courses.forEach(function(item){

                    html+=el.singleCategoryPage(item);
                });

               msg.result.webinars.forEach(function(item){

                   html_webinars+=el.singleCategoryPagewebinars(item);
               });

               msg.result.successtories.forEach(function(item){

                   html_successtories+=el.singleCategoryPagesuccesstories(item);
               });
               msg.result.books.forEach(function(item){

                   html_books+=el.singleCategoryPagebooks(item);
               });
               msg.result.workShops.forEach(function(item){

                   html_workShops+=el.singleCategoryPageworkShops(item);
               });
                $("#allinnercategoryPageData").html(html);
               $("#allwebinarsData").html(html_webinars);
               $("#allsuccessStoryData").html(html_successtories);
               $("#allbooksData").html(html_books);
               $("#allworkShopData").html(html_workShops);

           }
        });
        $(document).on('click','.single-course a',function(e){
            e.preventDefault();
            courseID=$(this).data('id');
            console.log(categoryID);
            window.sessionStorage.setItem("courseID", courseID);
          //  el.redirectToSingleCourse();
            window.location.href="courses-single.html";
        });
         $(document).on('click','.single-webinar a',function(e){
             e.preventDefault();
             webinarID=$(this).data('id');
             console.log(webinarID);
             window.sessionStorage.setItem("webinarID", webinarID);
            // el.redirectToSingleCourse();
             window.location.href="webinar-single.html";
         });
         $(document).on('click','.single-successtories a',function(e){
             e.preventDefault();
             successtoriesID=$(this).data('id');
             console.log(successtoriesID);
             window.sessionStorage.setItem("successtoriesrID", successtoriesID);
            // el.redirectToSingleCourse();
             window.location.href="sucessStory-single.html";
         });
         $(document).on('click','.single-books a',function(e){
             e.preventDefault();
             booksID=$(this).data('id');
             console.log(bookssID);
             window.sessionStorage.setItem("booksID", booksID);
            // el.redirectToSingleCourse();
             window.location.href="book-single.html";
         });
         $(document).on('click','.single-workShops a',function(e){
             e.preventDefault();
             workShopsID=$(this).data('id');
             console.log(workShopsID);
             window.sessionStorage.setItem("workShopsID", workShopsID);
             //el.redirectToSingleCourse();
             window.location.href="workshop-single.html";
         });
    },
    redirectToSingleCourse:function(){
        window.location.href="category-single.html";
    },
    redirectToCourse: function(){
        window.location.href="categories.html";
    },
    singleCategoryPage:function(singleCategory){
      //  APIURL=APIURL+'assets/images/';
       // html='<div> <h6> كورسات</h6></div>';
        html='<div class="col s6 single-course"><div class="entry" style="height: 200px;"><img src="'+APIURL+'/assets/images/'+singleCategory.image+'" alt=""><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
        html+='</div></div></div>';
        return html;
    },
    singleCategoryPagewebinars:function(singleCategory){
        //  APIURL=APIURL+'assets/images/';
        // html='<div> <h6> كورسات</h6></div>';
        html_webinars='<div class="col s6 single-webinar"><div class="entry" style="height: 200px;"><img src="'+APIURL+'/assets/images/'+singleCategory.image+'" alt=""><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
        html_webinars+='</div></div></div>';
        return html_webinars;
    },
    singleCategoryPagesuccesstories:function(singleCategory){
        //  APIURL=APIURL+'assets/images/';
        // html='<div> <h6> كورسات</h6></div>';
        html_successtories='<div class="col s6 single-successtories"><div class="entry" style="height: 200px;"><img src="'+APIURL+'/assets/images/'+singleCategory.image+'" alt=""><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
        html_successtories+='</div></div></div>';
        return html_successtories;
    },
    singleCategoryPagebooks:function(singleCategory){
        //  APIURL=APIURL+'assets/images/';
        // html='<div> <h6> كورسات</h6></div>';
        html_books='<div class="col s6 single-books"><div class="entry" style="height: 200px;"><img src="'+APIURL+'/assets/images/'+singleCategory.image+'" alt=""><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.title+'</a></h6><div class="rating">';
        html_books+='</div></div></div>';
        return html_books;
    },
    singleCategoryPageworkShops:function(singleCategory){
      //   APIURL=APIURL+'assets/images/';
        // html='<div> <h6> كورسات</h6></div>';
        html_workShops='<div class="col s6 single-workShops"><div class="entry" style="height: 200px;"><img src="'+APIURL+'/assets/images/'+singleCategory.image+'" alt=""><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
        html_workShops+='</div></div></div>';
        return html_workShops;
    },
    //singleCoursePage:function(){
    //    el=this;
    //    courseID=window.sessionStorage.getItem("courseID")
    //    if(courseID){
    //        el.getSingle(courseID,function(msg){
    //            course=msg.result;
    //            if(msg.success){
    //                $("#courseIframe").attr('src',course.intro_vedio);
    //                $("#courseTitle").html(course.name);
    //                $("#instructorImage").attr('src',APIURL+course.instractor_pic);
    //                $("#instructorNname").html(course.instractor_name);
    //                $("#courseDate").html(course.createdtime);
    //                $("#courseViews").html(course.view);
    //                $("#courseDescription").html(course.description);
    //            }else{
    //                //el.redirectToCourse();
    //            }
    //        });
    //    }else{
    //        //el.redirectToCourse();
    //    }
    //
    //
    //}

};
