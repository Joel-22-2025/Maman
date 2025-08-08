const planningDiv = document.getElementById('planning');
    const resultat = document.getElementById('resultat');

    // Point de départ du cycle
    const startDate = new Date("2025-06-05");
    startDate.setHours(0, 0, 0, 0); // sécuriser l'heure
    const startIndex = 2; // jour 3 du cycle

    const cycle = [
      "Permanence",       // Jour 1
      "Garde",            // Jour 2
      "Retour de garde",  // Jour 3
      "Repos"             // Jour 4
    ];

    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    // Modulo positif
    function modulo(n, m) {
      return ((n % m) + m) % m;
    }

    // Date du jour
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Afficher 3 mois (~90 jours) à partir d'aujourd'hui
    const daysToShow = 90;

    for (let i = 0; i < daysToShow; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const jourNom = jours[currentDate.getDay()];
      const jourStr = currentDate.toLocaleDateString("fr-FR");

      const diffTime = currentDate - startDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const cycleIndex = modulo(startIndex + diffDays, cycle.length);
      const etat = cycle[cycleIndex];

      const entry = document.createElement("div");

      const isToday = currentDate.getTime() === today.getTime();
      entry.className = "entry" + (isToday ? " aujourdhui" : "");

      entry.innerHTML = `
        ${isToday ? '<div style="font-weight:bold; margin-bottom:5px;">📌 Aujourd\'hui</div>' : ''}
        <div class="date">${jourNom} ${jourStr}</div>
        <div class="status ${etat}">📍 ${etat}</div>
      `;
      planningDiv.appendChild(entry);
    }

    function rechercher() {
      const inputDate = document.getElementById('dateInput').value;
      if (!inputDate) {
        resultat.textContent = "Veuillez choisir une date.";
        return;
      }

      const selectedDate = new Date(inputDate);
      selectedDate.setHours(0, 0, 0, 0);

      const diffTime = selectedDate - startDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const cycleIndex = modulo(startIndex + diffDays, cycle.length);
      const etat = cycle[cycleIndex];
      const jourNom = jours[selectedDate.getDay()];
      const jourStr = selectedDate.toLocaleDateString("fr-FR");

      resultat.innerHTML = `📅 <strong>${jourNom} ${jourStr}</strong> : Le médecin est en <span class="${etat}">${etat}</span>.`;
    }