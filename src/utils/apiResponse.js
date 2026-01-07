class ApiResponse {
    constructor(statusCode, data = null, message = "Success") {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    /**
     * 200 - OK
     */
    static success(res, data, message = "Success") {
        return res
            .status(200)
            .json(new ApiResponse(200, data, message));
    }

    /**
     * 201 - Created
     */
    static created(res, data, message = "Resource created successfully") {
        return res
            .status(201)
            .json(new ApiResponse(201, data, message));
    }

    /**
     * 204 - No Content
     * (Useful for delete operations)
     */
    static noContent(res, message = "No content") {
        return res
            .status(204)
            .json(new ApiResponse(204, null, message));
    }
}

export default ApiResponse;
