class Tire {
    constructor(season, brand, name, image) {
      this.season = season;
      this.brand = brand;
      this.name = name;
      this.image = image;
      this.id = season + "_" + brand + "_" + name.replace(" ", "_");
      this.isSelected = false;
    }

    getTireCheckbox(){
      let $form = $("<div class='form-check'></div>");
      let $input = $("<input class='form-check-input' type='checkbox' id='input_tire_"+ this.id +"' data-category='tire' data-value='" + this.id + "' onchange='onCheckBoxChangeHandler(this)'>");
      $form.append($input);
      $input.prop('checked', this.isSelected);
      let $label = $("<label class='form-check-label' for='input_tire_"+ this.id +"'>"+ this.name +"</label>");
      $form.append($label);
      let $tiresContainer = $("<div id='tires_container_"+ this.id +"'></div>");
      $form.append($tiresContainer);
      return $form;
    }
}