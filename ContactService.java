package com.inuka.service;

import com.inuka.model.Contact;
import com.inuka.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    @Autowired
    private ContactRepository repository;

    public List<Contact> getContacts(String email) {
        return repository.findByEmailUtilisateur(email);
    }

    public Contact addContact(String email, String nom) {
        Contact contact = new Contact();
        contact.setNom(nom);
        contact.setEmailUtilisateur(email);
        return repository.save(contact);
    }

    public Contact updateContact(String id, String nom) {
        Optional<Contact> optional = repository.findById(id);
        if (optional.isPresent()) {
            Contact contact = optional.get();
            contact.setNom(nom);
            return repository.save(contact);
        }
        return null;
    }

    public void deleteContact(String id) {
        repository.deleteById(id);
    }
}