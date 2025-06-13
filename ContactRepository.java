package com.inuka.repository;

import com.inuka.model.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ContactRepository extends MongoRepository<Contact, String> {
    List<Contact> findByEmailUtilisateur(String emailUtilisateur);
}