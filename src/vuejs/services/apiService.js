import Vue from 'vue'

import Utils from "./utilService.js"

var options = {
    headers: {
        'X-XSRF-TOKEN': null
    }
};

const handdlerOptions = function(opt){
    opt.headers['X-XSRF-TOKEN'] = Utils.getCookie('XSRF-TOKEN');
    opt.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return opt;
}

var serializeData = function (data) {

    var buffer = [];

    // Serialize each key in the object.
    for (var name in data) {
        if (!data.hasOwnProperty(name)) {
            continue;
        }
        var value = data[name];
        buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value));
    }

    // Serialize the buffer and clean it up for transportation.
    var source = buffer.join("&").replace(/%20/g, "+");
    return (source);

}

const login = function (obj) {
    let opt = jQuery.extend({}, options);
    opt = handdlerOptions(opt);
    opt.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return Vue.http.post(API_URL + 'login', serializeData(obj), opt);
};

const logout = function () {
    let opt = jQuery.extend({}, options);
    opt = handdlerOptions(opt);
    opt.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    return Vue.http.post(API_URL + 'logout', options);
};

const isLogado = function () {
    options = handdlerOptions(options);
    return Vue.http.get(API_URL + 'is-alive', options);
};

const getData = function (module) {
    options = handdlerOptions(options);
    return Vue.http.get(API_URL + 'api/' + module, options);
};

const deleteData = function (module) {
    options = handdlerOptions(options);
    return Vue.http.delete(API_URL + 'api/' + module, options);
};

const postData = function (module, obj) {
    options = handdlerOptions(options);
    return Vue.http.post(API_URL + 'api/' + module, obj, options);
};

const showErrors = function(r){
    if(r.body && r.body.errors){
        r.body.errors.forEach((v) => toastr.error(v.mensagem));
    }
};

export default {
    login : login,
    isLogado : isLogado,
    logout : logout,

    getData : getData,
    deleteData : deleteData,
    postData : postData,

    showErrors : showErrors
};