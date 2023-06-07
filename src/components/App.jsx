import { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  saveContact = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;

    let validation = this.state.contacts.find(el =>
      el.name
        .toLocaleLowerCase()
        .includes(form.elements.name.value.toLocaleLowerCase())
    );
    if (validation === undefined) {
      this.setState({
        contacts: [
          ...this.state.contacts,
          {
            id: nanoid(),
            name: form.elements.name.value,
            number: form.elements.number.value,
          },
        ],
      });
      form.reset();
    } else {
      Notiflix.Notify.failure(validation.name + 'is already in contacts');
      form.reset();
    }
  };

  filterContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleDeleteContacts = id => {
    let updateContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updateContacts });
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts !== null) {
      this.setState({ contacts: parsedContacts });
    } else {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <>
        <ContactForm saveContact={this.saveContact}></ContactForm>
        <h1>Contacts</h1>
        <Filter filterContact={this.filterContact}></Filter>
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.handleDeleteContacts}
        />
      </>
    );
  }
}

export default App;
