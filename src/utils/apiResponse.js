class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.success = statusCode < 400; // true is staus < 400
        this.statusCode = statusCode; //HTTP status code
        this.message = message; // Message about response
        this.data = data || null; // Payload data
    }

    // Use for successful requests (default : 200)
    static success(res, data, message = "Success", statusCode = 200) {
        return res
            .status(statusCode)
            .json(new ApiResponse(statusCode, data, message));
    }

    // Use when a new resource is created (201)
    static created(res, data, message = "Resource created successfully") {
        return res.status(201).json(new ApiResponse(201, data, message));
    }
}

export default ApiResponse;

// How to use
// return ApiResponse.success(res, UserActivation, "User profile fetched.");
