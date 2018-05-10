blogCategories ={
    getAll:function(func){
        $.ajax({
            type: "GET",
            url: makeURL('blogCategories'),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingle:function(blogCategoryID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleBlogCategory',{blogCategoryID:blogCategoryID}),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingleArticle:function(blogCategoryID,blogID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleBlog',{blogCategoryID:blogCategoryID,blogID:blogID}),
            success: function (msg) {
                func(msg);
            }
        });
    },

    coursesSingleDiv:function(singleCourse){
        html='<div class="col s6 single-course"><div class="entry"><img src="'+APIURL+singleCourse.picpath+'" alt=""><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div ">';
        // for(x=1;x<=singleCourse.rating;x++){
        //     html+='<span class="active"><i class="fa fa-star"></i></span>';
        // }
        // for(y=x;y<=5;y++){
        //     html+='<span class=""><i class="fa fa-star"></i></span>';
        // }
        html+='</div></div></div>';
        return html;
    },
    blogCategoriesPage:function(){
        el=this;
        el.getAll(function(msg){
            if(msg.success){
                html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#allcategoriesData").html(html);
            }
        });
        $(document).on('click','.single-course a',function(e){
            e.preventDefault();
            blogCategoriesID=$(this).data('id');
            console.log(blogCategoriesID);
            window.sessionStorage.setItem("blogCategoriesID", blogCategoriesID);
            el.redirectToSingleCourse();
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="articals.html";
    },
    redirectToCourse: function(){
        window.location.href="blogcategories.html";
    },
    articalsSingleDiv:function(singleArticals) {
        newDescription=strip_tags(singleArticals.description)
        html = '<div class="col s6 single-articals"><div class="entry"><img src="' + APIURL + singleArticals.picpath + '" alt=""><h6><a data-id="' + singleArticals.id + '" href="#">' + singleArticals.name + '</a></h6><p>'  +limit(newDescription,70)+ '</p><div ">';
        // for(x=1;x<=singleCourse.rating;x++){
        //     html+='<span class="active"><i class="fa fa-star"></i></span>';
        // }
        // for(y=x;y<=5;y++){
        //     html+='<span class=""><i class="fa fa-star"></i></span>';
        // }
        html += '</div></div></div>';
        return html;
    },
    singleBlogCategoryPage:function() {
        el = this;
        blogCategoriesID = window.sessionStorage.getItem("blogCategoriesID")
        if (blogCategoriesID) {
            el = this;
            el.getSingle(blogCategoriesID, function (msg) {
                console.log(msg);
                // singleBlogCategory=msg.result;
                if (msg.success) {

                    html = '';
                    msg.result.articles.forEach(function (item) {
                        html += el.articalsSingleDiv(item);
                    });
                    $("#allarticalsData").html(html);

                }
                else {
                    //el.redirectToCourse();
                }
            });
            $(document).on('click', '.single-articals a', function (e) {
                e.preventDefault();
                articalID = $(this).data('id');
                console.log(articalID);
                window.sessionStorage.setItem("articalID", articalID);
                el.redirectToSingleArtical();
            });
        } else {
            //el.redirectToCourse();
        }


    },
    redirectToSingleArtical:function(){
        window.location.href="artical-single.html";
    },
    redirectToArticals: function(){
        window.location.href="articals.html";
    },
    singleArticalPage:function(){
        el=this;
        blogCategoriesID=window.sessionStorage.getItem("blogCategoriesID")
        articalID=window.sessionStorage.getItem("articalID")
        if(articalID){
            el.getSingleArticle(blogCategoriesID,articalID,function(msg){
                artical=msg.result;
                if(msg.success){

                    $("#articalTitle").html(artical.name);
                    $("#articalImage").attr('src',APIURL+artical.picpath);
                    $("#articalDescription").html(artical.description);

                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }
};

function strip_tags (html)
{
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}
function limit(str,limit){
    limit=(typeof limit=='undefined')?10:limit;
    return (str.length > limit)?str.substring(0,limit)+'...':str.substring(0,limit);
}
