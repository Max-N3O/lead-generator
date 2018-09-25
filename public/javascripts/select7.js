function remove_selected_item(elem, e) {
  e.stopPropagation();
  var option_text = elem.parentElement.querySelector(".select7_content").innerHTML;
  var option_value = elem.parentElement.querySelector(".select7_content").dataset.optionValue;
  var selector = elem.parentElement.parentElement.parentElement.querySelector(".select7_select");
  
  // selector.innerHTML += `<option value="${ option_value }">${ option_text }</option>`;
  selector.innerHTML += "<option value='"+ option_value +"'>"+ option_text +"</option>";
  
  if (selector.length > 1)
      selector.style.display = "block";
  
  var selected_items = elem.parentElement.parentElement.parentElement.querySelectorAll(".select7_item");
  if (selected_items.length == 1) {
      var placeholder = elem.parentElement.parentElement.parentElement.querySelector(".select7_placeholder");
      placeholder.style.display = "block";
  }

  // elem.parentElement.remove();
  elem.parentElement.parentElement.removeChild(elem.parentElement);
}

function add_selected_item(elem, e) {
  e.stopPropagation();
  var option_text =  elem[elem.selectedIndex].text;
  var option_value =  elem[elem.selectedIndex].value;
  var selected_items = elem.parentElement.querySelector(".select7_items");
  var placeholder = elem.parentElement.querySelector(".select7_placeholder");
  if (option_value === "filler" && option_text === "")
      return;

  placeholder.style.display = "none";
  // selected_items.innerHTML += `
  //     <div class="select7_item">
  //         <div data-option-value="${option_value}" class="select7_content">${option_text}</div>
  //         <div class="select7_del" onclick="remove_selected_item(this, event);">&#10006;</div>
  //     </div>`;

  selected_items.innerHTML += "<div class='select7_item'><div data-option-value='"+ option_value +"' class='select7_content'>"+ option_text +"</div><div class='select7_del' onclick='remove_selected_item(this, event);'><div class='select7_x'></div><div class='select7_x'></div></div></div> ";

  // elem[elem.selectedIndex].remove();
  elem[elem.selectedIndex].parentElement.removeChild(elem[elem.selectedIndex]);
  if (elem.length == 1)
      elem.style.display = "none";
}

const get_selected_items = function get_selected_items(select7_id, type/* = "both"*/) {
  type = type || "both";
  var selected_items = document.getElementById(select7_id).querySelectorAll(".select7_content");

  if (selected_items.length > 0) {
      var selected_values = [];
      
      if (type == "value")
          for (let i = 0; i < selected_items.length; i++)
              selected_values.push(selected_items[i].dataset.optionValue);
      
              if (type == "text")
          for (let i = 0; i < selected_items.length; i++)
              selected_values.push(selected_items[i].innerHTML);
      
      if (type == "both")
          for (let i = 0; i < selected_items.length; i++)
              selected_values.push({
                  "text": selected_items[i].innerHTML,
                  "value": selected_items[i].dataset.optionValue,
              });

      return selected_values;
  }

  return null;
}

module.exports = get_selected_items;