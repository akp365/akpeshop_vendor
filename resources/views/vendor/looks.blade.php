@extends('layout')

@section('content')



  <h4 class="page-section-heading">Customize Site Look</h4>
    <div class="panel panel-default">
      <div class="panel-body">
        @csrf



              <div class="row" style="text-align:center;">
                <!-- SHOW VALIDATION ERRORS IF ANY -->
                @if(count($errors))
                  <div class="form-group">
                    <div class="alert alert-danger">
                      <ul>
                        @foreach($errors->all() as $error)
                          <li>{{$error}}</li>
                        @endforeach
                      </ul>
                    </div>
                  </div>
                @endif

                @if (Session::has('message'))
                  <div class="alert alert-success">{{ Session::get('message') }}</div>
                @endif
              </div>



                <!-- LOGO -->
                <div class="row" style="padding-top: 5px;">
                    <div class="col-md-3">
                        <p for="logo_input" class="col-sm-3">Logo (Maximum 10MB)</p>
                    </div>
                    <div class="col-sm-9">
                        <img id="logo_preview" style="max-height: 131px" @if($currentLook && $currentLook['logo']) src="{{ env('AKP_STORAGE') . 'store_looks' . '/' . Auth::id() . '/' .  $currentLook['logo'] }}" @endif>
                        <span class="percentage pl-2" id="pct_logo" style="display:none;">0 %</span>
                        <input type="file" name="logo_input" id="logo" accept="image/jpg, image/jpeg, image/png">
                        <button type="button" class="btn btn-primary" onclick="saveLogo()">Save</button>

                    </div>
                </div>
                <!-- LOGO END -->

                <!-- BANNER -->
                <div class="row" style="padding-top: 5px;">
                    <div class="col-md-3">
                        <p for="banner_input" class="col-sm-3">Banner (Maximum 10MB)</p>
                    </div>
                    <div class="col-sm-9">
                        <img id="banner_preview" style="max-height: 131px" @if($currentLook && $currentLook['banner']) src="{{ env('AKP_STORAGE') . 'store_looks' . '/' . Auth::id() . '/' .  $currentLook['banner'] }}" @endif>
                        <span class="percentage pl-2" id="pct_banner" style="display:none;">0 %</span>
                        <input type="file" name="banner_input" id="banner" accept="image/jpg, image/jpeg, image/png">
                        <button type="button" class="btn btn-primary" onclick="saveBanner()">Save</button>

                    </div>
                </div>
                <!-- BANNER END -->

@endsection
@section('scripts')
<script src="{{asset('admin_assets/js/jq-ajax-progress.js')}}"></script>
<script>
    //METHOD TO PREVIEW LOGO
    var img;
    $('[name="logo_input"]').on('change', function() {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {

            var fileSize = (input.files[0]['size'] / (1024 * 1024)).toFixed(2);

            if(fileSize > 10){
                alert('Maximum allowed filesize is 10MB');
                try{
                    input.type = "text";
                    input.type = "file";
                }catch(e){}
            }else{

                var reader = new FileReader();
                
                reader.onload = function(e) {
                    img = new Image;
                    img.src = reader.result;


                    //GET HEIGHT AND WIDTH UPON IMG OBJECT CREATION
                    img.onload = function () {
                        console.log(`Height: ${img.height}px Width: ${img.width}px`);
                        if(img.height < img.width){
                            $('#logo_preview').attr('src', e.target.result);
                        }else{
                            alert("Image width should be greater than it's height");
                        }
                    };
                }
                
                reader.readAsDataURL(input.files[0]); // convert to base64 string
            }
        }
    }

    //METHOD TO CHANGE HEADER LOGO
    function saveLogo(){
        var pctSection = document.getElementById(`pct_logo`);
        pctSection.style.display = "block";

        var fileData = $("#logo").prop("files")[0];
        var formData = new FormData();
        formData.append('image', fileData);
        $.ajax({
            method: 'POST',
            dataType: 'json',
            url: "{{ route('save_logo') }}",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            uploadProgress: function (e) {
                if (e.lengthComputable) {
                    var completedPercentage = Math.round((e.loaded * 100) / e.total);
                    pctSection.innerHTML = completedPercentage + ' %';
                }
            },
        }).done(function( data ) {
            pctSection.style.display = "none";
            alert('Logo Updated');
        }).fail(function( jqXHR, textStatus ) {
            pctSection.style.display = "none";
            alert('Could Not Update Logo');
        });
    }



    //METHOD TO PREVIEW BANNER
    $('[name="banner_input"]').on('change', function() {
        readURL2(this);
    });

    function readURL2(input) {
        if (input.files && input.files[0]) {

            var fileSize = (input.files[0]['size'] / (1024 * 1024)).toFixed(2);

            if(fileSize > 10){
                alert('Maximum allowed filesize is 10MB');
                try{
                    input.type = "text";
                    input.type = "file";
                }catch(e){}
            }else{
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    img = new Image;
                    img.src = reader.result;

                    //GET HEIGHT AND WIDTH UPON IMG OBJECT CREATION
                    img.onload = function () {
                        console.log(`Height: ${img.height}px Width: ${img.width}px`);
                        if(img.height < img.width){
                            $('#banner_preview').attr('src', e.target.result);
                        }else{
                            alert("Image width should be greater than it's height");
                        }
                    };
                }
                
                reader.readAsDataURL(input.files[0]); // convert to base64 string
            }
        }
    }

    //METHOD TO CHANGE BANNER
    function saveBanner(){
        var pctSection = document.getElementById(`pct_banner`);
        pctSection.style.display = "block";

        var fileData = $("#banner").prop("files")[0];
        var formData = new FormData();
        formData.append('image', fileData);
        $.ajax({
            method: 'POST',
            dataType: 'json',
            url: "{{ route('save_banner') }}",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            uploadProgress: function (e) {
                if (e.lengthComputable) {
                    var completedPercentage = Math.round((e.loaded * 100) / e.total);
                    pctSection.innerHTML = completedPercentage + ' %';
                }
            },
        }).success(function( data ) {
            console.log(data);
            pctSection.style.display = "none";
            alert('Banner Updated');
        }).fail(function( jqXHR, textStatus ) {
            pctSection.style.display = "none";
            alert('Could Not Update Banner');
        });
    }
</script>
@stop