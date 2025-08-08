    const resultat = document.getElementById('resultat');

    // Point de départ du cycle
    const startDate = new Date("2025-06-05T00:00:00");
    const startIndex = 2; // jour 3 du cycle

    const cycle = [
      "Permanence",       // Jour 1
      "Garde",            // Jour 2
      "Retour de garde",  // Jour 3
      "Repos"             // Jour 4
    ];

    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    function modulo(n, m) {
      return ((n % m) + m) % m;
    }

    function rechercher() {
      const inputDate = document.getElementById('dateInput').value;
      if (!inputDate) {
        resultat.textContent = "Veuillez choisir une date.";
        return;
      }

      const selectedDate = new Date(inputDate + "T00:00:00");
      selectedDate.setHours(0, 0, 0, 0);

      const diffTime = selectedDate - startDate;
      if (diffTime < 0) {
        resultat.textContent = "Date antérieure au début du planning.";
        return;
      }

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const cycleIndex = modulo(startIndex + diffDays, cycle.length);
      const etat = cycle[cycleIndex];

      const jourNom = jours[selectedDate.getDay()];
      const jourStr = selectedDate.toLocaleDateString("fr-FR");

      resultat.innerHTML = `📅 <strong>${jourNom} ${jourStr}</strong> : Le médecin est en <span class="${etat}">${etat}</span>.`;
    }