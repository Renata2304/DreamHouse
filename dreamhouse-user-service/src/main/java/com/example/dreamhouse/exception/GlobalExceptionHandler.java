package com.example.dreamhouse.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<ErrorObject> handleBadRequest(RuntimeException ex, WebRequest request) {
        ErrorObject errorObject = new ErrorObject();

        errorObject
                .setStatusCode(HttpStatus.BAD_REQUEST.value())
                .setMessage(ex.getMessage())
                .setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorObject, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InternalServerErrorException.class})
    public ResponseEntity<ErrorObject> handleInternalServerError(RuntimeException ex, WebRequest request) {
        ErrorObject errorObject = new ErrorObject();

        errorObject
                .setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .setMessage(ex.getMessage())
                .setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorObject, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({UnauthorizedException.class})
    public ResponseEntity<ErrorObject> handleUnauthorized(RuntimeException ex, WebRequest request) {
        ErrorObject errorObject = new ErrorObject();

        errorObject
                .setStatusCode(HttpStatus.UNAUTHORIZED.value()) // 401
                .setMessage(ex.getMessage())
                .setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorObject, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ErrorObject> handleForbidden(RuntimeException ex, WebRequest request) {
        ErrorObject errorObject = new ErrorObject();

        errorObject
                .setStatusCode(HttpStatus.FORBIDDEN.value()) // 403
                .setMessage(ex.getMessage())
                .setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorObject, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<ErrorObject> handleNotFound(RuntimeException ex, WebRequest request) {
        ErrorObject errorObject = new ErrorObject();

        errorObject
                .setStatusCode(HttpStatus.NOT_FOUND.value()) // 404
                .setMessage(ex.getMessage())
                .setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorObject, HttpStatus.NOT_FOUND);
    }


}
