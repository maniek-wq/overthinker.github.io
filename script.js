
const textarea = document.getElementById("myTextarea");
//=========================poszerzenie box z wpisywania=====================//
textarea.addEventListener("input", () => {
  const rows = textarea.value.split("\n").length;
  textarea.rows = rows < 5 ? 5 : rows;
});
//=========================poszerzenie box z wpisywania=====================//


//===========================Uzupełnianie localStorage===========================//
function fillLocal(){
const note = document.getElementById("myTextarea").value;
if(note == null || note.length === 0){
  window.alert("Notatka jest pusta!");
  return true;
}
else{
    localStorage.setItem("note",note);
    console.log("Dodano notatke do local storage!");
    for(let i=0;i<localStorage.length;i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      console.log(value);
    }
  }
}
//===========================Uzupełnianie localStorage===========================//


//=======================Bieżące usuwanie napisanego tekstu =====================//
function noteDelete(){
  textarea.value='';
}
myUsun.addEventListener("click",noteDelete);
//=======================Bieżące usuwanie napisanego tekstu =====================//

//==============Dodanie zapisanej notatki do sekcji Lista Myśli============//
myZapis = document.getElementById("myZapisz");
myUsun = document.getElementById("myUsun");
myZapis.addEventListener("click",fillLocal);

const notesContainer = document.getElementById('notes-container');
  const notesHeading = document.createElement('h4'); // utwórz element h4

      myZapis.addEventListener('click', () => {
        // Pobierz notatki z localStorage
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
      
        // Dodaj nową notatkę
        notes.push(textarea.value);
      
        // Zapisz notatki w localStorage
        localStorage.setItem('notes', JSON.stringify(notes));
      
        // Wyczyść pole tekstowe
        textarea.value = '';
      
        // Wyświetl notatki w sekcji "notes-container"
        notesContainer.innerHTML = '';
        
        // Dodaj nagłówek, jeśli nie istnieje
        if (!notesContainer.contains(notesHeading)) {
          notesHeading.id = 'notes-heading'; // nadaj id
          notesHeading.innerText = 'Lista Myśli'; // ustaw tekst
          notesContainer.appendChild(notesHeading); // dodaj do notesContainer
        }
       
        notes.forEach(note => {
          const noteElement = document.createElement('button');
          noteElement.innerText = note;
          noteElement.style.display = 'block';
          noteElement.style.marginTop='5px';
          noteElement.setAttribute('class','listBtn');
          notesContainer.appendChild(noteElement);
        
          const buttons = document.getElementsByClassName("listBtn");
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', displayNotes);
          }
        
          // function check(){
          //   console.log("działa klikanie!");
          // }

          function displayNotes() {
            const notesContainer = document.getElementById("notes-container");
          
            notesContainer.addEventListener("click", (event) => {
              // sprawdzamy, czy kliknięto w notatkę
              if (event.target.classList.contains("listBtn")) {
                // pobieramy tekst z notatki
                const noteText = event.target.textContent;
          
                // tworzymy nowy div i ustawiamy mu styl
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                overlay.style.display = "flex";
                overlay.style.justifyContent = "center";
                overlay.style.alignItems = "center";
                overlay.style.zIndex = "2";
          
                // tworzymy div z tekstem notatki i ustawiamy mu styl
                const noteDiv = document.createElement("div");
                noteDiv.style.width = "700px";
                noteDiv.style.height = "800px";
                noteDiv.style.backgroundColor = "white";
                noteDiv.style.padding = "50px";
                
                noteDiv.textContent = noteText;
                noteDiv.style.backgroundImage = "url('./img/kartka.png')";
                noteDiv.style.backgroundSize= "cover";
                noteDiv.style.fontFamily="Shantell Sans, cursive";
                noteDiv.style.overflow="scroll";
                noteDiv.style.fontSize="1.5em";
                // dodajemy div z tekstem notatki do overlaya i overlaya do body
                overlay.appendChild(noteDiv);
                document.body.appendChild(overlay);
          
                // obsługa przycisku zamknięcia
                overlay.addEventListener("click", (event) => {
                  if (event.target === overlay) {
                    overlay.remove();
                  }
                  
                });
              }
            });
          }

        });
        
      });



//==============Dodanie zapisanej notatki do sekcji Lista Myśli============//


//====================================Usuwanie wszystkich =================================//
      const removeButton = document.getElementById('DeleteAll');
      removeButton.addEventListener('click', function() {
        const confirmed = window.confirm('Czy na pewno chcesz usunąć wszystkie wpisy?');
        
        if (confirmed) {
          localStorage.clear();
          alert('Wszystkie wpisy zostały usunięte!');
        }
      });

      function clearNotes() {
        localStorage.clear();
        $('#notes-container').empty();
      }
      
      $('#DeleteAll').click(function() {
        clearNotes();
      });
      
      $(document).ready(function() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
      
        for (let i = 0; i < notes.length; i++) {
          const note = $('<div class="note"></div>').text(notes[i]);
          $('#notes-container').append(note);
        }
      });
   //====================================Usuwanie wszystkich================================//
