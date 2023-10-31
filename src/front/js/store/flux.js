const getState = ({ getStore, getActions, setStore }) => {
	const url = "https://symmetrical-capybara-x75gp5p9w6php7j-3001.app.github.dev"
	const urlCreate_Account = "/api/create_account"
	const urlSingAccount = "/api/sign_account"
	return {
		store: {
			users: [],
			user: ""

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// ##=========================================================##
			// #Creando Usuario#
			createAccount: async (info) => {
				fetch(`${url}${urlCreate_Account}`, {
					method: "POST",
					body: JSON.stringify(info),
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((data) => {
						if (!data.ok) {
							throw new Error('Error al crear cuenta');
						}
						return data.json();
					})
					.then((resp) => console.log(resp))
					.catch((error) => {
						console.log("Error", error)
					});
			},
			// #Login
			login: async (info) => {
				const request = {
					method: "POST",
					body: JSON.stringify(info),
					headers: {
						"Content-Type": "application/json"
					}

				}
				try {
					const resp = await fetch(`${url}${urlSingAccount}`, request)
					const data = await resp.json()
					console.log(data)
					//   localStorage.setItem("dataUser", JSON.stringify(data))
					setStore({ dataUser: data });
					console.log(data)
					return data
				} catch (error) {
					console.log(error)
				}
			},




			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
