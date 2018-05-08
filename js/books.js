books ={
    getAll:function(func){
        $.ajax({
            type: "GET",
            url: makeURL('books'),
            success: function (msg) {
                func(msg);
            }
        });
    },
    getSingle:function(courseID,func){
        $.ajax({
            type: "GET",
            url: makeURL('singleBooks',{bookID:bookID}),
            success: function (msg) {
                func(msg);
            }
        });
    },
    booksSingleDiv:function(singleBook){
      //   html='<div class="col s6 single-book"><div class="entry"><img src="'+APIURL+singleBook.image+'" alt=""><h6><a data-id="'+singleBook.id+'" href="#">'+singleBook.title+'</a></h6><div class="rating">';
      //   for(x=1;x<=singleBook.rating;x++){
      //       html+='<span class="active"><i class="fa fa-star"></i></span>';
      //   }
      //   for(y=x;y<=5;y++){
      //       html+='<span class=""><i class="fa fa-star"></i></span>';
      //   }
      //   html+='</div><div class="price"><h5>'+singleBook.book_section.ksa_price+'$</h5></div></div></div>';
      // /*------------------------*/
       html="";
       html+='<div class="col s6 single-book"><div class="entry" ><img src="'+APIURL+singleBook.image+'" alt=""><h6><a data-id="'+singleBook.id+'" href="#">'+singleBook.title+'</a></h6><div class="rating">';
        for(x=1;x<=singleBook.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
       html+='</div><div class="price"><h5></h5></div></div></div>';
        return html;
    },
    booksPage:function(){
        el=this;
        el.getAll(function(msg){
            if(msg.success){
                html='';
                msg.result.forEach(function(item){
                    html+=el.booksSingleDiv(item);
                });
                $("#allBooksData").html(html);
            }
        });
        $(document).on('click','.single-book a',function(e){
            e.preventDefault();
            bookID=$(this).data('id');
            console.log(bookID);
            window.sessionStorage.setItem("bookID", bookID);
            el.redirectToSingleBook();
        });
    },
    redirectToSingleBook:function(){
        window.location.href="book-single.html";
    },
    redirectToBook: function(){
        window.location.href="book.html";
    },
    singleBookPage:function(){
        el=this;
        bookID=window.sessionStorage.getItem("bookID")
        if(bookID){
            el.getSingle(bookID,function(msg){
                book=msg.result;
                if(msg.success){

                    $("#bookTitle").html(book.title);
                    $("#bookImage").attr('src',APIURL+book.image);
                    $("#bookDescription").html(book.description);
                    $("#bookPrice").html(book.price);
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }
};
