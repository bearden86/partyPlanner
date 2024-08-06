//define the API URL
const apiUrl =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-PT/events";

//fetch and display the parties
document.addEventListener("DOMContentLoaded", () => {
  const partyList = document.getElementById("eventList");

  function fetchParties() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        partyList.innerHTML = "";
        // Check if the response is an array
        if (Array.isArray(data)) {
          // If it's an array, iterate over it
          data.forEach((party) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
            <h3>${party.name}</h3>
            <p>${party.date} ${party.time}</p>
            <p>${party.location}</p>
            <p>${party.description}</p>
            <button data-id="${party.id}">Delete</button>`;
            partyList.appendChild(listItem);
          });
        } else {
          // If it's an object, handle it accordingly
          const listItem = document.createElement("li");
          listItem.innerHTML = `
          <h3>${data.name}</h3>
          <p>${data.date} ${data.time}</p>
          <p>${data.location}</p>
          <p>${data.description}</p>
          <button data-id="${data.id}">Delete</button>`;
          partyList.appendChild(listItem);
        }

        attachDeleteHandlers();
      })
      .catch((error) => console.error("Error fetching parties:", error));
  }
  //         data.forEach((party) => {
  //           const listItem = document.createElement("li");
  //           listItem.innerHTML = `
  //                         <h3>${party.name}</h3>
  //                         <p>${party.date} ${party.time}</p>
  //                         <p>${party.location}</p>
  //                         <p>${party.description}</p>
  //                         <button data-id="${party.id}">Delete</button>`;
  //           partyList.appendChild(listItem);
  //         });
  //         attachDeleteHandlers();
  //       })
  //       .catch((error) => console.error("Error fetching parties:", error));
  //   }

  fetchParties();

  //add new party
  const partyForm = document.getElementById("party-form");

  partyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newParty = {
      name: document.getElementById("name").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      location: document.getElementById("location").value,
      description: document.getElementById("description").value,
    };

    fetch("/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newParty),
    })
      .then((response) => response.json())
      .then(() => {
        fetchParties();
        partyForm.reset();
      })
      .catch((error) => console.error("Error adding party:", error));
  });

  //delete party
  function attachDeleteHandlers() {
    document.querySelectorAll("button[data-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const partyId = button.getAttribute("data-id");

        fetch(`/events/${partyId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => fetchParties())
          .catch((error) => console.error("Error deleting party:", error));
      });
    });
  }
});
