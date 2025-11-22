let copyBtn = document.querySelectorAll("#code_copy_button");
copyBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(btn.parentElement.parentElement.getAttribute("data")).then(() => {btn.textContent = "Copied";setTimeout(() => {btn.textContent = "Copy"}, 1000)}).catch(() => {btn.textContent = "Failed to copy";setTimeout(() => {btn.textContent = "Copy"}, 1000)})
    })
})