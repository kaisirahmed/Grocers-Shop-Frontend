<template>
	<footer>
        <div class="container">
            <div class="row footer-primary clearfix   mb20 ">
                <div class="col-lg-3 col-sm-6 xs-mb30">
                    <div class="logo">
                        <router-link :to="`/`">
                            <img src="assets/images/logo/footerLogo.png" alt="logo" class="img-fluid">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 xs-mb30">
                    <div class="footer-menu">
                        <h4>Quick Links</h4>
                        <ul>
                            <!-- it's coming from hlpers  in app/helpers/helpers -->
                            <li><a href="#"><i class='lni lni-chevron-right'></i> Privacy</a></li>
                            <li>
                                <router-link :to="`/faq`">
                                    <a href="#"><i class='lni lni-chevron-right'></i>FAQ</a>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 xs-mb30">
                    <div class="footer-menu">
                        <h4>Individual user</h4>
                        <ul>
                            <li><a href="#"><i class='lni lni-chevron-right'></i> Sign in</a></li>
                            <li><a href="#"><i class='lni lni-chevron-right'></i> Sign u</a></li>
                            <li><a href="#"><i class='lni lni-chevron-right'></i> Track Your Orde</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 xs-mb30">
                    <div class="footer-menu contact-info">
                        <h4>Contact Us</h4>
                        <ul>
                            <li class="telephone"> <i class='lni lni-mobile'></i> 01717438082</li>
                            <li class="address"> <i class="lni lni-direction"></i> Dhaka-1205</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <div class="footer-secondary  p30" style="background-color:#F8F8F8;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-sm-12 xs-mb30">
                        <div class="social-icons ">
                            <ul>
                                <li><a href="https://facebook.com"><i class="lni-facebook-filled"></i></a></li>
                                <li><a href="https://twitter.com"><i class="lni-twitter-filled"></i></a></li>
                                <li><a href="https://youtube.com"><i class="lni-youtube"></i></a></li>
                                 
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12 col-xs-12">
                        <div class="footer-copyright text-r xs-text-c">
                            <span>2020 all right reserve by@Arlendevs.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>