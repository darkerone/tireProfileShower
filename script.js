

let allTiresFromData = data.map(x => new Tire(x.season, x.brand, x.name, x.image));
let tireManager = new TireManager(allTiresFromData);
let filterManager = new FilterManager(allTiresFromData)

$(function () {

  $("#filters").append(filterManager.getSeasonCheckboxList());
  $("#filters").append(filterManager.getBrandCheckboxList());

  displayFilters();
});

function onCheckBoxChangeHandler(elt){
  let category = $(elt).data("category");
  let value = $(elt).data("value");

  if(category != "tire"){
    filterManager.selectFilter(category, value, elt.checked);
    tireManager.filterSelectedTires(filterManager.selectedFilters.seasons, filterManager.selectedFilters.brands);
  }
  else{
    tireManager.selectTire(value, elt.checked)
  }

  if(category != "tire"){
    updateBrandsTireCheckboxLists();
  }
}

// Met à jour la liste des pneus d'une marque
function updateBrandsTireCheckboxLists(){
  // Pour toutes les marques
  filterManager.allBrands.forEach(brand => {
    // Si la marque est sélectionnée
    if(filterManager.selectedFilters.brands.includes(brand)){
      let filteredTires = tireManager.getTiresByFilters(filterManager.selectedFilters.seasons, [brand])
      updateTireCheckboxes(brand, filteredTires);
    }
    else{
      updateTireCheckboxes(brand, []);
    }
  });
}

function updateTireCheckboxes(brand, filteredTires){
  let $tiresContainer = $("#tires_container_brands_" + brand);
  $tiresContainer.empty();
  filteredTires.forEach(tire => {
    $tiresContainer.append(tire.getTireCheckbox());
  });
}

function getCarouselItem(tire, isActive){
  let isActiveClass = isActive ? "active" : "";
  let $carouselItem = $("<div class='carousel-item "+ isActiveClass +"'></div>");
  let $itemImage = $("<img src='images/"+ tire.image +"' class='d-block w-100'>")
  //$carouselItem.append($itemImage);
  $carouselItem.append(getCanvas("images/"+ tire.image, tire.name));
  let $carouselCaption = $("<div class='carousel-caption d-none d-md-block'><h5>"+ tire.name +"</h5></div>");
  $carouselItem.append($carouselCaption);

  return $carouselItem;
}

function getCanvas(imageUrl, title){
  let width = $(window).width();
  let height = $(window).width()*4/3;

  let rectLeftRightDistance = 30;
  let rectBottomDistance = 50;
  let rectWidth = width - 2 * rectLeftRightDistance;
  let rectHeight = 90;

  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');

  var imageObj = new Image();
  imageObj.onload = function() { 
    ctx.drawImage(imageObj, 0,0, width, height);  
    ctx.fillStyle = 'black';
    ctx.fillRect(rectLeftRightDistance, height - rectBottomDistance - rectHeight, rectWidth, rectHeight);
    //ctx.font = '30px arial';
    //ctx.fillStyle = 'white';
    //ctx.fillText(title, rectLeftRightDistance + 10, height - rectBottomDistance - rectHeight + rectHeight/2);
    drawTextInBox(ctx, title, 'arial', rectLeftRightDistance, height - rectBottomDistance - rectHeight + rectHeight/4, rectWidth, rectHeight/2, 0);
  }
  imageObj.src = imageUrl;

  return $(canvas);
}

function drawTextInBox(ctx, txt, font, x, y, w, h, angle) {
  angle = angle || 0;
  let fontHeight = 15;
  let hMargin = 4;
  ctx.fillStyle = 'white';
  ctx.font = fontHeight + 'px ' + font;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  let txtWidth = ctx.measureText(txt).width + 2 * hMargin;
  ctx.save();
  ctx.translate(x+w/2, y);
  ctx.rotate(angle);
  ctx.scale(w / txtWidth, h / fontHeight);
  ctx.translate(hMargin, 0)
  ctx.fillText(txt, -txtWidth/2, 0);
  ctx.restore();
}

function addItemToCarousel($carousel, tire, itemIndex){
  $carousel.find(".carousel-inner").append(getCarouselItem(tire, itemIndex == 0));
  let ariaCurrent = itemIndex == 0 ? "true": "false";
  let isActiveClass = itemIndex == 0 ? "active" : "";
  $carousel.find(".carousel-indicators").append($("<button type='button' class='"+ isActiveClass +"' data-bs-target='#resultCarousel' data-bs-slide-to='"+ itemIndex +"' aria-current="+ ariaCurrent +" aria-label='"+ tire.name +"'></button>"));
}

function onDisplayResultClicked(){
  let $resultCarousel = $("#resultCarousel");

  $resultCarousel.carousel("pause").removeData();
  $resultCarousel.find(".carousel-inner").empty();
  $resultCarousel.find(".carousel-indicators").empty();

  tireManager.getSelectedTires().forEach((tire, index) => {
    addItemToCarousel($resultCarousel, tire, index);
  });
  
  $resultCarousel.carousel(0);

  displayResults();
}

function onDisplayFilterClicked(){
  location.href = location.href;
}

function displayResults(){
  $("#resultCarousel").show();
  // Pour éviter que le carousel ne se redimensionne en hauteur à chaque photo, on lui impose une hauteur
  $("#resultCarousel").height($(window).width()*4/3);
  $("#showFilterButton").show();
  $("#filters").hide();
  $("#showResultButton").hide();
}

function displayFilters(){
  $("#resultCarousel").hide();
  $("#showFilterButton").hide();
  $("#filters").show();
  $("#showResultButton").show();
}