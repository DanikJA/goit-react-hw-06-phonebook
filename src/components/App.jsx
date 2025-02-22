import Notiflix from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactListComponent } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../redux/contactSlice';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter || '');
  const dispatch = useDispatch();

  const addNumber = ({ name, number }) => {
    const contactWithSameName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const contactWithSameNumber = contacts.find(
      contact => contact.number === number
    );

    if (contactWithSameName && contactWithSameNumber) {
      Notiflix.Notify.failure(
        `Контакт з ім'ям ${name} та з номером ${number} вже існує!`
      );
    } else if (contactWithSameName) {
      Notiflix.Notify.failure(`Контакт з ім'ям ${name} вже існує!`);
    } else if (contactWithSameNumber) {
      Notiflix.Notify.failure(`Контакт з номером ${number} вже існує!`);
    } else {
      dispatch(addContact({ name, number }));
      Notiflix.Notify.success(`Контакт ${name} успішно додано!`);
    }
  };

  const filterContacts = event => {
    dispatch(setFilter(event.target.value));
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <div style={{ marginBottom: '50px' }}>
      <ContactForm onSubmit={addNumber} />
      <Filter value={filter} onChange={filterContacts} />
      <ContactListComponent
        contacts={filteredContacts}
        onDelete={handleDelete}
      />
    </div>
  );
};
