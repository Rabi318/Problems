// src/components/ContactForm.js
import React from "react";
import useForm from "../hooks/useForm";

const ContactForm = () => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact:", values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={values.name}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="message"
        placeholder="Your Message"
        value={values.message}
        onChange={handleChange}
      ></textarea>
      <br />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
