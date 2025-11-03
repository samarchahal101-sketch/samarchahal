document.addEventListener("DOMContentLoaded", () => {
  // Load fee data in modal
  const feesBtn = document.getElementById("checkFeesBtn");
  const feesContainer = document.getElementById("feesContainer");

  feesBtn.addEventListener("click", async () => {
    const modal = new bootstrap.Modal(document.getElementById("feesModal"));
    modal.show();

    try {
      const response = await fetch("../api/fees.json");
      const data = await response.json();
      const uniData = data.universities.find(u => u.id === UNIVERSITY_ID);

      let html = "<ul>";
      for (const [course, fee] of Object.entries(uniData.fees)) {
        html += `<li><strong>${course}</strong>: ${fee}</li>`;
      }
      html += "</ul>";
      feesContainer.innerHTML = html;
    } catch {
      feesContainer.innerHTML = "❌ Error loading fee details.";
    }
  });

  // Handle form submit
  const form = document.getElementById("leadForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(PIPEDREAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Form submitted successfully!");
        form.reset();
      } else {
        alert("❌ Submission failed.");
      }
    } catch {
      alert("⚠️ Network error. Please try again later.");
    }
  });
});
