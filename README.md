# kmk-mediaquery-kit

A simple CLI tool to automatically scaffold responsive media queries for your plain HTML and CSS projects.

---

## 🧩 Overview

**`kmk-mq-kit`** helps streamline responsive design by scanning your HTML and CSS files and generating media query scaffolding for your classes across custom breakpoints.

It’s ideal for developers working with **static HTML and CSS** who want to automate media query creation **without using utility-first frameworks**.

> Make sure all your CSS class names exactly match the class names used in your HTML.
>
> Once those class names are styled in your main CSS file, `kmk-mq-kit` will automatically generate empty media query blocks for them.
>
> This way, you don’t need to write the class names again — just fill in the responsive styles inside the generated file.
>
> Ultimately, you don’t need to worry about mismatching class names or repeating them inside media queries — `kmk-mq-kit` automatically tracks the class names from your CSS and reflects them correctly in the generated media query blocks.

---

## ✨ Features

✅ Detects all CSS classes used in your HTML files

✅ Checks which classes are styled in your CSS

✅ Automatically generates media query blocks across configured breakpoints

✅ Appends new responsive styles without overwriting existing ones

✅ Configurable breakpoints and paths via a JSON configuration file

✅ Supports **watch mode** for real-time updates

✅ Lightweight and easy to integrate into any static web project

---

## 🛠️ Installation

- To avoid issues with script execution policies in PowerShell, it’s best to run the installation and CLI commands in **Git Bash** or **Command Prompt (cmd)** .
- Install the CLI globally using npm:

```apache
npm install -g kmk-mediaquery-kit
```

---

## 🚀 Usage

- Ensure your class names in CSS match those used in your HTML files.
- Run the tool from your project root directory:

```
     kmk-mq-kit
```

- To enable watch mode (auto-update on file changes):

```
     kmk-mq-kit --watch
```

---

## ⚠️ PowerShell Execution Policy Note

If using **PowerShell** and encountering a **"script execution policy"** error, it means PowerShell is blocking execution of global npm packages.

### 🛡️ Fix Option 1: Use Git Bash or WSL (recommended)

Use **Git Bash** or **Windows Subsystem for Linux (WSL)** , which support npm CLIs without restrictions.

### 🛡️ Fix Option 2: Change PowerShell Execution Policy (use cautiously)

Run PowerShell as Administrator and execute:

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then confirm with `Y`.

---

## ⚙️ Configuration

Create a file named **`mqscaffold.config.json`** in your project root with your preferred settings.

### 📄 Example `mqscaffold.config.json`

```
{
  "breakpoints": {
    "xs": "360px",
    "sm": "480px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "xxl": "1440px"
  },
  "cssPath": "./styles/styles.css",
  "htmlPaths": ["./index.html", "./pages/**/*.html"],
  "output": "./styles/media-queries.css"
}
```

> 💡 **Note:** Feel free to adjust the media query breakpoints to match your project's design requirements.

---

## 🔍 Options

- `breakpoints`: Custom labels and widths
- `cssPath`: Path to your main CSS file
- `htmlPaths`: Array of file paths or glob patterns
- `output`: Path for the generated media query CSS

---

## 📁 Recommended Project Structure

To work with the default settings in `mqscaffold.config.json`, organize your files like this:

```apache
your-project/               ← main folder of your project
├──index.html               ← Main index.html file
├──styles/                  ← Folder Named "styles"
│   ├── styles.css          ← your main CSS file
│   └── media-query.css     ← your mediaquery.css
├──mqscaffold.config.json  ← configuration file
```

> **⚠️Important:** In `index.html`, link both the `styles.css` and the `media-queries.css`:

🧾 Your `index.html` should look like this:

```apache
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Project</title>

  <!-- Main Css file and responsive styles link -->
  <link rel="stylesheet" href="styles/styles.css">
  <link rel="stylesheet" href="styles/mediaquery.css">
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

---

## 🚫 Limitations

- Does **not** support Tailwind CSS or utility-first frameworks
- Only works with plain HTML and CSS
- Use Tailwind's native utilities if applicable

---

## 🤝 Contribution

- Contributions, feature requests, and bug reports are welcome!
- Visit the GitHub repo, open issues, or pull requests.
- Reach out for support, feedback, or collaboration.

---

## 📄 License

Licensed under the **MIT License** .

---

## 👤 Author

**Karthik Kathari**

---

## 🙏 Thank You

Thanks for using `MediaQuery ToolKit.`
