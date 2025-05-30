@extends('layout')
@section('page_title', '')
@section('content')

<link rel="stylesheet" type="text/css" href="{{ asset('chosen/chosen.css') }}">
<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 50px;
    }

    td, th {
        border: 1px solid #000;
        text-align: center;
        padding: 8px;
    }

</style>

    <div class="panel panel-default">
        <div class="panel-body">
            <!-- PRITABLE START -->
            <div id="printable" class="myDivToPrint">
                <form method="POST" action="{{ route('request-profile-update') }}">
                    @csrf


                        <h4 class="page-section-heading">Personal Details</h4>
                        @if(in_array($vendor->account_status, array('active', 'inactive')))
                        <div class="row">
                            <!-- VENDOR CODE -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default">
                                    <label for="seller_code">Seller Code</label>
                                    <input type="text" class="form-control" id="seller_code" placeholder="Seller Code" value="{{ $vendor->seller_code }}" disabled>
                                </div>
                            </div>

                            <!-- EMAIL -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default">
                                    <label for="member_since">Member Since</label>
                                    <input type="text" class="form-control" id="member_since" placeholder="Email" value="{{ date('Y-m-d', strtotime($vendor->member_since)) }}" disabled>
                                </div>
                            </div>
                        </div>
                        @endif

                        <div class="row">
                            <!-- VENDOR NAME -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="name">Name</label>

                                    <!-- CURRENT VALUE -->
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Name" value="{{ $vendor->name }}" disabled>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->name !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->name }}" disabled>
                                    @endif

                                    <!-- HIDDEN INPUT FIELD FOR SELLER-ID -->
                                    <input type="hidden" name="seller_id" class="form-control" value="{{ $vendor->id }}" required>
                                </div>
                            </div>

                            <!-- EMAIL -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="email">Email</label>

                                    <!-- CURRENT VALUE -->
                                    <input type="email" name="email" class="form-control" id="email" placeholder="Email" value="{{ $vendor->email }}" required>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->email !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->email }}" disabled>
                                    @endif
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- GENDER -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="gender">Gender</label>

                                    <!-- CURRENT VALUE WITH DROPDOWN -->
                                    <select style="width: 100%;" data-toggle="select2" name="gender" id="gender" data-placeholder="Select gender.." data-allow-clear="false" required disabled>
                                    <option></option>
                                        <option value="male" @if($vendor->gender=="male") selected @endif>Male</option>
                                        <option value="female" @if($vendor->gender=="female") selected @endif>Female</option>
                                        <option value="other" @if($vendor->gender=="other") selected @endif>Other</option>
                                    </select>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->gender !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ ucfirst( $infoChangeRequest->gender ) }}" disabled>
                                    @endif
                                </div>
                            </div>

                            <!-- AGE -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="age">Age</label>

                                    <!-- CURRENT VALUE -->
                                    <input type="number" class="form-control" name="age" id="age" placeholder="Age" value="{{ $vendor->age }}" required disabled>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->age !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->age }}" disabled>
                                    @endif
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <!-- COUNTRY -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="country">Country</label>

                                    <!-- CURRENT VALUE -->
                                    <select style="width: 100%;" data-toggle="select2" name="country" id="country" data-placeholder="Select country .." data-allow-clear="false" required disabled>
                                        <option></option>
                                        @foreach($countryList as $cntItem)
                                            <option value="{{ $cntItem->id }}" @if($vendor->country_id == $cntItem->id) selected @endif> {{ $cntItem->country_name }}</option>
                                        @endforeach
                                    </select>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->country_id !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->country->country_name }}" disabled>
                                    @endif
                                </div>
                            </div>

                            <!-- CITY -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="city">City</label>

                                    <!-- CURRENT VALUE -->
                                    <input type="text" style="width: 100%;" class="form-control" id="city" name="city" required>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->city_id !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->city->city_name }}" disabled>
                                    @endif
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <!-- SHOP NAME -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="shop_name">Shop Name</label>

                                    <!-- CURRENT VALUE -->
                                    <input type="text" class="form-control" name="shop_name" id="shop_name" placeholder="Shop Name" value="{{ $vendor->shop_name }}" required disabled>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->shop_name !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->shop_name }}" disabled>
                                    @endif
                                </div>
                            </div>

                            <!-- COMPANY NAME -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default">
                                    <!-- LABEL -->
                                    <label for="company_name">Company Name</label>

                                    <!-- COMPANY NAME -->
                                    <input type="text" class="form-control" id="company_name" name="company_name" placeholder="Company Name" value="{{ $vendor->company_name }}" @if($vendor->account_type == "business") disabled @endif>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->company_name !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->company_name }}" disabled>
                                    @endif
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- SHOP ADDRESS -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="shop_address">Shop Address</label>

                                    <!-- CURRENT VALUE -->
                                    <textarea class="form-control" id="shop_address" name="shop_address" placeholder="Shop address" required>{{ $vendor->shop_address }}</textarea>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->shop_address !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->shop_address }}" disabled>
                                    @endif
                                </div>
                            </div>

                            <!-- COMPANY ADDRESS -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default">
                                    <!-- LABEL -->
                                    <label for="company_address">Company Address</label>

                                    <!-- CURRENT VALUE -->
                                    <textarea class="form-control" id="company_address" name="company_address" placeholder="Company address">{{ $vendor->company_address }}</textarea>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->company_address !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->company_address }}" disabled>
                                    @endif
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <!-- ACCOUNT TYPE -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="account_type">Account Type</label>

                                    <!-- CURRENT VALUE & DROPDOWN -->
                                    <select style="width: 100%;" data-toggle="select2" name="account_type" id="account_type" data-placeholder="Select account type .." data-allow-clear="false" required  @if( $vendor->account_type == 'business' ) disabled @endif>
                                        <option></option>
                                        <option value="individual" @if( $vendor->account_type == 'individual' ) selected @endif>Individual</option>
                                        <option value="business" @if( $vendor->account_type == 'business' ) selected @endif>Business</option>
                                    </select>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->account_type !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ ucfirst( $infoChangeRequest->account_type ) }}" disabled>
                                    @endif
                                </div>
                            </div>

                            <!-- PHONE -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="phone">Phone</label>

                                    <!-- CURRENT VALUE -->
                                    <input type="text" name="phone" class="form-control" id="phone" placeholder="Phone" value="{{ $vendor->phone }}" required>

                                    <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                    @if($infoChangeRequest && $infoChangeRequest->phone !== NULL)
                                        <input type="text" class="form-control" style="color:blue;font-weight: bold;" value="Pending Change To: {{ $infoChangeRequest->phone }}" disabled>
                                    @endif
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <!-- CURRENCY -->
                            <div class="col-md-6">
                                <div class="form-group form-control-default required">
                                    <!-- LABEL -->
                                    <label for="currency">Currency</label>

                                     <!-- CURRENT VALUE -->
                                     <input type="text" name="currency" class="form-control" id="currency" placeholder="Currency" value="{{ $vendor->currency->title }}" required>
                                </div>
                            </div>

                            <!-- PHONE -->
                            <div class="col-md-6"></div>
                        </div>



                        <!-- CONTROLS -->
                        <div class="row text-center nonPrintables">
                            <button type="submit" class="btn btn-primary">Request Update</button>
                            <button type="button" onclick="printDetails()" class="btn btn-info">Print</button>
                        </div>
                </form>

                <!-- PHOTOS & DOCUMENTS -->
                @if(in_array($vendor->account_status, array('final_declined','final_approval_pending', 'active', 'inactive')))
                    <div id="nonPrintables" class="nonPrintables">
                        <h4 class="page-section-heading">Photos & Documents</h4>
                        <div class="row">
                            <!-- PHOTO -->
                            <div class="col-md-6">
                                <form method="POST" action="{{ route('request-document-update') }}" enctype="multipart/form-data">
                                    <!-- CSRF TOKEN -->
                                    @csrf

                                    <!-- INPUT FIELDS -->
                                    <div class="form-group form-control-default">
                                        <!-- LABEL -->
                                        <label for="photoUrl">Photo</label>

                                        <!-- HIDDEN INPUT -->
                                        <input type="hidden" disabled id="photoUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $vendor->photo_url}}">

                                        <!-- PREVIEW BUTTON -->
                                        <button class="btn btn-default" type="button" onclick="showPreview('Photo','photoUrl')">View <i class="fa fa-file-image-o"></i></button>

                                        <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                        @if($infoChangeRequest && $infoChangeRequest->photo_url !== NULL)
                                            <!-- PREVIEW BUTTON -->
                                            <button class="btn btn-info" type="button" onclick="showPreview('Photo','newPhotoUrl')">View Pending Photo <i class="fa fa-file-image-o"></i></button>
                                            <input type="hidden" disabled id="newPhotoUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $infoChangeRequest->photo_url}}">
                                        @else
                                            <!-- UPLOAD NEW PHOTO BUTTON -->
                                            <button id="newPhotoUploadBtn" onclick="newFileUpload('newPhotoUploadFileInput');" type="button" class="btn btn-info">Upload New <i class="fa fa-cloud-upload"></i></button>

                                            <!-- CANCEL NEW UPLOAD BUTTON -->
                                            <button id="newPhotoUploadCancelBtn" onclick="cancelNewPhotoUpload();" style="display:none;" type="button" class="btn btn-warning">Reset <i class="fa fa-undo"></i></button>

                                            <!-- REQUEST UPDATE BUTTON -->
                                            <button id="newPhotoUploadSaveBtn" class="btn btn-success" type="submit" style="display: none;">Request Update <i class="fa fa-save"></i></button>

                                            <!-- HIDDEN FILE BROWSER BUTTON -->
                                            <input type="file" id="newPhotoUploadFileInput" name="photo" style="visibility:hidden;">

                                            <!-- HIDDEN INPUT FIELD FOR SELLER-ID -->
                                            <input type="hidden" name="seller_id" class="form-control" value="{{ $vendor->id }}" required>
                                        @endif
                                    </div>
                                </form>
                            </div>

                            <!-- NID -->
                            <div class="col-md-6">
                                <form method="POST" action="{{ route('request-document-update') }}" enctype="multipart/form-data">
                                    <!-- CSRF TOKEN -->
                                    @csrf

                                    <!-- INPUT FIELDS -->
                                    <div class="form-group form-control-default">
                                        <!-- LABEL -->
                                        <label for="nidUrl">NID</label>

                                        <!-- HIDDEN INPUT -->
                                        <input type="hidden" disabled id="nidUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $vendor->nid_url}}">

                                        <!-- PREVIEW BUTTON -->
                                        <button class="btn btn-default" type="button" onclick="showPreview('NID','nidUrl')">View <i class="fa fa-file-image-o"></i></button>

                                        <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                        @if($infoChangeRequest && $infoChangeRequest->nid_url !== NULL)
                                            <!-- PREVIEW BUTTON -->
                                            <button class="btn btn-info" type="button" onclick="showPreview('NID','newNidUrl')">View Pending NID <i class="fa fa-file-image-o"></i></button>
                                            <input type="hidden" disabled id="newNidUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $infoChangeRequest->nid_url}}">
                                        @else
                                            <!-- UPLOAD NEW NID BUTTON -->
                                            <button id="newNidUploadBtn" onclick="newFileUpload('newNidUploadFileInput');" type="button" class="btn btn-info">Upload New <i class="fa fa-cloud-upload"></i></button>

                                            <!-- CANCEL NEW UPLOAD BUTTON -->
                                            <button id="newNidUploadCancelBtn" onclick="cancelNewNidUpload();" style="display:none;" type="button" class="btn btn-warning">Reset <i class="fa fa-undo"></i></button>

                                            <!-- REQUEST UPDATE BUTTON -->
                                            <button id="newNidUploadSaveBtn" class="btn btn-success" type="submit" style="display: none;">Request Update <i class="fa fa-save"></i></button>

                                            <!-- HIDDEN FILE BROWSER BUTTON -->
                                            <input type="file" id="newNidUploadFileInput" name="nid" style="visibility:hidden;">

                                            <!-- HIDDEN INPUT FIELD FOR SELLER-ID -->
                                            <input type="hidden" name="seller_id" class="form-control" value="{{ $vendor->id }}" required>
                                        @endif
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="row">
                            <!-- TIN -->
                            <div class="col-md-6">
                                <form method="POST" action="{{ route('request-document-update') }}" enctype="multipart/form-data">
                                    <!-- CSRF TOKEN -->
                                    @csrf

                                    <!-- INPUT FIELDS -->
                                    <div class="form-group form-control-default">
                                        <!-- LABEL -->
                                        <label for="tinUrl">TIN Certificate</label>

                                        <!-- HIDDEN INPUT -->
                                        <input type="hidden" disabled id="tinUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $vendor->tin_certificate_url}}">

                                        <!-- PREVIEW BUTTON -->
                                        <button class="btn btn-default" type="button" onclick="showPreview('TIN','tinUrl')">View <i class="fa fa-file-image-o"></i></button>

                                        <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                        @if($infoChangeRequest && $infoChangeRequest->tin_certificate_url !== NULL)
                                            <!-- PREVIEW BUTTON -->
                                            <button class="btn btn-info" type="button" onclick="showPreview('TIN','newTinUrl')">View Pending TIN <i class="fa fa-file-image-o"></i></button>
                                            <input type="hidden" disabled id="newTinUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $infoChangeRequest->tin_certificate_url}}">
                                        @else
                                            <!-- UPLOAD NEW TIN BUTTON -->
                                            <button id="newTinUploadBtn" onclick="newFileUpload('newTinUploadFileInput');" type="button" class="btn btn-info">Upload New <i class="fa fa-cloud-upload"></i></button>

                                            <!-- CANCEL NEW UPLOAD BUTTON -->
                                            <button id="newTinUploadCancelBtn" onclick="cancelNewTinUpload();" style="display:none;" type="button" class="btn btn-warning">Reset <i class="fa fa-undo"></i></button>

                                            <!-- REQUEST UPDATE BUTTON -->
                                            <button id="newTinUploadSaveBtn" class="btn btn-success" type="submit" style="display: none;">Request Update <i class="fa fa-save"></i></button>

                                            <!-- HIDDEN FILE BROWSER BUTTON -->
                                            <input type="file" id="newTinUploadFileInput" name="tin_certificate" style="visibility:hidden;">

                                            <!-- HIDDEN INPUT FIELD FOR SELLER-ID -->
                                            <input type="hidden" name="seller_id" class="form-control" value="{{ $vendor->id }}" required>
                                        @endif
                                    </div>
                                </form>
                            </div>

                            <!-- GST / BIN -->
                            <div class="col-md-6">
                                <form method="POST" action="{{ route('request-document-update') }}" enctype="multipart/form-data">
                                    <!-- CSRF TOKEN -->
                                    @csrf

                                    <!-- INPUT FIELDS -->
                                    <div class="form-group form-control-default">
                                        <!-- LABEL -->
                                        <label for="gstUrl">GST / BIN </label>

                                        <!-- HIDDEN INPUT -->
                                        <input type="hidden" disabled id="gstUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $vendor->gst_url}}">

                                        <!-- PREVIEW BUTTON -->
                                        @if($vendor->gst_url)
                                            <button class="btn btn-default" type="button" onclick="showPreview('GST','gstUrl')">View <i class="fa fa-file-image-o"></i></button>
                                        @else
                                            <button class="btn btn-default" type="button" disabled>NA <i class="fa fa-file-image-o"></i></button>
                                        @endif

                                        <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                        @if($infoChangeRequest && $infoChangeRequest->gst_url !== NULL)
                                            <!-- PREVIEW BUTTON -->
                                            <button class="btn btn-info" type="button" onclick="showPreview('GST','newGstUrl')">View Pending GST <i class="fa fa-file-image-o"></i></button>
                                            <input type="hidden" disabled id="newGstUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $infoChangeRequest->gst_url}}">
                                        @else
                                            <!-- UPLOAD NEW GST BUTTON -->
                                            <button id="newGstUploadBtn" onclick="newFileUpload('newGstUploadFileInput');" type="button" class="btn btn-info">Upload New <i class="fa fa-cloud-upload"></i></button>

                                            <!-- CANCEL NEW UPLOAD BUTTON -->
                                            <button id="newGstUploadCancelBtn" onclick="cancelNewGstUpload();" style="display:none;" type="button" class="btn btn-warning">Reset <i class="fa fa-undo"></i></button>

                                            <!-- REQUEST UPDATE BUTTON -->
                                            <button id="newGstUploadSaveBtn" class="btn btn-success" type="submit" style="display: none;">Request Update <i class="fa fa-save"></i></button>

                                            <!-- HIDDEN FILE BROWSER BUTTON -->
                                            <input type="file" id="newGstUploadFileInput" name="gst" style="visibility:hidden;">

                                            <!-- HIDDEN INPUT FIELD FOR SELLER-ID -->
                                            <input type="hidden" name="seller_id" class="form-control" value="{{ $vendor->id }}" required>
                                        @endif
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="row">
                            <!-- TRADE LICENSE -->
                            <div class="col-md-6">
                                <form method="POST" action="{{ route('request-document-update') }}" enctype="multipart/form-data">
                                    <!-- CSRF TOKEN -->
                                    @csrf

                                    <!-- INPUT FIELDS -->
                                    <div class="form-group form-control-default">
                                        <!-- LABEL -->
                                        <label for="trdUrl">Trade License</label>

                                        <!-- HIDDEN INPUT -->
                                        <input type="hidden" disabled id="trdUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $vendor->trade_license_url}}">

                                        <!-- PREVIEW BUTTON -->
                                        @if($vendor->trade_license_url)
                                            <button class="btn btn-default" type="button" onclick="showPreview('Trade License','trdUrl')">View <i class="fa fa-file-image-o"></i></button>
                                        @else
                                            <button class="btn btn-default" type="button" disabled>NA <i class="fa fa-file-image-o"></i></button>
                                        @endif

                                        <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                        @if($infoChangeRequest && $infoChangeRequest->trade_license_url !== NULL)
                                            <!-- PREVIEW BUTTON -->
                                            <button class="btn btn-info" type="button" onclick="showPreview('Trade License','newTradeLicenseUrl')">View Pending Trade-License <i class="fa fa-file-image-o"></i></button>
                                            <input type="hidden" disabled id="newTradeLicenseUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $infoChangeRequest->trade_license_url}}">
                                        @else
                                            <!-- UPLOAD NEW TRADE-LICENSE BUTTON -->
                                            <button id="newTradeLicenseUploadBtn" onclick="newFileUpload('newTradeLicenseUploadFileInput');" type="button" class="btn btn-info">Upload New <i class="fa fa-cloud-upload"></i></button>

                                            <!-- CANCEL NEW UPLOAD BUTTON -->
                                            <button id="newTradeLicenseUploadCancelBtn" onclick="cancelNewTradeLicenseUpload();" style="display:none;" type="button" class="btn btn-warning">Reset <i class="fa fa-undo"></i></button>

                                            <!-- REQUEST UPDATE BUTTON -->
                                            <button id="newTradeLicenseUploadSaveBtn" class="btn btn-success" type="submit" style="display: none;">Request Update <i class="fa fa-save"></i></button>

                                            <!-- HIDDEN FILE BROWSER BUTTON -->
                                            <input type="file" id="newTradeLicenseUploadFileInput" name="trade_license" style="visibility:hidden;">

                                            <!-- HIDDEN INPUT FIELD FOR SELLER-ID -->
                                            <input type="hidden" name="seller_id" class="form-control" value="{{ $vendor->id }}" required>
                                        @endif
                                    </div>
                                </form>
                            </div>

                            <!-- CHEQUE -->
                            <div class="col-md-6">
                                <form method="POST" action="{{ route('request-document-update') }}" enctype="multipart/form-data">
                                    <!-- CSRF TOKEN -->
                                    @csrf

                                    <!-- INPUT FIELDS -->
                                    <div class="form-group form-control-default">
                                        <!-- LABEL -->
                                        <label for="chequeUrl">Cheque</label>

                                        <!-- HIDDEN INPUT -->
                                        <input type="hidden" disabled id="chequeUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $vendor->bank_check_url}}">

                                        <!-- PREVIEW BUTTON -->
                                        @if($vendor->bank_check_url)
                                            <button class="btn btn-default" type="button" onclick="showPreview('Cheque','chequeUrl')">View <i class="fa fa-file-image-o"></i></button>
                                        @else
                                            <button class="btn btn-default" type="button" disabled>NA <i class="fa fa-file-image-o"></i></button>
                                        @endif

                                        <!-- SHOW PENDING CHANGE REQUEST IF ANY -->
                                        @if($infoChangeRequest && $infoChangeRequest->bank_check_url !== NULL)
                                            <!-- PREVIEW BUTTON -->
                                            <button class="btn btn-info" type="button" onclick="showPreview('Cheque','newChequeUrl')">View Pending Cheque <i class="fa fa-file-image-o"></i></button>
                                            <input type="hidden" disabled id="newChequeUrl" value="{{ env('AKP_STORAGE') . '/seller_attachments/' . $infoChangeRequest->bank_check_url}}">
                                        @else
                                            <!-- UPLOAD NEW TIN BUTTON -->
                                            <button id="newChequeUploadBtn" onclick="newFileUpload('newChequeUploadFileInput');" type="button" class="btn btn-info">Upload New <i class="fa fa-cloud-upload"></i></button>

                                            <!-- CANCEL NEW UPLOAD BUTTON -->
                                            <button id="newChequeUploadCancelBtn" onclick="cancelNewChequeUpload();" style="display:none;" type="button" class="btn btn-warning">Reset <i class="fa fa-undo"></i></button>

                                            <!-- REQUEST UPDATE BUTTON -->
                                            <button id="newChequeUploadSaveBtn" class="btn btn-success" type="submit" style="display: none;">Request Update <i class="fa fa-save"></i></button>

                                            <!-- HIDDEN FILE BROWSER BUTTON -->
                                            <input type="file" id="newChequeUploadFileInput" name="bank_check" style="visibility:hidden;">

                                            <!-- HIDDEN INPUT FIELD FOR SELLER-ID -->
                                            <input type="hidden" name="seller_id" class="form-control" value="{{ $vendor->id }}" required>
                                        @endif
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                @endif

                <!-- COMMISSION-RATE AND PROMOTER-CLUB-FEE -->
                <div class="row text-center" style="margin-bottom: 5px;">
                    <h4 class="page-section-heading">Commission & Promoter Club Fee</h4>
                    @if(count($categoryList) > 0)
                        <button class="btn btn-warning" type="button" data-toggle="modal" data-target="#modalToSelectNewCat">Add New Category <i class="fa fa-plus-circle"></i></button>
                    @endif
                </div>
                <!-- FORE EACH PRODUCT , RENDER COMMISION-RATE AND PROMOTER-CLUB-FEE INPUT BOX -->
                <table>
                    <thead>
                    <th>Category</th>
                        <th>Commission Rate (%)</th>
                        <th>Promoter Club Fee (%)</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        @foreach($vendor->categories as $key => $catData)
                        <tr>
                            <td> {{ $catData->category->title }} @if($newCat = $vendor->catChangeRequests->where('old_cat',$catData->category_id)->where('status','pending')->first()) <span><font color="red"><b> PENDING CHANGE TO </b> </font>{{ $newCat->newCatDetails->title  }} </span> @endif </td>
                            <td> {{ $vendor->commission()->where('category_id',$catData->category->id)->first()->commission_rate ?? 0 }} </td>
                            <td> {{ $vendor->commission()->where('category_id',$catData->category->id)->first()->promoter_club_fee ?? 0 }} </td>
                            <td>
                                @if(!$vendor->catChangeRequests->where('old_cat',$catData->category_id)->where('status','pending')->first())
                                    <button class="btn btn-success" type="button" onclick="showEditCatModal( {{ $catData->category_id }} )">Edit</button>
                                @endif
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>

                @if($vendor->categoryRequests->where('status', 'pending')->isNotEmpty())
                    <!-- REQUESTED CATEGORIES -->
                    <div class="row text-center" style="margin-bottom: 5px;">
                        <h4 class="page-section-heading"><font color="blue">Pending Categories</font></h4>
                    </div>
                    <!-- FORE EACH PRODUCT , RENDER COMMISION-RATE AND PROMOTER-CLUB-FEE INPUT BOX -->
                    <table>
                        <thead>
                        <th>Category</th>
                            <th>Commission Rate (%)</th>
                            <th>Promoter Club Fee (%)</th>
                        </thead>
                        <tbody>
                            @foreach($vendor->categoryRequests->where('status', 'pending') as $key => $requestedCat)
                            {{-- {{$vendor->categoryRequests}} --}}
                            <tr>
                                {{-- <td> {{ $requestedCat->category->title }} </td> --}}
                                <td> SUBJECT TO APPROVAL </td>
                                <td> SUBJECT TO APPROVAL </td>
                                <td> SUBJECT TO APPROVAL </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                @endif
            </div>
        </div>
    </div>


    <!-- MODAL TO REQUEST NEW CATEGORY -->
    <div class="modal slide-up fade" id="modalToSelectNewCat">
        <div class="modal-dialog">
            <div class="v-cell">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"></button>
                        <h4 class="modal-title">Add New Category</h4>
                    </div>
                    <div class="modal-body">
                        <select data-placeholder="Select New Category (You Can Select Multiple)" id="productCatSelection" class="form-input chosen-select col-md-12" multiple>
                            <option value=""></option>
                            @foreach($categoryList as $key => $data)
                                <option value="{{ $data->id }}">{{ $data->title }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="requestNewCategory();">Save</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL TO UPDATE OLD CATEGORY -->
    <div class="modal slide-up fade" id="modalToEditCat">
        <div class="modal-dialog">
            <div class="v-cell">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"></button>
                        <h4 class="modal-title">Edit Category</h4>
                    </div>
                    <div class="modal-body">
                        <select data-placeholder="Select another category" id="editedCat" class="form-input chosen-select col-md-12">
                            <option value=""></option>
                            @foreach($categoryList as $key => $data)
                                <option value="{{ $data->id }}">{{ $data->title }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="requestCategoryUpdate();">Update</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
<script type="text/javascript" src="{{ asset('chosen/chosen.jquery.js') }}"></script>

<script>
    //INITIATE CHOSEN COMPONENTS
    $('#modalToSelectNewCat').on('shown.bs.modal', function () {
        $('.chosen-select', this).chosen();
    });

    $('#modalToEditCat').on('shown.bs.modal', function () {
        $('.chosen-select', this).chosen();
    });

    function newFileUpload(fileInputId){
        $(`#${fileInputId}`).trigger('click');
    }

    /** PHOTO CHANGE HANDLER */
        $("#newPhotoUploadFileInput").change(function() {
            if(this.files.length > 0)
            {
                var file = this.files[0];
                if(file.name.length > 30) $( "#newPhotoUploadBtn" ).html( file.name.substr(0,30) + '...' + file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2) );
                else $( "#newPhotoUploadBtn" ).html( file.name );
                $('#newPhotoUploadCancelBtn').show();
                $('#newPhotoUploadSaveBtn').show();
            }
            else
            {
                $('#newPhotoUploadSaveBtn').hide();
                $( "#newPhotoUploadBtn" ).html( 'Upload New <i class="fa fa-cloud-upload"></i>' );
                $('#newPhotoUploadCancelBtn').hide();
            }
        });

        function cancelNewPhotoUpload(){
            $('#newPhotoUploadFileInput').val('');
            $( "#newPhotoUploadBtn" ).html( 'Upload New <i class="fa fa-cloud-upload"></i>' );
            $('#newPhotoUploadCancelBtn').hide();
            $('#newPhotoUploadSaveBtn').hide();
        }
    /** */

    /** NID CHANGE HANDLER */
        $("#newNidUploadFileInput").change(function() {
            if(this.files.length > 0)
            {
                var file = this.files[0];
                if(file.name.length > 30) $( "#newNidUploadBtn" ).html( file.name.substr(0,30) + '...' + file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2) );
                else $( "#newNidUploadBtn" ).html( file.name );
                $('#newNidUploadCancelBtn').show();
                $('#newNidUploadSaveBtn').show();
            }
        });

        function cancelNewNidUpload(){
            $('#newNidUploadFileInput').val('');
            $( "#newNidUploadBtn" ).html( 'Upload New <i class="fa fa-cloud-upload"></i>' );
            $('#newNidUploadCancelBtn').hide();
            $('#newNidUploadSaveBtn').hide();
        }
    /** */

    /** TIN CHANGE HANDLER */
        $("#newTinUploadFileInput").change(function() {
            if(this.files.length > 0)
            {
                var file = this.files[0];
                if(file.name.length > 30) $( "#newTinUploadBtn" ).html( file.name.substr(0,30) + '...' + file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2) );
                else $( "#newTinUploadBtn" ).html( file.name );
                $('#newTinUploadCancelBtn').show();
                $('#newTinUploadSaveBtn').show();
            }
        });

        function cancelNewTinUpload(){
            $('#newTinUploadFileInput').val('');
            $( "#newTinUploadBtn" ).html( 'Upload New <i class="fa fa-cloud-upload"></i>' );
            $('#newTinUploadCancelBtn').hide();
            $('#newTinUploadSaveBtn').hide();
        }
    /** */

    /** GST CHANGE HANDLER */
        $("#newGstUploadFileInput").change(function() {
            if(this.files.length > 0)
            {
                var file = this.files[0];
                if(file.name.length > 30) $( "#newGstUploadBtn" ).html( file.name.substr(0,30) + '...' + file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2) );
                else $( "#newGstUploadBtn" ).html( file.name );
                $('#newGstUploadCancelBtn').show();
                $('#newGstUploadSaveBtn').show();
            }
        });

        function cancelNewGstUpload(){
            $('#newGstUploadFileInput').val('');
            $( "#newGstUploadBtn" ).html( 'Upload New <i class="fa fa-cloud-upload"></i>' );
            $('#newGstUploadCancelBtn').hide();
            $('#newGstUploadSaveBtn').hide();
        }
    /** */

    /** TRADE-LICENSE CHANGE HANDLER */
        $("#newTradeLicenseUploadFileInput").change(function() {
            if(this.files.length > 0)
            {
                var file = this.files[0];
                if(file.name.length > 30) $( "#newTradeLicenseUploadBtn" ).html( file.name.substr(0,30) + '...' + file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2) );
                else $( "#newTradeLicenseUploadBtn" ).html( file.name );
                $('#newTradeLicenseUploadCancelBtn').show();
                $('#newTradeLicenseUploadSaveBtn').show();
            }
        });

        function cancelNewTradeLicenseUpload(){
            $('#newTradeLicenseUploadFileInput').val('');
            $( "#newTradeLicenseUploadBtn" ).html( 'Upload New <i class="fa fa-cloud-upload"></i>' );
            $('#newTradeLicenseUploadCancelBtn').hide();
            $('#newTradeLicenseUploadSaveBtn').hide();
        }
    /** */

    /** CHEQUE CHANGE HANDLER */
        $("#newChequeUploadFileInput").change(function() {
            if(this.files.length > 0)
            {
                var file = this.files[0];
                if(file.name.length > 30) $( "#newChequeUploadBtn" ).html( file.name.substr(0,30) + '...' + file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2) );
                else $( "#newChequeUploadBtn" ).html( file.name );
                $('#newChequeUploadCancelBtn').show();
                $('#newChequeUploadSaveBtn').show();
            }
        });

        function cancelNewChequeUpload(){
            $('#newChequeUploadFileInput').val('');
            $( "#newChequeUploadBtn" ).html( 'Upload New <i class="fa fa-cloud-upload"></i>' );
            $('#newChequeUploadCancelBtn').hide();
            $('#newChequeUploadSaveBtn').hide();
        }
    /** */

    //ON PAGE LOAD
    $(document).ready( function(){
        //SET CITY DROPDOWN
        setCityDropdown();
    });

    //WHEN COUNTRY IS CHANGED, UPDATE DATA PROVIDER FOR CITY DROPDOWN
    $("#country").on("change", function (e) {
        let countryId = $(this).select2('data').id;
        setCityDropdown(countryId);
    });

    //THIS FUNCTION SETS DATA PROVIDER FOR CITY DROPDOWN AND SETS SELECTED VALUE
    function setCityDropdown(countryId = null){
        let ajaxUrl;
        if(countryId === null)
        {
            ajaxUrl = "{{ route('cities-for-country', ['countryId' => $vendor->country_id]) }}";
            $.ajax({
                type: "GET",
                url: ajaxUrl,
                success: function( data ) {
                $("#city").select2({
                    placeholder: 'Select city ..',
                    allowClear: false,
                    data: JSON.parse(data) ,
                }).val("{{ $vendor->city_id }}").trigger('change');
                }
            });
        }
        else
        {
            ajaxUrl = "{{ route('cities-for-country', ['countryId' => 'COUNTRY_ID']) }}";
            ajaxUrl = ajaxUrl.replace("COUNTRY_ID",countryId);
            $.ajax({
                type: "GET",
                url: ajaxUrl,
                success: function( data ) {
                $("#city").select2({
                    placeholder: 'Select city ..',
                    allowClear: false,
                    data: JSON.parse(data) ,
                }).trigger('change');
                }
            });
        }



    }

    //FUNCTION TO PRINT VENDOR-DETAILS
    function printDetails(){
        $("#printable").printThis({
            importStyle: true,
            beforePrint: function(){
                $('.nonPrintables').hide();
            },
            afterPrint: function(){
                $('.nonPrintables').show();
            }
        });
    }

    //FUNCTION TO PREVIEW ATTACHMENT FILES i.e: photo, nid, tin etc
    function showPreview(title, contentUrlHolder){
        //CHECK IF FILE IS PDF OR IMAGE
        var fileUrl = $(`#${contentUrlHolder}`).val();
        var extension = fileUrl.substr( (fileUrl.lastIndexOf('.') +1) );

        //IF FILE IS PDF, OPEN IN NEW TAB
        if(extension=="pdf" || extension=="PDF")
        {
            window.open($(`#${contentUrlHolder}`).val(), '_blank');
        }
        //IF IMAGE, OPEN IN MODAL PREVIEW
        else
        {
            $.confirm({
                title: `${title}`,
                content: '' +
                    '<div><img id="imageDisplay" style="border: solid 1px #ddd;\n' +
                    '    margin-bottom: 10px;\n' +
                    '    border-radius: 4px;" src="" alt=""></div>' +
                    '',
                animation: 'scale',
                animationClose: 'top',
                closeIcon: true,
                backgroundDismiss: true,
                theme: 'material',
                boxWidth: '85%',
                useBootstrap: false,
                buttons:[],
                onContentReady: function(){
                    $('#imageDisplay').attr('src', fileUrl);
                }
            });
        }
    }


    function requestNewCategory(){
        //VALIDATE INPUT
        var validRequest = true;
        if($("#productCatSelection").chosen().val() === null)
        {
            validRequest = false;

            $.alert({
                type: 'red',
                icon: 'fa fa-warning',
                title: 'Warning',
                content: '<div class="text-center">No category is selected</div>',
                buttons:[],
                closeIcon: true,
            });
        }


        if(validRequest){
            var waitPopUp;
            $.ajax({
                type: "GET",
                url: "{{ route('request-new-category') }}",
                data: {'categories[]': $("#productCatSelection").chosen().val()},
                method: 'POST',
                beforeSend: function(){
                    waitPopUp = $.alert({
                        title: '',
                        content: '<div class="text-center"><i class="fa fa-spinner fa-spin"></i></div>',
                        buttons:[],
                        closeIcon: false,
                    });
                },
                success: function( data ) {
                    console.log(data);
                    if(data.status == 1)
                    {
                        waitPopUp.close();
                        location.reload();
                    }
                    else
                    {
                        waitPopUp.close();
                        $.alert({title:'Warning',content:'Something went wrong, please try again later',icon: 'fa fa-warning',type:'red'});
                    }
                },
                error: function(data){
                    waitPopUp.close();
                    $.alert({title:'Warning',content:'Something went wrong, please try again later',icon: 'fa fa-warning',type:'red'});
                }
            });
        }
    }


    var currentCatId = "";
    function showEditCatModal(catId){
        currentCatId = catId;
        $("#modalToEditCat").modal('show');
    }

    function requestCategoryUpdate(){
        //GRAB NEW CATEGORY
        let newCatId = $("#editedCat").val();

        var validRequest = true;
        //VERIFY CATEGORY SELECTION
        if(newCatId === null)
        {
            validRequest = false;

            $.alert({
                type: 'red',
                icon: 'fa fa-warning',
                title: 'Warning',
                content: '<div class="text-center">No category is selected</div>',
                buttons:[],
                closeIcon: true,
            });
        }

        //VALIDATE INPUT
        var validRequest = true;
        if(newCatId == currentCatId)
        {
            validRequest = false;

            $.alert({
                type: 'red',
                icon: 'fa fa-warning',
                title: 'Warning',
                content: '<div class="text-center">No change is detected</div>',
                buttons:[],
                closeIcon: true,
            });
        }


        if(validRequest)
        {
            var waitPopUp;
            $.ajax({
                type: "GET",
                url: "{{ route('request-category-change') }}",
                data: {'old_cat': currentCatId, 'new_cat': newCatId},
                method: 'POST',
                beforeSend: function(){
                    waitPopUp = $.alert({
                        title: '',
                        content: '<div class="text-center"><i class="fa fa-spinner fa-spin"></i></div>',
                        buttons:[],
                        closeIcon: false,
                    });
                },
                success: function( data ) {
                    console.log(data);
                    if(data.status == 1)
                    {
                        waitPopUp.close();
                        location.reload();
                    }
                    else
                    {
                        waitPopUp.close();
                        $.alert({title:'Warning',content:'Something went wrong, please try again later',icon: 'fa fa-warning',type:'red'});
                    }
                },
                error: function(data){
                    waitPopUp.close();
                    $.alert({title:'Warning',content:'Something went wrong, please try again later',icon: 'fa fa-warning',type:'red'});
                }
            });
        }

    }
</script>
@endsection