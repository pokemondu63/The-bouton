// Votre configuration Firebase
var firebaseConfig = {
  apiKey: "Votre API Key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var monBouton = document.getElementById('monBouton');
var compteur = document.getElementById('compteur');

// Fonction pour obtenir l'adresse IP de l'utilisateur
function getUserIP(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.ipify.org?format=json', true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var ip = JSON.parse(xhr.responseText).ip;
          callback(ip);
      }
  };
  xhr.send();
}

// Vérifiez si l'utilisateur a déjà cliqué sur le bouton
getUserIP(function(ip) {
  var ipRef = database.ref('clics/' + ip);

  ipRef.once('value', function(snapshot) {
      if (snapshot.exists()) {
          monBouton.disabled = true;
          compteur.textContent = '1';
      } else {
          monBouton.onclick = function() {
              compteur.textContent = '1';
              monBouton.disabled = true;
              // Enregistrez que l'utilisateur a cliqué sur le bouton
              ipRef.set(true);
          };
      }
  });
});
