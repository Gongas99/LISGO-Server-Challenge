module.exports = { 
    successfullyResponse(h, data){
        return h.response({
            success: true, 
            data: data
        }).code(200);
    },
    codeResponse(h, data, code){
        return h.response(data).code(code);
    },
    basicResponse(h, err, data){
        if(err)
            return h.response({
                success: false,
                error: err
            }).code(400);

        return h.response({
            success: true, 
            data: data
        }).code(200);
    }
}
