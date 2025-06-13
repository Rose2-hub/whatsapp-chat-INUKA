const emailUtilisateur = localStorage.getItem("email") || "demo@inuka.com";

function chargerContacts() {
    fetch(`http://localhost:8080/contacts/${emailUtilisateur}`)
        .then(res => res.json())
        .then(data => {
            const ul = document.getElementById("liste-contacts");
            ul.innerHTML = "";
            if (data.length === 0) {
                ul.innerHTML = "<li>Aucun contact trouvé.</li>";
                return;
            }
            data.forEach(contact => {
                const li = document.createElement("li");
                li.textContent = contact.nom;
                const editBtn = document.createElement("button");
                editBtn.textContent = "✏️";
                editBtn.onclick = () => modifierContact(contact.id, contact.nom);
                const delBtn = document.createElement("button");
                delBtn.textContent = "🗑️";
                delBtn.onclick = () => supprimerContact(contact.id);
                li.appendChild(editBtn);
                li.appendChild(delBtn);
                ul.appendChild(li);
            });
        });
}

function ajouterContact() {
    const nom = document.getElementById("nouveau-contact").value;
    fetch(`http://localhost:8080/contacts/${emailUtilisateur}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom })
    }).then(() => {
        document.getElementById("nouveau-contact").value = "";
        chargerContacts();
    });
}

function modifierContact(id, ancienNom) {
    const nouveauNom = prompt("Modifier le nom du contact :", ancienNom);
    if (nouveauNom && nouveauNom.trim()) {
        fetch(`http://localhost:8080/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom: nouveauNom.trim() })
        }).then(chargerContacts);
    }
}

function supprimerContact(id) {
    if (confirm("Supprimer ce contact ?")) {
        fetch(`http://localhost:8080/contacts/${id}`, {
            method: "DELETE"
        }).then(chargerContacts);
    }
}

function deconnexion() {
    localStorage.removeItem("email");
    window.location.href = "index.html";
}

window.onload = chargerContacts;