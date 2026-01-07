class ApiResponse {
  constructor(
    statusCode,
    data = null,
    message = "Success",
    meta = null
  ) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;

    if (meta) {
      this.meta = meta;
    }

    Object.freeze(this);
  }

  /**
   * 200 - OK
   */
  static success(res, data, message = "Success", meta = null) {
    return res
      .status(200)
      .json(new ApiResponse(200, data, message, meta));
  }

  /**
   * 201 - Created
   */
  static created(
    res,
    data,
    message = "Resource created successfully"
  ) {
    return res
      .status(201)
      .json(new ApiResponse(201, data, message));
  }

  /**
   * 204 - No Content
   * ⚠️ Must not return a response body
   */
  static noContent(res) {
    return res.status(204).send();
  }

  /**
   * Generic responder (optional helper)
   */
  static send(
    res,
    statusCode,
    data = null,
    message = "Success",
    meta = null
  ) {
    if (statusCode === 204) {
      return res.status(204).send();
    }

    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          statusCode,
          data,
          message,
          meta
        )
      );
  }
}

export default ApiResponse;
