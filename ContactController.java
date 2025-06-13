package com.inuka.controller;

import com.inuka.model.Contact;
import com.inuka.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService service;

    @GetMapping("/{email}")
    public List<Contact> getContacts(@PathVariable String email) {
        return service.getContacts(email);
    }

    @PostMapping("/{email}")
    public Contact addContact(@PathVariable String email, @RequestBody Map<String, String> body) {
        return service.addContact(email, body.get("nom"));
    }

    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable String id, @RequestBody Map<String, String> body) {
        return service.updateContact(id, body.get("nom"));
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable String id) {
        service.deleteContact(id);
    }
}