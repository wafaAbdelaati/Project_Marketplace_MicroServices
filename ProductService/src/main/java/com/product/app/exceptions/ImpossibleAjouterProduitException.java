package com.product.app.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ImpossibleAjouterProduitException extends RuntimeException {

	public ImpossibleAjouterProduitException(String message) {
		 super(message);
	}

}
