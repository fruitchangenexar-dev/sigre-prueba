npm install exceljs --save
npm install file-saver --save
npm install @types/file-saver --save-dev

--TAILWIND
1. console:
npm install tailwindcss @tailwindcss/postcss postcss --force
2. Create a .postcssrc.json file in the root of your project:
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
3. Add an @import to ./src/styles.css that imports Tailwind CSS:
@import "tailwindcss";

--SweetAlter2
npm install sweetalert2 --save
