class FilterManager {

    allSeasons = [];
    allBrands = [];
    selectedFilters = {
        seasons: [],
        brands: []
    };

    constructor(tires) {
      tires.forEach(x => {
        if(this.allSeasons.indexOf(x.season) == -1){
            this.allSeasons.push(x.season);
        }
        if(this.allBrands.indexOf(x.brand) == -1){
            this.allBrands.push(x.brand);
        }
      });
    }

    selectFilter(category, value, isSelected){
        if(isSelected){
            this.selectedFilters[category].push(value);
        }
        else{
            this.selectedFilters[category] = this.selectedFilters[category].filter(x => x != value);
        }
    }

    getSeasonCheckboxList(){
        return this.getCheckboxList("seasons", filterManager.allSeasons, true);
    }

    getBrandCheckboxList(){
        return this.getCheckboxList("brands", filterManager.allBrands, false);
    }

    getCheckboxList(category, values, isInline){
        let isInlineClass = isInline ? "" : "row m-1";
        let $checkBoxList = $("");
        if(values != null && values.length > 0){
            $checkBoxList = $("<div class='"+ isInlineClass +" border'></div>");
            values.forEach(value => {
                let $checkBox = this.getCheckBox(category, value);
                $checkBoxList.append($checkBox);
            });
        }
        return $checkBoxList;
    }

    getCheckBox(category, value){
        let id = category + "_" + value;
        let $form = $("<div class='form-check form-check-inline filter'></div>");
        let $input = $("<input class='form-check-input' type='checkbox' id='input_"+ id +"' data-category='" + category + "' data-value='" + value + "' onchange='onCheckBoxChangeHandler(this)'>");
        $form.append($input);
        let $label = $("<label class='form-check-label' for='input_"+ id +"'>"+ value +"</label>");
        $form.append($label);
        let $tiresContainer = $("<div id='tires_container_"+ id +"'></div>");
        $form.append($tiresContainer);
        return $form;
    }
    
}