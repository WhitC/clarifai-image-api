function predict_click(value, source) {

  if(source == 'url') {
    document.getElementById('img_preview').src = value;
    doPredictURL(value);
  }

  else if(source == 'file') {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    // load local file picture
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      var local_base64 = reader.result.split("base64,")[1];
      doPredictFile(local_base64);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

function doPredictURL(url) {

  app.models.predict(getSelectedModel(), url).then(
    function(response) {
      let concept_names = '';
      for (let i = 0; i < response.data.outputs[0].data.concepts.length; i++) {
        concept_names += response.data.outputs[0].data.concepts[i].name + ': ' + response.data.outputs[0].data.concepts[i].value + '<br>';
      }
      $('#concepts').html('<br><br>' + concept_names.toString());
    },
    function(err) {
      console.error(err);
    }
  );
}

function doPredictFile(local_base64) {

  app.models.predict(getSelectedModel(), { base64: local_base64}).then(
    function(response) {
      let concept_names = '';
      for (let i = 0; i < response.data.outputs[0].data.concepts.length; i++) {
        concept_names += '<div class="concept-divs">' + response.data.outputs[0].data.concepts[i].name + ': ' + response.data.outputs[0].data.concepts[i].value + '</div>';
      }

      $('#concepts').html(concept_names.toString());
    },
    function(err) {
      console.error(err);
    }
  );
}

function getSelectedModel() {
  var model = document.querySelector('input[name = "model"]:checked').value;

  if(model == "general")
    return Clarifai.GENERAL_MODEL;

  else if(model == "food")
    return Clarifai.FOOD_MODEL;

  else if(model == "NSFW")
    return Clarifai.NSFW_MODEL;

  else if(model == "travel")
    return Clarifai.TRAVEL_MODEL;

  else if(model == "wedding")
    return Clarifai.WEDDINGS_MODEL;

  else if(model == "color")
    return Clarifai.COLOR_MODEL;
}
