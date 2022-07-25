import { Component } from "react";
import { nanoid } from 'nanoid'
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import { Container, FormBox, ContactsBox } from "./Phonebook.styled"

class Phonebook extends Component {
    state = {
        contacts: [],
        filter: ''
    };

    handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const inputName = form.elements.name.value;
        const inputNamber = form.elements.number.value;

        if (this.state.contacts.find(contact => contact.name.toLowerCase() === inputName.toLocaleLowerCase())) {
            form.reset();
            return window.alert(`${inputName} is already in contacts.`);
        };

        const contactObj = {id: nanoid(), name: inputName, number: inputNamber};
        this.setState(({ contacts }) => ({ contacts: [...contacts, contactObj] }));
        form.reset();
    };

    deleteContact = (contactId) => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId)
        }));
    };

    changeFilter = (e) => { 
        this.setState({filter: e.currentTarget.value})
    };

    getfiltredContacts = () => {
        const { filter, contacts } = this.state;
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()),);
    };

    componentDidMount() {
        const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

        if (parsedContacts) { 
            this.setState({ contacts: parsedContacts });
        };
        
    };

    componentDidUpdate(_, prevState) {
        console.log('Update');
        if (this.state.contacts !== prevState.contacts) {
            console.log('LS Usdate');
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        };
    };

    render() {
        
        const filtredContacts = this.getfiltredContacts();

        return (    
            <Container>
                <h1>Phonebook</h1>
                <FormBox>
                    <ContactForm
                        onSubmitForm={this.handleSubmit}
                        inputName={"Name"}
                        inputNumber={"Number"}
                        buttonName={"Add cotact"} />   
                </FormBox>
                    <h2>Contacts</h2>
                <ContactsBox>
                    <Filter inputName={"Find contacts by name"} value={this.state.filter} onChange={this.changeFilter} />
                    <ContactList contacts={filtredContacts} buttonName={"Delete"} onBtnClick={this.deleteContact} />
                </ContactsBox>
            </Container>
        );}
}

export default Phonebook;