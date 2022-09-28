/*
Xebra solutions

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/
*/ 

var XPortal = window.XPortal || {};

(function XPortalScope($) {


	// GLOBAL VARIABLES
    var users;
    var certificates;
    var loggedInUser;
    // Global variable object/JSON with transactions
    var transaction_results;
    var new_signature;
	// END GLOBAL VARIABLES
	
    $(function onLoad() {
        // check if the user is logged in
        if(!_config.ignoreLogin) {
            XebraAuth.authToken().then(result => {
                if (result === null) {
                    alert("An error occurred loading page. Please refresh page.");
                    return;
                }
                console.log('token', result)

                loggedInUser = parseJwt(result);
                startLoadingSpinner();
                getCurrentAuthenticatedUser();
                stopLoadingSpinner();

                var isAdmin = (loggedInUser.hasOwnProperty("cognito:groups") && 
                    loggedInUser['cognito:groups'].length>0 &&
                    loggedInUser['cognito:groups'].indexOf("CognitoAdmins")>=0 )
                    ? true : false;

                loadPage(isAdmin);
            }).catch((err) => {
                console.log(err)
                alert('Session expired. Please log in');
                window.location.href = "login.html"
                });
        }
        // create all handles
        $('#logout').click(logout);

    });
	
    $("#new-account").submit(function(event){
        console.log(event);
        event.preventDefault();
    });

    if($("#inputFileNewUser").length >0){
        document.getElementById("inputFileNewUser").onchange = function readURL(input) {
            var inputReader = input.currentTarget;
            if(inputReader != undefined){
                $('#userSignDisplay').show();
                if (inputReader.files && inputReader.files[0]) {
                    var reader = new FileReader();
        
                    reader.onload = function (e) {
                        new_signature = e.target.result;
                        $('#userSignDisplay')
                            .attr('src', e.target.result);
                    };
        
                    reader.readAsDataURL(inputReader.files[0]);
                    $('#userSignature').hide();
                }
            }
        };
    }
    if($("#inputFileNewUser").length >0){
        document.getElementById("inputFileEditUser").onchange = function readURL(input) {
            var inputReader = input.currentTarget;
            if(inputReader != undefined){
                $('#userSignDisplayEdit').show();
                if (inputReader.files && inputReader.files[0]) {
                    var reader = new FileReader();
        
                    reader.onload = function (e) {
                        new_signature = e.target.result;
                        $('#userSignDisplayEdit')
                            .attr('src', e.target.result);
                    };
        
                    reader.readAsDataURL(inputReader.files[0]);
                    $('#userSignatureEdit').hide();
                }
            }
        };
    }

    $(document).on("click", ".add-new-modal", function(){
        if($("#group-selection").length >0)
            if( $('#group-selection').val()!== "" && $('#group-selection').val().toUpperCase() == "AGENT"){
                $('.signature').show();
                return;
            }
            $('.signature').hide();
    });
    // transforms the attributes object as an object for better search
    function tranformUserObject(user){

        if(user){
            for(let attribute in user.Attributes){
                user[user.Attributes[attribute].Name] = user.Attributes[attribute].Value;
            }
        }
        return user;
    }

    function clearNewMobileForm(){
        $('#new-mob-user-form')[0].reset();
    }

    function clearUploadSchubergForm() {
        $('#upload-schuberg-cert-form')[0].reset();
    }

    function clearEditMobileForm() {
        $('#edit-mob-user-form')[0].reset();
    }

    function clearEditAdminForm() {
        $('#edit-admin-user-form')[0].reset();
        new_signature="";
        document.getElementById('userSignDisplayEdit').src = "#";
        $('#userSignDisplayEdit').hide();
        $('#userSignatureEdit').show();
    }


    function clearNewAdminForm(){
        $('#new-admin-user-form')[0].reset();
        new_signature="";
        document.getElementById('userSignDisplay').src = "#";
        $('#userSignDisplay').hide();
        $('#userSignature').show();
    }

    function createUserTransformBody()
    {
        // set all the parameters received by the request accordingly
        var newBody;
        var attributes = [];
        attributes.push({"Name": "email", "Value":body.email});
        attributes.push({"Name": "email", "Value":body.email});
        attributes.push({"Name": "email", "Value":body.email});
        attributes.push({"Name": "email", "Value":body.email});
        attributes.push({"Name": "email", "Value":body.email})
    }

    function startLoadingSpinner(){
        // Start the loading spinner
        $.preloader.start({
            modal : true,
            src : 'sprites1.png',
            width : 64,
            height : 64,
            frames : 12
        });
    }

    function stopLoadingSpinner(){
        // Stop the loading spinner
        $.preloader.stop();
    }

    function handleNewReferral(event){
        event.preventDefault();
        // disable buttons
        $('#new-referral-form-btn-submit').button('loading');
        $('#new-referral-form-btn-cancel').addClass('disabled');
        $('#new-referral-form-btn-reset').addClass('disabled');
        
        let userId = getUrlVars()["uid"];
        let user = tranformUserObject(JSON.parse(localStorage.getItem("users")).Users[userId]);
        let user_sub = user.Username;
        let amsno = user["custom:amsno"];
        let family_name = user.family_name;
        let given_name = user.given_name;
        let full_name = given_name + ' ' + family_name;
        let email = user.email;

        var reqBody = {};

        var fn = $('#full_name').val();
        var em = $('#email').val();
        var ph = $('#mobile_phone').val();
        var ser = $('#service_requested').val();

        var referee = {
            "full_name":fn,
            "email":em,
            "mobile_phone":ph,
            "service":ser,
            "date_referred":new Date(),
            "status":"pending",
            "user_sub": user_sub
        };

        var referrer = {
            "full_name": full_name,
            "email":email,
            "ams_account_no": amsno,
            "user_sub": user_sub
        };

        reqBody["referee"]=referee;
        reqBody["referrer"]=referrer;

        console.log(reqBody);

        XebraAuth.createReferral(reqBody).then((data) => {
            if (data == null) {
                alert("An issue occurred creating user.");
                return;
            }
            alert("New Referral Created!");
            $('#new-referral-form-btn-submit').button('reset');
            $('#new-referral-form-btn-cancel').removeClass('disabled');
            $('#new-referral-form-btn-reset').removeClass('disabled');
            $('#addReferral').modal('hide');
            location.reload();
        }).catch((err) => {
            $('#new-referral-form-btn-submit').button('reset');
            $('#new-referral-form-btn-cancel').removeClass('disabled');
            $('#new-referral-form-btn-reset').removeClass('disabled');

            if (err.status == 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing edit user.");
        })
    }

    function handleNewMobileUser(event){
        event.preventDefault();

        // disable buttons
        $('#new-mob-user-form-btn-submit').button('loading');
        $('#new-mob-user-form-btn-cancel').addClass('disabled');
        $('#new-mob-user-form-btn-reset').addClass('disabled');
        
        // create request
        var reqBody = {};
        // TODO: Do field form validation
        //

        var an = $('#amsno').val();
        var pu = $('#amsno').val();
        var ga = $('#is_schuberg').prop('checked').toString();
        var dba = $('#is_dba').prop('checked').toString();
        var em = $('#email').val().toLowerCase();
        var mb = $('#mobile_phone').val();
        var fn = $('#given_name').val();
        var mn = $('#middle_name').val();
        var ln = $('#family_name').val();
        var sa = $('#address_street').val();
        var ci = $('#address_city').val();
        var st = $('#address_state option:selected').val();
        var zc = $('#address_zipcode').val();
        var co = $('#company').val();

        reqBody["Username"] = em;
        var attr = [];

        attr.push({ "Name": "email", "Value": em });
        attr.push({ "Name": "preferred_username", "Value": pu.toString() });
        attr.push({ "Name": "custom:mobile_phone", "Value": mb });
        attr.push({"Name":"given_name", "Value": fn});
        attr.push({ "Name": "family_name", "Value": ln });
        if(mn != "")
            attr.push({ "Name": "middle_name", "Value": mn });
        attr.push({"Name":"custom:amsno", "Value": an });
        attr.push({"Name":"custom:is_schuberg", "Value": ga });
        attr.push({"Name":"custom:is_dba", "Value": dba });
        attr.push({"Name":"custom:address_street", "Value": sa});
        attr.push({"Name":"custom:address_city", "Value": ci});
        attr.push({"Name":"custom:address_state", "Value": st});
        attr.push({"Name":"custom:address_zipcode", "Value": zc });
        if (co != "")
            attr.push({"Name":"custom:company", "Value": co});
        reqBody["UserAttributes"] = attr;
        XebraAuth.createMobileUser(reqBody).then((userCreated) => {
            if(userCreated == null){
                alert("An issue occurred creating user.");

                // enable buttons
                $('#new-mob-user-form-btn-submit').button('reset');
                $('#new-mob-user-form-btn-cancel').removeClass('disabled');
                $('#new-mob-user-form-btn-reset').removeClass('disabled');

                return;
            }
            alert("User Created!")

            // enable buttons
            $('#new-mob-user-form-btn-submit').button('reset');
            $('#new-mob-user-form-btn-cancel').removeClass('disabled');
            $('#new-mob-user-form-btn-reset').removeClass('disabled');
            $('#addUser').modal('hide');

            location.reload();
        }).catch((err) => {
            // enable buttons
            $('#new-mob-user-form-btn-submit').button('reset');
            $('#new-mob-user-form-btn-cancel').removeClass('disabled');
            $('#new-mob-user-form-btn-reset').removeClass('disabled');

            if (err.status === 400 || err.status === 409) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing new user.");
        })
    }

    function handleEditMobileUser(event) {
        event.preventDefault();
        // create request
        var reqBody = {};
        // TODO: Do field form validation
        //

        // disable buttons
        $('#edit-mob-user-form-btn-submit').button('loading');
        $('#edit-mob-user-form-btn-cancel').addClass('disabled');

        var an = $('#amsno_edit').val();
        var pu = $('#amsno_edit').val();
        var ga = $('#is_schuberg_edit').prop('checked').toString();
        var dba = $('#is_dba_edit').prop('checked').toString();
        var em = $('#email_edit').val().toLowerCase();
        var cem = $('#current_email_edit').val().toLowerCase();
        var mb = $('#mobile_phone_edit').val();
        var fn = $('#given_name_edit').val();
        var mn = $('#middle_name_edit').val();
        var ln = $('#family_name_edit').val();
        var sa = $('#address_street_edit').val();
        var ci = $('#address_city_edit').val();
        var st = $('#address_state_edit option:selected').val();
        var zc = $('#address_zipcode_edit').val();
        var co = $('#company_edit').val();

        reqBody["Username"] = cem;
        var attr = [];

        attr.push({ "Name": "email", "Value": em });
        attr.push({ "Name": "preferred_username", "Value": pu.toString() });
        attr.push({ "Name": "custom:mobile_phone", "Value": mb });
        attr.push({ "Name": "given_name", "Value": fn });
        attr.push({ "Name": "family_name", "Value": ln });
        attr.push({ "Name": "middle_name", "Value": mn });
        attr.push({ "Name": "custom:amsno", "Value": an });
        attr.push({ "Name": "custom:is_schuberg", "Value": ga });
        attr.push({ "Name": "custom:is_dba", "Value": dba });
        attr.push({ "Name": "custom:address_street", "Value": sa });
        attr.push({ "Name": "custom:address_city", "Value": ci });
        attr.push({ "Name": "custom:address_state", "Value": st });
        attr.push({ "Name": "custom:address_zipcode", "Value": zc });
        attr.push({ "Name": "custom:company", "Value": co });
        reqBody["UserAttributes"] = attr;
        XebraAuth.updateMobileUser(reqBody).then((userCreated) => {
            if (userCreated == null) {
                //enable buttons
                $('#edit-mob-user-form-btn-submit').button('reset');
                $('#edit-mob-user-form-btn-cancel').removeClass('disabled');

                alert("An issue occurred creating user.");
                return;
            }
            alert("User Updated!")
            // not needed since we are refreshing page
            // clearNewMobileForm();
            // close the modal and refresh page

            //enable buttons
            $('#edit-mob-user-form-btn-submit').button('reset');
            $('#edit-mob-user-form-btn-cancel').removeClass('disabled');

            $('#editUser').modal('hide');
            if(window.location.search === ""){
                window.location.href += "?filterId=" + em;
            }
            else{
                location.reload();
            }
        }).catch((err) => {
            //enable buttons
            $('#edit-mob-user-form-btn-submit').button('reset');
            $('#edit-mob-user-form-btn-cancel').removeClass('disabled');

            if (err.status == 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing edit user.");
        })
    }

    if($("#group-selection").length >0){
        $(document).on('change',"#group-selection", function() { 
            if( $(this).val().toUpperCase() === "AGENT")
                $('.signature').show();
            else
                $('.signature').hide();
       });
    }

    function handleNewAdminUser(event) {
        event.preventDefault();
        // create request
        var reqBody = {};
        // TO DO: Do field form validation
        //

        // disable buttons
        $('#create-admin-user-form-btn-submit').button('loading');
        $('#create-admin-user-form-btn-cancel').addClass('disabled');

        var gn = $('#group-selection').find(":selected").text();
        var em = $('#new-admin-user-form input[placeholder="Email Address"]').val().toLowerCase();
        var fn = $('#new-admin-user-form input[placeholder="First Name"]').val();
        var ln = $('#new-admin-user-form input[placeholder="Last Name"]').val();
        var mn = $('#new-admin-user-form input[placeholder="Middle Name"]').val();

        reqBody["Username"] = em;
        reqBody["Groupname"] = gn;
        var attr = [];

        attr.push({ "Name": "email", "Value": em });
        attr.push({ "Name": "given_name", "Value": fn });
        attr.push({ "Name": "family_name", "Value": ln });
        attr.push({ "Name": "middle_name", "Value": mn });
        reqBody["UserAttributes"] = attr;
        XebraAuth.createAdminUser(reqBody).then((userCreated) => {
            if (userCreated == null) {
                alert("An issue occurred creating user.");

                //enable buttons
                $('#create-admin-user-form-btn-submit').button('reset');
                $('#create-admin-user-form-btn-cancel').removeClass('disabled');

                return;
            }
            if(new_signature !== ""){
                var body = {};
                body["user_sub"] = userCreated.data.User.Username;
                body["signature"]= new_signature;
                XebraAuth.createSignature(body).then((data) => {
                    alert("User Created!")

                    //enable buttons
                    $('#create-admin-user-form-btn-submit').button('reset');
                    $('#create-admin-user-form-btn-cancel').removeClass('disabled');

                    clearNewAdminForm();
                    $('#addUser').modal('hide');
                    location.reload();
                }).catch((err) => {
                    //enable buttons
                    $('#create-admin-user-form-btn-submit').button('reset');
                    $('#create-admin-user-form-btn-cancel').removeClass('disabled');

                    if (err.data.message.includes("request is expired")) {
                        // clear the credentials
                        XebraAuth.clearCred();
                        // refresh the page
                        location.reload();
                    }
                    else if (err.status === 400) {
                        alert(err.data.message);
                    }
                    else
                        alert("An error occurred while adding signature.");
                    clearNewAdminForm();
                });
            }
            else{
                alert("User Created!")

                //enable buttons
                $('#create-admin-user-form-btn-submit').button('reset');
                $('#create-admin-user-form-btn-cancel').removeClass('disabled');

                clearNewAdminForm();
                $('#addUser').modal('hide');
                location.reload();
            }
        }).catch((err) => {
            //enable buttons
            $('#create-admin-user-form-btn-submit').button('reset');
            $('#create-admin-user-form-btn-cancel').removeClass('disabled');

            if (err.data.message.includes("request is expired")) {
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else if (err.status === 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing new user.");
            clearNewAdminForm();
        })

        // TO DO: close the modal!
    }

    function handleEditAdminUser(event) {
        event.preventDefault();
        // create request
        var reqBody = {};
        // TODO: Do field form validation
        //

        // disable buttons
        $('#edit-admin-user-form-btn-submit').button('loading');
        $('#edit-admin-user-form-btn-cancel').addClass('disabled');

        var gn = $('#group-selection-edit').find(":selected").text();
        var em = $('#email_edit').val().toLowerCase();
        var fn = $('#given_name_edit').val();
        var mn = $('#middle_name_edit').val();
        var ln = $('#family_name_edit').val();
        var us = $('#user_sub_edit').val();
        var si = $('#signature_id_edit').val();

        reqBody["Username"] = us;
        reqBody["Groupname"] = gn;
        var attr = [];

        attr.push({ "Name": "email", "Value": em });
        attr.push({ "Name": "given_name", "Value": fn });
        attr.push({ "Name": "family_name", "Value": ln });
        attr.push({ "Name": "middle_name", "Value": mn });
        reqBody["UserAttributes"] = attr;
        XebraAuth.updateAdminUser(reqBody).then((userCreated) => {
            if (userCreated == null) {
                alert("An issue occurred updating user.");

                //enable buttons
                $('#edit-admin-user-form-btn-submit').button('reset');
                $('#edit-admin-user-form-btn-cancel').removeClass('disabled');

                return;
            }
            if(new_signature !== "" && si == ""){
                var body = {};
                body["user_sub"] = us;
                body["signature"]= new_signature;
                XebraAuth.createSignature(body).then((data) => {
                    alert("User Updated!")

                    //enable buttons
                    $('#edit-admin-user-form-btn-submit').button('reset');
                    $('#edit-admin-user-form-btn-cancel').removeClass('disabled');

                    $('#editUser').modal('hide');
                    location.reload();
                }).catch((err) => {
                    //enable buttons
                    $('#edit-admin-user-form-btn-submit').button('reset');
                    $('#edit-admin-user-form-btn-cancel').removeClass('disabled');

                    if (err.data.message.includes("request is expired")) {
                        // clear the credentials
                        XebraAuth.clearCred();
                        // refresh the page
                        location.reload();
                    }
                    else if (err.status === 400) {
                        alert(err.data.message);
                    }
                    else
                        alert("An error occurred while adding signature.");
                    clearNewAdminForm();
                });
            }
            else if (new_signature !== "" && si !== ""){
                var body = {};
                body["user_sub"] = us;
                body["id"] = si;
                body["signature"]= new_signature;
                XebraAuth.updateSignature(body).then((data) => {
                    alert("User Updated!")

                    //enable buttons
                    $('#edit-admin-user-form-btn-submit').button('reset');
                    $('#edit-admin-user-form-btn-cancel').removeClass('disabled');

                    $('#editUser').modal('hide');
                    location.reload();
                }).catch((err) => {
                    //enable buttons
                    $('#edit-admin-user-form-btn-submit').button('reset');
                    $('#edit-admin-user-form-btn-cancel').removeClass('disabled');

                    if (err.data.message.includes("request is expired")) {
                        // clear the credentials
                        XebraAuth.clearCred();
                        // refresh the page
                        location.reload();
                    }
                    else if (err.status === 400) {
                        alert(err.data.message);
                    }
                    else
                        alert("An error occurred while updating signature.");
                        clearNewAdminForm();
                });
            }
            else {
                //enable buttons
                $('#edit-admin-user-form-btn-submit').button('reset');
                $('#edit-admin-user-form-btn-cancel').removeClass('disabled');

                alert("User Updated!")
                // not needed since we are refreshing page
                // clearNewMobileForm();
                // close the modal and refresh page
                $('#editUser').modal('hide');
                location.reload();
            }
        }).catch((err) => {
            //enable buttons
            $('#edit-admin-user-form-btn-submit').button('reset');
            $('#edit-admin-user-form-btn-cancel').removeClass('disabled');

            if (err.status == 400) {
                alert(err.data.message);
            }
            else if (err.data.message.includes("request is expired")) {
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else
                alert("An error occurred processing edit user.");
        })
    }

    // clear the New Mobile User form
    $('#addUser').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        if($('#userSignDisplay').length) {
            document.getElementById('userSignDisplay').src = "#";
            $('#userSignDisplay').hide();
            $('#userSignature').show();
        }
    })

    function handleCertificateSubmit(event) {
        event.preventDefault();
        console.log('event', event);
        console.log('formid', event.target.id)

        // create request
        var reqBody = {};
        // TODO: Do field form validation
        //
        if($('#contact_name :selected').val() === '-- select --'){
            // invalid we must do form validation!
            alert("Select Contact Name");
            return;
        }
        if(event.target.id === 'edit-cert-form') {
            reqBody["certificate_id"] = parseInt($('#certificate_id').val());
            reqBody["certificate_date"] = $('#certificate_date').val();
            delete reqBody["id"];
        }
        else{
            reqBody["certificate_date"] = moment().format('MM-DD-YYYY');
        }
        reqBody["user_sub"] = $('#user_sub').val();
        reqBody["ams_account_no"] = $('#custom-amsno').val();
        reqBody["producer"] = $('#producer').val();
        reqBody["producer_address"] = $('#producer_address').val();
        reqBody["contact_user_sub"] = $('#contact_name option:selected').attr("id");
        reqBody["contact_name"] = $('#contact_name option:selected').val();
        reqBody["contact_phone"] = $('#contact_phone ').val();
        reqBody["contact_fax"] = $('#contact_fax').val();
        reqBody["contact_email"] = $('#contact_email').val().toLowerCase();
        reqBody["insured"] = $('#insured option:selected').val();
        reqBody["insured_address"] = $('#insured_address').val();
        reqBody["insurer_a"] = $('#insurer_a').val();
        reqBody["insurer_b"] = $('#insurer_b').val();
        reqBody["insurer_c"] = $('#insurer_c').val();
        reqBody["insurer_d"] = $('#insurer_d').val();
        reqBody["insurer_e"] = $('#insurer_e').val();
        reqBody["insurer_f"] = $('#insurer_f').val();
        reqBody["insurer_a_naic"] = $('#insurer_a_naic').val();
        reqBody["insurer_b_naic"] = $('#insurer_b_naic').val();
        reqBody["insurer_c_naic"] = $('#insurer_c_naic').val();
        reqBody["insurer_d_naic"] = $('#insurer_d_naic').val();
        reqBody["insurer_e_naic"] = $('#insurer_e_naic').val();
        reqBody["insurer_f_naic"] = $('#insurer_f_naic').val();
        reqBody["certificate_number"] = $('#certificate_number').val();
        reqBody["certificate_revision"] = $('#certificate_revision').val();
        reqBody["gen_liab_insurer_letter"] = $('#gen_liab_insurer_letter').val();
        reqBody["auto_liab_insurer_letter"] = $('#auto_liab_insurer_letter').val();
        reqBody["umb_liab_insurer_letter"] = $('#umb_liab_insurer_letter').val();
        reqBody["workers_comp_insurer_letter"] = $('#workers_comp_insurer_letter').val();
        reqBody["other_coverage_insurer_letter"] = $('#other_coverage_insurer_letter').val();
        reqBody["other_coverage_insurer_letter_b"] = $('#other_coverage_insurer_letter_b').val();
        reqBody["gen_liab_comm"] = $('#gen_liab_comm').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_claims"] = $('#gen_liab_claims').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_occur"] = $('#gen_liab_occur').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_other1"] = $('#gen_liab_other1').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_other1_desc"] = $('#gen_liab_other1_desc').val();
        reqBody["gen_liab_other2"] = $('#gen_liab_other2').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_other2_desc"] = $('#gen_liab_other2_desc').val();
        reqBody["gen_liab_policy"] = $('#gen_liab_policy').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_project"] = $('#gen_liab_project').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_location"] = $('#gen_liab_location').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["gen_liab_additional"] = $('#gen_liab_additional').val();
        reqBody["gen_liab_subr"] = $('#gen_liab_subr').val();
        reqBody["gen_liab_policy_no"] = $('#gen_liab_policy_no').val();
        reqBody["gen_liab_effective"] = $('#gen_liab_effective').val();
        reqBody["gen_liab_expires"] = $('#gen_liab_expires').val();
        reqBody["gen_liab_limit_occur"] = $('#gen_liab_limit_occur').val();
        reqBody["gen_liab_limit_damage"] = $('#gen_liab_limit_damage').val();
        reqBody["gen_liab_limit_medical"] = $('#gen_liab_limit_medical').val();
        reqBody["gen_liab_limit_injury"] = $('#gen_liab_limit_injury').val();
        reqBody["gen_liab_limit_aggregate"] = $('#gen_liab_limit_aggregate').val();
        reqBody["gen_liab_limit_products"] = $('#gen_liab_limit_products').val();
        reqBody["gen_liab_limit_xtra_desc"] = $('#gen_liab_limit_xtra_desc').val();
        reqBody["gen_liab_limit_xtra"] = $('#gen_liab_limit_xtra').val();
        reqBody["auto_liab_any"] = $('#auto_liab_any').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["auto_liab_all"] = $('#auto_liab_all').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["auto_liab_scheduled"] = $('#auto_liab_scheduled').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["auto_liab_hired"] = $('#auto_liab_hired').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["auto_liab_non_owned"] = $('#auto_liab_non_owned').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["auto_liab_other1"] = $('#auto_liab_other1').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["auto_liab_other1_desc"] = $('#auto_liab_other1_desc').val();
        reqBody["auto_liab_other2"] = $('#auto_liab_other2').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["auto_liab_other2_desc"] = $('#auto_liab_other2_desc').val();
        reqBody["auto_liab_additional"] = $('#auto_liab_additional').val();
        reqBody["auto_liab_subdr"] = $('#auto_liab_subdr').val();
        reqBody["auto_liab_policy_no"] = $('#auto_liab_policy_no').val();
        reqBody["auto_liab_effective"] = $('#auto_liab_effective').val();
        reqBody["auto_liab_expires"] = $('#auto_liab_expires').val();
        reqBody["auto_liab_limit_combined"] = $('#auto_liab_limit_combined').val();
        reqBody["auto_liab_limit_injury_person"] = $('#auto_liab_limit_injury_person').val();
        reqBody["auto_liab_limit_injury_accident"] = $('#auto_liab_limit_injury_accident').val();
        reqBody["auto_liab_limit_property"] = $('#auto_liab_limit_property').val();
        reqBody["auto_liab_limit_xtra"] = $('#auto_liab_limit_xtra').val();
        reqBody["auto_liab_limit_xtra_desc"] = $('#auto_liab_limit_xtra_desc').val();
        reqBody["umb_liab"] = $('#umb_liab').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["umb_liab_excess"] = $('#umb_liab_excess').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["umb_liab_occur"] = $('#umb_liab_occur').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["umb_liab_claims"] = $('#umb_liab_claims').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["umb_liab_deductible"] = $('#umb_liab_deductible').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["umb_liab_retention"] = $('#umb_liab_retention').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["umb_liab_retention_amt"] = $('#umb_liab_retention_amt').val();
        reqBody["umb_liab_additional"] = $('#umb_liab_additional').val();
        reqBody["umb_liab_subr"] = $('#umb_liab_subr').val();
        reqBody["umb_liab_policy_no"] = $('#umb_liab_policy_no').val();
        reqBody["umb_liab_effective"] = $('#umb_liab_effective').val();
        reqBody["umb_liab_expires"] = $('#umb_liab_expires').val();
        reqBody["umb_liab_limit_occur"] = $('#umb_liab_limit_occur').val();
        reqBody["umb_liab_limit_aggregate"] = $('#umb_liab_limit_aggregate').val();
        reqBody["umb_liab_limit_xtra"] = $('#umb_liab_limit_xtra').val();
        reqBody["umb_liab_limit_xtra_desc"] = $('#umb_liab_limit_xtra_desc').val();
        reqBody["excess_liab_insurer_letter"] = $('#excess_liab_insurer_letter').val();
        reqBody["excess_liab_additional"] = $('#excess_liab_additional').val();
        reqBody["excess_liab_subr"] = $('#excess_liab_subr').val();
        reqBody["excess_liab_policy_no"] = $('#excess_liab_policy_no').val();
        reqBody["excess_liab_effective"] = $('#excess_liab_effective').val();
        reqBody["excess_liab_expires"] = $('#excess_liab_expires').val();
        reqBody["workers_comp_excluded"] = $('#workers_comp_excluded').val();
        reqBody["workers_comp_subdr"] = $('#workers_comp_subdr').val();
        reqBody["workers_comp_policy_no"] = $('#workers_comp_policy_no').val();
        reqBody["workers_comp_effective"] = $('#workers_comp_effective').val();
        reqBody["workers_comp_expires"] = $('#workers_comp_expires').val();
        reqBody["workers_comp_limit_stat"] = $('#workers_comp_limit_stat').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["workers_comp_limit_other_chk"] = $('#workers_comp_limit_other_chk').parent('[class*="icheckbox"]').hasClass("checked");
        reqBody["workers_comp_limit_other_desc"] = $('#workers_comp_limit_other_desc').val();
        reqBody["workers_comp_limit_acc"] = $('#workers_comp_limit_acc').val();
        reqBody["workers_comp_limit_emp"] = $('#workers_comp_limit_emp').val();
        reqBody["workers_comp_limit_pol"] = $('#workers_comp_limit_pol').val();
        reqBody["other_coverage_desc"] = $('#other_coverage_desc').val();
        reqBody["other_coverage_additional"] = $('#other_coverage_additional').val();
        reqBody["other_coverage_subdr"] = $('#other_coverage_subdr').val();
        reqBody["other_coverage_policy_no"] = $('#other_coverage_policy_no').val();
        reqBody["other_coverage_effective"] = $('#other_coverage_effective').val();
        reqBody["other_coverage_expires"] = $('#other_coverage_expires').val();
        reqBody["other_coverage_limit"] = $('#other_coverage_limit').val();
        reqBody["other_coverage_desc_b"] = $('#other_coverage_desc_b').val();
        reqBody["other_coverage_additional_b"] = $('#other_coverage_additional_b').val();
        reqBody["other_coverage_subdr_b"] = $('#other_coverage_subdr_b').val();
        reqBody["other_coverage_policy_no_b"] = $('#other_coverage_policy_no_b').val();
        reqBody["other_coverage_effective_b"] = $('#other_coverage_effective_b').val();
        reqBody["other_coverage_expires_b"] = $('#other_coverage_expires_b').val();
        reqBody["other_coverage_limit_b"] = $('#other_coverage_limit_b').val();
        reqBody["operations_desc"] = $('#operations_desc').val();
        reqBody["cert_holder_name"] = $('#insured option:selected').val();
        reqBody["cert_holder_address"] = $('#insured_address').val();
        reqBody["cert_holder_phone"] = $('#custom-mobile_phone').val();
        reqBody["cert_holder_email"] = $('#email').val().toLowerCase();
        reqBody["authorized_rep_signature"] = $('#authorized_rep_signature').val();
        reqBody["comments"] = $('#comments').val();
        reqBody["user_sub_last_modified"] = XebraAuth.getCurrentUser().username;
        reqBody["date_last_modified"] = moment().utc().format();
        for(var key in reqBody){
             if(reqBody[key] === undefined || reqBody[key] === ""){
                 reqBody[key] = null;
             }
            else if(typeof reqBody[key] === 'boolean' && reqBody[key]){
                reqBody[key] = 'b1';
            }
            else if(typeof reqBody[key] === 'boolean' && !reqBody[key]){
                reqBody[key] = 'b0';
            }
        }
        console.log(reqBody);
        if (event.target.id === 'new-cert-form') {

            // disable buttons
            $('#create-cert-form-btn-submit').button('loading');
            $('#create-cert-form-btn-cancel').addClass('disabled');

            XebraAuth.createCertificate(reqBody).then((res) => {
                if (res.status !== 201) {
                    //enable buttons
                    $('#create-cert-form-btn-submit').button('reset');
                    $('#create-cert-form-btn-cancel').removeClass('disabled');

                    console.log(res)
                    alert("An issue occurred creating new certificate.");
                    return;
                }
                alert("Certificate Created!")

                //enable buttons
                $('#create-cert-form-btn-submit').button('reset');
                $('#create-cert-form-btn-cancel').removeClass('disabled');

                window.location.href = 'user_certificates.html?uid=' + getUrlVars()['uid'];
                //clearNewMobileForm();
            }).catch((err) => {
                //enable buttons
                $('#create-cert-form-btn-submit').button('reset');
                $('#create-cert-form-btn-cancel').removeClass('disabled');

                if (err.data.message.includes("request is expired")) {
                    // clear the credentials
                    XebraAuth.clearCred();
                    // refresh the page
                    location.reload();
                }
                else if (err.status === 400) {
                    alert(err.data.message);
                }
                else
                    alert("An error occurred processing new certificate.");
                //clearNewMobileForm();
            })
        }
        else if (event.target.id === 'edit-cert-form') {

            // disable buttons
            $('#edit-cert-form-btn-submit').button('loading');
            $('#edit-cert-form-btn-cancel').addClass('disabled');

            XebraAuth.updateCertificate(reqBody).then((res) => {
                if (res.status !== 200) {
                    console.log(res)
                    alert("An issue occurred updating certificate.");

                    //enable buttons
                    $('#edit-cert-form-btn-submit').button('reset');
                    $('#edit-cert-form-btn-cancel').removeClass('disabled');

                    return;
                }
                alert("Certificate Updated!")

                //enable buttons
                $('#edit-cert-form-btn-submit').button('reset');
                $('#edit-cert-form-btn-cancel').removeClass('disabled');

                window.location.href = 'user_certificates.html?uid=' + getUrlVars()['uid'];
                //clearNewMobileForm();
            }).catch((err) => {

                //enable buttons
                $('#edit-cert-form-btn-submit').button('reset');
                $('#edit-cert-form-btn-cancel').removeClass('disabled');

                if (err.data.message.includes("request is expired")) {
                    // clear the credentials
                    XebraAuth.clearCred();
                    // refresh the page
                    location.reload();
                }
                else if (err.status === 400) {
                    alert(err.data.message);
                }
                else
                    alert("An error occurred processing edit certificate.");
                //clearNewMobileForm();
            })
        }
        // TO DO: close the modal!
    }

    function handleNewCertificateHolder(event){

        // disable buttons
        $('#add-holder-form-btn-submit').button('loading');
        $('#add-holder-form-btn-cancel').addClass('disabled');

        event.preventDefault();

        // TODO: Add validation fields
        let reqBody = {};
        reqBody["user_sub"] = $('#user-sub').val();
        reqBody["cert_id"] = parseInt($('#certificate-id').val());
        reqBody["name"] = $('#holder_name').val();
        reqBody["address_street"] = $('#holder_address_street').val();
        reqBody["address_city"] = $('#holder_address_city').val();
        reqBody["address_state"] = $('#holder_address_state').val();
        reqBody["address_zipcode"] = $('#holder_address_zipcode').val();
        reqBody["address"] = $('#holder_address_street').val() + '\r\n' + $('#holder_address_city').val() + ', ' + $('#holder_address_state').val() + ' ' + $('#holder_address_zipcode').val();
        reqBody["email"] = $('#holder_email').val().toLowerCase();
        reqBody["phone"] = $('#holder_phone').val();
        reqBody["issued_date"] = moment().utc().format();
        console.log("done")
        if(!checkIfNewHolderIsAllowed(reqBody)){
            //enable buttons
            $('#add-holder-form-btn-submit').button('reset');
            $('#add-holder-form-btn-submit').removeClass('disabled');
            alert("The holder's email cannot be the same as the default holder.");
            return;
        }
        XebraAuth.createHolder(reqBody).then((res) =>{
            if (res.status !== 201) {
                console.log(res)
                alert("An issue occurred creating user.");

                //enable buttons
                $('#add-holder-form-btn-submit').button('reset');
                $('#add-holder-form-btn-submit').removeClass('disabled');

                return;
            }
            alert("Certificate Holder Created!")

            //enable buttons
            $('#add-holder-form-btn-submit').button('reset');
            $('#add-holder-form-btn-submit').removeClass('disabled');

            window.location.href = 'user_certificates.html?uid=' + getUrlVars()['uid'];
        }).catch((err) => {
            //enable buttons
            $('#add-holder-form-btn-submit').button('reset');
            $('#add-holder-form-btn-submit').removeClass('disabled');

            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else if (err.status === 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing new certificate holder.");
            //clearNewMobileForm();
        })
    }

    function checkIfNewHolderIsAllowed(formData){
        let certificates = JSON.parse(localStorage.getItem("certificates"));
        let isAllowed = true;
        certificates.forEach( certificate => {
            if(parseInt(certificate.id) === formData.cert_id){
                certificate.holders.forEach(holder => {
                    if(holder.email === formData.email){
                        isAllowed = false;
                    }
                })
            }
        });
        return isAllowed;
    }

    function handleEditCertificateHolder(event){

        // disable buttons
        $('#edit-holder-form-btn-submit').button('loading');
        $('#edit-holder-form-btn-cancel').addClass('disabled');

        event.preventDefault();

        // TODO: Add validation fields
        let reqBody = {};
        reqBody["holder_id"] = parseInt($('#edit-holder-id').val());
        reqBody["cert_id"] = parseInt($('#edit-certificate-id').val());
        reqBody["name"] = $('#edit-holder-name').val();
        reqBody["address_street"] = $('#edit-holder-address-street').val();
        reqBody["address_city"] = $('#edit-holder-address-city').val();
        reqBody["address_state"] = $('#edit-holder-address-state').val();
        reqBody["address_zipcode"] = $('#edit-holder-address-zipcode').val();
        reqBody["address"] = $('#edit-holder-address-street').val() + '\r\n' + $('#edit-holder-address-city').val() + ', ' + $('#edit-holder-address-state').val() + ' ' + $('#edit-holder-address-zipcode').val();
        reqBody["email"] = $('#edit-holder-email').val().toLowerCase();
        reqBody["phone"] = $('#edit-holder-phone').val();
        console.log("done")
        XebraAuth.updateHolder(reqBody).then((res) =>{
            if (res.status !== 200) {
                console.log(res)
                alert("An issue occurred updating holder.");

                //enable buttons
                $('#edit-holder-form-btn-submit').button('reset');
                $('#edit-holder-form-btn-submit').removeClass('disabled');

                return;
            }
            alert("Certificate Holder Updated!")

            window.location.href = 'user_certificates.html?uid=' + getUrlVars()['uid'];
            //clearNewMobileForm();
        }).catch((err) => {
            //enable buttons
            $('#edit-holder-form-btn-submit').button('reset');
            $('#edit-holder-form-btn-submit').removeClass('disabled');

            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else if (err.status === 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing holder update.");
            //clearNewMobileForm();
        })
    }

    function loadTemplate(tk) {
        // loads all of the logged in user info.
        $.ajax({
            method: "GET",
            url: _config.api.invokeUrl + '/a/home',
            crossDomain: true,
            cors: true,
            contentType: "application/json",
            dataType: "json",
            headers: {
                Authorization: tk,

            },
            success: function (data) {
                $('#username').text(data.username);
            },
            error: function (err){
            alert("Failed to load user info. Please refresh page.");

            }
        });

    }

    function loadPage(isAdmin){
        
        let page = window.location.href;
        //let isAdmin = true;
        
        if(isAdmin && document.getElementById('system-account') != null){
            document.getElementById('system-account').innerHTML = '<a href="accounts.html" class="nav-link nav-toggle"><i class="fa fa-database"></i><span class="title">System Accounts</span></a>';
        }

        if(isAdmin && document.getElementById('user-activity') != null){
            document.getElementById('user-activity').innerHTML = '<a href="user_activity.html" class="nav-link nav-toggle"><i class="fa fa-users"></i><span class="title">User Activity</span></a>';
        }

        if (page.includes("accounts")) {
            startLoadingSpinner();
            loadAccountsPage();
            getCurrentYear();
            $('#new-admin-user-form').submit(handleNewAdminUser);
            $('#edit-admin-user-form').submit(handleEditAdminUser);
            clearNewAdminForm();
        }
        else if(page.includes("user_activity")){
            startLoadingSpinner();

            $('input[name="daterange"]').daterangepicker({
                startDate: moment(),
                endDate:moment(),
                autoApply: true,
                maxSpan: {
                    days: 7
                },
            });

            $('#user_activity_datepicker').on('apply.daterangepicker', function(ev, picker) {
                //do something, like clearing an input
                var startDate = picker.startDate.utc();
                var endDate = picker.endDate.utc();
                startLoadingSpinner();
                loadUserActivityPage(startDate, endDate);
            });

            loadUserActivityPage();
        }
        else if (page.includes("mobile_users")) {
            let filterId = getUrlVars()["filterId"];
            startLoadingSpinner();
            loadMobileUsers(filterId);
            getCurrentYear();

            // Format money & phone numbers
            $("input[name='money-inputmask']").inputmask();

            $('#new-mob-user-form').submit(handleNewMobileUser);
            $('#edit-mob-user-form').submit(handleEditMobileUser);
            clearNewMobileForm();

        }
        else if (page.includes("sent_history")) {
            let userId = getUrlVars()["uid"];
            let user = tranformUserObject(JSON.parse(localStorage.getItem("users")).Users[userId]);
            let user_sub = user.Username;
            let amsno = user["custom:amsno"];
            let family_name = user.family_name;
            let given_name = user.given_name;
            let full_name = given_name + ' ' + family_name;
            let email = user.email;
            console.log(user)
            startLoadingSpinner();
            getCurrentYear();
            loadSentHistory(user_sub, amsno, full_name, email);
        }
        else if (page.includes("referral")){
            let userId = getUrlVars()["uid"];
            let user = tranformUserObject(JSON.parse(localStorage.getItem("users")).Users[userId]);
            let user_sub = user.Username;
            let amsno = user["custom:amsno"];
            let family_name = user.family_name;
            let given_name = user.given_name;
            let full_name = given_name + ' ' + family_name;
            let email = user.email;
            console.log(user)
            startLoadingSpinner();
            //$("input[name='money-inputmask']").inputmask();
            $('#new-referral-form').submit(handleNewReferral);
            loadReferralHistory(user_sub, amsno, full_name, email);
        }
        else if (page.includes("system_logs")) {
        }
        else if (page.includes("usage_activity")) {
        }
        else if (page.includes("new_certificate")) {
            let userId = getUrlVars()["uid"];
            let user = tranformUserObject(JSON.parse(localStorage.getItem("users")).Users[userId]);
            getCurrentYear();
            // Format money & phone numbers
            $("input[name='money-inputmask']").inputmask({
                regex: "^([0-9,a-zA-Z]+)\\/?([0-9,a-zA-Z]*)$",
                 groupSeparator: ',',
                 autoGroup: true,
                 digits: 0,
                 digitsOptional: false,
                placeholder: "",
                onBeforeWrite: function (event, buffer, caretPos, opts) {
                    //     // let's work with strings
                    if(event.type === "keypress") {
                        let bufferToString = buffer.toString();
                        // remove commas and format number string
                        bufferToString = bufferToString.replace(/,/g, "");
                        let formattedData = bufferToString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                        let newBuffer = Array.from(formattedData)
                        // we added a comma so move back one caret
                        if (newBuffer.length > buffer.length)
                            caretPos += 1;
                        return {refreshFromBuffer: true, buffer: newBuffer, caret: caretPos}
                    }
                }
            });
            // let's clear the form
            $('#new-cert-form')[0].reset();

            $('#insured').on('change', function (e) {
                updateCertificateHolder();
            });

            $('#new-cert-form').submit(handleCertificateSubmit);

            // let's load the page
            loadCertificateForm(user, user.Username)
            getTodaysDate();
            $('.date-picker').datepicker();

            // Limit textarea overflow to row size
            limitTextArea('#operations_desc');
            limitTextArea('#comments');
        }
        else if (page.includes("edit_certificate")) {
            getCurrentYear();
            // let's clear the form
            $('#edit-cert-form')[0].reset();

            let userId = getUrlVars()["uid"];
            let certificateId = getUrlVars()["cid"];
            let user = tranformUserObject(JSON.parse(localStorage.getItem("users")).Users[userId]);
            let certificate = JSON.parse(localStorage.getItem("certificates"))[certificateId];

            // Format money & phone numbers
            // Format money & phone numbers
            $("input[name='money-inputmask']").inputmask({
                regex: "^([0-9,a-zA-Z]+)\\/?([0-9,a-zA-Z]*)$",
                groupSeparator: ',',
                autoGroup: true,
                digits: 0,
                digitsOptional: false,
                placeholder: "",
                onBeforeWrite: function (event, buffer, caretPos, opts) {
                    //     // let's work with strings
                    if(event.type === "keypress") {
                        let bufferToString = buffer.toString();
                        // remove commas and format number string
                        bufferToString = bufferToString.replace(/,/g, "");
                        let formattedData = bufferToString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                        let newBuffer = Array.from(formattedData)
                        // we added a comma so move back one caret
                        if (newBuffer.length > buffer.length)
                            caretPos += 1;
                        return {refreshFromBuffer: true, buffer: newBuffer, caret: caretPos}
                    }
                }
            });


            // set form handlers
            $('#insured').on('change', function (e) {
                updateCertificateHolder();
            });
            $('#edit-cert-form').submit(handleCertificateSubmit);
            // populate form data
            loadCertificateForm(user, user.Username, certificate, "edit")
            $('.date-picker').datepicker();

            // Limit textarea overflow to row size
            limitTextArea('#operations_desc');
            limitTextArea('#comments');
        }
        else if (page.includes("user_certificates")) {
            //var user = JSON.parse(atob(getUrlVars()["u"]));
            var userId = getUrlVars()["uid"]
            console.log("userid:", userId)
            let users = JSON.parse(localStorage.getItem("users"))
            let user = users.Users[userId];
            loadMobileUserDetails(user);
            getCurrentYear();
            console.log(user);

            // Format money & phone numbers
            $("input[name='money-inputmask']").inputmask();

            startLoadingSpinner();
			
			loadAccountCertificates(user, user.Username, userId);

			// now let's create the new holder event handlers
            $('#new-holder-form').submit(handleNewCertificateHolder);

            // handle edit holder
            $('#edit-holder-form').submit(handleEditCertificateHolder);

            clearUploadSchubergForm();
        }
        else if (page.includes("bridge_home")) {
            startLoadingSpinner();
            getCurrentYear();
            loadBridgeTransactions();
            //generateHomeTable(jsonData, data_json_parsed);
        }
        else if (page.includes("bridge_transaction_details")) {
        }
    }

    function getCurrentAuthenticatedUser() {
        var LocalStorageData = {
            UserPoolId: _config.cognito.userPoolId,
            ClientId: _config.cognito.userPoolClientId
        };
        // initialize variables
        let fname = "";
        let mname = "";
        let lname = "";
        let userEmail = "";
        var CurrentUserPool = new AmazonCognitoIdentity.CognitoUserPool(LocalStorageData);
        var CurrentCognitoUser = CurrentUserPool.getCurrentUser();
        var CurrentAuthCognitoUser = XebraAuth.adminGetUser(CurrentCognitoUser.username).then(result => {
            for (var attr in result.data.UserAttributes) {
                if (result.data.UserAttributes[attr].Name === "given_name")
                    fname = result.data.UserAttributes[attr].Value;
                else if (result.data.UserAttributes[attr].Name === "middle_name")
                    mname = result.data.UserAttributes[attr].Value;
                else if (result.data.UserAttributes[attr].Name === "family_name")
                    lname = result.data.UserAttributes[attr].Value;
                else if (result.data.UserAttributes[attr].Name === "email")
                    userEmail = result.data.UserAttributes[attr].Value;
            }

            let CurrentUserDetails = ''
                + fname + ' '
                + mname + ' '
                + lname + ' ['
                + userEmail + ']'
            $('#user-info').append(CurrentUserDetails);

        }).catch((err) => {
            stopLoadingSpinner();
            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else{
                alert("An unknown error occurred. Please try refreshing page.");
            }
        })
        console.log("CurrentUser", CurrentAuthCognitoUser);
    }

    function WhoIs(user_sub) {
        var LocalStorageData = {
            UserPoolId: _config.cognito.userPoolId,
            ClientId: _config.cognito.userPoolClientId
        };
        // initialize variables
        let first = "";
        let middle = "";
        let last = "";
        let user_email = "";
        var CurrentUserPool = new AmazonCognitoIdentity.CognitoUserPool(LocalStorageData);
        var CognitoUserSub = user_sub;
        var AuthCognitoUserSub = XebraAuth.adminGetUser(CognitoUserSub).then(result => {
            for (var attr in result.data.UserAttributes) {
                if (result.data.UserAttributes[attr].Name === "given_name")
                    first = result.data.UserAttributes[attr].Value;
                else if (result.data.UserAttributes[attr].Name === "middle_name")
                    middle = result.data.UserAttributes[attr].Value;
                else if (result.data.UserAttributes[attr].Name === "family_name")
                    last = result.data.UserAttributes[attr].Value;
                else if (result.data.UserAttributes[attr].Name === "email")
                    user_email = result.data.UserAttributes[attr].Value;
            }

            let WhoIsUserDetails = ''
                + first + ' '
                + middle + ' '
                + last + ' ['
                + user_email + ']'
            $('#this_cert_modified_by').append(WhoIsUserDetails);

        }).catch((err) => {
            stopLoadingSpinner();
            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else{
                alert("An unknown error occurred. Please try refreshing page.");
            }
        })
        console.log("WhoIsThiUser", AuthCognitoUserSub);
    }

    function loadAccountsPage(){

        XebraAuth.getListUsers().then( (response) => {
            if (response.status != 200) {
                console.log(new Error("An error occurred listing users."))
                alert("An error occurred listing users.");
                return;
            }
            stopLoadingSpinner();

            // let's store the data for later use;
            users = response.data;
            localStorage.setItem("users", JSON.stringify(response.data));

            // check if at least one object exists
            if(response.data.hasOwnProperty("admins")
                && response.data.admins.hasOwnProperty("Users")
                && response.data.admins.Users.length) {

                var table = $('#accounts_tbl').DataTable();

                // go through each user to list
                for (var user in response.data.admins.Users) {
                    var rowData = generateAccountsRow(response.data.admins.Users[user], user, "Admin");

                    table.row.add(["Admin", rowData.name, rowData.email, rowData.added, rowData.last_modified, rowData.status, rowData.enabled, rowData.actions]);
                }
                for (var user in response.data.agents.Users) {
                    var rowData = generateAccountsRow(response.data.agents.Users[user], user, "Agent");

                    table.row.add(["Agent", rowData.name, rowData.email, rowData.added, rowData.last_modified, rowData.status, rowData.enabled, rowData.actions]);
                }

                table.draw();

                accountsPageEvents();
                $('ul.pagination').on("click", accountsPageEvents);
                $('#accounts_tbl_length').on("click", accountsPageEvents);
                $('#accounts_tbl_filter').keyup(accountsPageEvents);

            }
        }).catch((err) => {
            stopLoadingSpinner();
            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else{
                alert("An unknown error occurred. Please try refreshing page.");
            }

        });
    }

    function accountsPageEvents() {

        //Open Modal Function and Load JSON Values
        $("button[name='edit-user-btn']").on("click", function (e) {
            clearEditAdminForm();
            let users = JSON.parse(localStorage.getItem("users"))
            var userId = $(this).data("uid");
            var userType = $(this).data("utype").toLowerCase() + 's';
            var username;
            console.log("users:", users);
            $('#editUser').modal();
            // i is selected index
            var selected = "-1";

            if (userType === "admins") {
                selected = "0";
                var adminsAttributes = users[userType].Users[userId].Attributes;
                for (let attr in adminsAttributes) {

                    var attributeName = adminsAttributes[attr].Name;
                    var attributeValue = adminsAttributes[attr].Value;

                    if (attributeName === 'email')
                        $('#email_edit').val(attributeValue);
                    if (attributeName === 'given_name')
                        $('#given_name_edit').val(attributeValue);
                    if (attributeName === 'middle_name')
                        $('#middle_name_edit').val(attributeValue);
                    if (attributeName === 'family_name')
                        $('#family_name_edit').val(attributeValue);
                    if  (attributeName ==='sub')
                        $('#user_sub_edit').val(attributeValue);
                    $(".signature").hide();
                }
            }
            if (userType === "agents") {
                selected = "1";
                var agentsAttributes = users[userType].Users[userId].Attributes;
                for (let attr in agentsAttributes) {

                    var attributeName = agentsAttributes[attr].Name;
                    var attributeValue = agentsAttributes[attr].Value;

                    if (attributeName === 'email')
                        $('#email_edit').val(attributeValue);
                    if (attributeName === 'given_name')
                        $('#given_name_edit').val(attributeValue);
                    if (attributeName === 'middle_name')
                        $('#middle_name_edit').val(attributeValue);
                    if (attributeName === 'family_name')
                        $('#family_name_edit').val(attributeValue);
                    if  (attributeName ==='sub'){
                        $('#user_sub_edit').val(attributeValue);
                        username = attributeValue;
                    }
                }
                $(".signature").show();
                XebraAuth.getSignature(username).then((result) => {
                    if(result.data.signature !== undefined){
                        $('#userSignDisplayEdit').show();
                        $('#userSignDisplayEdit')
                            .attr('src', result.data.signature);
                        $('#signature_id_edit').val(result.data.id);
                        $('#userSignatureEdit').hide();
                    }
                }).catch((err) => {
                    if (err.status == 400) {
                        alert(err.data.message);
                    }
                    else
                        alert("An error occurred processing edit user.");
                })
            }
            document.getElementById("group-selection-edit").selectedIndex = selected;
            
        })

        $("button[name='pause-user-btn']").on("click", function (e) {
            let userId = $(this).data("uid");
            let userType = $(this).data("utype").toLowerCase() + 's';

            handleAdminUserStatus(userId, userType);
        })
        $("button[name='resend-confirmation']").on("click", function () {
            // save the clicked button
            var button = this;
            if(!button.disabled){
                // disable button
                button.disabled = true;
                let userId = $(button).data("uid");
                let userType = $(button).data("utype").toLowerCase() + 's';
                let user = tranformUserObject(JSON.parse(localStorage.getItem("users"))[userType].Users[userId]);
                // compose body to send. Note, user_sub is email ONLY in this particular case
                let body = { type: "resend_confirmation", user_sub: user.email}
                // send confirmation
                XebraAuth.resendConfirmation(body).then( () =>{
                    button.disabled = false;
                    alert("Confirmation Sent!");
                })
                    .catch(()=>{
                        button.disabled = false;
                        alert("An error occurred sending confirmation")
                    })
            }
        })
    }
    
    function handleAdminUserStatus(id, type){
        // create request
        var reqBody = {};
        var selectedUser; 
        let users = JSON.parse(localStorage.getItem("users"))
        console.log("users:",users)
        console.log("id:", id)
        selectedUser = users[type].Users[id];
        console.log("selectedUser",selectedUser)
        var un = selectedUser.Username
        var st = selectedUser.Enabled
            
        reqBody["type"]= st ? "disable" : "enable";
        reqBody["user_sub"]= un
        XebraAuth.toggleAdminUserStatus(reqBody).then((data) => {
            if (data == null) {
                alert("An issue occurred creating user.");
                return;
            }
            alert("User Status Updated!")
            location.reload();
        }).catch((err) => {
            if (err.status == 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing edit user.");
        })
    }

    function loadMobileUserDetails(user) {
        // loads the header information of the page where the user details pertain,per the current edited mobile user
        let fullName = getUserAttributeValueByName(user, 'given_name') + ' ' + getUserAttributeValueByName(user, 'middle_name') + ' ' + getUserAttributeValueByName(user, 'family_name');
        let email = getUserAttributeValueByName(user, 'email');
        let amsno = getUserAttributeValueByName(user, 'custom:amsno');
        let userDetails = 'MOBILE USER: <strong>'
            + fullName + '</strong>  |   AMS360 Account: <strong>'
            + amsno + '</strong>  |   Username: <strong>'
            + '<a href ="mobile_users.html?filterId=' + email + '">' + email + '</a>' + '</strong>'
        $('#mobile-user-details').append(userDetails);
        $('#mobile-user-details-view-pdf').append(userDetails);
    }
	
    function loadMobileUsers(filterId){

        XebraAuth.getMobileUsers().then((response) => {

            if (response.status != 200) {
                console.log(new Error("An error occurred listing users."))
                alert("An error occurred listing users.");
                return;
            }
            // let's store the data for later use;
            users = response.data;
            if(response.data.NextToken){
                // more users available so perform another fetch
                XebraAuth.getMobileUsers(response.data.NextToken).then((response2) => {
                    if (response2.status != 200) {
                        console.log(new Error("An error occurred listing users."))
                        alert("An error occurred listing users.");
                        return;
                    }
                    console.log("Next Users", response2.data)

                    // let's store the data for later use;
                    users.Users = users.Users.concat(response2.data.Users);
                    console.log("Merged Users", users)
                    localStorage.setItem('users', JSON.stringify(users));
                    console.log(response2.data)
                    // check if at least one object exists
                    if (response2.data.hasOwnProperty("Users")) {

                        var table = $('#mob_usrs_tbl').DataTable();

                        // go through each user to list
                        for (var user in users.Users) {
                            var rowData = generateMobileUserRow(users.Users[user], user);

                            table.row.add([rowData.amsno, rowData.name, rowData.email, rowData.certs, rowData.history, rowData.referral ,rowData.date_added, rowData.last_modified, rowData.status, rowData.enabled, rowData.actions]);
                        }

                        if(filterId){
                            table.search( filterId).draw();
                        }
                        else{
                            table.draw();
                        }
                        mobileUserEvents();
                        $('ul.pagination').on("click", mobileUserEvents);
                        $('#mob_usrs_tbl_length').on("click", mobileUserEvents);
                        $('#mob_usrs_tbl_filter').keyup(mobileUserEvents);
                    }
                    // Stop the loading spinner
                    stopLoadingSpinner();

                })
            }
            else {
                // let's store the data for later use;
                users = response.data;
                localStorage.setItem('users', JSON.stringify(users));
                console.log(response.data)
                // check if at least one object exists
                if (response.data.hasOwnProperty("Users")) {

                    var table = $('#mob_usrs_tbl').DataTable();

                    // go through each user to list
                    for (var user in response.data.Users) {
                        var rowData = generateMobileUserRow(response.data.Users[user], user);

                        table.row.add([rowData.amsno, rowData.name, rowData.email, rowData.certs, rowData.history,  rowData.referral ,rowData.date_added, rowData.last_modified, rowData.status, rowData.enabled, rowData.actions]);
                    }

                    if(filterId){
                        table.search( filterId).draw();
                    }
                    else{
                        table.draw();
                    }
                    mobileUserEvents();
                    $('ul.pagination').on("click", mobileUserEvents);
                    $('#mob_usrs_tbl_length').on("click", mobileUserEvents);
                    $('#mob_usrs_tbl_filter').keyup(mobileUserEvents);

                }
                // Stop the loading spinner
                stopLoadingSpinner();

            }
        }).catch((err) => {
            stopLoadingSpinner();
            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else{
                alert("An unknown error occurred. Please try refreshing page.");
            }
        });
    }

    function mobileUserEvents() {
        //Open Modal Function and Load JSON Values
        $("button[name='edit-user-btn']").on("click", function (e) {
            console.log(this.id);
            var aid = this.id;
            var usersData = users.Users[aid];
            $('#editUser').modal();
            clearEditMobileForm();
            for (let attr in usersData.Attributes) {

                var attributeName = usersData.Attributes[attr].Name;
                var attributeValue = usersData.Attributes[attr].Value;

                if (attributeName === 'custom:amsno')
                    $('#amsno_edit').val(attributeValue);
                if (attributeName === 'email') {
                    $('#email_edit').val(attributeValue);
                    $('#current_email_edit').val(attributeValue);
                }
                if (attributeName === 'custom:mobile_phone')
                    $('#mobile_phone_edit').val(attributeValue);
                if (attributeName === 'custom:company')
                    $('#company_edit').val(attributeValue);
                if (attributeName === 'given_name')
                    $('#given_name_edit').val(attributeValue);
                if (attributeName === 'middle_name')
                    $('#middle_name_edit').val(attributeValue);
                if (attributeName === 'family_name')
                    $('#family_name_edit').val(attributeValue);
                if (attributeName === 'custom:address_street')
                    $('#address_street_edit').val(attributeValue);
                if (attributeName === 'custom:address_city')
                    $('#address_city_edit').val(attributeValue);
                if (attributeName === 'custom:address_state')
                    $('#address_state_edit').val(attributeValue);
                if (attributeName === 'custom:address_zipcode')
                    $('#address_zipcode_edit').val(attributeValue);
                if (attributeName === 'custom:is_schuberg') {
                    console.log("custom:is_schuberg = ", attributeValue)
                    if (attributeValue === 'true') {
                        let isSchubergStatus = $('#is_schuberg_edit').prop('checked', true);
                        console.log("is_schuberg:", isSchubergStatus);
                    }
                    else {
                        let isSchubergStatus = $('#is_schuberg_edit').prop('checked', false);
                        console.log("is_schuberg:", isSchubergStatus);
                    }

                }
                if (attributeName === 'custom:is_dba') {
                    console.log("custom:is_dba = ", attributeValue)
                    if (attributeValue === 'true') {
                        let isDbaStatus = $('#is_dba_edit').prop('checked', true);
                        console.log("is_dba:", isDbaStatus);
                    }
                    else {
                        let isDbaStatus = $('#is_dba_edit').prop('checked', false);
                        console.log("is_dba:", isDbaStatus);
                    }
                        
                }
                    
            }
        })

        $("button[name='pause-user-btn']").on("click", function (e) {
            let userId = $(this).data("uid");
            handleMobileUserStatus(userId);
        })

        $("button[name='resend-confirmation']").on("click", function () {
            // save the clicked button
            var button = this;
            if(!button.disabled){
                // disable button
                button.disabled = true;
                let userId = $(button).data("uid");
                let user = tranformUserObject(JSON.parse(localStorage.getItem("users")).Users[userId]);
                // compose body to send. Note, user_sub is email ONLY in this particular case
                let body = { type: "resend_confirmation", user_sub: user.email}
                // send confirmation
                XebraAuth.resendConfirmation(body).then( () =>{
                    button.disabled = false;
                    alert("Confirmation Sent!");
                })
                    .catch(()=>{
                        button.disabled = false;
                        alert("An error occurred sending confirmation")
                    })
            }
        })

        // $("button[name='delete-user']").on("click", function (e) {
        //     // let userId = $(this).data("uid");
        //     // handleMobileUserStatus(userId);

        //     var button = this;
        //     let userId = $(button).data("uid");
        //     let user_email = $(button).data("uemail");
        //     if(confirm('WARNING ALL DATA WILL BE REMOVED for user '+ user_email +'!')){
        //         handleMobileUserDelete(userId);
        //     }
        // })
    }

    function handleMobileUserStatus(id){
        // create request
        var reqBody = {};
        let users = JSON.parse(localStorage.getItem("users"))
        var selectedUser= users.Users[id];

        var un = selectedUser.Username
        var st = selectedUser.Enabled
            
        reqBody["type"]= st ? "disable" : "enable";
        reqBody["user_sub"]= un
        XebraAuth.toggleMobileUserStatus(reqBody).then((data) => {
            if (data == null) {
                alert("An issue occurred creating user.");
                return;
            }
            alert("User Status Updated!")
            location.reload();
        }).catch((err) => {
            if (err.status == 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing edit user.");
        })
    }

    function handleMobileUserDelete(userId){
        XebraAuth.deleteMobileUsers(userId).then((data)=> {
            if(data == nul){
                alert("An issue occured while delete mobile user.");
                return;
            }
            alert("User Deleted!");
            location.reload();
        }).catch((err) => {
            if (err.status == 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred deleting edit user.");
        })
    }

    function loadSentHistory(user_sub, amsno, full_name, username) {

        full_name = full_name.replace("%20", " ");

        let userDetails = 'MOBILE USER: <strong>'
            + full_name + '</strong>  |   AMS360 Account: <strong>'
            + amsno + '</strong>  |   Username: <strong>'
            + '<a href ="mobile_users.html?filterId=' + username + '">' + username + '</a>' + '</strong>'
        $('#user_information').append(userDetails);

        XebraAuth.getSentHistory(user_sub).then((response) => {

            if (response.status != 200) {
                console.log(new Error("An error occurred listing users."))
                alert("An error occurred listing users.");
                return;
            }

            // check if at least one object exists
            if (response.data.hasOwnProperty("sent_history")) {

                var table = $('#sent_hist_tbl').DataTable();

                // go through each user to list
                for (var sentData in response.data.sent_history) {
                    if (response.data.sent_history[sentData].cert_data !== null) {
                        var rowData = generateSentHistoryRow(response.data.sent_history[sentData]);

                        table.row.add([rowData.cert, rowData.holder, rowData.holder_email, rowData.date_sent]);

                    }
                }

                table.draw();

                sentHistoryEvents(user_sub);
                $('ul.pagination').on("click", function () {
                    sentHistoryEvents(user_sub)
                });
                $('#sent_hist_tbl_length').on("click", function () {
                    sentHistoryEvents(user_sub)
                });

            }
            // Stop the loading spinner
            stopLoadingSpinner();
        }).catch((err) => {
            stopLoadingSpinner();
            if (err.data.message.includes("request is expired")) {
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else {
                
                alert("An unknown error occurred. Please try refreshing page.");
            }
        });
    }

    function sentHistoryEvents(user_sub) {
        //Open Modal Function and Load JSON Values
        $('button[name="view-cert-btn"]').click(function (e) {

            //get data-id attribute of the clicked element
            var sent_history_id = $(this).data('sent_history_id');

            // obtain the certificate
            startLoadingSpinner();
            XebraAuth.getSentCertificatePDF(user_sub, sent_history_id)
                .then(result => {
                    console.log("result", result);
                    console.log("encoded pdf", result.data)
                    $('#showCertificatePDFIframe').attr('data', "data:application/pdf;base64," + result.data.data);
                    stopLoadingSpinner();
                    $('#showCertificatePDF').modal('show');
                })
                .catch(error => {
                    console.log(error);
                    stopLoadingSpinner();
                    alert("An error occurred obtaining pdf.");
                })

        });
    }
	

    function loadReferralHistory(user_sub, amsno, full_name, username){

        full_name = full_name.replace("%20", " ");

        let userDetails = 'MOBILE USER: <strong>'
            + full_name + '</strong>  |   AMS360 Account: <strong>'
            + amsno + '</strong>  |   Username: <strong>'
            + username + '</strong>'
        $('#referring_user_information').append(userDetails);


        XebraAuth.getReferralHistory(user_sub).then((response) => {

            if (response.status != 200) {
                console.log(new Error("An error occurred listing users."))
                alert("An error occurred listing users.");
                return;
            }

            // check if at least one object exists
            if (response.data.length>0) {

                var table = $('#referral_hist_tbl').DataTable();

                // go through each user to list
                for (var sentData in response.data) {
                    var rowData = generateReferralHistoryRow(response.data[sentData]);

                    table.row.add([rowData.dateReferred ,rowData.name, rowData.email, rowData.phone, rowData.service, rowData.status, rowData.createdBy == null ? full_name: rowData.createdBy ,rowData.lastUpdatedDate, rowData.actions]);
                }

                table.draw();

                referralHistoryEvents(user_sub);
                $('ul.pagination').on("click", function () {
                    referralHistoryEvents(user_sub)
                });
                // $('#referral_hist_tbl').on("click", function () {
                //     sentHistoryEvents(user_sub)
                // });

            }
            // Stop the loading spinner
            stopLoadingSpinner();
        }).catch((err) => {
            stopLoadingSpinner();
                
            if (err.data.message.includes("request is expired")) {
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else {
                
                alert("An unknown error occurred. Please try refreshing page.");
            }
        });
    }

    function referralHistoryEvents(user_sub){
        // add the event handler when clicking the accept-referral-btn
        $("button[name='approve-referral-btn']").on("click", function (e) {
            let referralId = $(this).data("uid");
            console.log(referralId);

            handleReferralStatus(referralId, 'notredeemed');
        })

        $("button[name='redeem-referral-btn']").on("click", function (e) {
            let referralId = $(this).data("uid");
            console.log(referralId);

            handleReferralStatus(referralId, 'redeemed');
        })

        $("button[name='decline-referral-btn']").on("click", function (e) {
            let referralId = $(this).data("uid");
            console.log(referralId);

            handleReferralStatus(referralId, 'ineligible');
        })
    }

    function handleReferralStatus(referralId, status){
        // create request
        var reqBody = {};
        
        reqBody["status"]= status;
        reqBody["id"]= referralId;
        reqBody["last_updated_date"] = moment().utc();

        //let req = JSON.stringify(reqBody);

        XebraAuth.updateReferralStatus(reqBody).then((data) => {
            if (data == null) {
                alert("An issue occurred creating user.");
                return;
            }
            alert("User Status Updated!")
            location.reload();
        }).catch((err) => {
            if (err.status == 400) {
                alert(err.data.message);
            }
            else
                alert("An error occurred processing edit user.");
        })
    }
    
	function loadAccountCertificates(user, user_sub, userId){

        // create the Add new certificate link
        $('#new-cert-link').append('<a href="new_certificate.html?uid=' + userId + '" class="btn btn-outline btn-circle blue btn-sm">Add New +</a>');
		XebraAuth.getListCertificates(user_sub).then( (response) => {
            if (response.status == 200) {

                // let's store the data for later user;
                var certificates = response.data.certificates;
                localStorage.setItem("certificates", JSON.stringify(certificates))
                console.log(certificates);
                // check if atleat one object exist
                if (response.data.hasOwnProperty("certificates")
                    && response.data.certificates.length) {

                    

                    // go through each certificate to list
                    var table = $('#certs_tbl').DataTable();

                    for (var certificate in certificates) {
                        var certRow = generateCertificateRow(certificates[certificate], user, userId, certificate);

                        table.row.add([" ", certRow.cert_no, certRow.add_holder, certRow.holder_table]);
                    }
                    table.draw();
                }
            }
            else if(response.status == 404){
                generateCertificateRow(null, null, null, null);
                return;
            }

            console.log('registering events');

            deleteCertificateEvent();
            accountCertificatesEvents(user_sub);

            $('#prev').on("click", function (user_sub) {
                accountCertificatesEvents(user_sub)
            });
            $('#next').on("click", function (user_sub) {
                accountCertificatesEvents(user_sub)
            });
            $('#certs_tbl_length').on("click", function (user_sub) {
                accountCertificatesEvents(user_sub)
            });

            // Stop the loading spinner
            stopLoadingSpinner();
        }).catch((err) => {
            stopLoadingSpinner();
            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else if (err.status == 404) {
                return;
            }
            else{
                alert("An unknown error occurred. Please try refreshing page.");
            }
			}
        );

    }

    function deleteCertificateEvent(){
        $('button[name="delete-cert-btn"]').click(function (e) {

            //get data-id attribute of the clicked element
            let data = {}
            data["certificate_id"] = $(this).data('certificate_id');
            data["certificate_number"] = $(this).data('certificate_number');
            $('#delete-cert-modal-input').data(data);

            $('#delete-cert-number').text(data.certificate_number);

            $('#delete-cert-modal').modal('show');
        });

        $('#submit-delete-cert').click(function (e) {
            $('#submit-delete-cert').button('loading');
            $('#cancel-delete-cert').addClass('disabled');
            let data = $('#delete-cert-modal-input').data();
            console.log(data);
            XebraAuth.deleteCertificate(data.certificate_id)
                .then(result => {
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                    $('#delete-cert-modal').modal('hide');
                    alert("An error occurred deleting certificate.");
                    $('#submit-delete-cert').button('reset');
                    $('#cancel-delete-cert').removeClass('disabled');
                })
        });
    }

    function deleteHolderEvent(){
        $('button[name="delete-holder-btn"]').click(function (e) {

            //get data-id attribute of the clicked element
            let data = {}
            data["holder_id"] = $(this).data('holder_id');
            data["holder_name"] = $(this).data('holder_name');
            $('#delete-holder-modal-input').data(data);

            $('#delete-holder-name').text(data.holder_name);

            $('#delete-holder-modal').modal('show');
        });

        $('#submit-delete-holder').click(function (e) {
            $('#submit-delete-holder').button('loading');
            $('#cancel-delete-holder').addClass('disabled');
            let data = $('#delete-holder-modal-input').data();
            console.log(data);
            XebraAuth.deleteHolder(data.holder_id)
                .then(result => {
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                    $('#delete-holder-modal').modal('hide');
                    alert("An error occurred deleting holder.");
                    $('#submit-delete-holder').button('reset');
                    $('#cancel-delete-holder').removeClass('disabled');
                })
        });
    }

    function accountCertificatesEvents(user_sub) {
        // add the event handler when clicking the add-holder-btn
        $('button[name="add-holder-btn"]').click((event) => {
            console.log('event', event)
            console.log('user_sub', $(event.target).data('user_sub'));
            $('#user-sub').val($(event.target).data('user_sub'));
            $('#certificate-id').val($(event.target).data('certificate_id'));
        });

        $('button[name="view-schuberg-cert-btn"]').click(function (e) {

            //get data-id attribute of the clicked element
            var certificate_id = $(this).data('certificate_id');
            var user_sub = $(this).data('user_sub');
            //console.log(certid)
            // obtain the certificate
            startLoadingSpinner();
            XebraAuth.getSchubergCertificatePDF(user_sub, certificate_id)
                .then(result => {
                    console.log("result", result);
                    console.log("encoded pdf", result.data)
                    $('#showSchubergCertificatePDFIframe').attr('data', "data:application/pdf;base64," + result.data.data);
                    stopLoadingSpinner();
                    $('#showSchubergCertificatePDF').modal('show');

                })
                .catch(error => {
                    console.log(error);
                    stopLoadingSpinner();
                    alert("An error occurred obtaining pdf.");
                })
        });

        $('button[name="upload-schuberg-cert-btn"]').click(function (e) {
            // load to hidden values
            $('#upload-schuberg-user-sub').val($(this).data('user_sub'));
            $('#upload-schuberg-certificate-id').val($(this).data('certificate_id'));
            $('#uploadSchubergCert').modal('show');
        });

        $('#inputSchubergCertFile').click( (e) =>{
            $('.help-block').text("").removeClass('alert-danger').removeClass('alert');
            $('.help-block').text("Choose .pdf certificate file")
        })

        $('#upload-schuberg-cert-form-btn-submit').click(function (e) {
            e.preventDefault();
            $('#upload-schuberg-cert-form-btn-submit').button('loading');
            $('#upload-schuberg-cert-form-btn-cancel').addClass('disabled');

            // grab the file data
            let fileReader = new FileReader();
            //fileReader.readAsDataURL($('#inputSchubergCertFile').prop('files')[0]);
            fileReader.readAsArrayBuffer($('#inputSchubergCertFile').prop('files')[0]);
            fileReader.onload = function () {
                //send
                //console.log("File", fileReader.result.replace("data:application/pdf;base64,", ''));
                var fields = null;
                try{
                    fields = pdfform().list_fields(fileReader.result);
                }
                catch (e) {
                    $('.help-block').text("Invalid Certificate template.").addClass('alert-danger').addClass('alert');
                    $('#upload-schuberg-cert-form-btn-cancel').removeClass('disabled');
                    $('#upload-schuberg-cert-form-btn-submit').button('reset');
                    return;
                }
                // check if pdf is valid
                if(!fields.hasOwnProperty("Certholder") && !fields.hasOwnProperty("Date")){
                    // not valid
                    $('.help-block').text("Invalid Certificate template.").addClass('alert-danger').addClass('alert');
                    $('#upload-schuberg-cert-form-btn-cancel').removeClass('disabled');
                    $('#upload-schuberg-cert-form-btn-submit').button('reset');
                    return;
                }
                else{
                    // clear if error is displaying
                    $('.help-block').text("").removeClass('alert-danger').removeClass('alert');
                }

                fileReader.onload = function() {
                    // compose body
                    let user_sub = $('#upload-schuberg-user-sub').val();
                    let certificate_id = $('#upload-schuberg-certificate-id').val();
                    //return; // FOR TESTING ONLY


                    XebraAuth.uploadSchubergCertificatePDF(user_sub, certificate_id, fileReader.result.replace("data:application/pdf;base64,", ''))
                        .then(result => {
                            console.log("Response", result)
                            $('#uploadSchubergCert').modal('hide');
                            $('#upload-schuberg-cert-form-btn-cancel').removeClass('disabled');
                            $('#upload-schuberg-cert-form-btn-submit').button('reset');
                            // refresh the page
                            location.reload();
                        })
                        .catch(error => {
                            console.log(error);
                            $('#uploadSchubergCert').modal('hide');
                            alert("An error occurred sending pdf.");
                            $('#upload-schuberg-cert-form-btn-submit').button('reset');
                            $('#upload-schuberg-cert-form-btn-cancel').removeClass('disabled');
                        })
                }
                fileReader.readAsDataURL($('#inputSchubergCertFile').prop('files')[0])
            }
        });

        $('button[name="delete-schuberg-cert-btn"]').click(function (e) {
            // load to hidden values
            $('#delete-schuberg-user-sub').val($(this).data('user_sub'));
            $('#delete-schuberg-certificate-id').val($(this).data('certificate_id'));
            $('#delete-schuberg-cert-number').text($(this).data('certificate_number'));
            $('#delete-schuberg-cert-modal').modal('show');
        });

        $('#delete-schuberg-cert-form-btn-submit').click(function (e) {
            e.preventDefault();
            $('#delete-schuberg-cert-form-btn-submit').button('loading');
            $('#delete-schuberg-cert-form-btn-cancel').addClass('disabled');

                let user_sub = $('#delete-schuberg-user-sub').val();
                let certificate_id = $('#delete-schuberg-certificate-id').val();

                XebraAuth.deleteSchubergCertificate(user_sub, certificate_id)
                    .then(result => {
                        console.log("Response", result)
                        $('#delete-schuberg-cert-modal').modal('hide');
                        $('#delete-schuberg-cert-form-btn-cancel').removeClass('disabled');
                        $('#delete-schuberg-cert-form-btn-submit').button('reset');
                        // refresh the page
                        location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                        $('#delete-schuberg-cert-modal').modal('hide');
                        alert("An error occurred sending pdf.");
                        $('#delete-schuberg-cert-form-btn-submit').button('reset');
                        $('#delete-schuberg-cert-form-btn-cancel').removeClass('disabled');
                    })
            });


        $('#certs_tbl').on('click', '.control', function (event) {

            var elementList = document.querySelectorAll('td.control');
            var resultStatus = "collapsed";
            var element;
            for (element = 0; element < elementList.length; element++) {
                var result = getComputedStyle(elementList[element], ':before').content;
                if (result === '"-"')
                    resultStatus = "expanded";
            }

            if (resultStatus === "expanded") {
                //clear all events before creating to prevent duplicate events in one button
                $('a[name="edit-holder-btn"]').off("click");
                $('button[name="view-cert-btn"]').off("click");
                $('button[name="send-cert-btn"]').off("click");
                $('button[name="delete-holder-btn"]').off("click");
                $('#submit-send-cert').off("click");


                deleteHolderEvent();
                $('a[name="edit-holder-btn"]').click((event) => {
                    // populate all fields required onto the holder's modal edit form
                    $('#edit-holder-id').val($(event.target).data('holder_id'));
                    $('#edit-certificate-id').val($(event.target).data('certificate_id'));
                    $('#edit-holder-name').val($(event.target).data('holder_name'));
                    $('#edit-holder-address-street').val($(event.target).data('holder_address_street'));
                    $('#edit-holder-address-city').val($(event.target).data('holder_address_city'));
                    $('#edit-holder-address-state').val($(event.target).data('holder_address_state'));
                    $('#edit-holder-address-zipcode').val($(event.target).data('holder_address_zipcode'));
                    $('#edit-holder-email').val($(event.target).data('holder_email'));
                    $('#edit-holder-phone').val($(event.target).data('holder_phone'));
                });

                $('button[name="view-cert-btn"]').click(function (e) {

                    //get data-id attribute of the clicked element
                    var certificate_id = $(this).data('certificate_id');
                    var holder_id = $(this).data('holder_id')
                    //console.log(certid)
                    // obtain the certificate
                    startLoadingSpinner();
                    XebraAuth.getCertificatePDF(user_sub, certificate_id, holder_id)
                        .then(result => {
                            console.log("result", result);
                            console.log("encoded pdf", result.data)
                            $('#showCertificatePDFIframe').attr('data', "data:application/pdf;base64," + result.data.data);
                            stopLoadingSpinner();
                            $('#showCertificatePDF').modal('show');

                        })
                        .catch(error => {
                            console.log(error);
                            stopLoadingSpinner();
                            alert("An error occurred obtaining pdf.");
                        })
                });

                $('button[name="send-cert-btn"]').click(function (e) {

                    //get data-id attribute of the clicked element
                    let body = {};

                    body["holder_name"] = $(this).data('holder_name');
                    body["holder_email"] = $(this).data('holder_email').toLowerCase();
                    body["user_sub"] = user_sub;
                    body["cert_id"] = $(this).data('certificate_id');
                    body["holder_id"] = $(this).data('holder_id');
                    body["date_sent"] = moment().format();
                    body["cert_number"] = $(this).data('certificate_number').toString();
                    body["sender_user_sub"] = loggedInUser.sub;
                    // display on modal
                    $('#send-holder-name').text(body.holder_name);
                    $('#send-holder-email').text('[' + body.holder_email + ']');
                    //console.log(certid)
                    // obtain the certificate
                    //startLoadingSpinner();
                    $('#send-cert-modal-input').data(body);
                    $('#send-cert-modal').modal('show');
                });

                $('#submit-send-cert').click(function (e) {
                    $('#submit-send-cert').button('loading');
                    $('#cancel-send-cert').addClass('disabled');
                    let body = $('#send-cert-modal-input').data()
                    
                    delete body["_inputmask_opts"];
                    console.log(body);
                    XebraAuth.sendCertificate(body)
                        .then(result => {
                            console.log("Response", result)
                            $('#send-cert-modal').modal('hide');
                            $('#cancel-send-cert').removeClass('disabled');
                            $('#submit-send-cert').button('reset');
                        })
                        .catch(error => {
                            console.log(error);
                            $('#send-cert-modal').modal('hide');
                            alert("An error occurred sending pdf.");
                            $('#submit-send-cert').button('reset');
                            $('#cancel-send-cert').removeClass('disabled');
                        })
                });

            }
        });
    }

    function updateCertificateHolder(){

            console.log($('#insured option:selected').attr('id'));
            if($('#insured option:selected').attr('id') !== '-1') {
                let insured_address = $('#insured_address').val();
                $('#cert_holder').val($('#insured option:selected').val() + '\r\n' + insured_address);
            }
            else{
                $('#cert_holder').val('');
            }
    }

    function loadCertificateForm(user, user_sub, certificate=null, type="new"){
        // load any fields that are required as hidden inputs
        insertHiddenInput(type + '-cert-form', 'user_sub', user_sub);
        // get user details
        loadMobileUserDetails(user);

        // look for values of this type of format inside the string
        // to parse appropriate date string
        var formats = [
            moment.ISO_8601,
            "MM/DD/YYYY"
        ];
        // load all fields of edit certificate form ONLY
        if(type === "edit") {
            console.log('certificate', certificate)
            for (var key in Object.keys(certificate)) {
                // insert to html if not null or empty
                if (certificate[Object.keys(certificate)[key]] !== undefined || certificate[Object.keys(certificate)[key]] !== '') {
                    // check if it's of check box
                    if (certificate[Object.keys(certificate)[key]] === '1') {
                        console.log('checked', Object.keys(certificate)[key])
                        $('#' + Object.keys(certificate)[key]).iCheck('check');
                    }
                    else if( certificate[Object.keys(certificate)[key]] === '0'){
                        $('#' + Object.keys(certificate)[key]).iCheck('uncheck');
                    }
                    else if(moment(certificate[Object.keys(certificate)[key]],formats, true).isValid() &&
                        (Object.keys(certificate)[key].includes("date") || Object.keys(certificate)[key].includes("expires") || Object.keys(certificate)[key].includes("effective"))){
                        $('#' + Object.keys(certificate)[key]).val(moment(certificate[Object.keys(certificate)[key]]).utc().format('MM-DD-YYYY'));
                    }
                    else {
                        $('#' + Object.keys(certificate)[key]).val(certificate[Object.keys(certificate)[key]]);
                    }
                }
            }

            if (certificate.certificate_number !== undefined)
                $('#this_cert_number').text(certificate.certificate_number);
                WhoIs(certificate.user_sub_last_modified);
                $('#this_cert_modified_date').text(moment(certificate.date_last_modified).tz('America/Los_Angeles').format('MM-DD-YYYY @ hh:mm a'));

            console.log('Certificate Data', certificate);
            console.log('Certificate No', certificate.certificate_number);
            // load the certificate id for later use
            insertHiddenInput(type +'-cert-form', 'certificate_id', certificate.id);
        }

        let email = getUserAttributeValueByName(user, 'email');
        let last_name = getUserAttributeValueByName(user, 'family_name');
        let first_name = getUserAttributeValueByName(user, 'given_name');
        let amsno = getUserAttributeValueByName(user,'custom:amsno');
        let address_street = getUserAttributeValueByName(user,'custom:address_street');
        let address_city  = getUserAttributeValueByName(user,'custom:address_city');
        let address_state = getUserAttributeValueByName(user,'custom:address_state');
        let address_zipcode = getUserAttributeValueByName(user,'custom:address_zipcode');
        let company = getUserAttributeValueByName(user,'custom:company');

        let listInsured = [];

        if( first_name !== '')
            insertHiddenInput( type + '-cert-form', 'full_name', first_name + ' ' + last_name);
        if( email !== '')
            insertHiddenInput(type + '-cert-form', 'email', email);
        if( amsno !== '')
            insertHiddenInput(type +'-cert-form', 'custom-amsno', amsno);
        if( company !== '') {
            listInsured.push(company);
        }

        // let's make the next index the name of user
        listInsured.push(first_name + ' ' + last_name);

        // modify the view to show the address on the page
        $('#insured_address').val(address_street +'\r\n'+address_city + ', ' + address_state + ' ' + address_zipcode);

        // populate the list for insured
        generateInsuredDropDown(listInsured);
        // if edit form, select drop down list previosly
        if (type === 'edit'){
            if(certificate.cert_holder_name !== undefined || certificate.cert_holder_name !== '' )
                if($('#insured option[value="' + certificate.cert_holder_name +'"]').length)
                    $('#insured').val(certificate.cert_holder_name).attr('selected', 'selected');
        }

        XebraAuth.getListUsers().then( (response) => {
            if (response.status != 200) {
                console.log(new Error("An error occurred listing users."))
                alert("An error occurred listing users.");
                return;
            }
            // let's store the data for later user;
            users = response.data;
            console.log(response.data);
            // check if atleat one object exist
            if(response.data.hasOwnProperty("admins")
                && response.data.agents.hasOwnProperty("Users")
                && response.data.agents.Users.length) {
                // go through each user to list
                generateAgentsDropDown(response.data.agents.Users);
                // if edit form then select the contact name
                if (type=== 'edit'){
                    // select contact name if exist
                    if(certificate.contact_name !== undefined || certificate.contact_name !== '' ){
                        if($('#contact_name option[value="' + certificate.contact_name +'"]').length)
                            $('#contact_name').val(certificate.contact_name).attr('selected', 'selected');
                    }
                }

            }
        }).catch((err) => {
            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else{
                alert("An unknown error occurred. Please try refreshing page.");
            }

        });

    }

    function getUserAttributeValueByName(user, attributeName){
        for(let attr in user.Attributes){
            if (user.Attributes[attr].Name === attributeName)
                return user.Attributes[attr].Value;
        }
        return '';
    }

    function insertHiddenInput(parentId, inputId, value){
        $('#' + parentId).append('<input id=' + inputId + ' type="hidden" value="' + value + '"/>')
    }
    
    function loadUserActivityPage(fromDate, toDate){

        XebraAuth.getUserActivity(fromDate, toDate).then( (response) => {
            if (response.status != 200) {
                console.log(new Error("An error occurred listing users."))
                alert("An error occurred listing users.");
                return;
            }
            stopLoadingSpinner();
            var table = $('#user_activity_tbl').DataTable();
            table.clear().draw();

            // check if atleat one object exist
            if(response.data.length > 0) {

                // go through each activity in list
                response.data.forEach(activity => {
                    var rowData = generateUserActivityRow(activity);

                    table.row.add([rowData.name, rowData.user_role, rowData.username, rowData.action, rowData.record_type, rowData.record, rowData.record_id, rowData.date, rowData.client_ip]);
                });
                
                table.draw();

            }
        }).catch((err) => {
            stopLoadingSpinner();
            if(err.data.message.includes("request is expired")){
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else{
                alert("An unknown error occurred. Please try refreshing page.");
            }

        });
    }
    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            // Remove # from URL - Check reason
            if(hash.length > 1) {
                vars[hash[0]] = hash[1].replace('#', '');
            }
        }

        return vars;
    }

    function generateAgentsDropDown(agents){
//"<select name=\"contact_name\" class=\"form-control\">\n" +
        var dropDownList = "<option id=\"-1\">-- select --</option>\n";
        for (var user in agents) {
            var fname = '';
            var lname = '';
            for(var attr in agents[user].Attributes){
                if(agents[user].Attributes[attr].Name === "given_name")
                    fname = agents[user].Attributes[attr].Value;
                else if(agents[user].Attributes[attr].Name === "family_name")
                    lname = agents[user].Attributes[attr].Value;
            }
            let fullname = fname + ' ' + lname;
            dropDownList += '<option id="' + agents[user].Username + '" value="' + fullname + '"> ' + fullname + '</option>\n';

            //generateAdminRow(response.data.agents.Users[user], "Agent");
        }
         //dropDownList += "</select>";
        $('#contact_name').append(dropDownList);
        $('#contact_name').change(function() {
            var id = $(this).children(":selected").attr("id");
            console.log(id);
        });

    }

    function generateInsuredDropDown(insuredNameList){
//"<select name=\"contact_name\" class=\"form-control\">\n" +
        var dropDownList = "<option id=\"-1\">-- select --</option>\n";

        for (var insuredName in insuredNameList) {
            dropDownList += '<option id="' + insuredName + '" value="' + insuredNameList[insuredName] + '">' + insuredNameList[insuredName] + "</option>\n";
        }
        $('#insured').append(dropDownList);
        // check to see if we obtained more than one insured name, if so index 0 should be company name
        if(insuredNameList.length > 1){
            $('#insured option[id="0"]').attr('selected','selected');
        }

        // update the certificate holder name/address textarea
        updateCertificateHolder();
    }
    
    function generateCertificateRow(certificate, user, userId, cid) {
        var holderTable = '';

        // handle a null certificate
        if (certificate === null || user === null || cid === null) {
            return
        }

        // Check 14 day range to disable email function
        var disableSend = checkExpiringDates(certificate.gen_liab_expires, certificate.auto_liab_expires, certificate.umb_liab_expires, certificate.workers_comp_expires, certificate.other_coverage_expires, certificate.other_coverage_expires_b, certificate.excess_liab_expires);

        holderTable += "<div class=\"transaction-table-div\">\n";
        holderTable += "    <table class=\"transaction-table\" id=\"holder-table\">\n";
        holderTable += "       <thead>\n";
        holderTable += "            <tr class=\"table-gen transaction-table-head\">\n";
        holderTable += "                <th class=\"table-gen transaction-table-head\"> Holder </th>\n";
        holderTable += "                <th class=\"table-gen transaction-table-head\"> Email </th>\n";
        holderTable += "                <th class=\"table-gen transaction-table-head\"> Phone </th>\n";
        holderTable += "                <th class=\"table-gen transaction-table-head\"> Address </th>\n";
        holderTable += "                <th class=\"table-gen transaction-table-head\"> Issue date </th>\n";
        holderTable += "                <th class=\"table-gen transaction-table-head\"> Actions </th>\n";
        holderTable += "            </tr>\n";
        holderTable += "        </thead>\n";
        holderTable += "        <tbody>\n";
        for (var holder in certificate.holders) {
            holderTable += generateHolderRow(certificate.holders[holder], certificate.certificate_number, disableSend);
        }

        holderTable += "        </tbody>\n";
        holderTable += "    </table>\n";
        holderTable += "</div>";

        let action = '<button name="add-holder-btn" type="button" class="btn btn-outline blue btn-xs" data-toggle="modal" data-certificate_id="' + certificate.id + '" data-user_sub="' + user.Username + '" href="#addHolder">Add Holder</button>'
                        + '<button name="delete-cert-btn" type="button" class="btn btn-outline red btn-xs" data-certificate_id="' + certificate.id + '" data-certificate_number="' + certificate.certificate_number + '">Delete Certificate</button>';
        let is_schuberg = "";
        for (let attribute in user.Attributes) {
            if (user.Attributes[attribute].Name === "custom:is_schuberg")
                is_schuberg = user.Attributes[attribute].Value;
        }

        if (is_schuberg === "true") {
                        if (certificate.has_schuberg_file) {
                            action += '<button name="view-schuberg-cert-btn" type="button" class="btn btn-outline purple btn-xs show-cert-pdf" data-certificate_id="' + certificate.id + '" data-user_sub="' + certificate.user_sub + '">Schuberg view</button>'
                                + '<button name="delete-schuberg-cert-btn" type="button" class="btn btn-outline purple btn-xs" data-certificate_id="' + certificate.id + '" data-certificate_number="' + certificate.certificate_number + '" data-user_sub="' + certificate.user_sub + '">Schuberg Delete</button>';

                        }
                        else {
                            action += '<button name="upload-schuberg-cert-btn" type="button" class="btn btn-outline purple btn-xs" data-certificate_id="' + certificate.id + '" data-user_sub="' + certificate.user_sub + '">Upload Schuberg</button>';
                        }
                   }

        return {
            "cert_no": '<a class="btn btn-outline blue btn-xs" href="edit_certificate.html?uid=' + userId + '&cid=' + cid + '">' + certificate.certificate_number + '</a>',
            "add_holder": action,
            "holder_table": holderTable
        }
    }
	
	function generateHolderRow(holder, certificate_number, disableSend){

        var hid = holder.id;
		var hn = holder.name;
		var he = holder.email;
		var ph = formatPhoneNumber(holder.phone);
        var adds = holder.address_street;
        var addc = holder.address_city;
        var addst = holder.address_state;
        var addz = holder.address_zipcode;
        var dt = moment(holder.issued_date).tz('America/Los_Angeles').format('MM-DD-YYYY');
        var hcid = holder.cert_id;
        var dataRow = "";
        var emailButtonStatus = "";

        if (disableSend === 1) {
            emailButtonStatus = 'disabled'
        } else if(disableSend === 0) {
            emailButtonStatus = ''
        }
		
        dataRow += '             <tr>\n';
        dataRow += '                <td class ="transaction-table-row-div"><a name="edit-holder-btn" data-certificate_id="' + hcid + '" data-holder_id="' + hid +
            '" data-holder_name="' + hn + '" data-holder_email="' + he + '" data-holder_address_street="' + adds +
            '" data-holder_phone="' + ph + '" data-holder_issued_date="' + holder.issued_date + '" data-holder_address_city="' + holder.address_city + '" data-holder_address_state="' + holder.address_state + '" data-holder_address_zipcode="' + holder.address_zipcode +
                        '" href="#" data-toggle="modal" data-target="#editHolder">'+ hn +'</a></td>';
        dataRow += '                <td class ="transaction-table-row-div">' + he + '</td>\n';
        dataRow += '                <td class="table-gen transaction-table-row-div">' + ph + '</td>\n';
        dataRow += '                <td class ="transaction-table-row-div">' + adds + '  ' + addc + '  ' + addst + '  ' + addz + '</td>\n';
        dataRow += '                <td class="table-gen transaction-table-row-div">' + dt + '</td>\n';
        dataRow += '                <td class="table-gen transaction-table-row-div">' +
                                    '<button name="view-cert-btn" data-certificate_id="' + hcid + '" data-holder_id="' + hid + '" type="button" class="btn btn-circle btn-icon-only btn-default show-cert-pdf" title="View"><i class="fa fa-file-pdf-o"></i></button>' +
                                    '<button name="send-cert-btn" data-certificate_id="' + hcid + '" data-holder_id="' + hid + '" data-holder_email="' + he + '" data-holder_name="' + hn + '" data-certificate_number="' + certificate_number + '" type="button" class="btn btn-circle btn-icon-only btn-default" title="Send" ' + emailButtonStatus + '><i class="fa fa-envelope"></i></button>' +
                                    '<button name="delete-holder-btn" data-holder_id="' + hid + '" data-holder_name="' + hn + '" type="button" class="btn btn-circle btn-icon-only btn-default" title="Delete"><i class="fa fa-trash"></i></button></td>\n';

        dataRow += '            </tr>\n';

		return dataRow;
	}


    function checkExpiringDates(gen_liab_expires, auto_liab_expires, umb_liab_expires, workers_comp_expires, other_coverage_expires, other_coverage_expires_b, excess_liab_expires) {

        var expirationRange = 14;
        var disableSend = "";
        var todays_date = moment().startOf('day').utc().tz('America/Los_Angeles');

        if (gen_liab_expires != undefined) {
            var gle = moment(gen_liab_expires).startOf('day');
            var gle_days = gle.diff(todays_date, 'days') + 1;
        }

        if (auto_liab_expires != undefined) {
            var ale = moment(auto_liab_expires).startOf('day');
            var ale_days = ale.diff(todays_date, 'days') + 1;
        }

        if (umb_liab_expires != undefined) {
            var ule = moment(umb_liab_expires).startOf('day');
            var ule_days = ule.diff(todays_date, 'days') + 1;
        }

        if (workers_comp_expires != undefined) {
            var wce = moment(workers_comp_expires).startOf('day');
            var wce_days = wce.diff(todays_date, 'days') + 1;
        }

        if (other_coverage_expires != undefined) {
            var oce = moment(other_coverage_expires).startOf('day');
            var oce_days = oce.diff(todays_date, 'days') + 1;
        }

        if (other_coverage_expires_b != undefined) {
            var oceb = moment(other_coverage_expires_b).startOf('day');
            var oceb_days = oceb.diff(todays_date, 'days') + 1;
        }

        if (excess_liab_expires != undefined) {
            var ele = moment(excess_liab_expires).startOf('day');
            var ele_days = ele.diff(todays_date, 'days') + 1;
        }

        if (gle_days <= expirationRange || ale_days <= expirationRange || ule_days <= expirationRange || wce_days <= expirationRange || oce_days <= expirationRange || oceb_days <= expirationRange || ele_days <= expirationRange) {
            disableSend = 1;
        } else {
            disableSend = 0;
        }

        console.log('gle_days =', gle_days);
        console.log('ale_days =', ale_days);
        console.log('ule_days =', ule_days);
        console.log('wce_days =', wce_days);
        console.log('oce_days =', oce_days);
        console.log('oceb_days =', oceb_days);
        console.log('ele_days =', ele_days);
        return disableSend;
    }


	function formatPhoneNumber(s) {
		var s2 = (""+s).replace(/\D/g, '');
		var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
		return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    }

    function getTodaysDate() {
            var NowMoment = moment();
            var todays_date = NowMoment.format('MM-DD-YYYY');
            document.getElementById('certificate_todays_date').value = todays_date;
            
    }

    function generateAccountsRow(user, userId, userType){
        var email_verified = false;
        var email = "";
        var first_name = "";
        var middle_name = "";
        var last_name = "";
        var full_name = "";
        var enabled = "";
        var btnPause = "";
        var title = "";

        // iterate through attributes
        for(var attr in user.Attributes){
            if(user.Attributes[attr].Name == "email")
                email = user.Attributes[attr].Value;
            else if(user.Attributes[attr].Name == "email_verified")
                email_verified = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "given_name")
                first_name = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "middle_name")
                middle_name = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "family_name")
                last_name = user.Attributes[attr].Value;
        }

        full_name = first_name + " " + middle_name + " " + last_name;

        var userCreateDateLocal = moment(user.UserCreateDate).format('MM-DD-YYYY hh:mm a');
        var userLastModifiedDateLocal = moment(user.UserLastModifiedDate).format('MM-DD-YYYY hh:mm a');

        if (user.Enabled){
            enabled = "Enabled";
            btnPause = '<i class="fa fa-toggle-on"></i>';
            title = 'title="Disable"';
        }
        else{
            enabled = "Disabled";
            btnPause = '<i class="fa fa-toggle-off"></i>';
            title = 'title="Enable"';
        }
        let actions = '<button name="edit-user-btn" data-uid="' + userId + '" data-utype="' + userType + '" type="button" class="btn btn-circle btn-icon-only btn-default" title="Edit"><i class="fa fa-gears"></i></button>' +
            '<button name="pause-user-btn" data-uid="' + userId + '" data-utype="' + userType + '" type="button" class="btn btn-circle btn-icon-only btn-default" '+title+'>'+btnPause+'</button>';

        if(user.UserStatus === 'FORCE_CHANGE_PASSWORD')
            actions += '<button name="resend-confirmation" type="button" class="btn btn-circle btn-icon-only btn-default" title="Resend Confirmation" data-uid="' + userId
                + '" data-utype="' + userType + '"><i class="fa fa-envelope"></i></button>';

        return {
            "name": full_name,
            "email": email,
            "added": userCreateDateLocal,
            "last_modified": userLastModifiedDateLocal,
            "status": user.UserStatus,
            "enabled": enabled,
            "actions": actions
        };
    }

    function generateUserActivityRow(activity){
        return {
            "name": activity.user_fullname,
            "user_role": activity.user_role,
            "username": activity.user_email,
            "action": activity.action,
            "record_type": activity.record_type,
            "record": activity.record_description,
            "record_id": activity.record_id,
            "date": moment(activity.record_iso_timestamp).format('MM-DD-YYYY hh:mm a'),
            "client_ip": activity.client_ip
        }
    }
 
    function generateMobileUserRow(user, userId) {
        var email = "";
        var amsno = "";
        var first_name = "";
        var middle_name = "";
        var last_name = "";
        var full_name = "";
        var conf = "";
        var status = "";
        var btnPause = "";
        var enabled = "";

        // iterate through attributes
        for (var attr in user.Attributes) {
            if (user.Attributes[attr].Name == "email")
                email = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "email_verified")
                email_verified = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "given_name")
                first_name = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "middle_name")
                middle_name = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "family_name")
                last_name = user.Attributes[attr].Value;
            else if (user.Attributes[attr].Name == "custom:amsno")
                amsno = user.Attributes[attr].Value;
        }

        full_name = first_name + " " + middle_name + " " + last_name;

        var MobileCreateDateLocal = moment(user.UserCreateDate).format('MM-DD-YYYY hh:mm a');
        var MobileLastModifiedDateLocal = moment(user.UserLastModifiedDate).format('MM-DD-YYYY hh:mm a');

        if (user.Enabled) {
            enabled = "Enabled";
            btnPause = '<i class="fa fa-toggle-on"></i>';
            title = 'title="Disable"';
        }
        else{
            enabled = "Disabled";
            btnPause = '<i class="fa fa-toggle-off"></i>';
            title = 'title="Enable"';
        }

        let actions = '<button name="edit-user-btn" id="' + userId + '" type="button" class="btn btn-circle btn-icon-only btn-default" title="Edit"><i class="fa fa-gears"></i></button>' +
            '<button name="pause-user-btn" data-uid="' + userId + '" type="button" class="btn btn-circle btn-icon-only btn-default" '+title+'>'+btnPause+'</button>';

        if(user.UserStatus === 'FORCE_CHANGE_PASSWORD')
            actions += '<button name="resend-confirmation" type="button" class="btn btn-circle btn-icon-only btn-default" title="Resend Confirmation" data-uid="' + userId + '"><i class="fa fa-envelope"></i></button>';

        //actions += '<button name="delete-user" type="button" class="btn btn-circle btn-icon-only btn-default" title="Delete user" data-uid="' + userId+ '" data-uemail="'+ email +'"><i class="fa fa-trash"></i></button>';

        return {
            "amsno": amsno,
            "name": full_name,
            "email": email,
            "certs": '<a href="user_certificates.html?uid=' + userId +'" ' + 'class="btn btn-circle btn-icon-only btn-default"><i class="fa fa-search"></i></a>',
            "history": '<a href="sent_history.html?uid=' + userId + '" class="btn btn-circle btn-icon-only btn-default"><i class="fa fa-history"></i></a>',
            "referral": '<a href="referral.html?uid=' + userId + '" class="btn btn-circle btn-icon-only btn-default"><i class="fa fa-user-plus"></i></a>',
            "date_added": MobileCreateDateLocal,
            "last_modified": MobileLastModifiedDateLocal,
            "status": user.UserStatus,
            "enabled": enabled,
            "actions": actions
        };
                            
    }

    function generateSentHistoryRow(sentData) {
        
        var cert = "";
        var holder = "";
        var hid = "";
        var hcid = "";
        var shid = "";
        var holder_email = "";
        var date_sent = "";
        
        cert = sentData["cert_number"];
        holder = sentData["holder_name"];
        hid = sentData["holder_id"];
        hcid = sentData["cert_id"];

        //var certData = JSON.parse(sentData.cert_data);
        //shid = certData.id;
        shid = sentData.id;

        holder_email = sentData["holder_email"];
        date_sent = moment(sentData["date_sent"]).format('MM-DD-YYYY hh:mm a');
                
        return {
            "cert": '<button name="view-cert-btn" data-sent_history_id="' + shid + '" type="button" class="btn btn-outline blue btn-xs" title="View">' + cert + '</button>',
            "holder": holder,
            "holder_email": holder_email,
            "date_sent": date_sent,
        };

    }

    function generateReferralHistoryRow(sentData) {
        let action = '';

        if(sentData.status.toLowerCase() == 'pending')
            action += '<button name="redeem-referral-btn" type="button" class="btn btn-circle btn-icon-only btn-default" title="Redeem" data-uid="' + sentData.id + '"><i class="fa fa-gift"></i></button>' +
            '<button name="approve-referral-btn" type="button" class="btn btn-circle btn-icon-only btn-default" title="Approve" data-uid="' + sentData.id + '"><i class="fa fa-check"></i></button>' +
            '<button name="decline-referral-btn" type="button" class="btn btn-circle btn-icon-only btn-default" title="Reject" data-uid="' + sentData.id + '"><i class="fa fa-ban"></i></button>';

        var lastUpdatedDate = sentData["last_updated_date"]== null ? null : moment(sentData["last_updated_date"]).format('MM-DD-YYYY hh:mm a');
        var user = sentData.created_by ? tranformUserObject(JSON.parse(localStorage.getItem("users")).Users.find(x => x.Username == sentData.created_by)) : null;
        return {
            "dateReferred": moment(sentData["date_referred"]).format('MM-DD-YYYY hh:mm a'),
            "name": sentData.full_name,
            "email": sentData.email,
            "phone": formatPhoneNumber(`"${sentData.mobile_phone}"`),
            "service": sentData.service,
            "status": getReferralStatus(sentData.status),
            "createdBy": user == null ? null : getUserAttributeValueByName(user, 'given_name') + ' ' + getUserAttributeValueByName(user, 'middle_name') + ' ' + getUserAttributeValueByName(user, 'family_name'),
            "lastUpdatedDate": lastUpdatedDate,
            "actions": action
        };

    }

    function getReferralStatus(status){
        if(status === 'notredeemed')
            return 'NOT REDEEMED'
        else
            return status.toUpperCase()
    }

    function logout(e){
        e.preventDefault();
        XebraAuth.signOut('login.html');
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    // ****************************
    // ****************************
    // START BRIDGE FUNCTIONS
    
    function loadBridgeTransactions() {
        XebraAuth.getListTransactions().then((response) => {
            if (response.status != 200) {
                console.log(new Error("An error occurred listing users."))
                alert("An error occurred listing users.");
                return;
            }
            
            transaction_results = response;
            generateTransactionsRows(transaction_results);

            stopLoadingSpinner();

        }).catch((err) => {
            stopLoadingSpinner();
            if (err.data.message.includes("request is expired")) {
                // clear the credentials
                XebraAuth.clearCred();
                // refresh the page
                location.reload();
            }
            else {
                alert("An unknown error occurred. Please try refreshing page.");
            }
        }
        );
    }

    function limitTextArea(inputtextarea){
    $(inputtextarea)
        .on('keypress', function (event) {
            var textarea = $(this),
                text = textarea.val(),
                numberOfLines = (text.match(/\n/g) || []).length + 1,
                maxRows = parseInt(textarea.attr('rows'));

            if (event.which === 13 && numberOfLines === maxRows) {
                return false;
            }
            });
    }

    function getCurrentYear() {
        var currentYear = new Date().getFullYear();
        $('#footerCurrentYear').append(currentYear);
    }

    // ****************************
    // START RESPONSIVE TABLE STYLE
    // ****************************
    var process_type = "";
    function generateTransactionsRows(transactions) {

        var transactionTable = "";
        var bankName = "";

        var table = $('#bank_bridge_tbl').DataTable();

        var transactions = transactions.data;

        for (var transaction in transactions) {

            transactionTable = "";
            bankName = "";

            var bankEmail = transactions[transaction].bank_email;
            var fileName = transactions[transaction].filename;


            bankName = "Bank";

            var transactionDateTime = moment(transactions[transaction].transaction_date).format('MM/DD/YYYY hh:mm a');

            // let's set the default to cancel
            process_type = "cancel";
            var transactionTableRows = generateTransactionTableRows(transactions[transaction]);
            var transactionTableHead = "transaction-table-head-" + process_type;
            // capitalize first character
            var columnProcessTypeName = process_type.charAt(0).toUpperCase() + process_type.slice(1).toString();
            transactionTable += "<div class=\"transaction-table-div\">\n";
            transactionTable += "    <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"transaction-table\">\n";
            transactionTable += "       <thead>\n";
            transactionTable += "            <tr class=\"table-gen transaction-table-head\">\n";
            transactionTable += "                <th class=\"table-gen "+ transactionTableHead +"\"> </th>\n";
            transactionTable += "                <th class=\"table-gen "+ transactionTableHead +"\">AMS 360 No.</th>\n";
            transactionTable += "                <th class=\"table-gen "+ transactionTableHead +"\">Client Name</th>\n";
            transactionTable += "                <th class=\"table-gen "+ transactionTableHead +"\">"  + columnProcessTypeName + " Date</th>\n";
            transactionTable += "                <th class=\"table-gen "+ transactionTableHead +"\">Policies</th>\n";
            transactionTable += "                <th class=\"table-gen "+ transactionTableHead +"\">24/7 Status</th>\n";
            transactionTable += "                <th class=\"table-gen "+ transactionTableHead +"\">Mobile Status</th>\n";
            transactionTable += "            </tr>\n";
            transactionTable += "        </thead>\n";
            transactionTable += "        <tbody>\n";


            transactionTable += "            " + transactionTableRows;
            transactionTable += "        </tbody>\n";
            transactionTable += "    </table>\n";
            transactionTable += "</div>\n";

            table.row.add(["", bankEmail, fileName, bankName, transactionDateTime, transactionTable]);
        }
        table.draw();
    }

    function generateTransactionTableRows (transactionData) {
        // Bootstrap Style
        var greenCheck = "<i class=\"fa fa-check green\"></i>";
        var redEx = "<i class=\"fa fa-times red\"></i>";
        var warning = "<i class=\"fa fa-exclamation-triangle orange\"></i>";
        var row = "";
        var rowSet = "";
        var rowState = "even";
        var rowNumber = 1;

        var transaction = JSON.parse(transactionData.json);

        // let's set the process type
        // cancel || reinstate
        // let's just set the first one
        var processStatusPresent = "";
        var processStatusPast = "";
        var processTitle = "";
        if(transaction.length > 0 && transaction[0].process_type) {
            process_type = transaction[0].process_type;
            // capitalize first letter
            processStatusPresent = process_type.charAt(0).toUpperCase() + process_type.slice(1);
            processStatusPast = process_type === "reinstate"? "Reinstated": "Cancelled";
        }
        // Generate each client's transaction row
        for (var client in transaction) {

            if (rowState == "even") {
                rowOddEvenState = "even-row";
                rowState = "odd";
            } else {
                rowOddEvenState = "odd-row";
                rowState = "even";
            }


            // Set search AMS status if it was found
            if (transaction[client].status.isFoundAMS)
                amsSearchStatus = "";
            else
                amsSearchStatus = redEx;

            var cancelStatus247 = transaction[client].status.isCancelled247;

            if (cancelStatus247 === null)
                cancel247status = redEx + processStatusPresent + " Failed";
            else if (typeof cancelStatus247 === "boolean") {
                // Set 247 cancelled status
                if (cancelStatus247)
                    cancel247status = greenCheck + processStatusPast + " Successfully";
                else if (!cancelStatus247)
                    cancel247status = redEx + processStatusPresent + " Failed";
            }
            else if (typeof cancelStatus247 === "string") {
                // Set 247 cancelled status
                if (cancelStatus247 === "pass")
                    cancel247status = greenCheck + processStatusPast + " Successfully";
                else if (cancelStatus247 === "fail")
                    cancel247status = redEx + processStatusPresent + " Failed";
                else if (cancelStatus247 === "warning, remained enabled")
                    cancel247status = warning + "Remained Enabled";
                else if (cancelStatus247 === "warning, remained disabled")
                    cancel247status = warning + "Remained Disabled";
                else if (cancelStatus247 === "warning, no account")
                    cancel247status = warning + "No Account";
                else if (cancelStatus247 === "warning, status unknown")
                    cancel247status = warning + "Status Unknown";
            }
            var amsAccountNo = transaction[client].amsAcctNum;
            if (amsAccountNo === null)
                amsAccountNo = "Not found";
            var date = "";

            if(process_type === "cancel"){
                date = new Date(transaction[client].cancellation_date);
                // just in case we find a bad date of 1/01/1
                // console.log(new Date(transaction[client].cancellation_date).toDateString())
                // console.log(new Date("1/01/1").toDateString());
                // if(new Date(transaction[client].cancellation_date).toDateString() === new Date("0001-01-01T00:00:00").toDateString()){
                //     // we need to go look for a valid one
                //     for(var t in transaction){
                //         if(transaction[t].cancellation_date !== Date.parse("0001-01-01T00:00:00")){
                //             date = new Date(transaction[client].cancellation_date);
                //             break;
                //         }
                //     }
                // }
                // else
                //     date = new Date(transaction[client].cancellation_date);

            }
            else if(process_type === "reinstate" && transaction[client].reinstatement_date){
                // just in case we find a bad date of 1/01/1
                console.log(new Date(transaction[client].reinstatement_date).toDateString())
                    console.log(new Date("1/01/1").toDateString());
                if(new Date(transaction[client].reinstatement_date).toDateString() === new Date("0001-01-01T00:00:00").toDateString()){
                    // we need to go look for a valid one
                    for(var t in transaction){
                        if(transaction[t].reinstatement_date !== Date.parse("0001-01-01T00:00:00")){
                            date = new Date(transaction[t].reinstatement_date);
                            break;
                        }
                    }
                }
                else
                    date = new Date(transaction[client].reinstatement_date);
            }
            else{
                date = new Date(transaction[client].cancellation_date);
            }

            var day = date.getDate();
            if (day < 10)
                day = "0" + day;

            var cancellationDate = (date.getMonth() + 1) + '/' + day + '/' + date.getFullYear();

            row += "<tr class= \"" + rowOddEvenState + "\">\n";
            row += "    <td class =\"table-gen transaction-table-row-div\">" + rowNumber + "</td>\n";
            row += "    <td class =\"table-gen transaction-table-row-div\">" + amsAccountNo + "</td>\n";
            row += "    <td class =\"transaction-table-row-div\">" + amsSearchStatus + transaction[client].name + "</td>\n";
            row += "    <td class =\"table-gen transaction-table-row-div\">" + cancellationDate + "</td>\n";
            row += "    <td class =\"transaction-table-row-div\">";

            var policies = transaction[client].policies;

            if (policies.length < 1)
                row += redEx + "N/A</td>\n";
            else {
                for (var policy in policies) {

                    var policyCancelStatus = policies[policy].policy_status.isPolicyCancelled;
                    
                    if (policyCancelStatus === null)
                        cancelAMSPolicystatus = redEx;
                    else if (typeof policyCancelStatus === "boolean") {
                        // Set Policy cancelled status
                        if (!policyCancelStatus)
                            cancelAMSPolicystatus = redEx;
                        else
                            cancelAMSPolicystatus = greenCheck;
                    }
                    else if (typeof policyCancelStatus === "string") {
                        // Set Policy cancelled status
                        if (policyCancelStatus !== null) {
                            if (policyCancelStatus === "fail")
                                cancelAMSPolicystatus = redEx;
                            else if (policyCancelStatus === "warning")
                                cancelAMSPolicystatus = warning;
                            else if (policyCancelStatus === "pass")
                                cancelAMSPolicystatus = greenCheck;
                        } else
                            cancelAMSPolicystatus = redEx;
                    }

                    // Check if Policy is last policy and that policy number is not blank
                    if ((parseInt(policy) === (policies.length - 1)) && (policies[policy].policy_number !== ""))
                        row += cancelAMSPolicystatus + policies[policy].policy_number + "</td>\n";
                    // if it is not the last one add it to data and add a comma at end
                    else if (!(policies[policy].policy_number === ""))
                        row += cancelAMSPolicystatus + policies[policy].policy_number + ", ";
                }
            }
            row += "    <td class =\"table-gen transaction-table-row-div\">" + cancel247status + "</td>\n";

            var cancelStatusMobile = transaction[client].status.isCancelledXebra;
            if (cancelStatusMobile === null || cancelStatusMobile === "Not Found" || cancelStatusMobile === undefined)
                cancelStatusMobile = warning + "No Account";
            else if (cancelStatusMobile === "Disabled")
                cancelStatusMobile = greenCheck + "Disabled Successfully";
            else if (cancelStatusMobile === "Remained Disabled")
                cancelStatusMobile = warning + "Remained Disabled";
            else if (cancelStatusMobile === "Disable Failed")
                cancelStatusMobile = redEx + "Disable Failed";

            row += "    <td class =\"table-gen transaction-table-row-div\">" + cancelStatusMobile + "</td>\n";
            row += "</tr>\n";
            rowSet += row;
            row = "";
            rowNumber = rowNumber + 1;
        }
    return rowSet;

    }
    // ****************************
    // END RESPONSIVE TABLE STYLE
    // ****************************

    // END BRIDGE FUNCTIONS
    // ****************************
    // ****************************

}(jQuery));
