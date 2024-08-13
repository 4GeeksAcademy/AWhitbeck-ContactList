const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getContacts: async() => { 
				let response = await fetch("https://playground.4geeks.com/contact/agendas/A-Whitbeck/contacts")
				if (response.status == 404) {
					getActions().createAgenda() 
					console.log("No agenda with that slug found, creating a new one.");
				} else if (response.status == 200) {
					let data = await response.json()
					console.log("This is the data from the contacts API", data);
					setStore({contacts: data.contacts})
				} else {
					console.log(response.status, "Error occured while getting your contacts");
				}
				},
				createAgenda: async() => {
					let response = await fetch("https://playground.4geeks.com/contact/agendas/A-Whitbeck", {
						method: "POST"						
					})
					if (response.status == 201) {
						getActions().getContacts()
						console.log("Successfully created agenda, fetching contacts.");
					} else {
						console.log("Error occured while attempting to create your agenda", response.status);
					}
				},
				createContact: async(contactData) => {
					let response = await fetch("https://playground.4geeks.com/contact/agendas/A-Whitbeck/contacts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(contactData)
					})
					if(response.status == 201) {
						getActions().getContacts()
						console.log("Success adding new contact, now fetching updated contact list.");
						return true
					} else {
						console.log("An error occured while attempting to create a contact.", response.status);
						return false
					}
			}
		}
	};
};

export default getState;
