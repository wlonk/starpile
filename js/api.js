function apiCall(url, username, password) {
    var results = $.ajax
        ({
            type: "GET",
            url: url,
            dataType: "json",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password))
            }
        });
    console.log(results);
    return results;
};
exports.apiCall = apiCall
