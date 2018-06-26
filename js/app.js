var app=angular.module("societyApp",["firebase"]);

app.controller("societyController",function($scope,$firebaseArray){
    //hakkımızda 
   var aboutRef = firebase.database().ref().child("about");

   //Etkinlikler
   var entertainmentRef=firebase.database().ref().child("entertainment");

   //Kategory
   var categoryRef=firebase.database().ref().child("category");

   //Resim Galerisi
   var imageGalleryRef=firebase.database().ref().child("imageGallery");

   //Duyurular
   var notificationRef=firebase.database().ref().child("notification");


   var about = $firebaseArray(aboutRef);
   var entertainment=$firebaseArray(entertainmentRef);
   var category=$firebaseArray(categoryRef);
   var imageGallery=$firebaseArray(imageGalleryRef);
   var notification=$firebaseArray(notificationRef);   
   $scope.imageRelationCategory=[];

  //get notification values
  about.$loaded().then(function(data) {
    $scope.pastAdmin=data[0].$value;
    $scope.nowAdmin=data[1].$value;
    $scope.societyDate=data[2].$value;
  }).catch(function(error) {
    console.error("Error:", error);
  });

  //get category values
  category.$loaded().then(function(data) {
    $scope.categories=data;
    createCategoryRelationImages();
  }).catch(function(error) {
    console.error("Error:", error);
  });

  //get image galery values
  imageGallery.$loaded().then(function(data) {
    $scope.images=data;
    createCategoryRelationImages();
  }).catch(function(error) {
    console.error("Error:", error);
  });



   //get notification datas
   notification.$loaded().then(function(data) {
    $scope.notifications=data;
  }).catch(function(error) {
    console.error("Error:", error);
  });

  

  $scope.showNotificationDetail=function(notification){
  	$("#notificationHeader").text(notification.nName);
  	$("#notificationContent").text(notification.nContent);
  	$("#modalButton").trigger("click");
  }

  $scope.carouselActiveStatus=function(index){
  	if(index>0) return "not-active";
  	else return "active";
  }

  

  function createCategoryRelationImages(){
  	if($scope.images!==undefined && $scope.categories!==undefined){
        for(var i=0; i<$scope.categories.length; i++){
        	$scope.imageRelationCategory.push({
               "cName":$scope.categories[i].cName,
               "categoryImage":getCategoryImage($scope.categories[i].cId)
        	});
        }
  	}
  }

  function getCategoryImage(cId){
       var categoryImage=[];
       for(var i=0; i<$scope.images.length; i++){
       	 if(cId==$scope.images[i].cId){
             categoryImage.push({
             	"imageDate":$scope.images[i].imageDate,
             	"imageComment":$scope.images[i].imageComment,
             	"url":$scope.images[i].picture
             })
       	 }
       }
       return categoryImage;
  }



});