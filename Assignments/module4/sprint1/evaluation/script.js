document.addEventListener("DOMContentLoaded", () => {
  const feedback = JSON.parse(localStorage.getItem("feedback"));
  if (feedback) display(feedback);
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const feedback = {
      name,
      email,
      phone,
      message,
    };
    console.log(feedback);
    localStorage.setItem("feedback", JSON.stringify(feedback));
    display(feedback);
    form.reset();
  });
});
function display(feedback) {
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.innerHTML = `
    <p>Name: ${feedback.name}</p>
    <p>Email: ${feedback.email}</p>
    <p>Phone: ${feedback.phone}</p>
    <p>Message: ${feedback.message}</p>
  `;
}
