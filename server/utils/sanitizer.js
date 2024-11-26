
// Function to HTML escape user input
const escapeHTML = async (input) => {
    return input.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

// Sanitize username input: Prevent NoSQL injection
const escapeInject = async (input) => {
    return input.replace(/[^\w\s]/gi, ''); // Remove non-alphanumeric characters
}

module.exports = {escapeHTML,escapeInject}