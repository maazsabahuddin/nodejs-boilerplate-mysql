

module.exports.get_response_object = (success, response_code, response_message, response_data) => {
    let response =  {
        success: success,
        response_code: response_code,
        response_message: response_message
    }
    if (response_data) 
        response.response_data = response_data;
    
    return response;
}
