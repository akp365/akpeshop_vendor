<!DOCTYPE html>
<html class="st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>AKP-VENDOR</title>

    <link href="{{ URL::asset('admin_assets/css/vendor/all.css') }}" rel="stylesheet">
    <link href="{{ URL::asset('admin_assets/css/app/app.css') }}" rel="stylesheet">

    <!-- POP UP LIBRARY CSS -->
    <link rel="stylesheet" href="{{ asset('jquery_confirm/jquery-confirm.min.css') }}">

    <!-- SUMMERNOTE CSS -->
    <link href="{{ asset('summernote/summernote-lite.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    @stack('styles')
</head>

<body>

    <!-- Wrapper required for sidebar transitions -->
    <div class="st-container">

        <!-- Fixed navbar -->
        <div class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="#sidebar-menu" data-toggle="sidebar-menu" data-effect="st-effect-3"
                        class="toggle pull-left visible-xs"><i class="fa fa-bars"></i></a>
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="{{ route('my-info') }}" class="navbar-brand hidden-xs navbar-brand-primary">AKP Vendor</a>
                </div>
                <div class="navbar-form navbar-left hidden-xs text-center">@yield('page_title')</div>
                <div class="navbar-collapse collapse" id="collapse">
                    <ul class="nav navbar-nav navbar-right">

                        <!-- notifications -->
                        <li class="dropdown notifications updates hidden-xs hidden-sm">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-file-video-o"></i>
                                <span class="badge badge-primary">0</span>
                            </a>
                            <ul class="dropdown-menu" role="notification">
                                <li class="dropdown-header">Notifications</li>
                                <li class="media">
                                    <div class="pull-right">
                                        <span class="label label-success">New</span>
                                    </div>
                                    <div class="media-left">
                                        <img src="" alt="people" class="img-circle" width="30">
                                    </div>
                                    <div class="media-body">
                                        <a href="#">Name</a> added <a href="">Text</a>.
                                        <br />
                                        <!-- <span class="text-caption text-muted">5 mins ago</span> -->
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <!-- // END notifications -->


                        <!-- user -->
                        <li class="dropdown user">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="{{ URL::asset('admin_assets/images/people/110/guy-6.jpg') }}" alt=""
                                    class="img-circle" /> {{ Auth::user()->name }}<span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ route( 'logout' ) }}"><i class="fa fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                        <!-- // END user -->

                    </ul>
                </div>
            </div>
        </div>

        <!-- content push wrapper -->
        <div class="st-pusher">
            <!-- Sidebar component with st-effect-3 (set on the toggle button within the navbar) -->
            <div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-skin-blue sidebar-visible-desktop"
                id=sidebar-menu data-type=collapse>
                <div class="split-vertical">
                    <div class="split-vertical-body">
                        <div class="split-vertical-cell">
                            <div data-scrollable>

                                <!-- DASHBOARD -->
                                <ul class="sidebar-menu sm-icons-right sm-icons-block">
                                    <li class="@if(Route::currentRouteName() == 'my-info') active @endif"><a
                                            href="{{ route('my-info') }}"><i class="fa fa-home"></i> <span>My
                                                Info</span></a></li>
                                </ul>

                                <!-- CHANGE LOG -->
                                <ul class="sidebar-menu sm-icons-right sm-icons-block">
                                    <li class="@if(Route::currentRouteName() == 'my-change-history') active @endif"><a
                                            href="{{ route('my-change-history') }}"><i class="fa fa-refresh"></i>
                                            <span>My Change History</span></a></li>
                                </ul>

                                <!-- ADD NEW PRODUCT -->
                                <ul class="sidebar-menu sm-icons-right sm-icons-block">
                                </ul>

                                <!-- PRODUCTS -->
                                <ul class="sidebar-menu sm-bordered sm-active-item-bg">
                                    <li
                                        class="hasSubmenu {{ in_array(Route::currentRouteName(), array( 'add-new-product' , 'product-list', 'product-details' )) ? 'open' : ''}}">
                                        <a href="#submenu-products"
                                            aria-expanded="{{ in_array(Route::currentRouteName(), array( 'add-new-product' , 'product-list', 'product-details')) ? 'true' : 'false' }}"></i>
                                            <span>Products</span></a>
                                        <ul id="submenu-products"
                                            aria-expanded="{{ in_array(Route::currentRouteName(), array( 'add-new-product' , 'product-list', 'product-details')) ? 'true' : 'false' }}"
                                            class="{{ in_array(Route::currentRouteName(), array( 'add-new-product' , 'product-list', 'product-details')) ? 'in' : '' }}">
                                            <li
                                                class="@if(Route::currentRouteName() == 'add-new-product') active @endif">
                                                <a href="{{ route('add-new-product') }}"><i class="fa fa-plus"></i>
                                                    <span>Add Product</span></a></li>
                                            <li
                                                class="{{ in_array( Route::currentRouteName(), array( 'product-details' , 'product-list' ) ) ? 'active' : ''}}">
                                                <a href="{{ route('product-list') }}"><i class="fa fa-list"></i>
                                                    <span>Product List</span></a></li>
                                        </ul>
                                    </li>
                                </ul>

                                <ul class="sidebar-menu sm-icons-right sm-icons-block">
                                    <li class="@if(Route::currentRouteName() == 'order') active @endif"><a
                                            href="{{ route('order') }}"><i class="fa fa-gear"></i> <span>Manage
                                                Order</span></a></li>
                                </ul>

                                <ul class="sidebar-menu sm-icons-right sm-icons-block">
                                    <li class="@if(Route::currentRouteName() == 'order') active @endif"><a
                                            href="{{ route('order') }}"> <span>Withdraw </span></a></li>
                                </ul>

                                <!-- STORE LOOKS -->
                                <ul class="sidebar-menu sm-icons-right sm-icons-block">
                                    <li class="@if(Route::currentRouteName() == 'store-looks') active @endif"><a
                                            href="{{ route('store-looks') }}"><i class="fa fa-gear"></i> <span>Store
                                                Looks</span></a></li>
                                </ul>

                                <!-- STORE LOOKS -->
                                <ul class="sidebar-menu sm-icons-right sm-icons-block">
                                    <li class="@if(Route::currentRouteName() == 'shipping-fee') active @endif"><a
                                            href="{{ route('shipping-fee') }}"><i class="fa fa-gear"></i> <span>Shipping
                                                Fee Setting</span></a></li>
                                </ul>


                            </div>
                        </div>
                        <!-- // END .split-vertical-cell -->
                    </div>
                    <!-- // END .split-vertical-body -->
                </div>
            </div>

            <div class="st-content" id="content">
                <div class="st-content-inner">
                    <div class="container-fluid">
                        <!-- ALERT SECTION -->
                        <div class="row" style="text-align:center;">
                            <!-- SHOW VALIDATION ERRORS IF ANY -->
                            @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                            @endif

                            @if (Session::has('message'))
                            <div class="alert alert-success">{{ Session::get('message') }}</div>
                            @endif

                            @if (session('error'))
                            <div class="alert alert-danger">{{ session('error') }}</div>
                            @endif
                        </div>

                        @yield('content')
                    </div>
                    <!-- /container-fluid -->
                </div>
                <!-- /st-content-inner -->
            </div>
            <!-- /st-content -->
            <!-- Footer -->
            <footer class="footer">
                <strong>AKP Vendor</strong> v1.0.0 &copy; Copyright {{ date('Y') }}
            </footer>
            <!-- // Footer -->

        </div>
        <!-- /st-container -->


        <!-- Inline Script for colors and config objects; used by various external scripts; -->
        <script>
            var colors = {
                "danger-color": "#e74c3c",
                "success-color": "#81b53e",
                "warning-color": "#f0ad4e",
                "inverse-color": "#2c3e50",
                "info-color": "#2d7cb5",
                "default-color": "#6e7882",
                "default-light-color": "#cfd9db",
                "purple-color": "#9D8AC7",
                "mustard-color": "#d4d171",
                "lightred-color": "#e15258",
                "body-bg": "#f6f6f6"
            };
            var config = {
                theme: "admin",
                skins: {
                    "default": {
                        "primary-color": "#3498db"
                    }
                }
            };
        </script>
        <script src="{{ URL::asset('admin_assets/js/vendor/all.js') }}"></script>
        <script src="{{ URL::asset('admin_assets/js/app/app.js') }}"></script>
        <script src="{{ asset('admin_assets/js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.js') }}"></script>
        <script
            src="{{ asset('admin_assets/js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.extensions.js') }}"></script>
        <script
            src="{{ asset('admin_assets/js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.services.js') }}"></script>
        <script
            src="{{ asset('admin_assets/js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.microdata.js') }}"></script>
        <script
            src="{{ asset('admin_assets/js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.microformat.js') }}"></script>
        <script
            src="{{ asset('admin_assets/js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.overlays.js') }}"></script>
        <script src="{{ asset('admin_assets/js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.rdfa.js') }}"></script>

        <!-- POP UP LIBRARY JS -->
        <script src="{{ asset('jquery_confirm/jquery-confirm.min.js') }}"></script>

        <!-- JQUERY FORM VALIDATION -->
        <script src="{{ asset('jquery_validate/jquery.validate.min.js') }}"></script>

        <!-- SUMMERNOTE JS -->
        <script src="{{ asset('summernote/summernote-lite.js') }}"></script>

        <!-- PRINT PLUGIN -->
        <script src="{{ asset('admin_assets/js/printThis.js') }}"></script>
        <script>
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        </script>
        @yield('scripts')
</body>

</html>