

let allTiresFromData = data.map(x => new Tire(x.season, x.brand, x.name, x.image));
let tireManager = new TireManager(allTiresFromData);
let filterManager = new FilterManager(allTiresFromData)

$(function () {
  
  $("#filters").append(filterManager.getSeasonCheckboxList());
  $("#filters").append(filterManager.getBrandCheckboxList());

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
    updateBrandTireCheckboxLists();
  }
}

// Met à jour la liste des pneus d'une marque
function updateBrandTireCheckboxLists(){
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
  $carouselItem.append($itemImage);
  let $carouselCaption = $("<div class='carousel-caption d-none d-md-block'><h5>"+ tire.name +"</h5></div>");
  $carouselItem.append($carouselCaption);

  return $carouselItem;
}

function addItemToCarousel($carousel, tire, itemIndex){
  $carousel.find(".carousel-inner").append(getCarouselItem(tire, itemIndex == 0));
  $carousel.find(".carousel-indicators").append($("<button type='button' data-bs-target='#resultCarousel' data-bs-slide-to='"+ tire.name +"' aria-label='"+ tire.name +"'></button>"));
}

function onDisplayResultClicked(){
  let $resultCarousel = $("#resultCarousel");

  $resultCarousel.find(".carousel-inner").empty();
  $resultCarousel.find(".carousel-indicators").empty();

  tireManager.selectedTires.forEach((tire, index) => {
    addItemToCarousel($resultCarousel, tire, index);
  });
}