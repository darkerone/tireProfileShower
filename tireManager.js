class TireManager {

    allTires = [];
    //displayedTires = [];
    selectedTires = [];

    constructor(tires) {
      this.allTires = tires;
    }


    selectTire(tireId, isSelected){
        if(isSelected){
            let tire = this.allTires.filter(x => x.id == tireId)[0];
            if(this.selectedTires.filter(x => x.id == tireId).length == 0){
                this.selectedTires.push(tire);
            }
        }
        else{
            this.selectedTires = selectedTires.filter(x => x.id != tireId);
        }
    }

    // Parmi les pneus sélectionnés, ne conserve que ceux qui respectent les filtres
    filterSelectedTires(seasons, brands){
        this.selectedTires = this.selectedTires.filter(x => (seasons == null || seasons.length == 0 || seasons.includes(x.season))
                                                            && (brands == null || brands.length == 0 || brands.includes(x.brand)));
    }

    getTiresByFilters(seasons, brands, tireIds){
        return this.allTires.filter(x => (seasons == null || seasons.length == 0 || seasons.includes(x.season))
                                        && (brands == null || brands.length == 0 || brands.includes(x.brand))
                                        && (tireIds == null || tireIds.length == 0 || tireIds.includes(x.id)));
    }
}