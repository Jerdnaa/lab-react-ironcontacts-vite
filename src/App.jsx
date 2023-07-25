import { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json"

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5))
  const remainder = contactsJSON.slice(5)
  const randomNum = Math.floor(Math.random() * remainder.length)
  // console.log(remainder)

  const randomCelebHandler = () => {
    const randomCeleb = remainder.slice(randomNum, randomNum + 1)
    console.log(randomCeleb)
    setContacts([...contacts, ...randomCeleb])
  }

  const sortPopularityHandler = () => {
    // console.log([...contacts.popularity])
    setContacts([...contacts].sort((a, b) => b.popularity - a.popularity))
  }

  const sortNameHandler = () => {
    setContacts([...contacts.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })])
  }

  const deleteCelebHandler = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={randomCelebHandler}>Add random contact</button>
      <button onClick={sortPopularityHandler}>Sort by popularity</button>
      <button onClick={sortNameHandler}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            contacts.map(oneContact => {
              return (
               <tr key={oneContact.id}>
                <td><img src={oneContact.pictureUrl} alt="" style={{height: "200px"}}/></td>
                <td><h3>{oneContact.name}</h3></td>
                <td><h3>{oneContact.popularity}</h3></td>
                <td>{oneContact.wonOscar ? <p>🏆</p> : null}</td>
                <td>{oneContact.wonEmmy ? <p>🦍</p> : null}</td>
                <td><button onClick={() => deleteCelebHandler(oneContact.id)}>Delete</button></td>
               </tr>
                
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
