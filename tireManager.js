class TireManager {

    allTires = [];
    //displayedTires = [];
    selectedTires = [];

    constructor(tires) {
      this.allTires = tires;
    }


    selectTire(tireId, isSelected){
        let tireToSelect = this.allTires.filter(x => x.id == tireId)[0];
        tireToSelect.isSelected = isSelected;
    }

    // Parmi les pneus sélectionnés, ne conserve que ceux qui respectent les filtres
    filterSelectedTires(seasons, brands){
        this.getSelectedTires().forEach(tire => {
            if((seasons == null || seasons.length == 0 || seasons.includes(tire.season))
                && (brands == null || brands.length == 0 || brands.includes(tire.brand))){
                tire.isSelected = true;
            }
            else{
                tire.isSelected = false;
            }
        });
    }

    getTiresByFilters(seasons, brands, tireIds){
        return this.allTires.filter(x => (seasons == null || seasons.length == 0 || seasons.includes(x.season))
                                        && (brands == null || brands.length == 0 || brands.includes(x.brand))
                                        && (tireIds == null || tireIds.length == 0 || tireIds.includes(x.id)));
    }

    getSelectedTires(){
        return this.allTires.filter(x => x.isSelected);
    }
}