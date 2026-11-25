package com.email.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.email.dtos.EmailRequest;
import com.email.services.EmailService;

@RestController
@CrossOrigin(origins = "ai-generated-emails-reply-9pbmvxnez-ayush-8e65.vercel.app")
@RequestMapping("/api/email")
public class EmailController {
	
	@Autowired
	private EmailService emailService;

	@PostMapping("/generate")
	public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
		
		String response = emailService.generateEmailResponse(emailRequest);
		
		return ResponseEntity.ok(response);
	}
}
