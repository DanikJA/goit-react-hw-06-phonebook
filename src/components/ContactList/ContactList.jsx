import { ContactItem } from '../ContactItem/ContactItem';
import {
  ContactListContainer,
  ContactListHeading,
  ContactList,
} from './ContactListStyled.jsx';
import { useSelector } from 'react-redux';

export const ContactListComponent = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter || '');

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <ContactListContainer>
      <ContactListHeading>Contacts:</ContactListHeading>
      <ContactList>
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
          />
        ))}
      </ContactList>
    </ContactListContainer>
  );
};
