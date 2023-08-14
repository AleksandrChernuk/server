import Contacts from "../modules/Contacts.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.userId });

    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось найти контакты" });
  }
};

export const removeContacts = async (req, res) => {
  try {
    const contactsID = req.params.id;

    const deleteContacts = await Contacts.findByIdAndDelete({ _id: contactsID });

    if (!deleteContacts) {
      return res.status(403).json({ message: "Статья не найдена" });
    }

    return res.json({ message: "Статья удалена" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось найти контакты" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new Contacts({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      user: req.userId,
    });

    const contact = await doc.save();

    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось добавить контакт" });
  }
};

export const updateContacts = async (req, res) => {
  try {
    const contactsID = req.params.id;
    const updatedData = req.body;

    const updateContacts = await Contacts.findByIdAndUpdate({ _id: contactsID }, updatedData, { new: true });

    if (!updateContacts) {
      return res.status(403).json({ message: "Статья не найдена" });
    }

    return res.json({ message: "Контакт обновлен", contact: updateContacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось найти контакты" });
  }
};
